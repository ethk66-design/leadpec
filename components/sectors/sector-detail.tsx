"use client";

import { Sector } from "@prisma/client";
import { motion } from "framer-motion";
import {
    Briefcase,
    HardHat,
    Fuel,
    Zap,
    Droplets,
    Building2,
    Anchor,
    Settings,
    Wrench,
    HeartPulse,
    Utensils,
    Plane,
    Landmark,
    Factory,
    Hammer,
    Truck,
    ArrowLeft,
    Tractor
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import React from "react";

const iconMap: { [key: string]: React.ElementType } = {
    HardHat,
    Fuel,
    Zap,
    Droplets,
    Building2,
    Anchor,
    Settings,
    Wrench,
    HeartPulse,
    Utensils,
    Plane,
    Landmark,
    Factory,
    Hammer,
    Truck,
    Tractor,
    Briefcase // Fallback
};

interface SectorDetailProps {
    sector: Sector;
    heroImage?: string;
    images?: Record<string, string>;
}

export function SectorDetail({ sector, heroImage, images }: SectorDetailProps) {
    const IconComponent = iconMap[sector.iconName || "Briefcase"] || Briefcase;

    // Parse Branding (Safe)
    const branding = React.useMemo(() => {
        try {
            return sector.branding ? JSON.parse(sector.branding) : null;
        } catch (e) {
            return null;
        }
    }, [sector.branding]);

    return (
        <div className="flex-1">
            {/* Hero Banner for Sector */}
            <section className="relative py-12 md:py-20 bg-[#0B1B32] overflow-hidden min-h-[400px]">
                {/* Hero Background Image */}
                {heroImage && (
                    <div className="absolute inset-0 z-0">
                        <Image
                            src={heroImage}
                            alt={sector.title}
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-r from-[#0B1B32] via-[#0B1B32]/80 to-transparent z-10" />
                {/* Abstract Background pattern (fallback if no image) */}
                {!heroImage && (
                    <div className="absolute inset-0 opacity-10 bg-[image:radial-gradient(#4DB6AC_1px,transparent_1px)] bg-[size:30px_30px]"></div>
                )}

                <div className="container relative z-20 px-4">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <Link href="/services" className="inline-flex items-center text-[#008CBA] hover:text-[#4DB6AC] mb-6 transition-colors font-semibold">
                            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Services
                        </Link>

                        <div className="flex items-center gap-6 mb-6">
                            <div className="p-4 bg-white/5 rounded-lg border border-white/10 backdrop-blur-sm">
                                <IconComponent className="w-12 h-12 text-[#4DB6AC]" />
                            </div>
                            <div>
                                {branding?.heroTitle ? (
                                    <>
                                        <h2 className="text-[#008CBA] font-bold tracking-widest uppercase mb-2 text-sm">
                                            {branding.heroSubtitle || "Sector Overview"}
                                        </h2>
                                        <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight">
                                            {branding.heroTitle}
                                        </h1>
                                    </>
                                ) : (
                                    <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight">
                                        {sector.title}
                                    </h1>
                                )}
                            </div>
                        </div>

                        <p className="text-xl text-gray-300 max-w-3xl leading-relaxed border-l-4 border-[#008CBA] pl-6">
                            {branding?.quote ? `"${branding.quote}"` : sector.description}
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Main Content */}
            <section className="py-12 md:py-16 bg-white">
                <div className="container px-4">
                    <div className="grid lg:grid-cols-3 gap-12">
                        {/* Left Column: Content */}
                        <div className="lg:col-span-2">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                                className="prose prose-lg max-w-none text-gray-700"
                            >
                                <h3 className="text-2xl font-bold text-[#0B1B32] mb-6">
                                    {branding?.conceptTitle || "Overview"}
                                </h3>
                                <div className="whitespace-pre-line leading-relaxed">
                                    {sector.content}
                                </div>
                            </motion.div>
                        </div>

                        {/* Right Column: Sidebar / Key Features or Stats could go here later */}
                        <div className="lg:col-span-1">
                            <div className="bg-[#F8FAFC] p-8 rounded-xl border border-gray-100 sticky top-24">
                                <h4 className="text-lg font-bold text-[#0B1B32] mb-4">Why Partner With Us?</h4>
                                <ul className="space-y-4">
                                    <li className="flex items-start gap-3">
                                        <div className="w-1.5 h-1.5 rounded-full bg-[#008CBA] mt-2.5" />
                                        <span className="text-gray-600">Specialized talent pool tailored for the {sector.title} industry.</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <div className="w-1.5 h-1.5 rounded-full bg-[#008CBA] mt-2.5" />
                                        <span className="text-gray-600">Rigorous technical screening and verification.</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <div className="w-1.5 h-1.5 rounded-full bg-[#008CBA] mt-2.5" />
                                        <span className="text-gray-600">Rapid deployment to meet project timelines.</span>
                                    </li>
                                </ul>

                                <div className="mt-8 pt-6 border-t border-gray-200">
                                    <Link href="/contact" className="block w-full py-3 bg-[#0B1B32] hover:bg-[#1E3A8A] text-white text-center font-bold rounded-sm transition-colors">
                                        Request Manpower
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
