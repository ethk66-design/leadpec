"use client";

import { ServicesOverview } from "@/components/sections/services-overview";
import { SectorsGrid } from "@/components/sections/sectors-grid";
import { CTASection } from "@/components/sections/cta";
import { motion } from "framer-motion";
import { Sector } from "@prisma/client";
import Image from "next/image";
import { ProcessFlow } from "@/components/sections/process-flow";
import { RecruitmentCycle } from "@/components/sections/recruitment-cycle";

interface ServicesContentProps {
    sectors: Sector[];
}

export function ServicesContent({ sectors }: ServicesContentProps) {
    return (
        <main className="flex-1">
            {/* Hero Section */}
            <section className="relative py-16 md:py-24 flex items-center justify-center overflow-hidden">
                <div
                    className="absolute inset-0 z-0 bg-cover bg-center bg-[url('/images/services-hero-industrial.png')]"
                >
                    <div className="absolute inset-0 bg-[#0B1B32]/90 mix-blend-multiply" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#051120] via-transparent to-transparent opacity-80" />
                </div>

                <div className="container relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="text-sm font-bold text-[#4DB6AC] uppercase tracking-[0.2em] mb-4">
                            Global Reach • Local Expertise
                        </h2>
                        <h1 className="text-4xl md:text-7xl font-bold text-white mb-6 leading-tight font-heading">
                            Comprehensive <br /> <span className="text-[#008CBA]">Workforce Solutions</span>
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed font-light">
                            Delivering specialized talent across 15+ key industries worldwide, from executive leadership to technical field operations.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Recruitment Services (Feature Blocks) */}
            <ServicesOverview hideViewAll={true} />

            {/* Sectors Grid (Dark BG) */}
            <SectorsGrid sectors={sectors} />

            {/* Detailed Recruitment Process */}
            <RecruitmentCycle />

            {/* Process Flow */}
            <ProcessFlow />

            {/* CTA */}
            <CTASection />
        </main>
    );
}
