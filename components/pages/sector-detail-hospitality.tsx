"use client";

import { Sector } from "@prisma/client";
import { motion } from "framer-motion";
import Image from "next/image";
import { CTASection } from "@/components/sections/cta";
import { Utensils, Globe, ShieldCheck, TrendingUp, Users, Award } from "lucide-react";
import { DynamicImage } from "@/components/ui/dynamic-image";

interface SectorDetailHospitalityProps {
    sector: Sector;
    heroImage?: string;
    images?: Record<string, string>;
}

const CUISINES = [
    { name: "Italian Cuisine", image: "/images/cuisine-italian-dish.png", color: "from-green-600", key: "SECTOR_HOSPITALITY_CUISINE_ITALIAN" },
    { name: "Arabic Cuisine", image: "/images/cuisine-arabic-dish.png", color: "from-amber-600", key: "SECTOR_HOSPITALITY_CUISINE_ARABIC" },
    { name: "Japanese Cuisine", image: "/images/cuisine-japanese-dish.png", color: "from-red-600", key: "SECTOR_HOSPITALITY_CUISINE_JAPANESE" },
    { name: "French Cuisine", image: "/images/cuisine-french-dish.jpg", color: "from-blue-600", key: "SECTOR_HOSPITALITY_CUISINE_FRENCH" },
    { name: "Greek Cuisine", image: "/images/cuisine-greek-dish.jpg", color: "from-cyan-600", key: "SECTOR_HOSPITALITY_CUISINE_GREEK" },
    { name: "Thai Cuisine", image: "/images/cuisine-thai-dish.jpg", color: "from-orange-600", key: "SECTOR_HOSPITALITY_CUISINE_THAI" },
    { name: "Spanish Cuisine", image: "/images/cuisine-spanish-dish.jpg", color: "from-yellow-600", key: "SECTOR_HOSPITALITY_CUISINE_SPANISH" },
    { name: "Chinese Cuisine", image: "/images/cuisine-chinese-dish.jpg", color: "from-red-700", key: "SECTOR_HOSPITALITY_CUISINE_CHINESE" },
    { name: "Indian Cuisine", image: "/images/cuisine-indian-dish.jpg", color: "from-orange-500", key: "SECTOR_HOSPITALITY_CUISINE_INDIAN" },
];

