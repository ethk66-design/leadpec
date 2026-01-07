"use client";

import { Sector } from "@prisma/client";
import { motion } from "framer-motion";
import Image from "next/image";
import { CTASection } from "@/components/sections/cta";
import { Truck, HardHat, Hammer, ShieldCheck, Ruler, Wrench, ArrowRight } from "lucide-react";
import { DynamicImage } from "@/components/ui/dynamic-image";

interface SectorDetailHeavyEquipmentProps {
    sector: Sector;
    heroImage?: string;
    images?: Record<string, string>;
}

const OPERATORS = [
    { name: "Tower Crane", icon: Hammer }, // Conceptual icon
    { name: "Mobile Crane", icon: Truck },
    { name: "Excavator", icon: Hammer },
    { name: "Loader", icon: Truck },
    { name: "Bulldozer", icon: Truck },
    { name: "Forklift", icon: Truck },
    { name: "Backhoe", icon: Hammer },
    { name: "Grader", icon: Ruler },
    { name: "Paver", icon: Ruler },
];

export function SectorDetailHeavyEquipment({ sector, heroImage, images }: SectorDetailHeavyEquipmentProps) {
    return (
        <main className="flex-1 bg-white">
            {/* 1. Hero: Standard Corporate Blue Theme */}
            <section className="relative h-[85vh] min-h-[600px] flex items-center justify-center overflow-hidden bg-[#0c4a6e]">
                <div className="absolute inset-0 z-0 select-none">
                    <DynamicImage
                        src={heroImage || "/images/heavy-equipment-hero-v2.png"}
                        fallbackSrc="/images/heavy-equipment-hero-v2.png"
                        alt="Heavy Equipment Hero"
                        fill
                        className="object-cover"
                        priority
                    />
                    {/* Corporate Blue Overlay */}
                    <div className="absolute inset-0 bg-[#0c4a6e]/20 mix-blend-multiply" />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#0c4a6e]/70 via-[#0c4a6e]/20 to-transparent" />
                </div>

                <div className="container relative z-10 px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="max-w-4xl"
                    >
                        <h2 className="text-[#4DB6AC] font-bold tracking-[0.2em] uppercase mb-4 text-sm md:text-base border-2 border-[#4DB6AC] inline-flex items-center gap-2 px-4 py-1 rounded-sm">
                            <HardHat className="w-4 h-4" /> Operational Excellence
                        </h2>
                        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight font-heading uppercase">
                            HEAVY & CONSTRUCTION <br /> <span className="text-[#4DB6AC]">EQUIPMENT</span>
                        </h1>
                        <p className="text-xl md:text-2xl text-blue-100 italic font-light mb-6 border-l-4 border-[#4DB6AC] pl-6">
                            &quot;Operators That Move Projects Forward&quot;
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* 2. Intro & GCC Experinence */}
            <section className="py-16 bg-white relative">
                <div className="container px-4">
                    <div className="grid lg:grid-cols-2 gap-16 items-start">
                        <div className="space-y-6">
                            <h2 className="text-4xl font-bold text-[#0B1B32] font-heading leading-tight">
                                Precision, Reliability, & <br /> Technical Expertise
                            </h2>
                            <p className="text-lg text-slate-700 leading-relaxed font-light">
                                LEADPEC specializes in providing skilled manpower for the heavy and construction equipment sector. We recruit certified operators, technicians, supervisors, and engineers trained to handle a wide range of machinery ensuring safety, efficiency, and uninterrupted on-site operations.
                            </p>

                            <div className="bg-blue-50 border-l-4 border-[#008CBA] p-6 rounded-r-lg">
                                <h4 className="font-bold text-[#008CBA] text-sm uppercase tracking-wider mb-2">Key Advantage</h4>
                                <p className="text-[#0B1B32] font-bold text-lg">
                                    We provide experienced GCC operators and drivers, familiar with regional safety standards and site conditions.
                                </p>
                            </div>
                        </div>

                        {/* Image Split */}
                        <div className="relative h-[400px] md:h-[500px] rounded-2xl overflow-hidden shadow-2xl skew-x-[-3deg] border-r-8 border-[#008CBA]">
                            <Image
                                src={images?.["SECTOR_HEAVY_EQUIPMENT_INTRO_1"] || "/images/heavy-equipment-fleet-modern.png"}
                                alt="Heavy Machinery Fleet"
                                fill
                                className="object-cover skew-x-[3deg] scale-110"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. Operator Grid - "The Fleet" */}
            <section className="py-20 bg-slate-50">
                <div className="container px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-[#0B1B32] mb-4 font-heading">Certified Operators & Machinery</h2>
                        <p className="text-slate-600 max-w-2xl mx-auto">
                            Our candidates are vetted through license verification and safety checks to ensure readiness for large-scale infrastructure, mining, and oil & gas projects.
                        </p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {OPERATORS.map((op, idx) => (
                            <div key={idx} className="bg-white p-6 rounded-xl border-b-4 border-[#008CBA] shadow-sm hover:shadow-lg transition-all flex flex-col items-center text-center group">
                                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-[#008CBA] transition-colors">
                                    {/* Using a generic icon for now, ideally specific icons */}
                                    <op.icon className="w-7 h-7 text-slate-600 group-hover:text-white" />
                                </div>
                                <h3 className="font-bold text-[#0B1B32] text-lg">{op.name}</h3>
                                <span className="text-xs text-slate-400 mt-1 uppercase tracking-widest font-semibold">Certified</span>
                            </div>
                        ))}
                        {/* Additional Card for GCC Drivers */}
                        <div className="bg-[#0B1B32] p-6 rounded-xl border-b-4 border-[#4DB6AC] shadow-md flex flex-col items-center justify-center text-center">
                            <h3 className="font-bold text-[#4DB6AC] text-xl mb-1">GCC Experienced</h3>
                            <p className="text-blue-200 text-sm">Drivers & Operators</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 4. Safety & Compliance Feature */}
            <section className="py-20 bg-white">
                <div className="container px-4">
                    <div className="bg-[#0f172a] rounded-3xl p-10 md:p-16 relative overflow-hidden text-white">
                        <div className="absolute inset-0 bg-[#008CBA]/20 mix-blend-overlay" /> {/* Subtle Blue Overlay */}

                        <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
                            <div>
                                <h2 className="text-3xl font-bold mb-6 font-heading">Safety First. Always.</h2>
                                <p className="text-blue-100 leading-relaxed mb-6">
                                    By combining industry knowledge, technical insight, and a global talent network, we deliver manpower solutions that strengthen project execution, enhance productivity, and minimize downtime.
                                </p>
                                <ul className="space-y-4">
                                    <li className="flex items-center gap-3">
                                        <ShieldCheck className="w-6 h-6 text-[#4DB6AC]" />
                                        <span>Rigorous Competency Assessments</span>
                                    </li>
                                    <li className="flex items-center gap-3">
                                        <FileCheck className="w-6 h-6 text-[#4DB6AC]" />
                                        <span>License & Certification Verification</span>
                                    </li>
                                    <li className="flex items-center gap-3">
                                        <HardHat className="w-6 h-6 text-[#4DB6AC]" />
                                        <span>Safety Compliance Checks</span>
                                    </li>
                                </ul>
                            </div>
                            <div className="relative h-[300px] border-4 border-[#4DB6AC] rounded-xl overflow-hidden">
                                <Image
                                    src={images?.["SECTOR_HEAVY_EQUIPMENT_FEATURE_1"] || "/images/heavy-equipment-safety-inspection.png"}
                                    alt="Safety Inspection"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 5. Closing */}
            <section className="py-20 bg-slate-50 text-center">
                <div className="container px-4 max-w-4xl mx-auto">
                    <h2 className="text-3xl font-bold text-[#0B1B32] mb-6 font-heading">
                        Drive Results with Skilled Manpower
                    </h2>
                    <p className="text-lg text-slate-600 mb-8">
                        With LEADPEC, clients gain access to professionals who uphold safety and elevate operational excellence across every heavy equipment deployment.
                    </p>
                    <button className="bg-[#008CBA] text-white px-8 py-3 rounded-full font-bold hover:bg-[#007196] transition-colors flex items-center gap-2 mx-auto shadow-lg shadow-blue-300/50">
                        Explore Equipment Manpower <ArrowRight className="w-5 h-5" />
                    </button>
                </div>
            </section>

            <CTASection />
        </main>
    );
}

function FileCheck(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
            <polyline points="14 2 14 8 20 8" />
            <path d="m9 15 2 2 4-4" />
        </svg>
    )
}
