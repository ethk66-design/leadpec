import { NextRequest, NextResponse } from "next/server";
import { put } from "@vercel/blob";

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();
        const file = formData.get("file") as File | null;

        if (!file) {
            return NextResponse.json({ error: "No file provided" }, { status: 400 });
        }

        // Validate file type
        const validTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];
        if (!validTypes.includes(file.type)) {
            return NextResponse.json({ error: "Invalid file type. Use JPG, PNG, WEBP, or GIF." }, { status: 400 });
        }

        // Validate file size (max 5MB)
        const maxSize = 5 * 1024 * 1024;
        if (file.size > maxSize) {
            return NextResponse.json({ error: "File too large. Max 5MB." }, { status: 400 });
        }

        // Create unique filename
        const timestamp = Date.now();
        const originalName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_");
        const filename = `uploads/${timestamp}-${originalName}`;

        // Upload to Vercel Blob
        const blob = await put(filename, file, {
            access: "public",
        });

        return NextResponse.json({ url: blob.url, success: true });
    } catch (error) {
        console.error("Upload error:", error);
        return NextResponse.json({ error: "Upload failed. Check BLOB_READ_WRITE_TOKEN in environment." }, { status: 500 });
    }
}
