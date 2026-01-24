"use client";

import { Sector } from "@prisma/client";
import { motion } from "framer-motion";
import Image from "next/image";
import { CTASection } from "@/components/sections/cta";
import { CheckCircle2, HardHat, Compass, ShieldCheck, ArrowRight } from "lucide-react";
import { DynamicImage } from "@/components/ui/dynamic-image";

import React from "react";

interface SectorDetailConstructionProps {
    sector: Sector;
    heroImage?: string;
    images?: Record<string, string>;
}

export function SectorDetailConstruction({ sector, heroImage, images }: SectorDetailConstructionProps) {
    // Parse Branding (Safe)
    const branding = React.useMemo(() => {
        try {
            return sector.branding ? JSON.parse(sector.branding) : null;
        } catch (e) {
            return null;
        }
    }, [sector.branding]);

    return (
        <main className="flex-1">
            {/* 1. Cinematic Hero Section */}
            <section className="relative h-[80vh] min-h-[600px] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0 select-none">
                    <DynamicImage
                        src={heroImage || "/images/eng-execute-site.png"}
                        fallbackSrc="/images/eng-execute-site.png"
                        alt="Construction Hero"
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#051120]/80 via-[#051120]/40 to-transparent" /> {/* Lighter Gradient Overlay */}
                </div>

                <div className="container relative z-10 px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="text-[#008CBA] font-bold tracking-[0.2em] uppercase mb-4 text-sm md:text-base border-2 border-[#008CBA] inline-block px-4 py-1 rounded-sm">
                            Build With The Best
                        </h2>
                        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight font-heading max-w-4xl">
                            ENGINEERING & CONSTRUCTION
                            <span className="block text-2xl md:text-3xl font-light text-[#008CBA] mt-4">
                                (Design & Build, High End Fit Out, PPP, PFI, BOT, BOOT)
                            </span>
                        </h1>
                        <p className="text-xl text-gray-300 leading-relaxed max-w-3xl font-light border-l-4 border-[#008CBA] pl-6">
                            We understand the complexity of project delivery models such as Design and Build (D&B), High-End Fit Out, Public-Private Partnerships (PPP), and Private Finance Initiatives (PFI), BOT, and BOOT.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* 2. Intro & Specialists */}
            <section className="py-20 bg-white">
                <div className="container px-4">
                    <div className="grid lg:grid-cols-2 gap-16">
                        {/* Left: Content */}
                        <div className="space-y-8">
                            <div>
                                <h3 className="text-3xl font-bold text-[#0B1B32] font-heading mb-4">Precision & Discipline</h3>
                                <p className="text-lg text-gray-600 leading-relaxed">
                                    The engineering and construction sector demands accuracy, speed, and discipline at every stage. Projects succeed when the right specialists are in the right roles, delivering technical excellence and operational control from planning through completion.
                                </p>
                                <p className="text-lg text-gray-600 leading-relaxed mt-4">
                                    Our recruitment solutions are designed to support Clients, Consultants, Developers and Contractors across the full project lifecycle, supplying professionals who meet the technical, regulatory, and commercial demands of today&apos;s built environment.
                                </p>
                            </div>

                            <div className="space-y-6 pt-4">
                                <div className="flex gap-4">
                                    <div className="p-2 bg-blue-50 rounded h-fit shrink-0"><Compass className="w-6 h-6 text-[#008CBA]" /></div>
                                    <div>
                                        <h4 className="font-bold text-[#0B1B32] text-lg">Design & Engineering Talents</h4>
                                        <p className="text-gray-600">Proven capability in integrated design management, value engineering and build ability analysis.</p>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <div className="p-2 bg-blue-50 rounded h-fit shrink-0"><HardHat className="w-6 h-6 text-[#008CBA]" /></div>
                                    <div>
                                        <h4 className="font-bold text-[#0B1B32] text-lg">Construction & Fit-Out Specialists</h4>
                                        <p className="text-gray-600">Track record in luxury retail, commercial, and hospitality. Skilled in fast-track programs, procurement control, and flawless execution.</p>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <div className="p-2 bg-blue-50 rounded h-fit shrink-0"><ShieldCheck className="w-6 h-6 text-[#008CBA]" /></div>
                                    <div>
                                        <h4 className="font-bold text-[#0B1B32] text-lg">Technical Crews</h4>
                                        <p className="text-gray-600">Understanding long-term operational performance, lifecycle cost forecasting, and concession management.</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right: The Blue Box List */}
                        <div className="bg-[#0B1B32] p-10 rounded-2xl text-white relative overflow-hidden shadow-2xl">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-[#008CBA]/10 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none"></div>

                            <h3 className="text-2xl font-bold mb-8 border-b border-white/20 pb-4 relative z-10">
                                Key Expertise Areas
                            </h3>

                            <ul className="space-y-4 relative z-10">
                                {[
                                    "Mixed-Use Development Malls",
                                    "High Rise Buildings & Tower",
                                    "Hotel & Resorts",
                                    "Airports & Ports",
                                    "Hospital",
                                    "Museums",
                                    "Entertainment Cities & Leisure Parks",
                                    "Environmental & Soil Remediation",
                                    "Industrial & Special-use"
                                ].map((item, i) => (
                                    <li key={i} className="flex items-center gap-3">
                                        <div className="w-2 h-2 rounded-full bg-[#008CBA]"></div>
                                        <span className="text-lg font-light tracking-wide">{item}</span>
                                    </li>
                                ))}
                            </ul>

                            <div className="mt-12">
                                <DynamicImage
                                    src={images?.["SECTOR_CONSTRUCTION_FEATURE_1"] || "/images/eng-execute-site.png"}
                                    fallbackSrc="/images/eng-execute-site.png"
                                    alt="Construction Site"
                                    width={400}
                                    height={200}
                                    className="rounded-lg opacity-40 mix-blend-overlay w-full h-40 object-cover"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <CTASection />
        </main>
    );
}
