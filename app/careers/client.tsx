"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Briefcase, X } from "lucide-react";
import { SECTORS } from "@/lib/constants";
import { JobCard } from "@/components/cards/job-card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Job } from "@prisma/client";

interface JobListingsClientProps {
    initialJobs: Job[];
}

export function JobListingsClient({ initialJobs }: JobListingsClientProps) {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedSector, setSelectedSector] = useState<string>("all");
    const [selectedType, setSelectedType] = useState<string>("all");

    // Filter Logic
    const filteredJobs = initialJobs.filter(job => {
        const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            job.description.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesSector = selectedSector === "all" || job.department === selectedSector;
        const matchesType = selectedType === "all" || job.type === selectedType;

        return matchesSearch && matchesSector && matchesType;
    });

    const clearFilters = () => {
        setSearchQuery("");
        setSelectedSector("all");
        setSelectedType("all");
    };

    return (
        <>
            {/* Filter Section */}
            <section className="py-10 sticky top-[73px] z-40 bg-[#051120]/95 backdrop-blur-md border-b border-white/5 shadow-lg">
                <div className="container">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 bg-[#0B1B32] rounded-lg border border-[#004E8F]/30 shadow-xl">
                        {/* Search Input */}
                        <div className="relative md:col-span-2">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
                            <Input
                                placeholder="Search by job title or keyword..."
                                className="pl-9 bg-[#051120] border-white/10 text-white placeholder:text-gray-500 focus-visible:ring-[#008CBA]"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>

                        {/* Sector Filter */}
                        <Select value={selectedSector} onValueChange={setSelectedSector}>
                            <SelectTrigger className="bg-[#051120] border-white/10 text-white focus:ring-[#008CBA]">
                                <SelectValue placeholder="All Sectors" />
                            </SelectTrigger>
                            <SelectContent className="bg-[#0B1B32] border-[#004E8F]/30 text-white">
                                <SelectItem value="all">All Sectors</SelectItem>
                                {SECTORS.map(s => (
                                    <SelectItem key={s.title} value={s.title}>{s.title}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                        {/* Type Filter */}
                        <Select value={selectedType} onValueChange={setSelectedType}>
                            <SelectTrigger className="bg-[#051120] border-white/10 text-white focus:ring-[#008CBA]">
                                <SelectValue placeholder="Job Type" />
                            </SelectTrigger>
                            <SelectContent className="bg-[#0B1B32] border-[#004E8F]/30 text-white">
                                <SelectItem value="all">All Types</SelectItem>
                                <SelectItem value="Permanent">Permanent</SelectItem>
                                <SelectItem value="Contract">Contract</SelectItem>
                                <SelectItem value="Full-time">Full-time</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Active Filters Summary */}
                    {(searchQuery || selectedSector !== "all" || selectedType !== "all") && (
                        <div className="flex items-center gap-2 mt-4">
                            <span className="text-xs text-gray-500 uppercase tracking-widest font-bold">Active Filters:</span>
                            {searchQuery && (
                                <Badge variant="secondary" className="bg-[#008CBA]/20 text-[#008CBA] hover:bg-[#008CBA]/30 border-transparent">
                                    "{searchQuery}"
                                </Badge>
                            )}
                            {selectedSector !== "all" && (
                                <Badge variant="secondary" className="bg-[#008CBA]/20 text-[#008CBA] hover:bg-[#008CBA]/30 border-transparent">
                                    {selectedSector}
                                </Badge>
                            )}
                            {selectedType !== "all" && (
                                <Badge variant="secondary" className="bg-[#008CBA]/20 text-[#008CBA] hover:bg-[#008CBA]/30 border-transparent">
                                    {selectedType}
                                </Badge>
                            )}
                            <button
                                onClick={clearFilters}
                                className="text-xs text-red-400 hover:text-red-300 ml-auto flex items-center gap-1 transition-colors"
                            >
                                <X className="w-3 h-3" /> Clear All
                            </button>
                        </div>
                    )}
                </div>
            </section>

            {/* Job Grid */}
            <section className="py-12">
                <div className="container">
                    <div className="mb-6 text-gray-500 text-sm">
                        Showing <span className="text-white font-bold">{filteredJobs.length}</span> open positions
                    </div>

                    {filteredJobs.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredJobs.map((job, index) => (
                                <motion.div
                                    key={job.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.4, delay: index * 0.05 }}
                                >
                                    <JobCard job={job} />
                                </motion.div>
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-20 text-center border border-dashed border-white/10 rounded-lg">
                            <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4">
                                <Briefcase className="w-8 h-8 text-gray-600" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">No jobs found</h3>
                            <p className="text-gray-400 max-w-md">
                                We couldn't find any positions matching your current filters. Try adjusting your search criteria or viewing all jobs.
                            </p>
                            <Button
                                variant="link"
                                className="text-[#008CBA] mt-4"
                                onClick={clearFilters}
                            >
                                Clear Filters
                            </Button>
                        </div>
                    )}
                </div>
            </section>
        </>
    );
}
