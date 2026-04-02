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
      if (!process.env.BLOB_READ_WRITE_TOKEN) {
        return NextResponse.json(
          {
            error:
              "Image hosting is not configured. Please add BLOB_READ_WRITE_TOKEN to your Vercel environment variables, or upload your image to imgbb.com and paste the direct link into the Image URL field in the product form.",
          },
          { status: 503 }
        );
      }
      const blob = await put(file.name, file, { access: "public" });
      return NextResponse.json({ url: blob.url });
    } catch (blobError: any) {
      console.error("Vercel Blob upload failed:", blobError);
      return NextResponse.json(
        {
          error:
            "Image upload failed. Please try again, or upload your image to imgbb.com and paste the direct link into the Image URL field instead.",
        },
        { status: 500 }
      );
    }
  } catch (error: any) {
    console.error("Upload failed:", error);
    return NextResponse.json(
      { error: error?.message || "Image upload failed" },
      { status: 500 }
    );
  }
}
