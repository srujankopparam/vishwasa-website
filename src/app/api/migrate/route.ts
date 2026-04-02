import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

function isAuthenticated(request: Request) {
  const authHeader = request.headers.get("authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) return false;
  return authHeader.split(" ")[1] === process.env.ADMIN_PASSWORD;
}

export async function GET(request: Request) {
  if (!isAuthenticated(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    // Product Table Expansion
    await sql`ALTER TABLE products ADD COLUMN IF NOT EXISTS category VARCHAR(255) DEFAULT 'savories';`;
    await sql`ALTER TABLE products ADD COLUMN IF NOT EXISTS ingredients TEXT DEFAULT '';`;
    await sql`ALTER TABLE products ADD COLUMN IF NOT EXISTS shelf_life TEXT DEFAULT '';`;
    await sql`ALTER TABLE products ADD COLUMN IF NOT EXISTS storage TEXT DEFAULT '';`;
    await sql`ALTER TABLE products ADD COLUMN IF NOT EXISTS badge TEXT DEFAULT 'none';`;
    await sql`ALTER TABLE products ADD COLUMN IF NOT EXISTS is_featured BOOLEAN DEFAULT false;`;
    await sql`ALTER TABLE products ADD COLUMN IF NOT EXISTS visibility TEXT DEFAULT 'active';`;

    // FAQ Table Creation
    await sql`
      CREATE TABLE IF NOT EXISTS faq (
        id SERIAL PRIMARY KEY,
        question TEXT NOT NULL,
        answer TEXT NOT NULL,
        sort_order INTEGER DEFAULT 0,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `;

    return NextResponse.json({ message: "Migration successful: new tables and columns added." });
  } catch (error) {
    console.error("Migration failed:", error);
    return NextResponse.json({ error: "Migration failed" }, { status: 500 });
  }
}
