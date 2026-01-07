"use client";

import { Sector } from "@prisma/client";
import { motion } from "framer-motion";
import Image from "next/image";
import { CTASection } from "@/components/sections/cta";
import { HeartPulse, Stethoscope, Activity, FileCheck, Users, TrendingUp, ShieldCheck, Microscope, ArrowRight } from "lucide-react";
import { DynamicImage } from "@/components/ui/dynamic-image";

interface SectorDetailHealthcareProps {
    sector: Sector;
    heroImage?: string;
    images?: Record<string, string>;
}

export function SectorDetailHealthcare({ sector, heroImage, images }: SectorDetailHealthcareProps) {
    return (
        <main className="flex-1 bg-white">
            {/* 1. Hero */}
            <section className="relative h-[85vh] min-h-[600px] flex items-center justify-center overflow-hidden bg-[#0a2540]">
                <div className="absolute inset-0 z-0 select-none">
                    <DynamicImage
                        src={heroImage || "/images/healthcare-facility.png"}
                        fallbackSrc="/images/healthcare-facility.png"
                        alt="Healthcare Hero"
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-[#0a2540]/30 mix-blend-multiply" />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#0e7c7b]/70 via-[#0a2540]/30 to-transparent" />
                </div>

                <div className="container relative z-10 px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="max-w-4xl"
                    >
                        <h2 className="text-[#4DB6AC] font-bold tracking-[0.2em] uppercase mb-4 text-sm md:text-base border-2 border-[#4DB6AC] inline-flex items-center gap-2 px-4 py-1 rounded-sm">
                            <HeartPulse className="w-4 h-4" /> Global Life Sciences
                        </h2>
                        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight font-heading uppercase">
                            HEALTHCARE & <br /> PHARMACEUTICAL
                        </h1>
                        <p className="text-xl md:text-2xl text-teal-50 italic font-light mb-6 border-l-4 border-[#4DB6AC] pl-6">
                            &quot;Talent That Heals. Teams That Deliver&quot;
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* 2. Intro Split with Image Collage */}
            <section className="py-16 bg-white relative overflow-hidden">
                <div className="container px-4">
                    <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
                        <div className="space-y-8">
                            <h2 className="text-4xl font-bold text-[#0B1B32] font-heading leading-tight">
                                Specialized Partners in <br /> <span className="text-[#4DB6AC]">Clinical Excellence</span>
                            </h2>
                            <p className="text-lg text-slate-700 leading-relaxed font-light">
                                We are a specialist healthcare and pharmaceutical recruitment partner focused on helping organizations build strong clinical, scientific, and operational teams.
                            </p>
                            <p className="text-lg text-slate-700 leading-relaxed font-light">
                                Our consultants come from medical, regulatory, and life sciences backgrounds, which allows us to understand the skills, compliance standards, and performance capabilities required across hospitals, research environments, and pharmaceutical operations.
                            </p>
                        </div>

                        <div className="relative h-[500px] w-full">
                            <div className="absolute top-0 right-0 w-4/5 h-4/5 z-10 rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
                                <Image
                                    src={images?.["SECTOR_HEALTHCARE_INTRO_1"] || "/images/healthcare-team-modern.png"}
                                    alt="Medical Team"
                                    fill
                                    className="object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#0B1B32]/60 to-transparent" />
                            </div>
                            <div className="absolute bottom-0 left-0 w-3/5 h-3/5 z-20 rounded-2xl overflow-hidden shadow-2xl border-4 border-[#4DB6AC]">
                                <Image
                                    src={images?.["SECTOR_HEALTHCARE_INTRO_2"] || "/images/healthcare-consultation.png"}
                                    alt="Consultation"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. Scope of Services Grid with Background */}
            <section className="py-20 bg-slate-50 relative">
                <div className="container px-4 relative z-10">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-3xl font-bold text-[#0B1B32] mb-6 font-heading">Comprehensive Talent Solutions</h2>
                        <p className="text-slate-600">
                            Our work spans clinical hiring, pharmaceutical and biotech talent acquisition, executive search, and both permanent and contract staffing.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Clinical Hiring */}
                        <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all group border-t-4 border-[#4DB6AC]">
                            <div className="w-14 h-14 bg-teal-50 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <Stethoscope className="w-7 h-7 text-[#4DB6AC]" />
                            </div>
                            <h3 className="text-xl font-bold text-[#0B1B32] mb-4">Clinical Hiring</h3>
                            <ul className="space-y-3">
                                {['Medicine & Surgery', 'Specialist Nursing', 'Clinical Research'].map((item, i) => (
                                    <li key={i} className="flex items-center gap-2 text-slate-600">
                                        <div className="w-1.5 h-1.5 rounded-full bg-[#4DB6AC]" /> {item}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Pharma & Biotech */}
                        <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all group border-t-4 border-[#008CBA]">
                            <div className="w-14 h-14 bg-blue-50 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <Microscope className="w-7 h-7 text-[#008CBA]" />
                            </div>
                            <h3 className="text-xl font-bold text-[#0B1B32] mb-4">Pharma & Biotech</h3>
                            <ul className="space-y-3">
                                {['Regulatory Affairs', 'Quality Assurance', 'Pharmacovigilance', 'Manufacturing'].map((item, i) => (
                                    <li key={i} className="flex items-center gap-2 text-slate-600">
                                        <div className="w-1.5 h-1.5 rounded-full bg-[#008CBA]" /> {item}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Leadership */}
                        <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all group border-t-4 border-[#0B1B32]">
                            <div className="w-14 h-14 bg-slate-100 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <Users className="w-7 h-7 text-[#0B1B32]" />
                            </div>
                            <h3 className="text-xl font-bold text-[#0B1B32] mb-4">Leadership & Strategy</h3>
                            <ul className="space-y-3">
                                {['Executive Search', 'Market Access', 'Healthcare Management'].map((item, i) => (
                                    <li key={i} className="flex items-center gap-2 text-slate-600">
                                        <div className="w-1.5 h-1.5 rounded-full bg-[#0B1B32]" /> {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* 4. Feature Section: Facility Image & Process */}
            <section className="py-20 bg-white">
                <div className="container px-4">
                    <div className="bg-[#0B1B32] rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row">
                        <div className="md:w-1/2 relative min-h-[400px]">
                            <Image
                                src={images?.["SECTOR_HEALTHCARE_FEATURE_1"] || "/images/healthcare-lab-facility.png"}
                                alt="Modern Laboratory"
                                fill
                                className="object-cover opacity-90"
                            />
                            <div className="absolute inset-0 bg-gradient-to-r from-[#0B1B32]/90 to-transparent md:hidden" />
                        </div>
                        <div className="md:w-1/2 p-10 md:p-16 text-white flex flex-col justify-center">
                            <h3 className="text-3xl font-bold mb-6 font-heading">Evidence-Based Recruitment</h3>
                            <p className="text-blue-100 mb-8 leading-relaxed">
                                We begin with market analysis to map industry conditions, skill shortages, and salary trends. Then, we define competencies and execute a rigorous screening process including license checks and compliance verification.
                            </p>
                            <div className="space-y-4">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-full bg-[#4DB6AC]/20 flex items-center justify-center">
                                        <TrendingUp className="w-5 h-5 text-[#4DB6AC]" />
                                    </div>
                                    <span className="font-semibold">Market Analysis & Mapping</span>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-full bg-[#4DB6AC]/20 flex items-center justify-center">
                                        <FileCheck className="w-5 h-5 text-[#4DB6AC]" />
                                    </div>
                                    <span className="font-semibold">Competency Frameworks</span>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-full bg-[#4DB6AC]/20 flex items-center justify-center">
                                        <ShieldCheck className="w-5 h-5 text-[#4DB6AC]" />
                                    </div>
                                    <span className="font-semibold">Compliance & Credentialing</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 5. Closing Quote */}
            <section className="py-20 bg-[#f8fafc]">
                <div className="container px-4 text-center max-w-4xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold text-[#0B1B32] mb-8 font-heading">
                        &quot;Trusted for Speed, Accuracy, and Integrity&quot;
                    </h2>
                    <p className="text-xl text-slate-600 leading-relaxed mb-10">
                        Clients choose us for our industry expertise. We secure individuals who meet competency requirements and fit the culture and mission of each organization. With global reach and a commitment to high standards, we deliver a recruitment partnership that strengthens teams and supports safe, effective, and innovative work.
                    </p>
                    <div className="inline-flex gap-4">
                        <button className="bg-[#4DB6AC] text-white px-8 py-3 rounded-full font-bold hover:bg-[#3d9c92] transition-colors shadow-lg shadow-teal-200/50">
                            Partner With Us
                        </button>
                    </div>
                </div>
            </section>

            <CTASection />
        </main>
    );
}
