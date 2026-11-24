import { createHash } from 'node:crypto';
import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/src/components/lib/db';
import { SESSION_COOKIE } from '@/src/components/lib/auth';

async function getCurrentUserId(request: NextRequest) {
  const token = request.cookies.get(SESSION_COOKIE)?.value;

  if (!token) {
    return null;
  }

  const tokenHash = createHash('sha256')
    .update(token)
    .digest('hex');

  const result = await getDb().query<{ user_id: string }>(
    `
    SELECT user_id::text AS user_id
    FROM sessions
    WHERE token_hash = $1
      AND expires_at > NOW()
    LIMIT 1
    `,
    [tokenHash]
  );

  return result.rows[0]?.user_id ?? null;
}

// Get current user's favorites
export async function GET(request: NextRequest) {
  try {
    const userId = await getCurrentUserId(request);

    if (!userId) {
      return NextResponse.json(
        { favorites: [] },
        { status: 401 }
      );
    }

    const result = await getDb().query<{ mealdb_id: string }>(
      `
      SELECT mealdb_id
      FROM favorites
      WHERE user_id = $1
      ORDER BY created_at DESC
      `,
      [userId]
    );

    return NextResponse.json({
      favorites: result.rows.map((row) => row.mealdb_id),
    });
  } catch (error) {
    console.error('Could not load favorites:', error);

    return NextResponse.json(
      { error: 'Could not load favorites.' },
      { status: 500 }
    );
  }
}

// Save a recipe
export async function POST(request: NextRequest) {
  try {
    const userId = await getCurrentUserId(request);

    if (!userId) {
      return NextResponse.json(
        { error: 'Not logged in.' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const mealdbId = body.mealdbId;

    if (!mealdbId) {
      return NextResponse.json(
        { error: 'Recipe ID is required.' },
        { status: 400 }
      );
    }

    await getDb().query(
      `
      INSERT INTO favorites (user_id, mealdb_id)
      VALUES ($1, $2)
      ON CONFLICT (user_id, mealdb_id)
      DO NOTHING
      `,
      [userId, mealdbId]
    );

    return NextResponse.json({
      saved: true,
    });
  } catch (error) {
    console.error('Could not save favorite:', error);

    return NextResponse.json(
      { error: 'Could not save favorite.' },
      { status: 500 }
    );
  }
}

// Remove a saved recipe
export async function DELETE(request: NextRequest) {
  try {
    const userId = await getCurrentUserId(request);

    if (!userId) {
      return NextResponse.json(
        { error: 'Not logged in.' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const mealdbId = body.mealdbId;

    if (!mealdbId) {
      return NextResponse.json(
        { error: 'Recipe ID is required.' },
        { status: 400 }
      );
    }

    await getDb().query(
      `
      DELETE FROM favorites
      WHERE user_id = $1
        AND mealdb_id = $2
      `,
      [userId, mealdbId]
    );

    return NextResponse.json({
      saved: false,
    });
  } catch (error) {
    console.error('Could not remove favorite:', error);

    return NextResponse.json(
      { error: 'Could not remove favorite.' },
      { status: 500 }
    );
  }
}