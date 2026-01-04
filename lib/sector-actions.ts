'use server';

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const SectorSchema = z.object({
    title: z.string().min(1, "Title is required"),
    slug: z.string().min(1, "Slug is required"),
    description: z.string().min(1, "Description is required"),
    content: z.string().min(1, "Content is required"),
    heroImage: z.string().optional(),
    middleImage: z.string().optional(),
    bottomImage: z.string().optional(),
    iconName: z.string().optional(),
    branding: z.string().optional(),
    process: z.string().optional(),
});

export async function updateSector(id: string, formData: FormData) {
    const validatedFields = SectorSchema.safeParse({
        title: formData.get("title"),
        slug: formData.get("slug"),
        description: formData.get("description"),
        content: formData.get("content"),
        heroImage: formData.get("heroImage") || undefined,
        middleImage: formData.get("middleImage") || undefined,
        bottomImage: formData.get("bottomImage") || undefined,
        iconName: formData.get("iconName") || undefined,
        branding: formData.get("branding") || undefined,
        process: formData.get("process") || undefined,
    });

    if (!validatedFields.success) {
        console.error(validatedFields.error);
        return { error: "Invalid fields. Please check your inputs." };
    }

    const { title, slug, description, content, heroImage, middleImage, bottomImage, iconName, branding, process } = validatedFields.data;

    if (!prisma) return { error: "Database not available" };
    try {
        await prisma.sector.update({
            where: { id },
            data: {
                title,
                slug,
                description,
                content,
                heroImage: heroImage || null,
                middleImage: middleImage || null,
                bottomImage: bottomImage || null,
                iconName: iconName || null,
                branding: branding || null,
                process: process || null,
            },
        });
        revalidatePath("/admin/sectors");
        revalidatePath(`/sectors/${slug}`);
        revalidatePath("/services");
        return { success: "Sector updated successfully!" };
    } catch (error) {
        console.error(error);
        return { error: "Failed to update sector." };
    }
}

export async function createSector(formData: FormData) {
    const validatedFields = SectorSchema.safeParse({
        title: formData.get("title"),
        slug: formData.get("slug"),
        description: formData.get("description"),
        content: formData.get("content"),
        heroImage: formData.get("heroImage") || undefined,
        middleImage: formData.get("middleImage") || undefined,
        bottomImage: formData.get("bottomImage") || undefined,
        iconName: formData.get("iconName") || undefined,
        branding: formData.get("branding") || undefined,
        process: formData.get("process") || undefined,
    });

    if (!validatedFields.success) {
        console.error(validatedFields.error);
        return { error: "Invalid fields. Please check your inputs." };
    }

    const { title, slug, description, content, heroImage, middleImage, bottomImage, iconName, branding, process } = validatedFields.data;

    if (!prisma) return { error: "Database not available" };
    try {
        await prisma.sector.create({
            data: {
                title,
                slug,
                description,
                content,
                heroImage: heroImage || null,
                middleImage: middleImage || null,
                bottomImage: bottomImage || null,
                iconName: iconName || null,
                branding: branding || null,
                process: process || null,
            },
        });
        revalidatePath("/admin/sectors");
        revalidatePath("/services"); // Revalidate Services page too
        return { success: "Sector created successfully!" };
    } catch (error) {
        console.error(error);
        return { error: "Failed to create sector." };
    }
}

export async function deleteSector(id: string) {
    if (!prisma) return { error: "Database not available" };
    try {
        await prisma.sector.delete({
            where: { id }
        });
        revalidatePath("/admin/sectors");
        revalidatePath("/services");
        return { success: "Sector deleted successfully!" };
    } catch (error) {
        console.error(error);
        return { error: "Failed to delete sector." };
    }
}
