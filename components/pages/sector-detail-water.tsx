"use client";

import { Sector } from "@prisma/client";
import { motion } from "framer-motion";
import Image from "next/image";
import { CTASection } from "@/components/sections/cta";
import { Droplet, Waves, Recycle, FlaskConical, Globe, ArrowRight, Activity } from "lucide-react";
import { DynamicImage } from "@/components/ui/dynamic-image";

interface SectorDetailWaterProps {
    sector: Sector;
    heroImage?: string;
}

export function SectorDetailWater({ sector, heroImage }: SectorDetailWaterProps) {
    return (
        <main className="flex-1 bg-white">
            {/* 1. Pure Aqua Hero */}
            <section className="relative h-[85vh] min-h-[600px] flex items-center justify-center overflow-hidden bg-[#0f172a]">
                <div className="absolute inset-0 z-0 select-none">
                    <DynamicImage
                        src={heroImage || "/images/water-sector-hero.png"}
                        fallbackSrc="/images/water-sector-hero.png"
                        alt="Water Sector Hero"
                        fill
                        className="object-cover"
                        priority
                    />
                    {/* Strong Teal Overlay for Water Theme */}
                    <div className="absolute inset-0 bg-[#0d9488]/70 mix-blend-multiply" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-transparent to-[#0f172a]/40" />
                </div>

                <div className="container relative z-10 px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="max-w-4xl"
                    >
                        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight font-heading uppercase">
                            WATER & WASTE WATER
                        </h1>
                        <p className="text-xl md:text-2xl text-[#e0f2fe] italic font-light mb-6">
                            "Engineering Clean Water Through Specialized Manpower"
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* 2. Intro Text */}
            <section className="py-16 bg-white">
                <div className="container px-4">
                    <div className="max-w-4xl mx-auto text-center mb-16">
                        <p className="text-lg md:text-xl text-slate-600 leading-relaxed text-left md:text-justify">
                            LEADPEC delivers elite manpower for modern wastewater treatment, ensuring seamless integration of advanced biology, precise chemistry, robust mechanics, and intelligent automation. Our specialists support municipal utilities, industrial zones, refineries, and district cooling networks, maintaining effluent quality under the GCC&apos;s toughest environmental and regulatory standards. From Process, Civil, Mechanical, and E&I Engineers to MBR/MBBR experts, commissioning engineers, and multi-skilled technicians, we provide high-caliber teams equipped for high-value, complex projects compliant with <span className="font-bold text-[#0d9488]">SEC, DEWA, FEWA, SWCC, Kahramaa, PAEW, and EWA</span> requirements.
                        </p>
                    </div>

                    {/* Segments Box */}
                    <div className="mb-12">
                        <h2 className="text-3xl font-bold text-[#0f172a] bg-[#00609C] text-white inline-block px-8 py-2 rounded-r-full mb-8">
                            Segments
                        </h2>
                        <div className="grid md:grid-cols-2 gap-8 text-white">
                            {/* Box 1 */}
                            <div className="bg-[#0B1B32] p-8 rounded-2xl shadow-lg border-l-4 border-[#0d9488]">
                                <ul className="space-y-4 text-lg">
                                    <li className="flex items-center gap-3">
                                        <div className="w-2 h-2 bg-white rounded-full flex-shrink-0" /> Reverse Osmosis (RO) Desalination Plants
                                    </li>
                                    <li className="flex items-center gap-3">
                                        <div className="w-2 h-2 bg-white rounded-full flex-shrink-0" /> Multi-Stage Flash (MSF) Distillation Plants
                                    </li>
                                    <li className="flex items-center gap-3">
                                        <div className="w-2 h-2 bg-white rounded-full flex-shrink-0" /> Multi-Effect Distillation (MED) Plants
                                    </li>
                                    <li className="flex items-center gap-3">
                                        <div className="w-2 h-2 bg-white rounded-full flex-shrink-0" /> Hybrid Desalination Systems (RO + Thermal)
                                    </li>
                                    <li className="flex items-center gap-3">
                                        <div className="w-2 h-2 bg-white rounded-full flex-shrink-0" /> Brine Management & Zero Liquid Discharge (ZLD)
                                    </li>
                                </ul>
                            </div>
                            {/* Box 2 */}
                            <div className="bg-[#0B1B32] p-8 rounded-2xl shadow-lg border-l-4 border-[#0d9488]">
                                <ul className="space-y-4 text-lg">
                                    <li className="flex items-center gap-3">
                                        <div className="w-2 h-2 bg-white rounded-full flex-shrink-0" /> Sewage Treatment Plant
                                    </li>
                                    <li className="flex items-center gap-3">
                                        <div className="w-2 h-2 bg-white rounded-full flex-shrink-0" /> Pumping and Lift Station
                                    </li>
                                    <li className="flex items-center gap-3">
                                        <div className="w-2 h-2 bg-white rounded-full flex-shrink-0" /> Waste to Resource (WTR)
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. Detailed Sections */}
            <section className="py-16 bg-slate-50">
                <div className="container px-4 space-y-20">

                    {/* Desalination */}
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div className="order-2 md:order-1">
                            <h3 className="text-3xl font-bold text-[#0B1B32] mb-4">DESALINATION PLANT</h3>
                            <p className="text-[#0d9488] font-bold italic mb-6">"Engineering excellence. Reliable output. Skilled people—always."</p>
                            <p className="text-slate-600 mb-4 leading-relaxed">
                                Desalination today goes far beyond converting seawater to fresh water. It’s an engineering-intensive industry built on advanced processes, energy optimization, and the ability to run at peak performance around the clock. Success requires highly skilled professionals at every stage—from conceptual design and EPC delivery to commissioning, operations, and lifecycle management.
                            </p>
                            <p className="text-slate-600 mb-4 leading-relaxed">
                                LEADPEC stands at the center of this demand, supplying the specialized manpower that keeps desalination plants running.
                            </p>
                            <p className="text-slate-600 leading-relaxed">
                                Our network of RO process professionals, membrane specialists, thermal and heat-transfer engineers, combined-cycle integration experts, and fully qualified technical and multinational workforce familiar with SEC, DEWA, FEWA, SWCC, Kahramaa, PAEW, EWA standards.
                            </p>
                        </div>
                        <div className="order-1 md:order-2 relative h-[350px] rounded-2xl overflow-hidden shadow-xl">
                            <Image
                                src="/images/water-desalination-plant.png"
                                alt="Desalination"
                                fill
                                className="object-cover"
                            />
                        </div>
                    </div>

                    {/* Wastewater */}
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div className="relative h-[350px] rounded-2xl overflow-hidden shadow-xl">
                            <Image
                                src="/images/water-wastewater-treatment.png"
                                alt="Wastewater Treatment"
                                fill
                                className="object-cover"
                            />
                        </div>
                        <div>
                            <h3 className="text-3xl font-bold text-[#0B1B32] mb-4">WASTE WATER TREATMENT PLANT</h3>
                            <p className="text-[#0d9488] font-bold italic mb-6">"Engineering Clean Water Through Specialized Manpower"</p>
                            <p className="text-slate-600 mb-4 leading-relaxed">
                                Modern wastewater treatment demands advanced biology, chemical accuracy, mechanical strength, and intelligent automation working flawlessly together. Every stage—from inlet screening to tertiary polishing—requires specialists capable of maintaining effluent quality under the GCC’s toughest environmental and regulatory pressures.
                            </p>
                            <p className="text-slate-600 mb-4 leading-relaxed">
                                LEADPEC supplies the high-caliber manpower that keeps wastewater plants performing at their peak. We support municipal utilities, industrial zones, refineries, and district cooling networks with experts ready to deliver on high-magnitude, high-value project execution.
                            </p>
                            <p className="text-slate-600 leading-relaxed">
                                With LEADPEC, clients secure the talent that delivers reliable people, reliable treatment, and reliable results—safely, efficiently, and on time.
                            </p>
                        </div>
                    </div>

                    {/* Sewage Treatment */}
                    <div className="bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-slate-100">
                        <h3 className="text-3xl font-bold text-[#0B1B32] mb-6">SEWAGE TREATMENT PLANT & PUMPING STATION</h3>
                        <p className="text-slate-600 mb-6 leading-relaxed">
                            LEADPEC is a dedicated recruitment partner serving the GCC’s critical wastewater and utilities sector. We provide qualified, experienced, and safety-driven professionals for Sewage Treatment Plants (STPs), Effluent Treatment Plants (ETPs), and Pumping Stations across government entities, utilities providers, EPC contractors, and facility management companies.
                        </p>
                        <p className="text-slate-600 mb-6 leading-relaxed">
                            Our team understands the importance of compliance, operational continuity, and reliable manpower in the region’s growing water infrastructure. We supply certified operators, technicians, engineers, and supervisors who meet GCC regulatory and safety standards.
                        </p>
                        <blockquote className="border-l-4 border-[#0d9488] pl-6 italic text-slate-700 bg-slate-50 py-4 my-6">
                            "Our advantage is simple: we recruit only for utilities and wastewater roles. That focus helps us deliver faster, smarter, and more accurate hiring than general agencies."
                        </blockquote>
                        <p className="text-slate-600 leading-relaxed">
                            From technical screening to on-boarding and mobilization, we handle everything. You get qualified professionals, reduced downtime, and a more efficient operation—without wasting time to discover talent pool.
                        </p>
                    </div>

                    {/* Waste to Resource */}
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div>
                            <h3 className="text-3xl font-bold text-[#0B1B32] mb-4">Waste to Resource (WTR)</h3>
                            <p className="text-[#0d9488] font-bold italic mb-6">"Transforming Waste. Empowering Operations. Delivering Talent That Drives Results."</p>
                            <p className="text-slate-600 mb-4 leading-relaxed">
                                Waste-to-Resource projects require a workforce that understands innovation, precision, and sustainability. As governments and industries push toward circular-economy goals, the success of WTR facilities depends on skilled, reliable professionals who can operate modern waste-processing technologies with confidence.
                            </p>
                            <p className="text-slate-600 mb-4 leading-relaxed">
                                At LEADPEC, we recruit and supply the manpower that drives these facilities. We support operations transforming waste into energy, compost, biogas, recycled materials, and other high-value outputs—helping clients enhance performance while meeting strict environmental and safety standards.
                            </p>
                            <p className="text-slate-600 leading-relaxed">
                                Our expertise spans advanced WTR technologies, including: Anaerobic digestion, Thermal conversion, Biogas upgrading systems, energy-from-waste (EfW) processes. We deliver multi-talented technical from top to bottom that arrives ready to work from day one.
                            </p>
                        </div>
                        <div className="relative h-[350px] rounded-2xl overflow-hidden shadow-xl">
                            <Image
                                src="/images/water-waste-to-resource.png"
                                alt="Waste to Resource"
                                fill
                                className="object-cover"
                            />
                        </div>
                    </div>

                </div>
            </section>


            {/* CTA */}
            <CTASection />
        </main>
    );
}
