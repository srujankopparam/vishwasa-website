import { put } from "@vercel/blob";
import { NextResponse } from "next/server";

function isAuthenticated(request: Request) {
  const authHeader = request.headers.get("authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) return false;
  return authHeader.split(" ")[1] === process.env.ADMIN_PASSWORD;
}

export async function POST(request: Request) {
  if (!isAuthenticated(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;
    if (!file) {
      return NextResponse.json(
        { error: "No file provided" },
        { status: 400 }
      );
    }

    if (!file.type.startsWith("image/")) {
      return NextResponse.json(
        { error: "Only image files are allowed" },
        { status: 400 }
      );
    }

    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json(
        { error: "File must be under 5MB" },
        { status: 400 }
      );
    }

    try {
      // Check if BLOB token exists, if not bypass to fallback immediately
      if (!process.env.BLOB_READ_WRITE_TOKEN) {
        console.warn("BLOB_READ_WRITE_TOKEN is missing. Falling back to base64.");
        throw new Error("BLOB_READ_WRITE_TOKEN is missing");
      }
      
      const blob = await put(file.name, file, { access: "public" });
      return NextResponse.json({ url: blob.url });
    } catch (blobError: any) {
      console.warn("Vercel Blob failed, falling back to base64 encoding", blobError);
      
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      const base64 = `data:${file.type};base64,${buffer.toString("base64")}`;
      
      return NextResponse.json({ url: base64, warning: "Fell back to base64" });
    }
  } catch (error: any) {
    console.error("Upload failed:", error);
    return NextResponse.json(
      { error: error?.message || "Image upload failed" },
      { status: 500 }
    );
  }
}