export function SectorDetailHospitality({ sector, heroImage, images }: SectorDetailHospitalityProps) {
    return (
        <main className="flex-1 bg-white">
            {/* 1. Cinematic Hero */}
            <section className="relative h-[85vh] min-h-[600px] flex items-center justify-center overflow-hidden bg-[#0f172a]">
                <div className="absolute inset-0 z-0 select-none">
                    <DynamicImage
                        src={heroImage || "/images/hospitality-hero.png"}
                        fallbackSrc="/images/hospitality-hero.png"
                        alt="Hospitality Hero"
                        fill
                        className="object-cover"
                        priority
                    />
                    {/* Elegant Navy/Blue Overlay */}
                    <div className="absolute inset-0 bg-[#0f172a]/30 mix-blend-multiply" />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#0f172a]/70 via-[#0f172a]/20 to-transparent" />
                </div>

                <div className="container relative z-10 px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="max-w-4xl"
                    >
                        <h2 className="text-[#4DB6AC] font-bold tracking-[0.2em] uppercase mb-4 text-sm md:text-base border-2 border-[#4DB6AC] inline-flex items-center gap-2 px-4 py-1 rounded-sm">
                            <Globe className="w-4 h-4" /> Global Talent Network
                        </h2>
                        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight font-heading uppercase">
                            HOSPITALITY AND CATERING
                        </h1>
                        <p className="text-xl md:text-2xl text-blue-100 italic font-light mb-6 border-l-4 border-[#4DB6AC] pl-6">
                            &quot;Talent That Serves Excellence&quot;
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* 2. Intro Section */}
            <section className="py-16 bg-white">
                <div className="container px-4">
                    <div className="max-w-4xl mx-auto text-center mb-16 space-y-6">
                        <p className="text-lg md:text-xl text-slate-700 leading-relaxed font-light">
                            We connect world class hospitality and catering professionals with hotels, resorts, restaurants, cruise liners, private estates, and event operators across every continent. From Europe&apos;s luxury capitals to the fast growing hospitality hubs of Asia, Africa, the Middle East, the Americas, and Oceania, we help businesses build teams that deliver memorable guest experiences.
                        </p>
                        <p className="text-lg md:text-xl text-slate-700 leading-relaxed font-light">
                            Our consultants are specialists in international hospitality hiring. We understand service standards, cultural expectations, culinary trends, and operational targets in every major market. This allows us to match skilled talent with organizations that value precision, professionalism, and authentic service.
                        </p>
                    </div>

                    {/* 3. Cuisine Grid */}
                    <div className="mb-20">
                        <div className="flex items-center justify-center gap-3 mb-10">
                            <Utensils className="w-6 h-6 text-[#4DB6AC]" />
                            <h2 className="text-3xl font-bold text-[#0B1B32] uppercase tracking-wide">Culinary Excellence</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                            {CUISINES.map((cuisine, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.1 }}
                                    className="group relative h-48 rounded-2xl overflow-hidden cursor-pointer shadow-lg"
                                >
                                    <div className="absolute inset-0 bg-slate-900">
                                        <DynamicImage
                                            src={images?.[cuisine.key] || cuisine.image}
                                            fallbackSrc={`/images/placeholder-cuisine.png`}
                                            alt={cuisine.name}
                                            fill
                                            className="object-cover group-hover:scale-110 transition-transform duration-700"
                                        />
                                        {/* Neutral dark gradient for text readability */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                                    </div>
                                    <div className="absolute inset-0 flex items-center justify-center z-10">
                                        <h3 className="text-2xl font-bold text-white drop-shadow-md tracking-wider border-b-2 border-transparent group-hover:border-white/80 pb-1 transition-all">
                                            {cuisine.name}
                                        </h3>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* 4. Detailed Content Features */}
                    <div className="grid lg:grid-cols-2 gap-12 items-start mb-16">
                        {/* Recruitment Scope */}
                        <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                            <div className="flex items-center gap-3 mb-6">
                                <Users className="w-8 h-8 text-[#008CBA]" />
                                <h3 className="text-2xl font-bold text-[#0B1B32]">Full-Spectrum Recruitment</h3>
                            </div>
                            <p className="text-slate-600 leading-relaxed mb-6">
                                We recruit for front of house, back of house, culinary arts, housekeeping, food production, catering management, events, banqueting, and senior leadership.
                            </p>
                            <ul className="space-y-3">
                                {[
                                    "Executive Chefs & Sous Chefs",
                                    "Food & Beverage Managers",
                                    "Bar Managers & Pastry Artisans",
                                    "Guest Relations Experts",
                                    "Large Scale Catering Teams"
                                ].map((item, i) => (
                                    <li key={i} className="flex items-center gap-3 text-slate-700 font-medium">
                                        <div className="w-1.5 h-1.5 bg-[#4DB6AC] rounded-full" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Data Driven approach */}
                        <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                            <div className="flex items-center gap-3 mb-6">
                                <TrendingUp className="w-8 h-8 text-[#008CBA]" />
                                <h3 className="text-2xl font-bold text-[#0B1B32]">Data-Driven Strategy</h3>
                            </div>
                            <p className="text-slate-600 leading-relaxed mb-6">
                                Our approach is driven by data and guided by market knowledge. We track regional demand, salary patterns, seasonal hiring cycles, and international mobility trends.
                            </p>
                            <p className="text-slate-600 leading-relaxed border-l-4 border-blue-200 pl-4 py-1 italic bg-white rounded-r-lg">
                                &quot;Whether you need permanent talent, temporary staff, or full project teams, we deliver reliable recruitment solutions that support service excellence.&quot;
                            </p>
                        </div>
                    </div>

                    {/* 5. Why Choose Us Text Block */}
                    <div className="max-w-4xl mx-auto mb-16 space-y-6 text-center md:text-left bg-blue-900/5 p-8 rounded-2xl border border-blue-100">
                        <div className="flex items-center gap-3 mb-4 text-[#004e92] font-bold uppercase tracking-widest">
                            <Award className="w-5 h-5" />
                            <span>The Specialist Advantage</span>
                        </div>
                        <h3 className="text-3xl font-bold text-[#0B1B32] mb-4">Why Leading Brands Choose LEADPEC</h3>
                        <p className="text-lg text-slate-700 leading-relaxed">
                            Clients choose us because we know the industry, we move fast, and we value quality. Our global reach opens access to diverse, highly trained hospitality and catering talent. Our methods ensure every placement fits the operational style and customer promise of your brand.
                        </p>
                    </div>

                    {/* Closing */}
                    <div className="max-w-4xl mx-auto text-center pt-8 border-t border-slate-200">
                        <h3 className="text-2xl md:text-4xl font-bold text-[#004e92] font-heading leading-tight mb-6">
                            &quot;We help you build strong service teams that raise standards, enhance guest satisfaction, and drive performance across every level of your operation.&quot;
                        </h3>
                        <p className="text-lg text-slate-500 font-light">
                            When you need a recruitment partner who understands global hospitality and can secure the right people in the right roles, we are the specialist team you can trust.
                        </p>
                    </div>

                </div>
            </section>

            <CTASection />
        </main>
    );
}
