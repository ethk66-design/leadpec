import { PostForm } from "@/components/admin/post-form";

export default function AdminNewPostPage() {
    return (
        <div className="flex-1 space-y-4 p-8 pt-6">
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold tracking-tight">Create New Post</h2>
            </div>
            <div className="bg-white p-6 rounded-lg border shadow-sm">
                <PostForm />
            </div>
        </div>
    );
}
