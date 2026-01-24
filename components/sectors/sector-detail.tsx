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
    Tractor,
    ArrowRight
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

interface ProcessStep {
    title: string;
    description: string;
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

    // Parse Process Flow (Safe)
    const processFlow: ProcessStep[] = React.useMemo(() => {
        try {
            return sector.process ? JSON.parse(sector.process) : [];
        } catch (e) {
            return [];
        }
    }, [sector.process]);

    // Get slug for image keys
    const slug = sector.slug.toUpperCase().replace(/-/g, '_');
    const middleImageKey = `SECTOR_${slug}_MIDDLE`;
    const processImageKey = `SECTOR_${slug}_PROCESS`;
    const bottomImageKey = `SECTOR_${slug}_BOTTOM`;
    const middleImage = images?.[middleImageKey];
    const processImage = images?.[processImageKey];
    const bottomImage = images?.[bottomImageKey];

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
                        <Link href="/sectors" className="inline-flex items-center text-[#008CBA] hover:text-[#4DB6AC] mb-6 transition-colors font-semibold">
                            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Sectors
                        </Link>

                        <div className="flex items-center gap-6 mb-6">
                            {/* Only show icon if explicitly set (not for dynamically created sectors without an icon) */}
                            {sector.iconName && (
                                <div className="p-4 bg-white/5 rounded-lg border border-white/10 backdrop-blur-sm">
                                    <IconComponent className="w-12 h-12 text-[#4DB6AC]" />
                                </div>
                            )}
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
            <section className="py-10 md:py-12 bg-white">
                <div className="container px-4">
                    <div className="grid lg:grid-cols-3 gap-8">
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

                        {/* Right Column: Sidebar */}
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

            {/* Middle Feature Section with Image */}
            {middleImage && (
                <section className="py-10 bg-slate-50">
                    <div className="container px-4">
                        <div className="grid md:grid-cols-2 gap-12 items-center">
                            <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-xl">
                                <Image
                                    src={middleImage}
                                    alt={`${sector.title} Feature`}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <div>
                                <h3 className="text-3xl font-bold text-[#0B1B32] mb-6">
                                    {branding?.processTitle || "Our Approach"}
                                </h3>
                                <p className="text-gray-600 text-lg leading-relaxed">
                                    We deliver specialized talent solutions for the {sector.title.toLowerCase()} sector,
                                    ensuring your projects are staffed with qualified professionals who meet the highest
                                    industry standards. Our rigorous vetting process guarantees candidates with the right
                                    skills, certifications, and experience.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* Process Flow Section */}
            {processFlow.length > 0 && (
                <section className="relative py-12 overflow-hidden">
                    {/* Background Image or Gradient */}
                    {processImage ? (
                        <div className="absolute inset-0 z-0">
                            <Image src={processImage} alt="Process Background" fill className="object-cover" />
                            <div className="absolute inset-0 bg-[#0B1B32]/90" />
                        </div>
                    ) : (
                        <div className="absolute inset-0 bg-gradient-to-br from-[#0B1B32] via-[#0d2341] to-[#1a3a5c]" />
                    )}

                    <div className="container px-4 relative z-10">
                        <h2 className="text-3xl font-bold text-white text-center mb-10">
                            {branding?.processTitle || "Our Process"}
                        </h2>
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {processFlow.map((step, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className="relative"
                                >
                                    <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20 h-full">
                                        <div className="w-10 h-10 bg-[#008CBA] text-white rounded-full flex items-center justify-center font-bold mb-4">
                                            {index + 1}
                                        </div>
                                        <h4 className="text-lg font-bold text-white mb-2">{step.title}</h4>
                                        <p className="text-gray-300 text-sm">{step.description}</p>
                                    </div>
                                    {/* Only show arrow if not last item AND not at end of row in 4-column grid */}
                                    {index < processFlow.length - 1 && (index + 1) % 4 !== 0 && (
                                        <div className="hidden lg:block absolute top-1/2 -translate-y-1/2 -right-4 z-10">
                                            <ArrowRight className="w-5 h-5 text-[#4DB6AC]" />
                                        </div>
                                    )}
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Bottom CTA Section */}
            <section className="relative py-20 bg-[#0B1B32] overflow-hidden">
                {bottomImage && (
                    <div className="absolute inset-0 z-0">
                        <Image
                            src={bottomImage}
                            alt="CTA Background"
                            fill
                            className="object-cover"
                        />
                        <div className="absolute inset-0 bg-[#0B1B32]/80" />
                    </div>
                )}
                {!bottomImage && (
                    <div className="absolute inset-0 opacity-10 bg-[image:radial-gradient(#4DB6AC_1px,transparent_1px)] bg-[size:30px_30px]"></div>
                )}
                <div className="container relative z-10 px-4 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                            Ready to Start Your Project?
                        </h2>
                        <p className="text-gray-300 text-lg max-w-2xl mx-auto mb-8">
                            Partner with LEADPEC for reliable, skilled manpower solutions tailored to your {sector.title.toLowerCase()} requirements.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                href="/contact"
                                className="px-8 py-4 bg-[#008CBA] hover:bg-[#0077a3] text-white font-bold rounded-sm transition-colors"
                            >
                                Contact Us Today
                            </Link>
                            <Link
                                href="/sectors"
                                className="px-8 py-4 border-2 border-white/30 hover:border-white text-white font-bold rounded-sm transition-colors"
                            >
                                Explore Other Sectors
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}
