"use client";

import { useState } from "react";
import Image from "next/image";
import { Calendar, User, ArrowRight, X, Share2, Newspaper } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger, DialogClose } from "@/components/ui/dialog";
import DOMPurify from "isomorphic-dompurify";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Post {
    id: string;
    title: string;
    slug: string;
    content: string;
    image: string | null;
    author: string;
    createdAt: Date;
}

interface BlogGridProps {
    posts: Post[];
}

const formatDate = (date: Date) => {
    try {
        return new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'long', day: 'numeric' }).format(new Date(date));
    } catch (e) {
        return new Date(date).toDateString();
    }
};

export function BlogGrid({ posts }: BlogGridProps) {
    const [selectedPost, setSelectedPost] = useState<Post | null>(null);

    // If no posts, show empty state (handled in parent or here)
    if (posts.length === 0) {
        return (
            <div className="text-center py-20 bg-white rounded-3xl shadow-sm border border-gray-100">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Newspaper className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">No Articles Yet</h3>
                <p className="text-gray-500">Check back soon for the latest industry updates.</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
                <div key={post.id}>
                    <Dialog>
                        <DialogTrigger asChild>
                            <div
                                className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col h-full cursor-pointer"
                                onClick={() => setSelectedPost(post)}
                            >
                                <div className="relative h-56 w-full bg-gray-200 overflow-hidden">
                                    {post.image ? (
                                        <Image
                                            src={post.image}
                                            alt={post.title}
                                            fill
                                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center bg-[#0B1B32]/5">
                                            <Newspaper className="w-10 h-10 text-gray-300" />
                                        </div>
                                    )}
                                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-[#004E8F] flex items-center gap-1.5 shadow-sm">
                                        <Calendar className="w-3 h-3" />
                                        {formatDate(post.createdAt)}
                                    </div>
                                </div>

                                <div className="p-6 flex flex-col flex-1">
                                    <h2 className="text-xl font-bold text-[#0B1B32] mb-3 line-clamp-2 group-hover:text-[#008CBA] transition-colors font-heading">
                                        {post.title}
                                    </h2>

                                    {/* Simple text extraction for preview */}
                                    <p className="text-gray-600 mb-6 line-clamp-3 text-sm leading-relaxed flex-1">
                                        {post.content.replace(/<[^>]*>?/gm, '').substring(0, 150)}...
                                    </p>

                                    <div className="flex items-center justify-between pt-4 border-t border-gray-100 mt-auto">
                                        <div className="flex items-center gap-2 text-xs text-gray-500 font-medium">
                                            <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-gray-400">
                                                <User className="w-3 h-3" />
                                            </div>
                                            {post.author}
                                        </div>
                                        <span className="text-[#008CBA] text-sm font-bold flex items-center gap-1 group-hover:gap-2 transition-all">
                                            Read More <ArrowRight className="w-4 h-4" />
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </DialogTrigger>

                        {/* Full Post Modal */}
                        <DialogContent className="max-w-4xl w-[95vw] h-[90vh] p-0 overflow-hidden bg-white border-none rounded-2xl flex flex-col z-[100]">
                            <div className="absolute right-4 top-4 z-[110] bg-white/50 backdrop-blur-sm rounded-full p-1">
                                <DialogClose asChild>
                                    <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full hover:bg-white/80">
                                        <X className="w-4 h-4" />
                                    </Button>
                                </DialogClose>
                            </div>

                            <ScrollArea className="h-full w-full">
                                <div className="flex flex-col">
                                    {/* Hero Image within Modal */}
                                    <div className="relative w-full h-[300px] md:h-[400px] bg-gray-100 shrink-0">
                                        {post.image ? (
                                            <Image
                                                src={post.image}
                                                alt={post.title}
                                                fill
                                                className="object-cover"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center bg-[#0B1B32]/10">
                                                <Newspaper className="w-16 h-16 text-gray-300" />
                                            </div>
                                        )}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                                        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 text-white">
                                            <div className="flex items-center gap-4 text-xs md:text-sm font-bold uppercase tracking-wider mb-3 opacity-90">
                                                <span className="flex items-center gap-2 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
                                                    <Calendar className="w-4 h-4" /> {formatDate(post.createdAt)}
                                                </span>
                                                <span className="flex items-center gap-2">
                                                    <User className="w-4 h-4" /> {post.author}
                                                </span>
                                            </div>
                                            <h2 className="text-2xl md:text-4xl font-bold leading-tight font-heading shadow-black drop-shadow-lg">
                                                {post.title}
                                            </h2>
                                        </div>
                                    </div>

                                    {/* Content Body */}
                                    <div className="max-w-3xl mx-auto w-full px-6 py-10 md:py-12">
                                        <div
                                            className="prose prose-lg prose-slate max-w-none 
                                            prose-headings:font-heading prose-headings:font-bold prose-headings:text-[#0B1B32]
                                            prose-a:text-[#008CBA] prose-a:no-underline hover:prose-a:underline
                                            prose-img:rounded-2xl prose-img:shadow-lg
                                            prose-p:text-gray-600 prose-p:leading-relaxed
                                            "
                                            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.content) }}
                                        />

                                        <div className="mt-12 pt-8 border-t border-gray-100 flex items-center justify-between bg-gray-50 -mx-6 px-6 -mb-10 py-6">
                                            <div className="text-gray-500 text-sm font-medium">
                                                Thanks for reading!
                                            </div>
                                            <div className="flex gap-2">
                                                <DialogClose asChild>
                                                    <Button variant="outline">Close Article</Button>
                                                </DialogClose>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </ScrollArea>
                        </DialogContent>
                    </Dialog>
                </div>
            ))}
        </div>
    );
}
