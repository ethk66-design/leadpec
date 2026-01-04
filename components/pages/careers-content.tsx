"use client";

import { Job } from "@prisma/client";
import { motion } from "framer-motion";
import Image from "next/image";
import { CTASection } from "@/components/sections/cta";
import { JobListingsClient } from "@/app/careers/client";
import { Globe, Users, TrendingUp, Heart, CheckCircle, ArrowRight, MapPin, Briefcase } from "lucide-react";
import { DynamicImage } from "@/components/ui/dynamic-image";

interface CareersContentProps {
    jobs: Job[];
    heroBg?: string;
    officeImg?: string;
    cultureImg?: string;
    growthImg?: string;
    globalImg?: string;
}

export function CareersContent({ jobs, heroBg, officeImg, cultureImg, growthImg, globalImg }: CareersContentProps) {

    return (
        <div className="flex-1 bg-white">
            {/* 1. Talent Hero */}
            <section className="relative h-[85vh] min-h-[600px] flex items-center justify-center overflow-hidden bg-[#0B1B32]">
                <div
                    className="absolute inset-0 z-0 bg-cover bg-center fixed bg-[url('/images/careers-hero.png')]"
                >
                    <div className="absolute inset-0 bg-[#0B1B32]/80 mix-blend-multiply" />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#0B1B32] via-transparent to-[#0B1B32]/40" />
                </div>

                <div className="container relative z-10 px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="max-w-4xl"
                    >
                        <div className="flex items-center gap-3 mb-6">
                            <span className="px-3 py-1 bg-[#0ea5e9] text-white rounded-full text-xs font-bold uppercase tracking-widest shadow-lg flex items-center gap-2">
                                <Users className="w-4 h-4" /> Join the Elite
                            </span>
                        </div>
                        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight font-heading">
                            Shape the Future <br /> of <span className="text-[#0ea5e9]">Industry.</span>
                        </h1>
                        <p className="text-xl text-slate-300 leading-relaxed max-w-2xl font-light border-l-4 border-[#0ea5e9] pl-6">
                            Connect with world-class projects and global leaders. At LEADPEC, we don&apos;t just fill positions; we build the teams that engineer tomorrow.
                        </p>
                        <div className="mt-8 flex gap-4">
                            <button onClick={() => document.getElementById('open-roles')?.scrollIntoView({ behavior: 'smooth' })} className="bg-[#0ea5e9] text-white px-8 py-3 rounded-full font-bold hover:bg-[#0284c7] transition-all flex items-center gap-2">
                                View Open Roles <ArrowRight className="w-5 h-5" />
                            </button>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* 2. Why Join Us (Intro) */}
            <section className="py-12 md:py-16 bg-white relative">
                <div className="container px-4">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div className="space-y-8">
                            <h2 className="text-4xl font-bold text-[#0f172a] font-heading">More Than Just a Job. <br /> It&apos;s a Trajectory.</h2>
                            <p className="text-lg text-slate-600 leading-relaxed">
                                We are a specialized technical recruitment partner for the world&apos;s most demanding sectors. Joining our talent network means gaining access to exclusive opportunities in Oil & Gas, Infrastructure, and Renewable Energy that aren&apos;t advertised elsewhere.
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="flex gap-4">
                                    <div className="w-12 h-12 bg-sky-100 rounded-lg flex items-center justify-center flex-shrink-0 text-[#0ea5e9]">
                                        <Globe className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-[#0f172a]">Global Mobility</h4>
                                        <p className="text-sm text-slate-500">Opportunities across 15+ countries.</p>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <div className="w-12 h-12 bg-sky-100 rounded-lg flex items-center justify-center flex-shrink-0 text-[#0ea5e9]">
                                        <TrendingUp className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-[#0f172a]">Career Growth</h4>
                                        <p className="text-sm text-slate-500">Upskilling and certification support.</p>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <div className="w-12 h-12 bg-sky-100 rounded-lg flex items-center justify-center flex-shrink-0 text-[#0ea5e9]">
                                        <Briefcase className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-[#0f172a]">Tier-1 Projects</h4>
                                        <p className="text-sm text-slate-500">Work with IOCs and EPC majors.</p>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <div className="w-12 h-12 bg-sky-100 rounded-lg flex items-center justify-center flex-shrink-0 text-[#0ea5e9]">
                                        <Heart className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-[#0f172a]">Wellbeing Focus</h4>
                                        <p className="text-sm text-slate-500">Comprehensive health & safety care.</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="relative h-[500px] w-full bg-slate-100 rounded-2xl overflow-hidden p-4">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-[#0ea5e9]/10 rounded-bl-full z-0" />
                            <div className="grid grid-cols-2 gap-4 h-full relative z-10">
                                <div className="space-y-4 pt-8">
                                    <div className="relative h-[200px] rounded-xl overflow-hidden shadow-lg">
                                        <Image src="/images/careers-office.png" alt="Office" fill className="object-cover" />
                                    </div>
                                    <div className="relative h-[160px] rounded-xl overflow-hidden shadow-lg">
                                        <Image src="/images/careers-growth.png" alt="Growth" fill className="object-cover" />
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <div className="relative h-[160px] rounded-xl overflow-hidden shadow-lg">
                                        <Image src="/images/careers-culture.png" alt="Culture" fill className="object-cover" />
                                    </div>
                                    <div className="relative h-[240px] rounded-xl overflow-hidden shadow-lg">
                                        <Image src="/images/careers-global.png" alt="Global" fill className="object-cover grayscale" />
                                        <div className="absolute inset-0 bg-[#0ea5e9]/20 mix-blend-overlay" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. Global Impact Stats */}
            <section className="py-12 md:py-16 bg-[#0f172a] text-white relative overflow-hidden">
                <div className="absolute inset-0 opacity-20">
                    <Image
                        src="/images/infra-map.png"
                        alt="Global Map"
                        fill
                        className="object-cover"
                    />
                </div>
                <div className="container relative z-10 px-4 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-12">Global Deployment Impact</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        <div>
                            <div className="text-4xl md:text-5xl font-bold text-[#0ea5e9] mb-2">15+</div>
                            <p className="text-slate-400 uppercase tracking-widest text-xs font-bold">Countries</p>
                        </div>
                        <div>
                            <div className="text-4xl md:text-5xl font-bold text-[#0ea5e9] mb-2">50k+</div>
                            <p className="text-slate-400 uppercase tracking-widest text-xs font-bold">Candidates Database</p>
                        </div>
                        <div>
                            <div className="text-4xl md:text-5xl font-bold text-[#0ea5e9] mb-2">98%</div>
                            <p className="text-slate-400 uppercase tracking-widest text-xs font-bold">Retention Rate</p>
                        </div>
                        <div>
                            <div className="text-4xl md:text-5xl font-bold text-[#0ea5e9] mb-2">24/7</div>
                            <p className="text-slate-400 uppercase tracking-widest text-xs font-bold">Support Hubs</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 4. Job Search Integration */}
            <div id="open-roles" className="bg-slate-50 min-h-[600px]">
                <div className="container px-4 py-16">
                    <div className="text-center max-w-2xl mx-auto mb-12">
                        <span className="text-[#0ea5e9] font-bold uppercase tracking-widest text-sm mb-2 block">Current Opportunities</span>
                        <h2 className="text-3xl font-bold text-[#0f172a] mb-4">Find Your Next Challenge</h2>
                        <p className="text-slate-600">
                            Browse our latest vacancies. Use the filters to narrow down by sector or job type.
                        </p>
                    </div>

                    {/* Integrated Job Client */}
                    <JobListingsClient initialJobs={jobs} />
                </div>
            </div>

            {/* CTA */}
            <CTASection />
        </div>
    );
}
