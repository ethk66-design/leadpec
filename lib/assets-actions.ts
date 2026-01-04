'use server';

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";

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
