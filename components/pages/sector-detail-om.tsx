"use client";

import { Sector } from "@prisma/client";
import { motion } from "framer-motion";
import Image from "next/image";
import { CTASection } from "@/components/sections/cta";
import { Wrench, Gauge, Clock, HardHat, Settings, ArrowRight, Activity, ShieldAlert } from "lucide-react";
import { DynamicImage } from "@/components/ui/dynamic-image";

interface SectorDetailOMProps {
    sector: Sector;
    heroImage?: string;
}

export function SectorDetailOM({ sector, heroImage }: SectorDetailOMProps) {
    return (
        <main className="flex-1 bg-white">
            {/* 1. Hero */}
            <section className="relative h-[85vh] min-h-[600px] flex items-center justify-center overflow-hidden bg-[#002f5f]">
                <div className="absolute inset-0 z-0 select-none">
                    <DynamicImage
                        src={heroImage || "/images/om-hero.png"}
                        fallbackSrc="/images/om-hero.png"
                        alt="O&M Hero"
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#001f3f]/90 via-[#001f3f]/60 to-transparent" />
                </div>

                <div className="container relative z-10 px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="max-w-4xl"
                    >
                        <h2 className="text-[#4DB6AC] font-bold tracking-[0.2em] uppercase mb-4 text-sm md:text-base border-2 border-[#4DB6AC] inline-flex items-center gap-2 px-4 py-1 rounded-sm">
                            <Activity className="w-4 h-4" /> 24/7 Asset Integrity
                        </h2>
                        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight font-heading uppercase">
                            OPERATION AND MAINTENANCE
                        </h1>
                        <p className="text-xl md:text-2xl text-blue-100 italic font-light mb-6 border-l-4 border-[#4DB6AC] pl-6">
                            "Maintenence That Powers Success"
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* 2. Intro Text */}
            <section className="py-16 bg-white">
                <div className="container px-4">
                    <div className="max-w-4xl mx-auto mb-16 space-y-8 text-center bg-slate-50 p-8 rounded-2xl shadow-sm border border-slate-100">
                        <p className="text-lg md:text-xl text-slate-700 leading-relaxed font-light">
                            Industrial facilities run on discipline, accuracy, and professionals who know how to keep systems alive. When equipment is critical and downtime is costly, only technically proficient, experienced personnel can protect production and ensure operational continuity under pressure.
                        </p>
                        <p className="text-lg md:text-xl text-slate-700 leading-relaxed font-light mt-6">
                            LEADPEC delivers certified, job-ready specialists across oil & gas, petrochemical, power generation, manufacturing, and heavy industries. Our recruitment solutions provide technical experts who understand complex assets, high-risk environments, and the expectation of zero-fault execution.
                        </p>
                    </div>

                    {/* 3. Industrial Maintenance Scope (Matches Oil & Gas Outline Box Style) */}
                    <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
                        <div className="order-2 lg:order-1 relative h-[500px] w-full rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
                            <Image
                                src="/images/om-industrial-maintenance.png"
                                alt="Industrial Maintenance"
                                fill
                                className="object-cover"
                            />
                            <div className="absolute bottom-6 left-6 flex items-center gap-3 text-white bg-black/60 backdrop-blur-sm p-4 rounded-lg">
                                <ShieldAlert className="w-6 h-6 text-[#4DB6AC]" />
                                <div>
                                    <p className="font-bold">Safety First</p>
                                    <p className="text-xs text-gray-300">Strict Adherence to HSE</p>
                                </div>
                            </div>
                        </div>

                        <div className="order-1 lg:order-2">
                            <div className="inline-flex items-center gap-2 text-[#004e92] font-bold uppercase tracking-wider mb-4">
                                <Settings className="w-5 h-5" />
                                <span>Scope of Expertise</span>
                            </div>
                            <h2 className="text-4xl font-bold text-[#0B1B32] mb-8 font-heading">
                                INDUSTRIAL MAINTENANCE FOR
                            </h2>

                            <div className="bg-blue-50/50 border-2 border-[#004e92] rounded-2xl p-8">
                                <ul className="space-y-4">
                                    {[
                                        "Refineries",
                                        "Petrochemical Plants",
                                        "Power Plants",
                                        "Infrastructure, Road & Utilities",
                                        "Waste Water Treatment Plants",
                                        "Sewage & Pumping Stations",
                                        "Substation & Transmission"
                                    ].map((item, index) => (
                                        <li key={index} className="flex items-center gap-3 text-lg md:text-xl font-bold text-[#004e92]">
                                            <div className="w-2 h-2 bg-[#4DB6AC] rounded-full" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Closing Quote */}
                    <div className="max-w-4xl mx-auto text-center pt-12 border-t border-slate-100">
                        <div className="mb-6">
                            <Wrench className="w-12 h-12 text-[#4DB6AC] mx-auto opacity-50" />
                        </div>
                        <p className="text-2xl md:text-3xl text-[#0B1B32] font-medium leading-relaxed italic mb-8 font-heading">
                            "Maintenance is the backbone of every industrial facility. The quality of your workforce defines the stability of your operations."
                        </p>
                        <p className="text-lg text-slate-600">
                            With the right team, you improve uptime, control failures, and operate with confidence.
                        </p>
                    </div>

                </div>
            </section>

            <CTASection />
        </main>
    );
}
