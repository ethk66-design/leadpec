"use client";

import { SERVICES } from "@/lib/constants";
import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";

interface ServicesOverviewProps {
    hideViewAll?: boolean;
}

export function ServicesOverview({ hideViewAll = false }: ServicesOverviewProps) {
    const serviceImages = [
        "/images/service-permanent-office.png",
        "/images/service-executive-meeting.png",
        "/images/service-contract-site.png"
    ];

    return (
        <section className="py-12 md:py-24 bg-white">
            <div className="container px-4">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-sm font-bold text-[#008CBA] uppercase tracking-widest mb-3">Our Expertise</h2>
                    <h3 className="text-4xl md:text-5xl font-bold text-[#0B1B32] mb-6 font-heading">Comprehensive Recruitment Solutions</h3>
                    <p className="text-gray-600 text-lg">
                        Tailored staffing strategies designed to meet the unique demands of global industries.
                    </p>
                </div>

                <div className="flex flex-nowrap overflow-x-auto snap-x snap-mandatory gap-4 pb-8 -mx-4 px-4 md:grid md:grid-cols-2 md:gap-8 md:overflow-visible md:pb-0 md:mx-0 md:px-0 scrollbar-none">
                    {SERVICES.map((service, index) => (
                        <motion.div
                            key={service.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.2 }}
                            className="group h-full min-w-[85vw] sm:min-w-[350px] md:min-w-0 md:w-auto snap-center"
                        >
                            <div className="relative h-full bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 flex flex-col">
                                {/* Image Area */}
                                <div className="relative h-64 overflow-hidden">
                                    <Image
                                        src={serviceImages[index] || "/images/service-permanent-office.png"}
                                        alt={service.title}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B1B32]/60 to-transparent group-hover:from-[#0B1B32]/40 transition-all" />
                                </div>

                                {/* Content Area */}
                                <div className="p-8 flex flex-col flex-grow">
                                    <h3 className="text-2xl font-bold text-[#0B1B32] mb-4 group-hover:text-[#008CBA] transition-colors">
                                        {service.title}
                                    </h3>
                                    <p className="text-gray-600 mb-6 line-clamp-3 flex-grow">
                                        {service.description}
                                    </p>

                                    <div className="space-y-3 pt-4 border-t border-gray-100">
                                        <div className="flex items-center text-sm text-gray-500">
                                            <CheckCircle2 className="w-4 h-4 text-[#008CBA] mr-2 shrink-0" />
                                            <span className="line-clamp-1">{service.features?.[0] || "Global Recruitment Experts"}</span>
                                        </div>
                                        <Link
                                            href={`/services/${service.title.toLowerCase().replace(/\s+/g, '-')}`}
                                            className="inline-flex items-center text-[#008CBA] font-bold mt-2 group/link"
                                        >
                                            Learn more
                                            <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover/link:translate-x-1" />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {!hideViewAll && (
                    <div className="mt-16 text-center">
                        <Link href="/services">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-white transition-all duration-200 bg-[#0B1B32] border border-transparent hover:bg-[#1a2f4d] rounded-full shadow-lg hover:shadow-xl"
                            >
                                View Full Service Portfolio
                                <ArrowRight className="w-5 h-5 ml-2" />
                            </motion.button>
                        </Link>
                    </div>
                )}
            </div>
        </section>
    );
}
