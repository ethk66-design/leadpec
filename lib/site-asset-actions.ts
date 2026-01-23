"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { requireAuth } from "@/lib/auth-utils";
import { deleteOldBlob } from "@/lib/blob-utils";

export async function upsertSiteAsset(key: string, url: string, section: string, description?: string) {
    if (!prisma) return { error: "Database not available" };

    try {
        await requireAuth();
    } catch (e) {
        return { error: "Unauthorized" };
    }

    try {
        // Get existing asset to check if we need to delete old blob
        const existing = await prisma.siteAsset.findUnique({ where: { key } });

        // If URL is changing and old URL exists, delete the old blob
        if (existing?.url && existing.url !== url) {
            await deleteOldBlob(existing.url);
        }

        await prisma.siteAsset.upsert({
            where: { key },
            update: { url, section, description },
            create: { key, url, section, description: description || "" }
        });

        revalidatePath("/sectors");
        revalidatePath("/admin/sectors");
        revalidatePath("/about");
        revalidatePath("/");

        return { success: true };
    } catch (error) {
        console.error("Error updating site asset:", error);
        return { error: "Failed to update asset" };
    }
}

export async function getSiteAssets(keys: string[]) {
    if (!prisma) return [];
    try {
        const assets = await prisma.siteAsset.findMany({
            where: {
                key: { in: keys }
            }
        });
        return assets;
    } catch (error) {
        console.error("Error fetching site assets:", error);
        return [];
    }
}
