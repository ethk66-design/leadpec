"use client";

import { Sector } from "@prisma/client";
import { motion } from "framer-motion";
import Image from "next/image";
import { CTASection } from "@/components/sections/cta";
import { Hammer, ShieldCheck, FileCheck, Wrench, Settings, HardHat, Flame, ArrowRight } from "lucide-react";
import { DynamicImage } from "@/components/ui/dynamic-image";

interface SectorDetailFabricationProps {
    sector: Sector;
    heroImage?: string;
}

const CERTS = [
    { name: "ASME", desc: "Boiler & Pressure Vessel", icon: Settings },
    { name: "AWS", desc: "American Welding Society", icon: Flame },
    { name: "API", desc: "Petroleum Institute", icon: FileCheck },
    { name: "ISO", desc: "International Standards", icon: ShieldCheck },
];

export function SectorDetailFabrication({ sector, heroImage }: SectorDetailFabricationProps) {
    return (
        <main className="flex-1 bg-white">
            {/* 1. Industrial Strength Hero */}
            <section className="relative h-[85vh] min-h-[600px] flex items-center justify-center overflow-hidden bg-[#1a202c]">
                <div className="absolute inset-0 z-0 select-none">
                    <DynamicImage
                        src={heroImage || "/images/fabrication-hero-industrial.png"}
                        fallbackSrc="/images/fabrication-hero-industrial.png"
                        alt="Fabrication Hero"
                        fill
                        className="object-cover"
                        priority
                    />
                    {/* Dark Industrial Overlay */}
                    <div className="absolute inset-0 bg-[#002f5f]/70 mix-blend-multiply" />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#001f3f] via-transparent to-[#001f3f]/50" />
                </div>

                <div className="container relative z-10 px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="max-w-4xl"
                    >
                        <h2 className="text-[#fb923c] font-bold tracking-[0.2em] uppercase mb-4 text-sm md:text-base border-2 border-[#fb923c] inline-flex items-center gap-2 px-4 py-1 rounded-sm">
                            <Hammer className="w-4 h-4" /> Structural Integrity
                        </h2>
                        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight font-heading uppercase">
                            FABRICATION & <br /> TECHNICAL SERVICES
                        </h1>
                        <p className="text-xl md:text-2xl text-blue-100 italic font-light mb-6 border-l-4 border-[#fb923c] pl-6">
                            "Strong Structures, Skilled Hands"
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* 2. Intro Section */}
            <section className="py-16 bg-white relative overflow-hidden">
                <div className="container px-4">
                    <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
                        <div className="order-2 lg:order-1 relative h-[500px] rounded-2xl overflow-hidden shadow-2xl border-b-8 border-[#fb923c]">
                            <Image
                                src="/images/fabrication-welder-professional.png"
                                alt="Welder at work"
                                fill
                                className="object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-8">
                                <div>
                                    <h3 className="text-white font-bold text-xl mb-1">Precision Welding</h3>
                                    <p className="text-gray-300 text-sm">High-pressure piping & structural frameworks</p>
                                </div>
                            </div>
                        </div>

                        <div className="order-1 lg:order-2 space-y-8">
                            <div className="flex items-center gap-3">
                                <div className="h-1 w-12 bg-[#004e92]" />
                                <span className="text-[#004e92] font-bold uppercase tracking-wider">Specialized Recruitment</span>
                            </div>
                            <p className="text-lg md:text-xl text-slate-700 leading-relaxed font-light">
                                LEADPEC delivers specialized recruitment solutions for fabrication and welding services critical to oil & gas, power generation, and heavy industrial projects.
                            </p>
                            <p className="text-lg md:text-xl text-slate-700 leading-relaxed font-light">
                                We provide certified, skilled professionals—including welders, fabricators, fitters, and supervisors—who possess technical expertise in high-pressure piping, structural steel, pressure vessels, and industrial frameworks.
                            </p>

                            <div className="grid grid-cols-2 gap-4 pt-4">
                                <div className="flex items-center gap-2 p-3 bg-slate-50 rounded-lg border border-slate-100">
                                    <HardHat className="w-5 h-5 text-[#fb923c]" />
                                    <span className="font-bold text-[#0B1B32]">Certified Welders</span>
                                </div>
                                <div className="flex items-center gap-2 p-3 bg-slate-50 rounded-lg border border-slate-100">
                                    <Wrench className="w-5 h-5 text-[#fb923c]" />
                                    <span className="font-bold text-[#0B1B32]">Master Fabricators</span>
                                </div>
                                <div className="flex items-center gap-2 p-3 bg-slate-50 rounded-lg border border-slate-100">
                                    <Settings className="w-5 h-5 text-[#fb923c]" />
                                    <span className="font-bold text-[#0B1B32]">Pipe Fitters</span>
                                </div>
                                <div className="flex items-center gap-2 p-3 bg-slate-50 rounded-lg border border-slate-100">
                                    <ShieldCheck className="w-5 h-5 text-[#fb923c]" />
                                    <span className="font-bold text-[#0B1B32]">Project Supervisors</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 3. Certifications Strip */}
                    <div className="bg-[#002f5f] rounded-3xl p-10 md:p-14 text-white mb-20 shadow-2xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-[#fb923c]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

                        <div className="relative z-10 text-center mb-10">
                            <h2 className="text-3xl font-bold mb-4 font-heading">Industry Standards & Compliance</h2>
                            <p className="text-blue-200 max-w-2xl mx-auto">
                                Our candidates are trained and experienced in industry standards, codes, and certifications. They bring the precision, safety awareness, and operational discipline required to execute high-value projects.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-4 gap-6 relative z-10">
                            {CERTS.map((cert, idx) => (
                                <div key={idx} className="bg-white/10 backdrop-blur-sm border border-white/10 p-6 rounded-xl hover:bg-white/20 transition-all group text-center">
                                    <div className="w-12 h-12 bg-[#fb923c] rounded-full flex items-center justify-center mx-auto mb-4 text-[#0B1B32] group-hover:scale-110 transition-transform">
                                        <cert.icon className="w-6 h-6" />
                                    </div>
                                    <h3 className="text-xl font-bold mb-1">{cert.name}</h3>
                                    <p className="text-sm text-blue-200">{cert.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* 4. Closing / Scope */}
                    <div className="max-w-5xl mx-auto text-center">
                        <h2 className="text-3xl font-bold text-[#0B1B32] mb-8 font-heading">
                            Minimize Downtime. Maximize Integrity.
                        </h2>
                        <p className="text-lg text-slate-600 leading-relaxed mb-10">
                            From onshore and offshore O&G facilities to large-scale power plants and industrial infrastructures, we supply manpower capable of supporting complex fabrication and welding operations. With LEADPEC, clients gain access to professionals who combine technical mastery with reliability, contributing directly to project success and operational excellence.
                        </p>
                        <div className="inline-block">
                            <a href="/contact" className="flex items-center gap-2 bg-[#004e92] text-white px-8 py-3 rounded-full font-bold hover:bg-[#003d73] transition-colors">
                                Secure Technical Talent <ArrowRight className="w-4 h-4" />
                            </a>
                        </div>
                    </div>

                </div>
            </section>

            <CTASection />
        </main>
    );
}
