import { getAllPosts, deletePost } from "@/lib/actions/blog-actions";
import Link from "next/link";

import { Plus, Pencil, Trash2, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";

// Fallback formatter
const formatDate = (date: Date) => {
    try {
        return new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: 'numeric' }).format(date);
    } catch {
        return date.toDateString();
    }
}

export const dynamic = 'force-dynamic';

export default async function AdminPostsPage() {
    const posts = await getAllPosts();

    return (
        <div className="flex-1 space-y-4 p-8 pt-6">
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold tracking-tight">Blog Posts ({posts.length})</h2>
                <Link href="/admin/posts/new">
                    <Button className="bg-[#004e92] hover:bg-[#003d73]">
                        <Plus className="mr-2 h-4 w-4" /> Create New
                    </Button>
                </Link>
            </div>

            <div className="rounded-md border bg-white">
                <div className="relative w-full overflow-auto">
                    <table className="w-full caption-bottom text-sm text-left">
                        <thead className="[&_tr]:border-b">
                            <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                                <th className="h-12 px-4 align-middle font-medium text-muted-foreground">Title</th>
                                <th className="h-12 px-4 align-middle font-medium text-muted-foreground">Status</th>
                                <th className="h-12 px-4 align-middle font-medium text-muted-foreground">Author</th>
                                <th className="h-12 px-4 align-middle font-medium text-muted-foreground">Date</th>
                                <th className="h-12 px-4 align-middle font-medium text-muted-foreground text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="[&_tr:last-child]:border-0">
                            {posts.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="h-24 text-center text-muted-foreground">
                                        No posts found.
                                    </td>
                                </tr>
                            ) : (
                                posts.map((post) => (
                                    <tr key={post.id} className="border-b transition-colors hover:bg-muted/50">
                                        <td className="p-4 align-middle font-medium">{post.title}</td>
                                        <td className="p-4 align-middle">
                                            <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${post.published
                                                ? "bg-green-100 text-green-800"
                                                : "bg-yellow-100 text-yellow-800"
                                                }`}>
                                                {post.published ? (
                                                    <><Eye className="w-3 h-3 mr-1" /> Published</>
                                                ) : (
                                                    <><EyeOff className="w-3 h-3 mr-1" /> Draft</>
                                                )}
                                            </span>
                                        </td>
                                        <td className="p-4 align-middle">{post.author}</td>
                                        <td className="p-4 align-middle">{formatDate(new Date(post.createdAt))}</td>
                                        <td className="p-4 align-middle text-right gap-2">
                                            <Link href={`/admin/posts/${post.id}`}>
                                                <Button variant="ghost" size="icon" className="h-8 w-8 text-blue-600">
                                                    <Pencil className="h-4 w-4" />
                                                </Button>
                                            </Link>
                                            <form action={async () => {
                                                "use server";
                                                await deletePost(post.id);
                                            }} className="inline-block">
                                                <Button variant="ghost" size="icon" className="h-8 w-8 text-red-600">
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </form>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
