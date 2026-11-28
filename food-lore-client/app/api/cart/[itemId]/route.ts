import { NextResponse } from "next/server";
import { getDb } from "@/src/components/lib/db";

//for testing
const DUMMY_USER_ID = 1;

export async function PATCH(
  request: Request,
  context: { params: Promise<{ itemId: string }> }
  //pulls item id
) {
  try {
    const { itemId } = await context.params;
    const body = await request.json();
    //recieves info from frontend
    const { name, quantity, is_purchased, is_optional } = body;

    const db = getDb();
    const result = await db.query(
      `UPDATE cart_items
       SET
         name = COALESCE($1, name),
         quantity = COALESCE($2, quantity),
         is_purchased = COALESCE($3, is_purchased),
         is_optional = COALESCE($4, is_optional)
       WHERE id = $5 AND user_id = $6
       RETURNING *`,
      [
        name ?? null,
        quantity ?? null,
        is_purchased ?? null,
        is_optional ?? null,
        itemId,
        DUMMY_USER_ID,
      ]
    );
    //alows partial updates and updated in general and makes sure the id and user id are the same

    if (result.rows.length === 0) {
      return NextResponse.json({ error: "Item not found" }, { status: 404 });
    }

    return NextResponse.json({ item: result.rows[0] });
  } catch (error) {
    console.error("Failed to update cart item:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function DELETE(
  _request: Request,
  context: { params: Promise<{ itemId: string }> }
) {
  try {
    const { itemId } = await context.params;

    const db = getDb();
    const result = await db.query(
      `DELETE FROM cart_items
       WHERE id = $1 AND user_id = $2
       RETURNING id`,
      [itemId, DUMMY_USER_ID]
    );

    if (result.rows.length === 0) {
      return NextResponse.json({ error: "Item not found" }, { status: 404 });
    }

    return NextResponse.json({ deletedId: result.rows[0].id });
  } catch (error) {
    console.error("Failed to delete cart item:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}