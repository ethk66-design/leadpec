"use client";

import { SectorsGrid } from "@/components/sections/sectors-grid";
import { CTASection } from "@/components/sections/cta";
import { motion } from "framer-motion";
import { Sector } from "@prisma/client";
import Image from "next/image";

interface SectorsContentProps {
    sectors: Sector[];
}

export function SectorsContent({ sectors }: SectorsContentProps) {
    return (
        <main className="flex-1">
            {/* Hero Section */}
            <section className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden">
                <div
                    className="absolute inset-0 z-0 bg-cover bg-center bg-[url('/images/sectors-hero-skyline.png')]"
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-[#051120]/95 via-[#051120]/80 to-transparent" />
                </div>

                <div className="container relative z-10 px-4">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="max-w-3xl"
                    >
                        <h2 className="text-[#008CBA] font-bold tracking-widest uppercase mb-4 text-sm md:text-base">
                            Global Industrial Expertise
                        </h2>
                        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight font-heading">
                            Powering the World&apos;s <br /> Most Critical Sectors
                        </h1>
                        <p className="text-xl text-gray-300 leading-relaxed max-w-2xl">
                            From large-scale energy infrastructure to advanced healthcare facilities, we provide specialized talent that drives global progress.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Corporate Scope / Key Pillars */}
            <section className="py-12 md:py-16 bg-white">
                <div className="container px-4">
                    <div className="text-center mb-10 md:mb-16 max-w-3xl mx-auto">
                        <h2 className="text-3xl md:text-4xl font-bold text-[#0B1B32] mb-4 font-heading">Strategic Sector Focus</h2>
                        <p className="text-gray-600">Delivering excellence in complex environments through three core operational pillars.</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Pillar 1: Energy */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="group relative h-[400px] overflow-hidden rounded-lg shadow-xl"
                        >
                            <Image
                                src="/images/sector-feature-energy.png"
                                alt="Energy & Power"
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#0B1B32] via-[#0B1B32]/50 to-transparent opacity-90" />
                            <div className="absolute bottom-0 left-0 p-8">
                                <h3 className="text-2xl font-bold text-white mb-2">Energy & Renewables</h3>
                                <p className="text-gray-300 text-sm mb-4">Driving the transition to sustainable power with specialized technical teams.</p>
                                <span className="text-[#008CBA] text-sm font-bold uppercase tracking-wider group-hover:text-white transition-colors">Explore Energy</span>
                            </div>
                        </motion.div>

                        {/* Pillar 2: Construction */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="group relative h-[400px] overflow-hidden rounded-lg shadow-xl"
                        >
                            <Image
                                src="/images/sector-feature-construction.png"
                                alt="Infrastructure"
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#0B1B32] via-[#0B1B32]/50 to-transparent opacity-90" />
                            <div className="absolute bottom-0 left-0 p-8">
                                <h3 className="text-2xl font-bold text-white mb-2">Infrastructure</h3>
                                <p className="text-gray-300 text-sm mb-4">Supporting mega-projects in civil engineering and urban development.</p>
                                <span className="text-[#008CBA] text-sm font-bold uppercase tracking-wider group-hover:text-white transition-colors">Explore Construction</span>
                            </div>
                        </motion.div>

                        {/* Pillar 3: Healthcare */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.4 }}
                            className="group relative h-[400px] overflow-hidden rounded-lg shadow-xl"
                        >
                            <Image
                                src="/images/sector-feature-healthcare.png"
                                alt="Healthcare"
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#0B1B32] via-[#0B1B32]/50 to-transparent opacity-90" />
                            <div className="absolute bottom-0 left-0 p-8">
                                <h3 className="text-2xl font-bold text-white mb-2">Healthcare & Life Sciences</h3>
                                <p className="text-gray-300 text-sm mb-4">Providing elite medical professionals for world-class institutions.</p>
                                <span className="text-[#008CBA] text-sm font-bold uppercase tracking-wider group-hover:text-white transition-colors">Explore Healthcare</span>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Existing Grid with Header */}
            <section className="bg-[#0A2540]">
                <div className="container px-4 pt-8 md:pt-16 pb-4">
                    <h3 className="text-white font-bold text-2xl border-l-4 border-[#008CBA] pl-4">Full Industry Portfolio</h3>
                </div>
                <SectorsGrid sectors={sectors} />
            </section>

            {/* CTA */}
            <CTASection />
        </main>
    );
}
