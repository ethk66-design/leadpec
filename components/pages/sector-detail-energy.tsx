"use client";

import { Sector } from "@prisma/client";
import { motion } from "framer-motion";
import Image from "next/image";
import { CTASection } from "@/components/sections/cta";
import { Zap, Wind, Sun, Factory, Globe, ArrowRight, Users } from "lucide-react";
import { DynamicImage } from "@/components/ui/dynamic-image";

interface SectorDetailEnergyProps {
    sector: Sector;
    heroImage?: string;
}

export function SectorDetailEnergy({ sector, heroImage }: SectorDetailEnergyProps) {
    return (
        <main className="flex-1">
            {/* 1. Cinematic Hero */}
            <section className="relative h-[85vh] min-h-[600px] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0 select-none">
                    <DynamicImage
                        src={heroImage || "/images/sector-feature-energy.png"}
                        fallbackSrc="/images/sector-feature-energy.png"
                        alt="Energy Hero"
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#0B1B32]/90 via-[#0B1B32]/70 to-transparent" />
                </div>

                <div className="container relative z-10 px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="max-w-5xl"
                    >
                        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight font-heading uppercase">
                            POWER & RENEWABLE <br /> <span className="text-[#4DB6AC]">ENERGY</span>
                        </h1>
                        <h2 className="text-[#4DB6AC] font-bold tracking-[0.1em] uppercase mb-4 text-sm md:text-xl inline-block px-4 py-1 rounded-sm border-2 border-[#4DB6AC]">
                            (EPC, EPCM, BOT, BOO, BOOT, IPP, PPP)
                        </h2>
                    </motion.div>
                </div>
            </section>

            {/* 2. Intro & Grid Section */}
            <section className="py-16 bg-white">
                <div className="container px-4">
                    {/* Intro: Split Layout */}
                    <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
                        <div className="order-2 lg:order-1">
                            <div className="h-1.5 w-24 bg-[#4DB6AC] mb-6 rounded-full" />
                            <h2 className="text-3xl font-bold text-[#0B1B32] font-heading mb-6">
                                Powering Tomorrow.
                            </h2>
                            <p className="text-lg text-slate-600 leading-relaxed max-w-xl">
                                LEADPEC Energy is a trusted global partner supplying specialist engineering talent to EPCs, IPP&apos;s, OEM, Developers, and Supporting Utilities. We support every stage of project delivery, from engineering and construction to commissioning, start-up, operations, and maintenance for power generation.
                            </p>
                            <p className="text-lg text-slate-600 leading-relaxed max-w-xl mt-4">
                                Our teams work across a full range of plant technologies, ensuring clients receive expertise that fits the complexity of their assets.
                            </p>
                        </div>
                        <div className="order-1 lg:order-2 relative h-[400px] rounded-2xl overflow-hidden shadow-xl">
                            <Image
                                src="/images/eng-plan-meeting.png"
                                alt="Engineering Meeting"
                                fill
                                className="object-cover"
                            />
                        </div>
                    </div>

                    {/* 4-Box Grid with Icons */}
                    <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                        {/* Box 1 */}
                        <div className="bg-white p-8 rounded-2xl border border-blue-100 shadow-sm hover:shadow-xl transition-all group flex gap-6 items-start">
                            <div className="flex-shrink-0 w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center group-hover:bg-[#0B1B32] transition-colors">
                                <Factory className="w-7 h-7 text-[#0B1B32] group-hover:text-[#4DB6AC] transition-colors" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-[#0B1B32] mb-3 group-hover:text-[#4DB6AC] transition-colors">
                                    Industry Specific Experience
                                </h3>
                                <p className="text-slate-600 text-sm leading-relaxed">
                                    Our deep understanding of the energy sector allows us to identify and place candidates with the right expertise to shape the future of sustainable energy.
                                </p>
                            </div>
                        </div>

                        {/* Box 2 */}
                        <div className="bg-white p-8 rounded-2xl border border-blue-100 shadow-sm hover:shadow-xl transition-all group flex gap-6 items-start">
                            <div className="flex-shrink-0 w-14 h-14 bg-teal-50 rounded-xl flex items-center justify-center group-hover:bg-[#4DB6AC] transition-colors">
                                <Sun className="w-7 h-7 text-[#4DB6AC] group-hover:text-white transition-colors" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-[#0B1B32] mb-3 group-hover:text-[#4DB6AC] transition-colors">
                                    Talent for Innovation
                                </h3>
                                <p className="text-slate-600 text-sm leading-relaxed">
                                    The right talent can transform the energy industry. We help organisations recruit professionals who bring innovative solutions to complex sustainability challenges.
                                </p>
                            </div>
                        </div>

                        {/* Box 3 */}
                        <div className="bg-white p-8 rounded-2xl border border-blue-100 shadow-sm hover:shadow-xl transition-all group flex gap-6 items-start">
                            <div className="flex-shrink-0 w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center group-hover:bg-[#0B1B32] transition-colors">
                                <Users className="w-7 h-7 text-[#0B1B32] group-hover:text-[#4DB6AC] transition-colors" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-[#0B1B32] mb-3 group-hover:text-[#4DB6AC] transition-colors">
                                    Tailored Recruitment
                                </h3>
                                <p className="text-slate-600 text-sm leading-relaxed">
                                    Our staffing solutions are customised to meet the unique needs of each client in the energy sector, ensuring long-term success in sustainability initiatives.
                                </p>
                            </div>
                        </div>

                        {/* Box 4 */}
                        <div className="bg-white p-8 rounded-2xl border border-blue-100 shadow-sm hover:shadow-xl transition-all group flex gap-6 items-start">
                            <div className="flex-shrink-0 w-14 h-14 bg-teal-50 rounded-xl flex items-center justify-center group-hover:bg-[#4DB6AC] transition-colors">
                                <Globe className="w-7 h-7 text-[#4DB6AC] group-hover:text-white transition-colors" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-[#0B1B32] mb-3 group-hover:text-[#4DB6AC] transition-colors">
                                    Global Reach, Local Presence
                                </h3>
                                <p className="text-slate-600 text-sm leading-relaxed">
                                    Our strategic offices in global locations, coupled with an extensive network, allow us to support your staffing requirements both locally and internationally.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. Tech Keywords with Background */}
            <section className="py-20 relative overflow-hidden flex items-center justify-center">
                {/* Background Image */}
                <div className="absolute inset-0 z-0 select-none">
                    <Image
                        src="/images/sectors-hero-skyline.png"
                        alt="Energy Background"
                        fill
                        className="object-cover"
                    />
                    <div className="absolute inset-0 bg-[#0B1B32]/90" />
                </div>

                <div className="container px-4 text-center relative z-10">
                    <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 text-xl md:text-2xl font-bold text-white uppercase tracking-wide">
                        <span className="hover:text-[#4DB6AC] transition-colors cursor-default">Steam & Gas</span>
                        <span className="text-[#4DB6AC]">|</span>
                        <span className="hover:text-[#4DB6AC] transition-colors cursor-default">Hydrogen</span>
                        <span className="text-[#4DB6AC]">|</span>
                        <span className="hover:text-[#4DB6AC] transition-colors cursor-default">Nuclear</span>
                        <span className="text-[#4DB6AC]">|</span>
                        <span className="hover:text-[#4DB6AC] transition-colors cursor-default">Solar</span>
                        <span className="text-[#4DB6AC]">|</span>
                        <span className="hover:text-[#4DB6AC] transition-colors cursor-default">T&D</span>
                    </div>
                    <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 text-xl md:text-2xl font-bold text-white uppercase tracking-wide mt-4">
                        <span className="hover:text-[#4DB6AC] transition-colors cursor-default">Battery Storage</span>
                        <span className="text-[#4DB6AC]">|</span>
                        <span className="hover:text-[#4DB6AC] transition-colors cursor-default">Wind</span>
                        <span className="text-[#4DB6AC]">|</span>
                        <span className="hover:text-[#4DB6AC] transition-colors cursor-default">Hydro</span>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <CTASection />
        </main>
    );
}
