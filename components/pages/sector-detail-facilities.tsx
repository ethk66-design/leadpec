"use client";

import { Sector } from "@prisma/client";
import { motion } from "framer-motion";
import Image from "next/image";
import { CTASection } from "@/components/sections/cta";
import { Building2, Wrench, Users, Sparkles, Globe, ArrowRight, ShieldCheck } from "lucide-react";
import { DynamicImage } from "@/components/ui/dynamic-image";

interface SectorDetailFacilitiesProps {
    sector: Sector;
    heroImage?: string;
}

export function SectorDetailFacilities({ sector, heroImage }: SectorDetailFacilitiesProps) {
    return (
        <main className="flex-1 bg-white">
            {/* 1. Hero: Smart Building */}
            <section className="relative h-[85vh] min-h-[600px] flex items-center justify-center overflow-hidden bg-[#005a9c]">
                <div className="absolute inset-0 z-0 select-none">
                    <DynamicImage
                        src="/images/fm-sector-hero.png"
                        fallbackSrc="/images/fm-sector-hero.png"
                        alt="Facilities Management Hero"
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#004785]/90 via-[#005a9c]/80 to-transparent" />
                </div>

                <div className="container relative z-10 px-4">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="max-w-4xl"
                    >
                        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight font-heading uppercase">
                            FACILITIES MANAGEMENT
                        </h1>
                        <p className="text-xl md:text-2xl text-blue-100 italic font-light mb-6">
                            "Optimizing Spaces. Empowering People. Elevating Performance"
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* 2. Intro Text */}
            <section className="py-16 bg-white">
                <div className="container px-4">
                    <div className="max-w-4xl mx-auto text-center mb-16">
                        <p className="text-lg md:text-xl text-slate-600 leading-relaxed text-left md:text-justify">
                            In today’s competitive business landscape, the efficiency, safety, and functionality of your workplace can define your success. From managing complex infrastructures to ensuring seamless day-to-day operations, Facilities Management is the backbone of any thriving organization. The right talent can optimize energy usage, enhance workplace safety, streamline processes, and create environments where teams can perform at their best.
                        </p>
                        <p className="text-lg md:text-xl text-slate-600 leading-relaxed text-left md:text-justify mt-6">
                            We understand that Facilities Management requires a unique blend of technical proficiency, operational insight, and leadership capability. Our recruitment team meticulously identifies and screens candidates with proven experience in:
                        </p>
                    </div>

                    {/* Service Cards (Brochure Match) */}
                    <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-12">
                        {/* HARD FM SERVICES */}
                        <div className="bg-white p-8 rounded-[40px] border-2 border-slate-300 shadow-sm hover:shadow-md transition-shadow">
                            <h3 className="text-3xl font-bold text-[#005a9c] mb-6 uppercase text-center">HARD FM SERVICES</h3>
                            <ul className="space-y-3 text-lg text-slate-800 ml-4 list-disc marker:text-[#005a9c]">
                                <li>Civil & Building</li>
                                <li>MEP Services</li>
                                <li>Fire and Security Systems</li>
                                <li>Building Automation System</li>
                                <li>Building Management System</li>
                                <li>IT Services – CMMS & CAFM</li>
                            </ul>
                        </div>

                        {/* SOFT FM SERVICES */}
                        <div className="bg-white p-8 rounded-[40px] border-2 border-slate-300 shadow-sm hover:shadow-md transition-shadow">
                            <h3 className="text-3xl font-bold text-[#005a9c] mb-6 uppercase text-center">SOFT FM SERVICES</h3>
                            <ul className="space-y-3 text-lg text-slate-800 ml-4 list-disc marker:text-[#005a9c]">
                                <li>Cleaning Services</li>
                                <li>Ground Maintenance & Landscaping</li>
                                <li>Security & Guarding Services</li>
                                <li>Food Services</li>
                                <li>Front of House Services / Helpdesk</li>
                                <li>Pest Control</li>
                                <li>Waste Management</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. Detailed Sections */}
            <section className="py-16 bg-slate-50">
                <div className="container px-4 space-y-20">

                    {/* Hard Services Detail */}
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div className="order-2 md:order-1">
                            <h3 className="text-3xl font-bold text-[#0B1B32] mb-4">HARD SERVICES <span className="text-lg font-normal text-slate-500 block mt-1">– Technical Excellence</span></h3>
                            <p className="text-slate-600 mb-6 leading-relaxed">
                                Our candidates bring hands-on expertise to maintain and optimize your physical assets:
                            </p>
                            <ul className="space-y-4 mb-8">
                                <li className="flex gap-3">
                                    <Wrench className="w-5 h-5 text-[#005a9c] flex-shrink-0 mt-1" />
                                    <div>
                                        <strong className="text-[#0B1B32]">Civil & Building:</strong> <span className="text-slate-600">Ensuring structural integrity and peak performance.</span>
                                    </div>
                                </li>
                                <li className="flex gap-3">
                                    <Wrench className="w-5 h-5 text-[#005a9c] flex-shrink-0 mt-1" />
                                    <div>
                                        <strong className="text-[#0B1B32]">Mechanical & Electrical Maintenance:</strong> <span className="text-slate-600">Keeping systems operational and compliant.</span>
                                    </div>
                                </li>
                                <li className="flex gap-3">
                                    <ShieldCheck className="w-5 h-5 text-[#005a9c] flex-shrink-0 mt-1" />
                                    <div>
                                        <strong className="text-[#0B1B32]">Fire Safety & Life Protection:</strong> <span className="text-slate-600">Reducing risks and meeting regulatory standards.</span>
                                    </div>
                                </li>
                                <li className="flex gap-3">
                                    <Building2 className="w-5 h-5 text-[#005a9c] flex-shrink-0 mt-1" />
                                    <div>
                                        <strong className="text-[#0B1B32]">Building Automation (BMS):</strong> <span className="text-slate-600">Integration promoting operational efficiency and sustainability.</span>
                                    </div>
                                </li>
                                <li className="flex gap-3">
                                    <Globe className="w-5 h-5 text-[#005a9c] flex-shrink-0 mt-1" />
                                    <div>
                                        <strong className="text-[#0B1B32]">CMMS and CAFM:</strong> <span className="text-slate-600">Platforms storing asset histories, maintenance logs, and compliance certificates.</span>
                                    </div>
                                </li>
                            </ul>
                            <div className="bg-white p-6 rounded-lg border-l-4 border-[#005a9c] shadow-sm">
                                <p className="text-slate-600 text-sm leading-relaxed italic">
                                    "Hard services are the technical foundation that keeps a facility running safely, efficiently, and sustainably. By combining engineering expertise with digital automation, organizations can shift from reactive maintenance to predictive management."
                                </p>
                            </div>
                        </div>
                        <div className="order-1 md:order-2 relative h-[400px] rounded-2xl overflow-hidden shadow-xl">
                            <Image
                                src="/images/fm-hard-services-engineer.png"
                                alt="Hard Services Maintenance"
                                fill
                                className="object-cover"
                            />
                        </div>
                    </div>

                    {/* Soft Services Detail */}
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-xl">
                            <Image
                                src="/images/fm-soft-services-lobby.png"
                                alt="Soft Services Hospitality"
                                fill
                                className="object-cover"
                            />
                        </div>
                        <div>
                            <h3 className="text-3xl font-bold text-[#0B1B32] mb-4">SOFT SERVICES <span className="text-lg font-normal text-slate-500 block mt-1">– Operational & Human Excellence</span></h3>
                            <p className="text-slate-600 mb-6 leading-relaxed">
                                Facilities Management isn’t just technical—it’s about delivering seamless experiences for employees, clients, and stakeholders:
                            </p>
                            <ul className="space-y-4">
                                <li className="flex gap-3">
                                    <Users className="w-5 h-5 text-[#005a9c] flex-shrink-0 mt-1" />
                                    <div>
                                        <strong className="text-[#0B1B32]">Reception & Front-of-House:</strong> <span className="text-slate-600">Creating professional, welcoming environments.</span>
                                    </div>
                                </li>
                                <li className="flex gap-3">
                                    <Sparkles className="w-5 h-5 text-[#005a9c] flex-shrink-0 mt-1" />
                                    <div>
                                        <strong className="text-[#0B1B32]">Cleaning & Housekeeping:</strong> <span className="text-slate-600">Maintaining hygiene, comfort, and safety standards.</span>
                                    </div>
                                </li>
                                <li className="flex gap-3">
                                    <ShieldCheck className="w-5 h-5 text-[#005a9c] flex-shrink-0 mt-1" />
                                    <div>
                                        <strong className="text-[#0B1B32]">Security & Access Control:</strong> <span className="text-slate-600">Ensuring safe, controlled workplace environments.</span>
                                    </div>
                                </li>
                                <li className="flex gap-3">
                                    <Users className="w-5 h-5 text-[#005a9c] flex-shrink-0 mt-1" />
                                    <div>
                                        <strong className="text-[#0B1B32]">Customer Service:</strong> <span className="text-slate-600">Handling requests efficiently and professionally.</span>
                                    </div>
                                </li>
                                <li className="flex gap-3">
                                    <Users className="w-5 h-5 text-[#005a9c] flex-shrink-0 mt-1" />
                                    <div>
                                        <strong className="text-[#0B1B32]">Vendor & Contractor Coordination:</strong> <span className="text-slate-600">Managing partnerships to deliver smooth operations.</span>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Why Partner */}
                    <div className="bg-[#0B1B32] text-white p-12 rounded-3xl text-center">
                        <h2 className="text-3xl font-bold mb-8">Why Partner with LEADPEC?</h2>
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 text-left">
                            <div className="bg-white/10 p-6 rounded-xl hover:bg-white/20 transition-colors">
                                <h4 className="font-bold text-[#4DB6AC] mb-2">Vetted Talent</h4>
                                <p className="text-sm text-gray-300">Access to a pool with both technical and service-oriented expertise.</p>
                            </div>
                            <div className="bg-white/10 p-6 rounded-xl hover:bg-white/20 transition-colors">
                                <h4 className="font-bold text-[#4DB6AC] mb-2">Deep Industry Knowledge</h4>
                                <p className="text-sm text-gray-300">Understanding of Facilities Management trends and standards.</p>
                            </div>
                            <div className="bg-white/10 p-6 rounded-xl hover:bg-white/20 transition-colors">
                                <h4 className="font-bold text-[#4DB6AC] mb-2">Tailored Roles</h4>
                                <p className="text-sm text-gray-300">Recruitment for permanent, interim, and specialized roles.</p>
                            </div>
                            <div className="bg-white/10 p-6 rounded-xl hover:bg-white/20 transition-colors">
                                <h4 className="font-bold text-[#4DB6AC] mb-2">Operational Excellence</h4>
                                <p className="text-sm text-gray-300">Commitment to efficiency and workplace satisfaction.</p>
                            </div>
                        </div>
                        <h3 className="text-2xl font-bold mt-12 text-[#4DB6AC] italic">"Your Facilities. Our Talent. Exceptional Results."</h3>
                    </div>

                </div>
            </section>

            {/* CTA */}
            <CTASection />
        </main>);
}
