"use client";

import { STATS } from "@/lib/constants";
import { useInView, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useRef } from "react";

function Counter({ value, label }: { value: string; label: string }) {
    const ref = useRef<HTMLSpanElement>(null);
    const inView = useInView(ref, { once: true, margin: "-50px" });

    // Parse number and suffix (e.g., "10+" -> number: 10, suffix: "+")
    const number = parseInt(value.replace(/[^0-9]/g, "")) || 0;
    const suffix = value.replace(/[0-9,]/g, "");

    const motionValue = useMotionValue(0);
    const springValue = useSpring(motionValue, {
        damping: 40,
        stiffness: 100,
        duration: 2.5
    });

    useEffect(() => {
        if (inView) {
            motionValue.set(number);
        }
    }, [inView, number, motionValue]);

    useEffect(() => {
        return springValue.on("change", (latest) => {
            if (ref.current) {
                ref.current.textContent = Math.floor(latest).toLocaleString();
            }
        });
    }, [springValue]);

    return (
        <div className="flex flex-col items-center justify-center p-8 relative group">
            {/* Hover Effect Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-50 to-white rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-blend-soft-light -z-10" />

            <h3 className="text-5xl sm:text-6xl md:text-7xl font-bold font-heading text-[#0B1B32] mb-4 tabular-nums tracking-tighter flex items-baseline">
                <span ref={ref}>0</span>
                <span className="text-[#008CBA] ml-1">{suffix}</span>
            </h3>
            <p className="text-sm sm:text-base text-gray-500 font-bold uppercase tracking-[0.2em] text-center">
                {label}
            </p>
        </div>
    );
}

export function TrustIndicators() {
    return (
        <section className="py-12 md:py-16 bg-white border-b border-gray-100">
            <div className="container px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-gray-100 max-w-6xl mx-auto">
                    {STATS.map((stat, index) => (
                        <Counter key={index} {...stat} />
                    ))}
                </div>
            </div>
        </section>
    );
}
