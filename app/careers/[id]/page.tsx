import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Badge } from "@/components/ui/badge";
import { ApplicationForm } from "@/components/application-form";
import { MapPin, Calendar, Briefcase, ArrowLeft } from "lucide-react";
import Link from "next/link";

interface JobDetailsPageProps {
    params: {
        id: string;
    };
}

export const dynamic = 'force-dynamic';

export default async function JobDetailsPage({ params }: JobDetailsPageProps) {
    if (!prisma) {
        notFound(); // No DB available, show 404
    }

    const job = await prisma.job.findUnique({
        where: { id: params.id }
    });

    if (!job || !job.isActive) {
        notFound();
    }

    // Parse skills if stored as string, or handle accordingly. 
    // In schema I put 'skills String', likely comma-separated.
    const skillsList = job.skills ? job.skills.split(',').map(s => s.trim()) : [];

    return (
        <div className="min-h-screen bg-[#051120] flex flex-col">
            <Header />
            <main className="flex-1 pb-20 pt-32">
                <div className="container">
                    <Link href="/careers" className="inline-flex items-center text-gray-400 hover:text-white mb-8 transition-colors">
                        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Careers
                    </Link>

                    <div className="grid lg:grid-cols-3 gap-12">
                        {/* Main Content */}
                        <div className="lg:col-span-2 space-y-8">
                            <div>
                                <h1 className="text-4xl font-bold text-white mb-4 leading-tight">
                                    {job.title}
                                </h1>
                                <div className="flex flex-wrap gap-4 text-gray-400 mb-6">
                                    <div className="flex items-center gap-1.5 bg-white/5 px-3 py-1.5 rounded-full border border-white/5">
                                        <Briefcase className="w-4 h-4 text-[#008CBA]" />
                                        <span className="text-sm font-medium">{job.department}</span>
                                    </div>
                                    <div className="flex items-center gap-1.5 bg-white/5 px-3 py-1.5 rounded-full border border-white/5">
                                        <MapPin className="w-4 h-4 text-[#008CBA]" />
                                        <span className="text-sm font-medium">{job.location}</span>
                                    </div>
                                    <div className="flex items-center gap-1.5 bg-white/5 px-3 py-1.5 rounded-full border border-white/5">
                                        <Calendar className="w-4 h-4 text-[#008CBA]" />
                                        <span className="text-sm font-medium">{new Date(job.postedDate).toLocaleDateString()}</span>
                                    </div>
                                    <div className="flex items-center gap-1.5 bg-white/5 px-3 py-1.5 rounded-full border border-white/5">
                                        <span className="text-sm font-medium text-[#008CBA] uppercase tracking-wide">{job.type}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="prose prose-invert max-w-none">
                                <h3 className="text-xl font-bold text-white mb-4">Role Overview</h3>
                                <div className="text-gray-300 leading-relaxed whitespace-pre-wrap">
                                    {job.description}
                                </div>
                            </div>

                            {skillsList.length > 0 && (
                                <div>
                                    <h3 className="text-xl font-bold text-white mb-4">Required Skills</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {skillsList.map(skill => (
                                            <Badge key={skill} variant="secondary" className="bg-[#008CBA]/10 text-[#008CBA] hover:bg-[#008CBA]/20 border border-[#008CBA]/20 px-3 py-1 text-sm">
                                                {skill}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Sidebar Application Form */}
                        <div className="lg:col-span-1">
                            <div className="sticky top-24">
                                <ApplicationForm jobId={job.id} jobTitle={job.title} />
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
