"use server";

import { prisma as db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function getPublishedPosts() {
    if (!db) return [];
    try {
        const posts = await db.post.findMany({
            where: { published: true },
            orderBy: { createdAt: "desc" },
        });
        return posts;
    } catch (error) {
        console.error("Error fetching published posts:", error);
        return [];
    }
}

export async function getPostBySlug(slug: string) {
    if (!db) return null;
    try {
        const post = await db.post.findUnique({
            where: { slug },
        });
        return post;
    } catch (error) {
        console.error("Error fetching post by slug:", error);
        return null;
    }
}

export async function getAllPosts() {
    if (!db) return [];
    try {
        const posts = await db.post.findMany({
            orderBy: { createdAt: "desc" },
        });
        return posts;
    } catch (error) {
        console.error("Error fetching all posts:", error);
        return [];
    }
}

export async function createPost(data: {
    title: string;
    slug: string;
    content: string;
    image?: string;
    published?: boolean;
    author?: string;
}) {
    if (!db) return { success: false, error: "Database not available" };
    try {
        const post = await db.post.create({
            data: {
                ...data,
                published: data.published || false,
                author: data.author || "LEADPEC Team",
            },
        });
        revalidatePath("/blog");
        revalidatePath("/admin/posts");
        return { success: true, post };
    } catch (error) {
        console.error("Error creating post:", error);
        return { success: false, error: "Failed to create post" };
    }
}

export async function updatePost(
    id: string,
    data: {
        title?: string;
        slug?: string;
        content?: string;
        image?: string;
        published?: boolean;
        author?: string;
    }
) {
    if (!db) return { success: false, error: "Database not available" };
    try {
        const post = await db.post.update({
            where: { id },
            data,
        });
        revalidatePath("/blog");
        revalidatePath(`/blog/${post.slug}`);
        revalidatePath("/admin/posts");
        return { success: true, post };
    } catch (error) {
        console.error("Error updating post:", error);
        return { success: false, error: "Failed to update post" };
    }
}

export async function deletePost(id: string) {
    if (!db) return { success: false, error: "Database not available" };
    try {
        await db.post.delete({
            where: { id },
        });
        revalidatePath("/blog");
        revalidatePath("/admin/posts");
        return { success: true };
    } catch (error) {
        console.error("Error deleting post:", error);
        return { success: false, error: "Failed to delete post" };
    }
}
