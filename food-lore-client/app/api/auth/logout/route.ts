import { createHash } from 'node:crypto';
import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/src/components/lib/db';
import { SESSION_COOKIE } from '@/src/components/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const token = request.cookies.get(SESSION_COOKIE)?.value;

    if (token) {
      const tokenHash = createHash('sha256')
        .update(token)
        .digest('hex');

      await getDb().query(
        `DELETE FROM sessions WHERE token_hash = $1`,
        [tokenHash]
      );
    }

    const response = NextResponse.json({
      success: true,
    });

    response.cookies.set(SESSION_COOKIE, '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 0,
    });

    return response;
  } catch (error) {
    console.error('Logout failed:', error);

    return NextResponse.json(
      { error: 'Unable to log out.' },
      { status: 500 }
    );
  }
}