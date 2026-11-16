import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { getDb } from '@/src/components/lib/db';
import {
  isSameOrigin,
  newSession,
  setSessionCookie,
  toPublicUser,
} from '@/src/components/lib/auth';

type LoginUser = {
  id: string;
  display_name: string;
  username: string;
  email: string;
  password_hash: string;
};

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

  if (!input || typeof input !== 'object' || Array.isArray(input)) {
    return NextResponse.json({ error: 'Invalid login information.' }, { status: 400 });
  }

  const { email, password, rememberMe } = input as Record<string, unknown>;
  if (
    typeof email !== 'string' ||
    !email.trim() ||
    email.length > 254 ||
    typeof password !== 'string' ||
    !password ||
    typeof rememberMe !== 'boolean'
  ) {
    return NextResponse.json({ error: 'Invalid login information.' }, { status: 400 });
  }

  try {
    const result = await getDb().query<LoginUser>(
      `SELECT id::text AS id, display_name, username, email, password_hash
       FROM users
       WHERE LOWER(email) = LOWER($1)
       LIMIT 1`,
      [email.trim()]
    );
    const user = result.rows[0];

    if (!user || !(await bcrypt.compare(password, user.password_hash))) {
      return NextResponse.json(
        { error: 'Invalid email or password.' },
        { status: 401 }
      );
    }

    const session = newSession(rememberMe);
    await getDb().query(
      `INSERT INTO sessions (user_id, token_hash, expires_at)
       VALUES ($1, $2, $3)`,
      [user.id, session.tokenHash, session.expiresAt]
    );

    const response = NextResponse.json({ user: toPublicUser(user) });
    setSessionCookie(response, session.token, rememberMe);
    return response;
  } catch (error) {
    console.error('Login failed:', error);
    return NextResponse.json(
      { error: 'Unable to log in. Please try again.' },
      { status: 500 }
    );
  }
}
