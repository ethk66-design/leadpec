"use client";

import { motion } from "framer-motion";
import { User, Clock, MessageSquare } from "lucide-react";
import Link from "next/link";
import { Post } from "@prisma/client";

interface BlogPreviewProps {
    posts: Post[];
}

export function BlogPreview({ posts }: BlogPreviewProps) {
    if (!posts || posts.length === 0) {
        return null; // Or return a "Coming Soon" section
    }

    return (
        <section className="py-12 md:py-16 bg-white">
            <div className="container px-4">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12">
                    <div>
                        <h2 className="text-sm font-bold text-[#00E5FF] uppercase tracking-wider mb-2">Stay Updated</h2>
                        <h3 className="text-4xl md:text-5xl font-bold font-heading text-[#0B1B32]">
                            Latest Blog
                        </h3>
                    </div>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {posts.map((post, index) => (
                        <motion.div
                            key={post.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="group flex flex-col h-full"
                        >
                            {/* Image Placeholder */}
                            <div className="aspect-[4/3] bg-gray-100 overflow-hidden rounded-sm relative mb-6">
                                <div className="absolute inset-0 bg-gradient-to-t from-[#0B1B32]/10 to-transparent" />
                                {/* Since we don't have real images yet, use a stylish placeholder or the image URL if valid */}
                                <div className="w-full h-full bg-[#0B1B32]/5 flex items-center justify-center text-gray-300 group-hover:bg-[#0B1B32]/10 transition-colors">
                                    <span className="font-heading font-bold text-4xl opacity-10">BLOG</span>
                                </div>
                            </div>

                            {/* Meta Info */}
                            <div className="flex items-center gap-4 text-xs text-gray-500 mb-3 font-medium">
                                <span className="flex items-center gap-1">
                                    <User className="w-3 h-3 text-[#0B1B32]" /> {post.author}
                                </span>
                                <span className="flex items-center gap-1">
                                    <Clock className="w-3 h-3 text-[#0B1B32]" /> {new Date(post.createdAt).toLocaleDateString()}
                                </span>
                            </div>

                            {/* Title */}
                            <Link href={`/blog/${post.slug}`} className="block mb-4 flex-1">
                                <h4 className="text-xl font-bold text-[#0B1B32] group-hover:text-[#008CBA] transition-colors leading-tight line-clamp-3">
                                    {post.title}
                                </h4>
                            </Link>

                            {/* Footer */}
                            <div className="flex justify-end pt-4 border-t border-gray-100 mt-auto">
                                <span className="flex items-center gap-1 text-xs text-[#008CBA] font-bold">
                                    <MessageSquare className="w-3 h-3" /> 0 Comments
                                </span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
