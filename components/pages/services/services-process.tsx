"use client";

import { motion } from "framer-motion";
import { MessageSquare, Search, FileCheck, Rocket } from "lucide-react";
import { DynamicImage } from "@/components/ui/dynamic-image";

interface ServicesProcessProps {
    backgroundImage?: string;
}

export function ServicesProcess({ backgroundImage }: ServicesProcessProps) {
    const steps = [
        {
            number: "01",
            title: "Consultation",
            description: "We deep dive into your requirements, culture, and project goals.",
            icon: MessageSquare
        },
        {
            number: "02",
            title: "Sourcing",
            description: "Leveraging our global database and networks to identify top tier talent.",
            icon: Search
        },
        {
            number: "03",
            title: "Screening",
            description: "Rigorous technical, behavioral, and compliance verification.",
            icon: FileCheck
        },
        {
            number: "04",
            title: "Deployment",
            description: "Seamless mobilization, onboarding, and ongoing support.",
            icon: Rocket
        }
    ];

    return (
        <section className="relative py-12 md:py-16 bg-slate-900 overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 z-0 opacity-20 select-none">
                <DynamicImage
                    src={backgroundImage || "/images/process-flow-background.png"}
                    fallbackSrc="/images/process-flow-background.png"
                    alt="Process Background"
                    fill
                    className="object-cover grayscale"
                />
            </div>

            <div className="relative z-10 container mx-auto px-4">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Our Methodology</h2>
                    <p className="text-slate-400">A systematic, precision-driven approach to workforce solutions.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {steps.map((step, index) => (
                        <motion.div
                            key={step.number}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            className="relative group"
                        >
                            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-8 hover:border-blue-500/50 transition-colors duration-300 h-full">
                                <div className="text-5xl font-bold text-slate-700 mb-6 font-mono group-hover:text-blue-500/20 transition-colors">
                                    {step.number}
                                </div>
                                <div className="absolute top-8 right-8 bg-blue-500/10 p-3 rounded-lg text-blue-400 mb-4 group-hover:bg-blue-500 group-hover:text-white transition-all duration-300">
                                    <step.icon className="w-6 h-6" />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                                <p className="text-slate-400 text-sm leading-relaxed">
                                    {step.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
