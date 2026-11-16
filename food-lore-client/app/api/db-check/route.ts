
import { NextResponse } from "next/server";
import { getDb } from "@/src/components/lib/db";

export async function GET() {
  if (process.env.NODE_ENV !== "development") {
    return new Response(null, { status: 404 });
  }

  try {
    const result = await getDb().query(
      "SELECT 1 AS connection_test"
    );

    return NextResponse.json({
      connected: result.rows[0]?.connection_test === 1,
    });
  } catch (error) {
    console.error("Database connection failed:", error);

    return NextResponse.json(
      { connected: false },
      { status: 503 }
    );
  }
}
