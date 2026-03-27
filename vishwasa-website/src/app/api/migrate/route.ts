import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await sql`ALTER TABLE products ADD COLUMN IF NOT EXISTS category VARCHAR(255) DEFAULT 'savories';`;
    return NextResponse.json({ message: "Migration successful: category column added." });
  } catch (error) {
    console.error("Migration failed:", error);
    return NextResponse.json({ error: "Migration failed" }, { status: 500 });
  }
}
