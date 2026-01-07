'use server';

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { requireAuth } from "@/lib/auth-utils";

const PostSchema = z.object({
    title: z.string().min(1, "Title is required"),
    slug: z.string().min(1, "Slug is required")
        .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug must be lowercase and hyphenated"),
    content: z.string().min(10, "Content is required"),
    // Image is optional for now, we'll handle uploads later or use URLs
    image: z.string().optional(),
    author: z.string().default("LEADPEC Team"),
});

export async function createPost(formData: FormData) {
    try {
        await requireAuth();
    } catch {
        return { error: "Unauthorized" };
    }

    const validatedFields = PostSchema.safeParse({
        title: formData.get("title"),
        slug: formData.get("slug"),
        content: formData.get("content"),
        image: formData.get("image"),
        author: formData.get("author") || "LEADPEC Team",
    });

    if (!validatedFields.success) {
        return { error: "Invalid fields: " + validatedFields.error.message };
    }

    if (!prisma) return { error: "Database not available" };
    try {
        await prisma.post.create({
            data: {
                ...validatedFields.data,
                published: true, // Default to published for simplicity
                image: validatedFields.data.image || "/images/blog/default.jpg",
            },
        });
    } catch (error) {
        return { error: "Failed to create post. Slug might be duplicate." };
    }

    revalidatePath("/admin/content");
    revalidatePath("/"); // Update homepage
    redirect("/admin/content");
}

export async function updatePost(id: string, formData: FormData) {
    try {
        await requireAuth();
    } catch {
        return { error: "Unauthorized" };
    }

    const validatedFields = PostSchema.safeParse({
        title: formData.get("title"),
        slug: formData.get("slug"),
        content: formData.get("content"),
        image: formData.get("image"),
        author: formData.get("author"),
    });

    if (!validatedFields.success) {
        return { error: "Invalid fields" };
    }

    if (!prisma) return { error: "Database not available" };
    try {
        await prisma.post.update({
            where: { id },
            data: {
                ...validatedFields.data,
                image: validatedFields.data.image || "/images/blog/default.jpg",
            },
        });
    } catch (error) {
        return { error: "Failed to update post" };
    }

    revalidatePath("/admin/content");
    revalidatePath("/");
    redirect("/admin/content");
}

export async function deletePost(id: string) {
    if (!prisma) return { error: "Database not available" };
    try {
        await requireAuth();
        await prisma.post.delete({
            where: { id },
        });
        revalidatePath("/admin/content");
        revalidatePath("/");
    } catch (error) {
        return { error: "Failed to delete post" };
    }
}
