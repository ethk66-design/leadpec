"use client";

import { COMPANY_INFO, VALUES } from "@/lib/constants";
import { motion } from "framer-motion";
import { Target, Lightbulb, Zap, Rocket, Users, Globe, ShieldCheck, ChevronRight, Home, CheckCircle2 } from "lucide-react";
import Image from "next/image";
import { DynamicImage } from "@/components/ui/dynamic-image";
import { TrustIndicators } from "@/components/sections/trust-indicators";
import Link from "next/link";
import { cn } from "@/lib/utils";

const iconMap: { [key: string]: React.ElementType } = {
    Zap,
    Rocket,
    Users,
    ShieldCheck,
    Lightbulb,
    Globe
};

interface AboutContentProps {
    heroBg?: string;
    collabImg?: string;
    visionBg?: string;
    missionCardBg?: string;
    visionCardBg?: string;
}

export function AboutContent({ heroBg, collabImg, visionBg, missionCardBg, visionCardBg }: AboutContentProps) {
    return (
        <main className="flex-1 bg-white">
            {/* 1. Hero Section (Industrial Dark) */}
            <section className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <DynamicImage
                        src={heroBg || "/images/about-hero-team.png"}
                        fallbackSrc="/images/about-hero-team.png"
                        alt="About Hero"
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-[#051120]/40 mix-blend-multiply" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#051120] via-[#051120]/30 to-transparent" />
                </div>

                <div className="container relative z-10 px-4 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="max-w-5xl mx-auto"
                    >
                        {/* Breadcrumbs */}
                        <div className="flex items-center justify-center gap-2 text-white/60 text-sm mb-8 font-medium tracking-wide uppercase">
                            <Link href="/" className="hover:text-white transition-colors flex items-center gap-1">
                                <Home className="w-3 h-3" /> Home
                            </Link>
                            <ChevronRight className="w-3 h-3" />
                            <span className="text-[#D4AF37]">About Us</span>
                        </div>

                        <h1 className="text-4xl md:text-7xl font-bold text-white mb-6 font-heading tracking-tight leading-none">
                            MANPOWER <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#008CBA] to-[#4DB6AC]">EXCELLENCE</span> <br />
                            GLOBAL SCALE
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed font-light">
                            {COMPANY_INFO.tagline}
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* 2. Introduction - Matching AboutBrief (Light/Clean) */}
            <section className="py-10 md:py-14 bg-[#F8F6F3]">
                <div className="container px-4">
                    <div className="grid lg:grid-cols-2 gap-10 md:gap-12 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="space-y-6"
                        >
                            <div>
                                <h2 className="text-sm font-bold text-[#D4AF37] uppercase tracking-widest mb-3">Who We Are</h2>
                                <h3 className="text-3xl md:text-4xl font-bold font-heading text-[#0A2540] mb-6 leading-tight">
                                    Strategic Workforce <br /> <span className="text-[#008CBA]">Solutions Partner</span>
                                </h3>
                            </div>

                            <div className="space-y-6 text-gray-600 text-lg leading-relaxed">
                                <p>
                                    <strong>LEADPEC</strong> is a global leader in Recruitment, Talent Sourcing and Executive Search. We provide comprehensive manpower solutions — permanent, temporary, secondment, and remote hiring — across the GCC, Europe, North America, Asia, Oceania, and Africa.
                                </p>
                                <p>
                                    As a trusted Talent Acquisition partner, we deliver customized recruitment solutions aligned with each client&apos;s strategic objectives. Our Executive Search services connect organizations with senior-level professionals who drive sustainable growth.
                                </p>
                                <p>
                                    We combine <strong>global insight with local expertise</strong>, backed by a strong international network and partnerships with leading job portals. Our state-of-the-art systems ensure efficiency and precision, even in high-volume scenarios.
                                </p>
                                <p>
                                    At LEADPEC, our mission is clear — <strong>to empower organizations through exceptional talent</strong>. Partner with us for global reach, industry expertise, and a commitment to quality that transforms your talent acquisition process.
                                </p>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4 pt-4">
                                {["Global Network", "100% Compliance", "Rapid Deployment"].map((item) => (
                                    <div key={item} className="flex items-center gap-2 text-[#0A2540] font-bold">
                                        <CheckCircle2 className="w-5 h-5 text-[#4DB6AC]" />
                                        <span>{item}</span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="relative h-[500px] w-full"
                        >
                            <div className="absolute inset-0 bg-[#0A2540] rounded-sm transform translate-x-4 translate-y-4" />
                            <div className="relative h-full w-full bg-white rounded-sm overflow-hidden shadow-xl border border-gray-200">
                                <DynamicImage
                                    src={collabImg || "/images/office-collaboration.png"}
                                    fallbackSrc="/images/office-collaboration.png"
                                    alt="Leadpec Corporate Environment"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* 3. Stats (Consistent Component) */}
            <TrustIndicators />

            {/* 4. Mission & Vision - Matching ProcessFlow (Dark Blue) */}
            <section className="py-12 md:py-16 bg-[#0A2540] relative overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 z-0">
                    <DynamicImage
                        src={visionBg || "/images/vision-background.png"}
                        fallbackSrc="/images/vision-background.png"
                        alt="Vision Background"
                        fill
                        className="object-cover opacity-10 mix-blend-overlay"
                    />
                </div>

                <div className="container relative z-10 px-4">
                    <div className="text-center mb-10 max-w-3xl mx-auto">
                        <h2 className="text-sm font-bold text-[#4DB6AC] uppercase tracking-widest mb-3">Our Purpose</h2>
                        <h3 className="text-3xl md:text-5xl font-bold text-white font-heading">Driving Industrial Growth</h3>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8 md:gap-12">
                        {/* Mission Card */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="group relative overflow-hidden p-8 md:p-12 border border-[#008CBA]/30 hover:border-[#008CBA] transition-all duration-300"
                        >
                            {/* Background Image */}
                            <div className="absolute inset-0 z-0">
                                <DynamicImage
                                    src={missionCardBg || "/images/mission-card-bg.jpg"}
                                    fallbackSrc="/images/about-hero-team.png"
                                    alt=""
                                    fill
                                    className="object-cover"
                                />
                                <div className="absolute inset-0 bg-[#051120]/70" />
                            </div>

                            <div className="relative z-10">

                                <div className="w-16 h-16 bg-[#008CBA]/10 rounded-full flex items-center justify-center mb-8 border border-[#008CBA]/20 group-hover:bg-[#008CBA] transition-colors duration-300">
                                    <Target className="w-8 h-8 text-[#008CBA] group-hover:text-white" />
                                </div>

                                <h3 className="text-3xl font-bold text-white mb-6 font-heading">Our Mission</h3>
                                <p className="text-gray-300 leading-relaxed text-lg border-l-2 border-[#008CBA]/30 pl-4 group-hover:border-[#008CBA] transition-colors">
                                    {COMPANY_INFO.mission}
                                </p>
                            </div>
                        </motion.div>

                        {/* Vision Card */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="group relative overflow-hidden p-8 md:p-12 border border-[#4DB6AC]/30 hover:border-[#4DB6AC] transition-all duration-300"
                        >
                            {/* Background Image */}
                            <div className="absolute inset-0 z-0">
                                <DynamicImage
                                    src={visionCardBg || "/images/vision-card-bg.jpg"}
                                    fallbackSrc="/images/about-hero-team.png"
                                    alt=""
                                    fill
                                    className="object-cover"
                                />
                                <div className="absolute inset-0 bg-[#051120]/70" />
                            </div>

                            <div className="relative z-10">

                                <div className="w-16 h-16 bg-[#4DB6AC]/10 rounded-full flex items-center justify-center mb-8 border border-[#4DB6AC]/20 group-hover:bg-[#4DB6AC] transition-colors duration-300">
                                    <Lightbulb className="w-8 h-8 text-[#4DB6AC] group-hover:text-[#051120]" />
                                </div>

                                <h3 className="text-3xl font-bold text-white mb-6 font-heading">Our Vision</h3>
                                <p className="text-gray-300 leading-relaxed text-lg border-l-2 border-[#4DB6AC]/30 pl-4 group-hover:border-[#4DB6AC] transition-colors">
                                    {COMPANY_INFO.vision}
                                </p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* 5. Core Values - Matching WhyChooseUs (Dark/Industrial) */}
            <section className="py-12 md:py-16 bg-[#202020]">
                <div className="container px-4">
                    <div className="mb-10 md:text-center">
                        <h2 className="text-sm font-bold text-[#D4AF37] uppercase tracking-widest mb-3">Corporate Values</h2>
                        <h3 className="text-3xl md:text-5xl font-bold text-white font-heading">The Principles We Live By</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                        {VALUES.map((value, idx) => {
                            // @ts-ignore
                            const IconComponent = iconMap[value.icon] || Zap;
                            return (
                                <motion.div
                                    key={value.title}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.1 }}
                                    className="group bg-[#2a2a2a] hover:bg-[#0B1B32] p-8 border border-white/5 hover:border-[#008CBA] transition-all duration-300"
                                >
                                    <div className="flex items-center gap-4 mb-6">
                                        <div className="p-3 bg-[#333] group-hover:bg-[#008CBA] rounded-sm transition-colors duration-300">
                                            <IconComponent className="w-6 h-6 text-[#008CBA] group-hover:text-white transition-colors" />
                                        </div>
                                        <h4 className="text-xl font-bold text-white font-heading group-hover:text-[#4DB6AC] transition-colors">
                                            {value.title}
                                        </h4>
                                    </div>
                                    <p className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-300 transition-colors">
                                        {value.description}
                                    </p>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>
        </main>
    );
}
