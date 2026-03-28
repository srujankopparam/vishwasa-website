import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await sql`ALTER TABLE products ADD COLUMN IF NOT EXISTS category VARCHAR(255) DEFAULT 'savories';`;
    await sql`ALTER TABLE products ADD COLUMN IF NOT EXISTS ingredients TEXT DEFAULT '';`;
    await sql`ALTER TABLE products ADD COLUMN IF NOT EXISTS shelf_life TEXT DEFAULT '';`;
    await sql`ALTER TABLE products ADD COLUMN IF NOT EXISTS storage TEXT DEFAULT '';`;
    await sql`ALTER TABLE products ADD COLUMN IF NOT EXISTS badge TEXT DEFAULT 'none';`;
    await sql`ALTER TABLE products ADD COLUMN IF NOT EXISTS is_featured BOOLEAN DEFAULT false;`;
    await sql`ALTER TABLE products ADD COLUMN IF NOT EXISTS visibility TEXT DEFAULT 'active';`;
    return NextResponse.json({ message: "Migration successful: new product columns added." });
  } catch (error) {
    console.error("Migration failed:", error);
    return NextResponse.json({ error: "Migration failed" }, { status: 500 });
  }
}
