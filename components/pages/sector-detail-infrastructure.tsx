"use client";

import { Sector } from "@prisma/client";
import { motion } from "framer-motion";
import Image from "next/image";
import { CTASection } from "@/components/sections/cta";
import { Zap, Construction, Globe2, Gauge, HardHat, ArrowRight, Truck } from "lucide-react";
import { DynamicImage } from "@/components/ui/dynamic-image";

interface SectorDetailInfrastructureProps {
    sector: Sector;
    heroImage?: string;
    images?: Record<string, string>;
}

export function SectorDetailInfrastructure({ sector, heroImage, images }: SectorDetailInfrastructureProps) {
    return (
        <main className="flex-1 bg-zinc-50">
            {/* 1. Hero: Industrial Scale */}
            <section className="relative h-[85vh] min-h-[600px] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0 select-none">
                    <DynamicImage
                        src={heroImage || "/images/sector-feature-construction.png"}
                        fallbackSrc="/images/sector-feature-construction.png"
                        alt="Infrastructure Hero"
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#0B1B32]/80 via-[#0B1B32]/40 to-transparent" />
                </div>

                <div className="container relative z-10 px-4">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1 }}
                        className="max-w-5xl"
                    >
                        <h1 className="text-5xl md:text-8xl font-black text-white mb-6 tracking-tight uppercase font-heading">
                            INFRASTRUCTURE & <br /> <span className="text-[#4DB6AC]">UTILITIES</span>
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-300 max-w-3xl font-light leading-relaxed italic border-l-4 border-[#4DB6AC] pl-6">
                            &quot;Engineering the Future of Infrastructure, Powered by People and Precision&quot;
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* 2. Intro Text */}
            <section className="py-16 bg-white">
                <div className="container px-4">
                    <div className="max-w-4xl mx-auto text-center mb-16">
                        <p className="text-lg md:text-xl text-slate-600 leading-relaxed text-left md:text-justify">
                            Across globally, visionary infrastructure and utilities development is transforming nations, powering economic diversification, and shaping world-class urban experiences. Rapid urbanization, technological advancements and demographic shifts are just a few factors contributing to the world’s increasing demand for modern and powerful infrastructure — with this comes the daunting task of recruiting a talented workforce for your global infrastructure projects.
                        </p>
                        <p className="text-lg md:text-xl text-slate-600 leading-relaxed text-left md:text-justify mt-6">
                            From conceptual design to final completion, LEADPEC infrastructure experts for monumental projects worldwide. We pair talent with main contractors, design houses and traditional PCM and EPC projects to build roads, bridges, highways, dams, tunnels and more.
                        </p>
                    </div>

                    {/* Challenges vs Solution */}
                    <div className="grid lg:grid-cols-2 gap-8 mb-12">
                        {/* Challenge */}
                        <div className="bg-slate-100 p-8 rounded-2xl border border-slate-200">
                            <h3 className="text-2xl font-bold text-[#0B1B32] mb-6 flex items-center gap-3">
                                <span className="w-8 h-8 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-sm font-bold">!</span>
                                The Challenge
                            </h3>
                            <ul className="space-y-4 text-slate-700">
                                <li className="flex items-start gap-3">
                                    <div className="w-1.5 h-1.5 bg-red-400 rounded-full mt-2 flex-shrink-0" />
                                    <span><strong>Project demand:</strong> Rapid urbanization is driving up demand for resilient infrastructure.</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="w-1.5 h-1.5 bg-red-400 rounded-full mt-2 flex-shrink-0" />
                                    <span><strong>Global talent gap:</strong> Projects are larger and more complex, increasing demand for top expertise.</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="w-1.5 h-1.5 bg-red-400 rounded-full mt-2 flex-shrink-0" />
                                    <span><strong>Quick access:</strong> Rapid industry growth makes it hard to find skilled workers fast.</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="w-1.5 h-1.5 bg-red-400 rounded-full mt-2 flex-shrink-0" />
                                    <span><strong>Safety compliance:</strong> Unified safety strategies are difficult to maintain worldwide.</span>
                                </li>
                            </ul>
                        </div>

                        {/* Solution */}
                        <div className="bg-[#0B1B32] p-8 rounded-2xl text-white">
                            <h3 className="text-2xl font-bold text-[#4DB6AC] mb-6 flex items-center gap-3">
                                <span className="w-8 h-8 rounded-full bg-[#4DB6AC] text-[#0B1B32] flex items-center justify-center text-sm font-bold">✓</span>
                                The LEADPEC Solution
                            </h3>
                            <ul className="space-y-4 text-gray-300">
                                <li className="flex items-start gap-3">
                                    <div className="w-1.5 h-1.5 bg-[#4DB6AC] rounded-full mt-2 flex-shrink-0" />
                                    <span><strong>Local connections:</strong> Established offices to quickly find the local workforce you need.</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="w-1.5 h-1.5 bg-[#4DB6AC] rounded-full mt-2 flex-shrink-0" />
                                    <span><strong>High-volume hiring:</strong> Fast access to top talent in large numbers.</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="w-1.5 h-1.5 bg-[#4DB6AC] rounded-full mt-2 flex-shrink-0" />
                                    <span><strong>Safety prioritized:</strong> HSEQ standards and 24/7 emergency help for peace of mind.</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="w-1.5 h-1.5 bg-[#4DB6AC] rounded-full mt-2 flex-shrink-0" />
                                    <span><strong>Remote site services:</strong> Accommodation, food, and transport even in remote locations.</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. Visual Segments (Bridges & Roads / Utilities) */}
            <section className="py-12 bg-zinc-900 text-white">
                <div className="container px-4">
                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Bridges & Roads */}
                        <div className="relative h-[400px] rounded-2xl overflow-hidden group border border-white/10">
                            <Image
                                src={images?.["SECTOR_INFRASTRUCTURE_FEATURE_1"] || "/images/sector-feature-construction.png"}
                                alt="Bridges & Roads"
                                fill
                                className="object-cover opacity-50 group-hover:opacity-60 transition-opacity"
                            />
                            <div className="absolute inset-0 p-8 flex flex-col justify-end bg-gradient-to-t from-black/90 via-black/40 to-transparent">
                                <h3 className="text-3xl font-bold text-[#4DB6AC] mb-4 uppercase">BRIDGES & ROADS</h3>
                                <ul className="space-y-2 text-sm md:text-base font-medium text-gray-200">
                                    <li>• Precast and Segmental</li>
                                    <li>• Post Tensioning and Prestressing Systems</li>
                                    <li>• Incremental Launching and Balanced Cantilever</li>
                                    <li>• Steel and Composite Bridge Systems</li>
                                    <li>• Cable Stayed and Suspension Technologies</li>
                                    <li>• Arch and Truss Solutions</li>
                                </ul>
                            </div>
                        </div>

                        {/* Utilities */}
                        <div className="relative h-[400px] rounded-2xl overflow-hidden group border border-white/10">
                            <Image
                                src={images?.["SECTOR_INFRASTRUCTURE_FEATURE_2"] || "/images/water-pipe-site.png"}
                                alt="Utilities"
                                fill
                                className="object-cover opacity-50 group-hover:opacity-60 transition-opacity"
                            />
                            <div className="absolute inset-0 p-8 flex flex-col justify-end bg-gradient-to-t from-black/90 via-black/40 to-transparent">
                                <h3 className="text-3xl font-bold text-[#008CBA] mb-4 uppercase">UTILITIES</h3>
                                <ul className="space-y-2 text-sm md:text-base font-medium text-gray-200">
                                    <li>• Water & Sewer Network Installation</li>
                                    <li>• Electrical & Telecom Infrastructure</li>
                                    <li>• District Cooling, Gas, & Industrial Utilities</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 4. Detailed Technology Sections */}
            <section className="py-16 bg-white">
                <div className="container px-4 space-y-16">

                    {/* Bridge Construction */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-4">
                            <div className="h-0.5 w-12 bg-[#4DB6AC]" />
                            <h2 className="text-3xl font-bold text-[#0B1B32]">Bridge Construction Technology</h2>
                        </div>
                        <p className="text-lg text-slate-600 italic">&quot;Stronger bridges start with stronger talent. LEADPEC delivers both.&quot;</p>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            <div className="p-6 bg-slate-50 rounded-xl border border-slate-100 hover:border-[#4DB6AC] transition-colors">
                                <h4 className="font-bold text-[#0B1B32] mb-2">Precast & Segmental</h4>
                                <p className="text-sm text-slate-600">Rapid, precise assembly on major interchanges and metro corridors. Cuts time on site.</p>
                            </div>
                            <div className="p-6 bg-slate-50 rounded-xl border border-slate-100 hover:border-[#4DB6AC] transition-colors">
                                <h4 className="font-bold text-[#0B1B32] mb-2">Post Tensioning</h4>
                                <p className="text-sm text-slate-600">Essential for long spans and heavy traffic routes. Supports elevated expressways.</p>
                            </div>
                            <div className="p-6 bg-slate-50 rounded-xl border border-slate-100 hover:border-[#4DB6AC] transition-colors">
                                <h4 className="font-bold text-[#0B1B32] mb-2">Incremental Launching</h4>
                                <p className="text-sm text-slate-600">Ideal for locations with restricted access. Enables controlled, staged construction.</p>
                            </div>
                            <div className="p-6 bg-slate-50 rounded-xl border border-slate-100 hover:border-[#4DB6AC] transition-colors">
                                <h4 className="font-bold text-[#0B1B32] mb-2">Cable Stayed</h4>
                                <p className="text-sm text-slate-600">Signature crossings with iconic, long-reaching spans and high visual impact.</p>
                            </div>
                            <div className="p-6 bg-slate-50 rounded-xl border border-slate-100 hover:border-[#4DB6AC] transition-colors">
                                <h4 className="font-bold text-[#0B1B32] mb-2">Digital & Automated</h4>
                                <p className="text-sm text-slate-600">BIM, robotic surveying, and automated precast production driving global delivery.</p>
                            </div>
                        </div>
                    </div>

                    {/* Road Construction */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-4">
                            <div className="h-0.5 w-12 bg-[#0B1B32]" />
                            <h2 className="text-3xl font-bold text-[#0B1B32]">Road Construction Technology</h2>
                        </div>
                        <p className="text-lg text-slate-600 italic">&quot;From Foundation to Finish – Technology Meets Expertise on Every Road.&quot;</p>
                        <div className="grid md:grid-cols-2 gap-8">
                            <div>
                                <h4 className="font-bold text-xl text-[#0B1B32] mb-3">Pavement Engineering</h4>
                                <p className="text-slate-600 text-sm leading-relaxed">High-performance asphalt mixes and warm-mix technologies for durability on heavy traffic corridors.</p>
                            </div>
                            <div>
                                <h4 className="font-bold text-xl text-[#0B1B32] mb-3">Concrete Pavements</h4>
                                <p className="text-slate-600 text-sm leading-relaxed">Slipform paving and laser-guided grade control for precision and longevity in rigid systems.</p>
                            </div>
                            <div>
                                <h4 className="font-bold text-xl text-[#0B1B32] mb-3">Automated Grading</h4>
                                <p className="text-slate-600 text-sm leading-relaxed">GPS-controlled graders and 3D machine control to accelerate bulk earthworks.</p>
                            </div>
                            <div>
                                <h4 className="font-bold text-xl text-[#0B1B32] mb-3">Drainage Systems</h4>
                                <p className="text-slate-600 text-sm leading-relaxed">Engineered channels and deep stormwater networks preventing flooding and erosion.</p>
                            </div>
                        </div>
                    </div>

                    {/* Utilities */}
                    <div className="bg-[#0f172a] text-white p-12 rounded-3xl relative overflow-hidden">
                        <div className="relative z-10 space-y-8">
                            <h2 className="text-3xl font-bold">Utilities Construction Technology</h2>
                            <p className="text-xl text-[#4DB6AC] italic">&quot;Building Smarter Cities, One Utility at a Time.&quot;</p>
                            <div className="grid md:grid-cols-2 gap-12">
                                <div>
                                    <h4 className="font-bold text-lg mb-2 text-white">Water & Sewer Networks</h4>
                                    <p className="text-slate-400 text-sm">Modern trenching, pipe bursting, and high-strength materials (HDPE, GRP) for durable underground networks.</p>
                                </div>
                                <div>
                                    <h4 className="font-bold text-lg mb-2 text-white">Electrical & Telecom</h4>
                                    <p className="text-slate-400 text-sm">Micro-trenching, duct banks, and fiber deployment supporting high-speed communication and power distribution.</p>
                                </div>
                                <div>
                                    <h4 className="font-bold text-lg mb-2 text-white">District Cooling & Gas</h4>
                                    <p className="text-slate-400 text-sm">Specialized insulated networks and corrosion-resistant coatings for industrial systems and smart cities.</p>
                                </div>
                                <div>
                                    <h4 className="font-bold text-lg mb-2 text-white">Mapping & Detection</h4>
                                    <p className="text-slate-400 text-sm">GIS mapping, ground-penetrating radar, and digital tools to reduce clashes and enhance safety.</p>
                                </div>
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
