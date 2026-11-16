import { createHash, randomBytes } from 'node:crypto';
import type { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/src/components/lib/db';

export const SESSION_COOKIE = 'foodlore_session';
const DAY = 24 * 60 * 60 * 1000;

type UserRow = {
  id: string;
  display_name: string;
  username: string;
  email: string;
};

export function toPublicUser(row: UserRow) {
  return {
    id: row.id,
    displayName: row.display_name,
    username: row.username,
    email: row.email,
  };
}

export function hashToken(token: string): string {
  return createHash('sha256').update(token).digest('hex');
}

export function newSession(rememberMe: boolean) {
  const token = randomBytes(32).toString('hex');
  const expiresAt = new Date(Date.now() + (rememberMe ? 30 : 1) * DAY);
  return { token, tokenHash: hashToken(token), expiresAt };
}

export function setSessionCookie(response: NextResponse, token: string, rememberMe: boolean) {
  response.cookies.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    ...(rememberMe ? { maxAge: 30 * 24 * 60 * 60 } : {}),
  });
}

export function clearSessionCookie(response: NextResponse) {
  response.cookies.set(SESSION_COOKIE, '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 0,
  });
}

export async function getUserBySessionToken(token: string | undefined) {
  if (!token || !/^[a-f0-9]{64}$/.test(token)) return null;

  const result = await getDb().query<UserRow>(
    `SELECT u.id::text AS id, u.display_name, u.username, u.email
     FROM sessions s JOIN users u ON u.id = s.user_id
     WHERE s.token_hash = $1 AND s.expires_at > NOW()`,
    [hashToken(token)]
  );
  return result.rows[0] ? toPublicUser(result.rows[0]) : null;
}

// Login/signup/logout only accept requests from the app's own origin.
export function isSameOrigin(request: NextRequest) {
  const origin = request.headers.get('origin');
  return !origin || origin === request.nextUrl.origin;
}
