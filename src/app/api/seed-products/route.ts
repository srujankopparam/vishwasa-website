import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
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
