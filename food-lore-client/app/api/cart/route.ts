import { NextResponse } from "next/server";
import { getDb } from "@/src/components/lib/db";

const DUMMY_USER_ID = 1;

export async function GET() {
  try {
    const db = getDb();
    const result = await db.query(
      "SELECT * FROM cart_items WHERE user_id = $1 ORDER BY created_at ASC",
      [DUMMY_USER_ID]
    );

    return NextResponse.json({ items: result.rows });
  } catch (error) {
    console.error("Failed to fetch cart items:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, quantity, is_optional } = body;

    if (!name) {
      return NextResponse.json({ error: "Item name is required" }, { status: 400 });
    }

    const db = getDb();
    const result = await db.query(
      `INSERT INTO cart_items (user_id, name, quantity, is_optional) 
       VALUES ($1, $2, $3, $4) 
       RETURNING *`,
      [DUMMY_USER_ID, name, quantity || "", is_optional || false]
    );

    return NextResponse.json({ item: result.rows[0] }, { status: 201 });
  } catch (error) {
    console.error("Failed to add cart item:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}