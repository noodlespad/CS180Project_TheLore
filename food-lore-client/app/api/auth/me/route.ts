import { NextRequest, NextResponse } from 'next/server';
import { createHash } from 'node:crypto';
import { getDb } from '@/src/components/lib/db';
import { SESSION_COOKIE } from '@/src/components/lib/auth';

export async function PATCH(request: NextRequest) {
  try {
    const token = request.cookies.get(SESSION_COOKIE)?.value;

    if (!token) {
      return NextResponse.json(
        { error: 'Not authenticated.' },
        { status: 401 }
      );
    }

    const tokenHash = createHash('sha256')
      .update(token)
      .digest('hex');

    const body = await request.json();

    const displayName = String(body.displayName ?? '').trim();
    const username = String(body.username ?? '').trim();
    const email = String(body.email ?? '').trim().toLowerCase();

    if (!displayName || !username || !email) {
      return NextResponse.json(
        { error: 'All fields are required.' },
        { status: 400 }
      );
    }

    const result = await getDb().query<{
      id: string;
      display_name: string;
      username: string;
      email: string;
    }>(
      `
      UPDATE users
      SET
        display_name = $1,
        username = $2,
        email = $3
      WHERE id IN (
        SELECT s.user_id
        FROM sessions s
        WHERE s.token_hash = $4
          AND s.expires_at > NOW()
        LIMIT 1
      )
      RETURNING
        id::text AS id,
        display_name,
        username,
        email
      `,
      [displayName, username, email, tokenHash]
    );

    const user = result.rows[0];

    if (!user) {
      return NextResponse.json(
        { error: 'User not found.' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      user: {
        id: user.id,
        displayName: user.display_name,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    if (
      error &&
      typeof error === 'object' &&
      'code' in error &&
      error.code === '23505'
    ) {
      return NextResponse.json(
        { error: 'That email or username is already in use.' },
        { status: 409 }
      );
    }

    console.error('Profile update failed:', error);

    return NextResponse.json(
      { error: 'Unable to update profile.' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get(SESSION_COOKIE)?.value;
    if (!token) {
      return NextResponse.json(
        { user: null },
        { status: 401 }
      );
    }

    const tokenHash = createHash('sha256')
      .update(token)
      .digest('hex');

    const result = await getDb().query<{
      id: string;
      display_name: string;
      username: string;
      email: string;
    }>(
      `
      SELECT
        u.id::text AS id,
        u.display_name,
        u.username,
        u.email
      FROM sessions s
      JOIN users u
        ON u.id = s.user_id
      WHERE s.token_hash = $1
        AND s.expires_at > NOW()
      LIMIT 1
      `,
      [tokenHash]
    );

    const user = result.rows[0];

    if (!user) {
      return NextResponse.json(
        { user: null },
        { status: 401 }
      );
    }

    return NextResponse.json({
      user: {
        id: user.id,
        displayName: user.display_name,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    console.error('Current user lookup failed:', error);

    return NextResponse.json(
      { error: 'Unable to get current user.' },
      { status: 500 }
    );
  }
}