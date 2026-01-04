import { prisma } from "@/lib/db";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Plus } from "lucide-react";
import { PostsTable } from "./posts-table";

export const dynamic = 'force-dynamic';

export default async function ContentPage() {
    let posts: any[] = [];
    if (prisma) {
        posts = await prisma.post.findMany({
            orderBy: {
                createdAt: "desc"
            }
        });
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Content Hub</h2>
                    <p className="text-muted-foreground">Manage your blog posts and articles.</p>
                </div>
                <Button asChild className="bg-[#008CBA] hover:bg-[#007ba3]">
                    <Link href="/admin/content/new">
                        <Plus className="mr-2 h-4 w-4" /> New Article
                    </Link>
                </Button>
            </div>

            <PostsTable initialPosts={posts} />
        </div>
    );
}
