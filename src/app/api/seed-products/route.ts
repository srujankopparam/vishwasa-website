import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

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
    const products = [
      { name: "Kodubale", price: "₹120" },
      { name: "Rice Flour Chakli", price: "₹120" },
      { name: "Ribbon Muruku", price: "₹120" },
      { name: "Nippattu", price: "₹120" },
      { name: "Thin Butter Muruku", price: "₹120" },
    ];

    let insertedCount = 0;

    for (const p of products) {
      const { rows } = await sql`SELECT id FROM products WHERE name = ${p.name}`;
      if (rows.length === 0) {
        await sql`
          INSERT INTO products (name, description, price, image_url, highlights, status, category, ingredients, shelf_life, storage, badge, is_featured, visibility)
          VALUES (${p.name}, '', ${p.price}, '', '', 'active', 'savories', '', '', '', 'none', false, 'active');
        `;
        insertedCount++;
      }
    }

    return NextResponse.json({ message: `Successfully added ${insertedCount} new products.` });
  } catch (error: any) {
    console.error("Seed failed:", error);
    return NextResponse.json({ error: "Seed failed", details: error.message }, { status: 500 });
  }
}
