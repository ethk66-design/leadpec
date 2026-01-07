"use client";

import { motion } from "framer-motion";
import { Handshake, Users, Magnet, ClipboardCheck, FileText, GraduationCap } from "lucide-react";

const PROCESS_STEPS = [
    {
        title: "Job Acquisitions",
        description: "Customize job description to capture all of the information related to the business unit, job type and specific skills required to perform the role. The design template will then be forwarded to the client for approval to proceed further with sourcing / talentpooling.",
        icon: Handshake
    },
    {
        title: "Talent Pooling",
        description: "Create search engine for a quick search across our database to identify qualified candidates especially available for immediate deployment, similar exposure background from database and sent instant communications by phone, emails / sms / whatsapp messages to talents.",
        icon: Users
    },
    {
        title: "Candidate Attraction",
        description: "Post requirements directly onto the LEADPEC website, Job portals, Social networks and advertisements to apply to explore a good pool of talent candidates. The system will send intelligent job alerts automatically with screening questions in line with job requisition by the client.",
        icon: Magnet
    },
    {
        title: "Candidate Assessment",
        description: "Rigorous evaluation including technical testing, behavioral interviews, and culture fit assessment to ensuring candidates meet the specific requirements of the role. We verify skills against the customized job description approved by the client.",
        icon: ClipboardCheck
    },
    {
        title: "Onboarding Process",
        description: "Collect documents including compliance checks prior to offering acceptance and a dedicated administrative team to facilitate the attestation, medical, visa stamping, immigration clearance for timely deployment.",
        icon: FileText
    },
    {
        title: "Training",
        description: "A holistic approach by LEADPEC to give job orientation to technical crew. In-house facilities to mould the selected candidate to acquaint with the new working system and culture. This helps the client to optimize training period and/or an early return from the newly recruited talent.",
        icon: GraduationCap
    }
];

export function RecruitmentCycle() {
    return (
        <section className="py-20 bg-slate-50">
            <div className="container px-4">
                <div className="text-center max-w-4xl mx-auto mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-[#0B1B32] mb-6 font-heading">
                        Our recruitment process
                    </h2>
                    <p className="text-lg text-slate-600 leading-relaxed italic">
                        &quot;We have the most reliable recruitment process. It is structured in a way to ensure that the most efficient workforce is supplied to our clients.&quot;
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    {PROCESS_STEPS.map((step, index) => (
                        <div
                            key={step.title}
                            className="bg-white rounded-2xl p-8 shadow-lg border-l-8 border-[#0B1B32] hover:shadow-xl transition-all relative overflow-hidden group"
                        >
                            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                                <step.icon className="w-32 h-32 text-[#008CBA]" />
                            </div>

                            <div className="flex items-start gap-4 relative z-10">
                                <div className="w-14 h-14 rounded-lg bg-[#0B1B32] flex items-center justify-center shrink-0">
                                    <step.icon className="w-7 h-7 text-white" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-[#008CBA] mb-3">{step.title}</h3>
                                    <p className="text-slate-600 text-sm leading-relaxed">
                                        {step.description}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
