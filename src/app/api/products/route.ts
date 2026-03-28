import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

function isAuthenticated(request: Request) {
  const authHeader = request.headers.get("authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) return false;
  const token = authHeader.split(" ")[1];
  return token === process.env.ADMIN_PASSWORD;
}

export async function GET() {
  try {
    const { rows } = await sql`SELECT * FROM products ORDER BY created_at DESC;`;
    return NextResponse.json({ products: rows }, { status: 200 });
  } catch (error) {
    console.error("Products GET failed:", error);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  if (!isAuthenticated(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { name, description, price, image_url, highlights, status, category, ingredients, shelf_life, storage, badge, is_featured, visibility } = body;

    if (!name) {
      return NextResponse.json(
        { error: "Product name is required" },
        { status: 400 }
      );
    }

    const { rows } = await sql`
      INSERT INTO products (name, description, price, image_url, highlights, status, category, ingredients, shelf_life, storage, badge, is_featured, visibility)
      VALUES (${name}, ${description || ""}, ${price || ""}, ${image_url || ""}, ${highlights || ""}, ${status || "active"}, ${category || "savories"}, ${ingredients || ""}, ${shelf_life || ""}, ${storage || ""}, ${badge || "none"}, ${is_featured || false}, ${visibility || "active"})
      RETURNING *;
    `;

    return NextResponse.json(
      { message: "Product successfully added", product: rows[0] },
      { status: 201 }
    );
  } catch (error) {
    console.error("Products POST failed:", error);
    return NextResponse.json(
      { error: "Failed to add product" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  if (!isAuthenticated(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Product ID is required for deletion" },
        { status: 400 }
      );
    }

    await sql`DELETE FROM products WHERE id = ${id};`;
    return NextResponse.json({ message: "Product deleted" }, { status: 200 });
  } catch (error) {
    console.error("Products DELETE failed:", error);
    return NextResponse.json(
      { error: "Failed to delete product" },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  if (!isAuthenticated(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { id, name, description, price, image_url, highlights, status, category, ingredients, shelf_life, storage, badge, is_featured, visibility } = body;

    if (!id || !name) {
      return NextResponse.json(
        { error: "ID and Name are required" },
        { status: 400 }
      );
    }

    const { rows } = await sql`
      UPDATE products
      SET
        name = ${name},
        description = ${description || ""},
        price = ${price || ""},
        image_url = ${image_url || ""},
        highlights = ${highlights || ""},
        status = ${status || "active"},
        category = ${category || "savories"},
        ingredients = ${ingredients || ""},
        shelf_life = ${shelf_life || ""},
        storage = ${storage || ""},
        badge = ${badge || "none"},
        is_featured = ${is_featured || false},
        visibility = ${visibility || "active"}
      WHERE id = ${id}
      RETURNING *;
    `;

    return NextResponse.json(
      { message: "Product updated", product: rows[0] },
      { status: 200 }
    );
  } catch (error) {
    console.error("Products PUT failed:", error);
    return NextResponse.json(
      { error: "Failed to update product" },
      { status: 500 }
    );
  }
}
