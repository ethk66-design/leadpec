"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea"; // Ensure this exists, or use standard textarea
import { createPost, updatePost } from "@/lib/actions/blog-actions";
import { Loader2 } from "lucide-react";
import { Post } from "@prisma/client";
import { ImageUpload } from "@/components/ui/image-upload";

const formSchema = z.object({
    title: z.string().min(2, "Title is required").max(100, "Title is too long (max 100 chars)"),
    slug: z.string().min(2, "Slug is required").regex(/^[a-z0-9-]+$/, "Slug must be lowercase alphanumeric with hyphens"),
    content: z.string().min(10, "Content is too short"),
    image: z.string().optional(),
    author: z.string().min(2, "Author is required").max(50, "Author name is too long"),
    published: z.boolean().optional(),
});

interface PostFormProps {
    initialData?: Post;
}

export function PostForm({ initialData }: PostFormProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData ? {
            title: initialData.title,
            slug: initialData.slug,
            content: initialData.content,
            image: initialData.image || "",
            author: initialData.author,
            published: initialData.published,
        } : {
            title: "",
            slug: "",
            content: "",
            image: "",
            author: "LEADPEC Team",
            published: false,
        },
    });

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        setLoading(true);
        setError("");

        try {
            if (initialData) {
                const res = await updatePost(initialData.id, { ...values, published: values.published || false });
                if (!res.success) throw new Error(res.error || "Failed to update");
            } else {
                const res = await createPost({ ...values, published: values.published || false });
                if (!res.success) throw new Error(res.error || "Failed to create");
            }
            router.push("/admin/posts");
            router.refresh();
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    // Auto-generate slug from title if slug is empty
    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const title = e.target.value;
        form.setValue("title", title);
        if (!initialData && !form.getValues("slug")) {
            const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");
            form.setValue("slug", slug);
        }
    };

    return (
        <div className="max-w-2xl">
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

                {/* Title */}
                <div className="space-y-2">
                    <label className="text-sm font-medium">Title</label>
                    <Input
                        {...form.register("title")}
                        placeholder="e.g. The Future of Industrial Maintenance"
                        onChange={(e) => {
                            form.register("title").onChange(e);
                            handleTitleChange(e);
                            handleTitleChange(e);
                        }}
                    />
                    <div className="flex justify-between text-xs text-gray-400">
                        <span>Min 2, Max 100 characters</span>
                        <span className={form.watch("title")?.length > 100 ? "text-red-500" : ""}>
                            {form.watch("title")?.length || 0}/100
                        </span>
                    </div>
                    {form.formState.errors.title && (
                        <p className="text-sm text-red-500">{form.formState.errors.title.message}</p>
                    )}
                </div>

                {/* Slug */}
                <div className="space-y-2">
                    <label className="text-sm font-medium">Slug (URL)</label>
                    <Input {...form.register("slug")} placeholder="the-future-of-industrial-maintenance" />
                    <p className="text-xs text-gray-400">Unique identifier for the URL.</p>
                    {form.formState.errors.slug && (
                        <p className="text-sm text-red-500">{form.formState.errors.slug.message}</p>
                    )}
                </div>



                {/* Image URL */}
                <div className="space-y-2">
                    <ImageUpload
                        label="Cover Image"
                        value={form.watch("image") || ""}
                        onChange={(url) => form.setValue("image", url)}
                        description="Upload a cover image for the blog post (Recommended: 1200x600px)"
                    />
                </div>

                {/* Author */}
                <div className="space-y-2">
                    <label className="text-sm font-medium">Author</label>
                    <Input {...form.register("author")} placeholder="LEADPEC Team" />
                </div>

                {/* Content */}
                <div className="space-y-2">
                    <label className="text-sm font-medium">Content (HTML Supported)</label>
                    <textarea
                        {...form.register("content")}
                        className="flex min-h-[300px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        placeholder="<p>Write your article here...</p>"
                    />
                    <p className="text-xs text-gray-400">You can use basic HTML tags for formatting.</p>
                    {form.formState.errors.content && (
                        <p className="text-sm text-red-500">{form.formState.errors.content.message}</p>
                    )}
                </div>

                {/* Published Status */}
                <div className="flex items-center space-x-2 border p-4 rounded-md">
                    <input
                        type="checkbox"
                        {...form.register("published")}
                        id="published"
                        className="h-4 w-4 rounded border-gray-300 text-[#004e92] focus:ring-[#004e92]"
                    />
                    <label htmlFor="published" className="text-sm font-medium cursor-pointer">
                        Publish Immediately
                    </label>
                </div>

                {error && (
                    <div className="bg-red-50 text-red-600 p-3 rounded-md text-sm">
                        {error}
                    </div>
                )}

                <div className="flex gap-4">
                    <Button type="button" variant="outline" onClick={() => router.back()}>
                        Cancel
                    </Button>
                    <Button type="submit" disabled={loading} className="bg-[#004e92] hover:bg-[#003d73]">
                        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        {initialData ? "Save Changes" : "Create Post"}
                    </Button>
                </div>

            </form>
        </div>
    );
}
