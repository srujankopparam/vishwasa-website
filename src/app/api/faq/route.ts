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
    const { rows } = await sql`SELECT * FROM faq ORDER BY sort_order ASC, created_at DESC;`;
    return NextResponse.json({ faqs: rows }, { status: 200 });
  } catch (error) {
    console.error("FAQ GET failed:", error);
    return NextResponse.json(
      { error: "Failed to fetch FAQs" },
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
    const { question, answer, sort_order } = body;

    if (!question || !answer) {
      return NextResponse.json(
        { error: "Question and Answer are required" },
        { status: 400 }
      );
    }

    const { rows } = await sql`
      INSERT INTO faq (question, answer, sort_order)
      VALUES (${question}, ${answer}, ${sort_order || 0})
      RETURNING *;
    `;

    return NextResponse.json(
      { message: "FAQ successfully added", faq: rows[0] },
      { status: 201 }
    );
  } catch (error) {
    console.error("FAQ POST failed:", error);
    return NextResponse.json(
      { error: "Failed to add FAQ" },
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
    const { id, question, answer, sort_order } = body;

    if (!id || !question || !answer) {
      return NextResponse.json(
        { error: "ID, Question, and Answer are required" },
        { status: 400 }
      );
    }

    const { rows } = await sql`
      UPDATE faq
      SET
        question = ${question},
        answer = ${answer},
        sort_order = ${sort_order || 0}
      WHERE id = ${id}
      RETURNING *;
    `;

    return NextResponse.json(
      { message: "FAQ updated", faq: rows[0] },
      { status: 200 }
    );
  } catch (error) {
    console.error("FAQ PUT failed:", error);
    return NextResponse.json(
      { error: "Failed to update FAQ" },
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
        { error: "FAQ ID is required for deletion" },
        { status: 400 }
      );
    }

    await sql`DELETE FROM faq WHERE id = ${id};`;
    return NextResponse.json({ message: "FAQ deleted" }, { status: 200 });
  } catch (error) {
    console.error("FAQ DELETE failed:", error);
    return NextResponse.json(
      { error: "Failed to delete FAQ" },
      { status: 500 }
    );
  }
}
