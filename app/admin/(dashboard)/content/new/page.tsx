import { PostForm } from "@/components/admin/post-form";

export default function NewPostPage() {
    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">Write New Article</h2>
                <p className="text-muted-foreground">Share your insights with the world.</p>
            </div>
            <PostForm />
        </div>
    );
}
