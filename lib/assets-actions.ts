'use server';

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { deleteOldBlob } from "@/lib/blob-utils";

export async function getSiteAssets() {
    if (!prisma) return [];
    try {
        const assets = await prisma.siteAsset.findMany({
            orderBy: { key: 'asc' }
        });
        return assets;
    } catch (error) {
        console.error("Failed to fetch site assets:", error);
        return [];
    }
}

export async function updateSiteAsset(key: string, url: string) {
    if (!prisma) return { error: "Database not available" };
    try {
        // Get existing asset to delete old blob
        const existing = await prisma.siteAsset.findUnique({ where: { key } });

        // If URL is changing, delete the old blob
        if (existing?.url && existing.url !== url) {
            await deleteOldBlob(existing.url);
        }

        await prisma.siteAsset.update({
            where: { key },
            data: { url }
        });

        revalidatePath("/"); // Revalidate everywhere as assets could be global
        return { success: "Asset updated successfully!" };
    } catch (error) {
        console.error(`Failed to update asset ${key}:`, error);
        return { error: "Failed to update asset." };
    }
}
