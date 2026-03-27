import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

function isAuthenticated(request: Request) {
  const authHeader = request.headers.get("authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) return false;
  const token = authHeader.split(" ")[1];
  return token === process.env.ADMIN_PASSWORD;
}

export async function GET() {
  try {
    const { rows } = await sql`SELECT key, value FROM website_settings;`;

    const settings = rows.reduce((acc, row) => {
      acc[row.key] = row.value;
      return acc;
    }, {} as Record<string, string>);

    return NextResponse.json(settings);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("Settings GET failed:", error);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  if (!isAuthenticated(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { settings } = body;

    if (!settings || typeof settings !== "object") {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }

    for (const [key, value] of Object.entries(settings)) {
      if (typeof value === "string") {
        try {
          await sql`
            INSERT INTO website_settings (key, value)
            VALUES (${key}, ${value})
            ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value;
          `;
        } catch (keyError) {
          console.error(`Failed to save setting key "${key}":`, keyError);
          return NextResponse.json(
            { error: `Failed to save key: ${key}` },
            { status: 500 }
          );
        }
      }
    }

    return NextResponse.json({ message: "Settings updated successfully" });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("Settings POST failed:", error);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
