'use server';

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function getSiteSetting(key: string) {
    if (!prisma) return null;
    try {
        const setting = await prisma.siteSetting.findUnique({
            where: { key }
        });
        return setting?.value || null;
    } catch (error) {
        console.error(`Failed to fetch setting ${key}:`, error);
        return null;
    }
}

export async function updateSiteSetting(key: string, value: string) {
    if (!prisma) return { error: "Database not available" };
    try {
        await prisma.siteSetting.upsert({
            where: { key },
            update: { value },
            create: { key, value }
        });

        revalidatePath("/"); // Revalidate almost everything since settings like footer are global
        revalidatePath("/admin/settings");
        return { success: "Setting updated successfully!" };
    } catch (error) {
        console.error(`Failed to update setting ${key}:`, error);
        return { error: "Failed to update setting." };
    }
}

export async function getSocialLinks() {
    if (!prisma) {
        return {
            linkedin: "https://linkedin.com",
            facebook: "https://facebook.com",
            instagram: "https://instagram.com",
        };
    }
    try {
        const settings = await prisma.siteSetting.findMany({
            where: {
                key: { in: ["social_linkedin", "social_facebook", "social_instagram"] }
            }
        });

        const map: Record<string, string> = {};
        settings.forEach(s => { map[s.key] = s.value; });

        return {
            linkedin: map["social_linkedin"] || "https://linkedin.com",
            facebook: map["social_facebook"] || "https://facebook.com",
            instagram: map["social_instagram"] || "https://instagram.com",
        };
    } catch (error) {
        console.error("Failed to fetch social links:", error);
        return {
            linkedin: "https://linkedin.com",
            facebook: "https://facebook.com",
            instagram: "https://instagram.com",
        };
    }
}
