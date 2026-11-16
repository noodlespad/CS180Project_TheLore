import { randomBytes } from 'node:crypto';
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { getDb } from '@/src/components/lib/db';
import {
  isSameOrigin,
  newSession,
  setSessionCookie,
  toPublicUser,
} from '@/src/components/lib/auth';
import { validateSignup } from '@/src/components/lib/auth-validation';

export async function POST(request: NextRequest) {
  if (!isSameOrigin(request)) {
    return NextResponse.json({ error: 'Forbidden.' }, { status: 403 });
  }

  if (!request.headers.get('content-type')?.startsWith('application/json')) {
    return NextResponse.json({ error: 'Expected JSON.' }, { status: 415 });
  }

  let input: unknown;

  try {
    input = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON.' }, { status: 400 });
  }

  const checked = validateSignup(input);
  if (!checked.ok) {
    return NextResponse.json({ error: checked.error }, { status: 400 });
  }

  const { displayName, email, password } = checked.data;
  const usernameBase = displayName.toLowerCase().replace(/[^a-z0-9]/g, '').slice(0, 11) || 'cook';
  const username = `${usernameBase}_${randomBytes(6).toString('hex')}`;
  let client;
  try {
    const passwordHash = await bcrypt.hash(password, 12);
    client = await getDb().connect();
    const session = newSession(true);
    await client.query('BEGIN');
    const result = await client.query<{
      id: string;
      display_name: string;
      username: string;
      email: string;
    }>(
      `INSERT INTO users (display_name, username, email, password_hash, terms_accepted_at)
       VALUES ($1, $2, $3, $4, NOW())
       RETURNING id::text AS id, display_name, username, email`,
      [displayName, username, email, passwordHash]
    );
    const user = result.rows[0];
    await client.query(
      `INSERT INTO sessions (user_id, token_hash, expires_at) VALUES ($1, $2, $3)`,
      [user.id, session.tokenHash, session.expiresAt]
    );
    await client.query('COMMIT');

    const response = NextResponse.json({ user: toPublicUser(user) }, { status: 201 });
    setSessionCookie(response, session.token, true);
    return response;
  } catch (error) {
    if (client) await client.query('ROLLBACK').catch(() => {});
    if (error && typeof error === 'object' && 'code' in error && error.code === '23505') {
      return NextResponse.json({ error: 'Email or username is already taken.' }, { status: 409 });
    }
    console.error('Signup failed:', error);
    return NextResponse.json({ error: 'Unable to create account.' }, { status: 500 });
  } finally {
    client?.release();
  }
}
