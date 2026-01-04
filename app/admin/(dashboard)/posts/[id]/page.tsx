import { PostForm } from "@/components/admin/post-form";
import { prisma as db } from "@/lib/db";
import { notFound } from "next/navigation";

export const dynamic = 'force-dynamic';

export default async function AdminEditPostPage({ params }: { params: { id: string } }) {
    if (!db) {
        notFound();
    }

    const post = await db.post.findUnique({
        where: { id: params.id },
    });

    if (!post) {
        notFound();
    }

    return (
        <div className="flex-1 space-y-4 p-8 pt-6">
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold tracking-tight">Edit Post</h2>
            </div>
            <div className="bg-white p-6 rounded-lg border shadow-sm">
                <PostForm initialData={post} />
            </div>
        </div>
    );
}
