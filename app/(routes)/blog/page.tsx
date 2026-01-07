import { getPublishedPosts } from "@/lib/actions/blog-actions";
import Link from "next/link";
import Image from "next/image";


import { Calendar, User, ArrowRight, Newspaper } from "lucide-react";
import { CTASection } from "@/components/sections/cta";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

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

import { prisma } from "@/lib/db";
import { DynamicImage } from "@/components/ui/dynamic-image";
import { BlogGrid } from "@/components/pages/blog-grid";

// ... imports

export default async function BlogPage() {
    const postsPromise = getPublishedPosts();
    const heroAssetPromise = prisma?.siteAsset.findUnique({
        where: { key: 'BLOG_HERO_BG' }
    }) || Promise.resolve(null);

    const [posts, heroAsset] = await Promise.all([postsPromise, heroAssetPromise]);
    const heroImage = heroAsset?.url || "/images/blog-hero-placeholder.png";

    return (
        <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1 bg-gray-50">
                {/* Hero Section */}
                <section className="relative h-[400px] flex items-center justify-center overflow-hidden bg-[#0B1B32]">
                    <div className="absolute inset-0 z-0">
                        <div className="absolute inset-0 bg-[#0B1B32]/75 z-10" />
                        <DynamicImage
                            src={heroImage}
                            alt="Blog Background"
                            fallbackSrc="/images/blog-hero-placeholder.png"
                            fill
                            className="object-cover opacity-60"
                            priority
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
                        <BlogGrid posts={posts} />
                    </div>
                </section>

                <CTASection />
            </main>
            <Footer />
        </div>
    );
}
