import { getPublishedPosts } from "@/lib/actions/blog-actions";
import Link from "next/link";
import Image from "next/image";

import { Calendar, User, ArrowRight, Newspaper } from "lucide-react";
import { CTASection } from "@/components/sections/cta";

// Fallback date formatter if date-fns fails
const formatDate = (date: Date) => {
    try {
        return new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'long', day: 'numeric' }).format(date);
    } catch (e) {
        return date.toDateString();
    }
}

export const revalidate = 0; // Ensure fresh data on every request

export const dynamic = 'force-dynamic';

export default async function BlogPage() {
    const posts = await getPublishedPosts();

    return (
        <main className="flex-1 bg-gray-50">
            {/* Hero Section */}
            <section className="relative h-[400px] flex items-center justify-center overflow-hidden bg-[#0B1B32]">
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-[#0B1B32]/90 z-10" />
                    <Image
                        src="/images/blog-hero-placeholder.png" // We might need to generate this or use a generic industry one
                        alt="Blog Background"
                        fill
                        className="object-cover opacity-40"
                    />
                </div>
                <div className="container relative z-20 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 font-heading tracking-wide">
                        LATEST <span className="text-[#008CBA]">INSIGHTS</span>
                    </h1>
                    <p className="text-xl text-gray-300 max-w-2xl mx-auto font-light">
                        Expert perspectives on recruitment, industrial trends, and workforce solutions.
                    </p>
                </div>
            </section>

            {/* Blog Grid */}
            <section className="py-20">
                <div className="container px-4">
                    {posts.length === 0 ? (
                        <div className="text-center py-20 bg-white rounded-3xl shadow-sm border border-gray-100">
                            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Newspaper className="w-8 h-8 text-gray-400" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-800 mb-2">No Articles Yet</h3>
                            <p className="text-gray-500">Check back soon for the latest industry updates.</p>
                        </div>
                    ) : (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {posts.map((post) => (
                                <Link
                                    key={post.id}
                                    href={`/blog/${post.slug}`}
                                    className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col h-full"
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
                                            {formatDate(new Date(post.createdAt))}
                                        </div>
                                    </div>

                                    <div className="p-6 flex flex-col flex-1">
                                        <h2 className="text-xl font-bold text-[#0B1B32] mb-3 line-clamp-2 group-hover:text-[#008CBA] transition-colors font-heading">
                                            {post.title}
                                        </h2>

                                        {/* Simple text extraction for preview (removing HTML tags) */}
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
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            <CTASection />
        </main>
    );
}
