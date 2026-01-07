import { getPostBySlug } from "@/lib/actions/blog-actions";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Calendar, User, ArrowLeft, Share2 } from "lucide-react";
import { CTASection } from "@/components/sections/cta";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import DOMPurify from "isomorphic-dompurify";

// Fallback date formatter
const formatDate = (date: Date) => {
    try {
        return new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'long', day: 'numeric' }).format(date);
    } catch (e) {
        return date.toDateString();
    }
}

export const revalidate = 0;

export const dynamic = 'force-dynamic';

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
    const post = await getPostBySlug(params.slug);

    if (!post) {
        notFound();
    }

    return (

        <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1 bg-white">
                {/* Header / Hero */}
                <div className="bg-[#0B1B32] pt-32 pb-20 relative overflow-hidden">
                    <div className="absolute inset-0 bg-[#0B1B32]/90 z-10" />
                    {/* Optional background image for header if post has one, blurred */}
                    {post.image && (
                        <Image
                            src={post.image}
                            alt="Background"
                            fill
                            className="object-cover opacity-20 blur-sm"
                        />
                    )}

                    <div className="container relative z-20 px-4">
                        <Link href="/blog" className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8 text-sm font-medium">
                            <ArrowLeft className="w-4 h-4" /> Back to Insights
                        </Link>

                        <div className="max-w-4xl mx-auto text-center">
                            <div className="flex items-center justify-center gap-4 text-sm text-[#008CBA] font-bold uppercase tracking-wider mb-6">
                                <span className="flex items-center gap-2 bg-white/5 px-4 py-1 rounded-full border border-white/10">
                                    <Calendar className="w-4 h-4" /> {formatDate(new Date(post.createdAt))}
                                </span>
                            </div>
                            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-8 leading-tight font-heading">
                                {post.title}
                            </h1>
                            <div className="flex items-center justify-center gap-3 text-gray-300">
                                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                                    <User className="w-5 h-5" />
                                </div>
                                <div className="text-left">
                                    <p className="text-sm font-bold text-white">{post.author}</p>
                                    <p className="text-xs text-gray-400">Main Author</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Content Section */}
                <article className="max-w-4xl mx-auto px-4 py-16">
                    {post.image && (
                        <div className="relative w-full h-[400px] md:h-[500px] rounded-3xl overflow-hidden shadow-2xl mb-12 -mt-32 z-30 border-4 border-white">
                            <Image
                                src={post.image}
                                alt={post.title}
                                fill
                                className="object-cover"
                                priority
                            />
                        </div>
                    )}

                    <div
                        className="prose prose-lg prose-slate max-w-none 
                        prose-headings:font-heading prose-headings:font-bold prose-headings:text-[#0B1B32]
                        prose-a:text-[#008CBA] prose-a:no-underline hover:prose-a:underline
                        prose-img:rounded-2xl prose-img:shadow-lg
                        prose-strong:text-[#0B1B32]
                        "
                        dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.content) }}
                    />

                    <div className="mt-16 pt-8 border-t border-gray-100 flex items-center justify-between">
                        <div className="text-gray-500 text-sm">
                            Share this article:
                        </div>
                        <div className="flex gap-4">
                            <button aria-label="Share this article" className="p-2 rounded-full bg-gray-50 hover:bg-[#0077b5] hover:text-white transition-all text-gray-600">
                                <Share2 className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </article>

                <CTASection />
            </main>
            <Footer />
        </div>
    );
}
