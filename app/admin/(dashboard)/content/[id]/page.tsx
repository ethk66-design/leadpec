import { prisma } from "@/lib/db";
import { PostForm } from "@/components/admin/post-form";
import { notFound } from "next/navigation";

interface EditPostPageProps {
    params: {
        id: string;
    };
}

export const dynamic = 'force-dynamic';

export default async function EditPostPage({ params }: EditPostPageProps) {
    if (!prisma) {
        notFound();
    }

    const post = await prisma.post.findUnique({
        where: { id: params.id }
    });

    if (!post) {
        notFound();
    }

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">Edit Article</h2>
                <p className="text-muted-foreground">{post.title}</p>
            </div>
            <PostForm initialData={post} />
        </div>
    );
}
