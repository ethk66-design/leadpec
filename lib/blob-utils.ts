"use server";

import { del } from "@vercel/blob";

/**
 * Deletes an old blob from Vercel Blob storage when replacing an image.
 * Only deletes if the URL is a Vercel Blob URL (not external URLs).
 * Fails silently to not block new uploads.
 */
export async function deleteOldBlob(oldUrl: string | undefined | null): Promise<void> {
    if (!oldUrl) return;

    // Only delete if it's a Vercel Blob URL
    if (oldUrl.includes(".public.blob.vercel-storage.com")) {
        try {
            await del(oldUrl);
            console.log("✅ Deleted old blob:", oldUrl);
        } catch (error) {
            // Log but don't throw - deletion failure shouldn't block new upload
            console.error("⚠️ Failed to delete old blob:", error);
        }
    }
}
