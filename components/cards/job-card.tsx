import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Briefcase, MapPin, Calendar, ArrowRight } from "lucide-react";
import Link from "next/link";
import { CONTACT_INFO } from "@/lib/constants";

import { Job } from "@prisma/client";

interface JobCardProps {
    job: Job;
}

export function JobCard({ job }: JobCardProps) {
    return (
        <Card className="bg-[#0B1B32] border-[#004E8F]/30 hover:border-[#008CBA] transition-all duration-300 group hover:-translate-y-1 hover:shadow-xl hover:shadow-[#008CBA]/10 flex flex-col h-full">
            <CardHeader className="pb-3">
                <div className="flex justify-between items-start gap-4">
                    <div>
                        <Badge variant="outline" className="mb-3 text-[#008CBA] border-[#008CBA]/30 bg-[#004E8F]/10 hover:bg-[#008CBA]/20">
                            {job.department}
                        </Badge>
                        <h3 className="text-xl font-bold text-white group-hover:text-[#008CBA] transition-colors leading-tight">
                            {job.title}
                        </h3>
                    </div>
                    {job.type && (
                        <span className="shrink-0 px-2 py-1 text-[10px] uppercase font-bold tracking-wider text-white/50 bg-white/5 rounded-sm border border-white/5">
                            {job.type}
                        </span>
                    )}
                </div>
            </CardHeader>
            <CardContent className="flex-grow pb-4">
                {job.image && (
                    <div className="mb-4 aspect-video rounded-md overflow-hidden bg-slate-800">
                        <img src={job.image} alt={job.title} className="w-full h-full object-cover" />
                    </div>
                )}
                <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-gray-400 mb-4">
                    <div className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-[#008CBA]" />
                        {job.location}
                    </div>
                    <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-[#008CBA]" />
                        {new Date(job.postedDate).toLocaleDateString()}
                    </div>
                </div>
                <p className="text-gray-300 text-sm leading-relaxed line-clamp-3">
                    {job.description}
                </p>
                {job.skills && (
                    <div className="flex flex-wrap gap-2 mt-4">
                        {job.skills.split(',').map(skill => (
                            <span key={skill} className="text-[10px] text-gray-400 bg-white/5 px-2 py-1 rounded-sm border border-white/5">
                                {skill.trim()}
                            </span>
                        ))}
                    </div>
                )}
            </CardContent>
            <CardFooter className="pt-0">
                <Button asChild className="w-full bg-[#008CBA] hover:bg-[#0077b5] text-white font-bold tracking-wide uppercase group/btn">
                    <Link href={`/careers/${job.id}`}>
                        View Details & Apply <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover/btn:translate-x-1" />
                    </Link>
                </Button>
            </CardFooter>
        </Card>
    );
}
