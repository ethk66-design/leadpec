"use client";

import { motion } from "framer-motion";
import { MessageSquare, Search, FileCheck, Rocket } from "lucide-react";
import Image from "next/image";

const STEPS = [
    {
        title: "Consultation",
        description: "We deep dive into your requirements, culture, and project goals.",
        icon: MessageSquare
    },
    {
        title: "Sourcing",
        description: "Leveraging our global database and networks to identify top tier talent.",
        icon: Search
    },
    {
        title: "Screening",
        description: "Rigorous technical, behavioral, and compliance verification.",
        icon: FileCheck
    },
    {
        title: "Deployment",
        description: "Seamless mobilization, onboarding, and ongoing support.",
        icon: Rocket
    }
];

export function ProcessFlow() {
    return (
        <section className="py-20 bg-[#0B1B32] relative overflow-hidden">
            {/* Background Gradient/Image */}
            <div className="absolute inset-0 z-0 opacity-20 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#008CBA] via-[#0B1B32] to-[#0B1B32]" />

            <div className="container relative z-10 px-4">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 font-heading">Our Methodology</h2>
                    <p className="text-slate-400 text-lg">
                        A systematic, precision-driven approach to workforce solutions.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {STEPS.map((step, index) => (
                        <motion.div
                            key={step.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-[#102340] rounded-xl p-8 relative group hover:bg-[#152e50] transition-colors border border-white/5"
                        >
                            <div className="flex justify-between items-start mb-6">
                                <span className="text-6xl font-bold text-[#0B1B32] group-hover:text-[#1e3a8a] transition-colors select-none">
                                    0{index + 1}
                                </span>
                                <div className="w-12 h-12 rounded bg-[#3b82f6] flex items-center justify-center shrink-0 shadow-lg group-hover:bg-[#2563eb] transition-colors">
                                    <step.icon className="w-6 h-6 text-white" />
                                </div>
                            </div>

                            <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                            <p className="text-slate-400 text-sm leading-relaxed">
                                {step.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
