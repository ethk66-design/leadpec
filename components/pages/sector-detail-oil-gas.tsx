"use client";

import { Sector } from "@prisma/client";
import { motion } from "framer-motion";
import Image from "next/image";
import { CTASection } from "@/components/sections/cta";
import { Droplet, Flame, Anchor, HardHat, ShieldCheck, Globe, ArrowRight } from "lucide-react";
import { DynamicImage } from "@/components/ui/dynamic-image";

interface SectorDetailOilGasProps {
    sector: Sector;
    heroImage?: string;
}

export function SectorDetailOilGas({ sector, heroImage }: SectorDetailOilGasProps) {
    return (
        <main className="flex-1 bg-white">
            {/* 1. Cinematic Hero */}
            <section className="relative h-[85vh] min-h-[600px] flex items-center justify-center overflow-hidden bg-[#0c4a6e]">
                <div className="absolute inset-0 z-0 select-none">
                    <DynamicImage
                        src={heroImage || "/images/oil-gas-hero-refinery.png"}
                        fallbackSrc="/images/oil-gas-hero-refinery.png"
                        alt="Oil & Gas Hero"
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#0c4a6e]/90 via-[#0c4a6e]/50 to-transparent" />
                </div>

                <div className="container relative z-10 px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="max-w-4xl"
                    >
                        <h2 className="text-[#4DB6AC] font-bold tracking-[0.2em] uppercase mb-4 text-sm md:text-base border-2 border-[#4DB6AC] inline-block px-4 py-1 rounded-sm">
                            Value Chain Excellence
                        </h2>
                        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight font-heading">
                            OIL & GAS, PETROCHEMICAL <br />
                            <span className="text-[#4DB6AC] text-4xl block mt-4">(EPC, LSTK, LSPB)</span>
                        </h1>
                    </motion.div>
                </div>
            </section>

            {/* 2. Intro & Scope Box */}
            <section className="py-16 bg-white">
                <div className="container px-4">
                    <div className="max-w-4xl mx-auto text-center mb-12">
                        <p className="text-lg md:text-xl text-slate-700 leading-relaxed">
                            At LEADPEC, we <span className="font-bold text-[#0c4a6e]">GO BEYOND THE LIMIT</span> to explore and mobilize top-tier talent for Engineering & Design, Construction, Testing & Commissioning phases of Oil & Gas, Petrochemical industry.
                        </p>
                        <p className="text-lg md:text-xl text-slate-700 leading-relaxed mt-4">
                            Our commitment to delivering excellence spans the entire value chain, ensuring the highest standards are met across <span className="font-bold text-[#0c4a6e]">UPSTREAM, MIDSTREAM, and DOWNSTREAM</span> projects either in Brown or Greenfield area.
                        </p>
                    </div>

                    {/* The Blue Outline Box */}
                    <div className="max-w-5xl mx-auto border-2 border-[#008CBA] rounded-2xl p-8 md:p-12 relative bg-blue-50/30">
                        <div className="grid md:grid-cols-1 gap-6 text-center">
                            <h3 className="text-2xl md:text-3xl font-bold text-[#0c4a6e] mb-2 font-heading">
                                Exploration, Drilling (Onshore & Offshore),
                            </h3>
                            <p className="text-xl md:text-2xl text-[#008CBA] font-light leading-relaxed">
                                Pipeline, Cross Country Pipeline, Flow Line, Gathering Centre, Water Management, Storage Tanks, Refinery, LNG
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. Text & Image Split */}
            <section className="py-16 bg-[#f8fafc]">
                <div className="container px-4">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div className="relative h-[400px] rounded-xl overflow-hidden shadow-xl order-2 lg:order-1">
                            <Image
                                src="/images/oil-gas-operations-unified.png"
                                alt="Integrated Approach"
                                fill
                                className="object-cover"
                            />
                        </div>
                        <div className="order-1 lg:order-2">
                            <h3 className="text-3xl font-bold text-[#0c4a6e] font-heading mb-6">Unified Operations</h3>
                            <p className="text-lg text-slate-600 leading-relaxed mb-6">
                                LEADPEC unifies talent across upstream, mid-stream, and downstream operations to deliver smooth, efficient project execution. We offer a fully integrated approach, covering everything from exploration and production to transportation and refining.
                            </p>
                            <p className="text-lg text-slate-600 leading-relaxed border-l-4 border-[#4DB6AC] pl-6 italic">
                                "Our rigorous recruitment process ensures top-tier talent, giving clients a strategic, cohesive solution that boosts performance and results."
                            </p>
                        </div>
                    </div>
                </div>
            </section>


            {/* CTA */}
            <CTASection />
        </main>
    );
}
