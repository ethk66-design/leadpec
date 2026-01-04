"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X, Trash2, Mail, Calendar, User, Phone, Link as LinkIcon, Briefcase, FileText } from "lucide-react";
import { updateApplicationStatus, deleteApplication } from "@/lib/admin-actions";

// Define the type based on Prisma model + included Job
interface ApplicationType {
    id: string;
    jobId: string | null;
    job: { title: string } | null;
    name: string;
    email: string;
    phone: string;
    linkedin: string | null;
    coverLetter: string | null;
    status: string;
    createdAt: Date;
}

export function ApplicationViewModal({ application }: { application: ApplicationType }) {
    const [open, setOpen] = useState(false);
    const [isPending, startTransition] = useTransition();

    // Status options
    const statuses = ["PENDING", "REVIEWED", "INTERVIEW", "OFFER", "REJECTED"];

    function handleStatusChange(newStatus: string) {
        startTransition(async () => {
            await updateApplicationStatus(application.id, newStatus);
        });
    }

    function handleDelete() {
        if (!confirm("Are you sure you want to delete this application?")) return;
        startTransition(async () => {
            await deleteApplication(application.id);
            setOpen(false);
        });
    }

    if (!open) {
        return (
            <Button variant="outline" size="sm" onClick={() => setOpen(true)}>
                Review
            </Button>
        );
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
            <div
                className="bg-white rounded-xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden flex flex-col"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex justify-between items-start p-6 border-b border-gray-100 bg-gray-50/50">
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <Badge variant={application.job ? "default" : "secondary"}>
                                {application.job ? "Job Application" : "General Application"}
                            </Badge>
                            <span className="text-xs text-gray-500 flex items-center gap-1">
                                <Calendar className="w-3 h-3" />
                                {new Date(application.createdAt).toLocaleString()}
                            </span>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 line-clamp-1">
                            {application.name}
                        </h3>
                        <div className="flex items-center gap-2 mt-1 text-sm text-gray-600 font-medium">
                            <Briefcase className="w-4 h-4 text-gray-400" />
                            {application.job ? application.job.title : "Unspecified Position"}
                        </div>
                    </div>
                    <Button variant="ghost" size="icon" onClick={() => setOpen(false)} className="text-gray-400 hover:text-gray-600">
                        <X className="w-5 h-5" />
                    </Button>
                </div>

                {/* Body */}
                <div className="p-6 overflow-y-auto flex-1 space-y-6">
                    {/* Candidate Info Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-blue-50/50 p-4 rounded-lg border border-blue-100">
                        {/* Email */}
                        <div className="flex items-center gap-3">
                            <div className="bg-white p-2 rounded-full shadow-sm text-blue-600">
                                <Mail className="w-4 h-4" />
                            </div>
                            <div className="min-w-0">
                                <p className="text-xs font-semibold text-blue-600 uppercase tracking-widest">Email</p>
                                <a href={`mailto:${application.email}`} className="text-sm font-medium text-gray-900 hover:text-blue-600 hover:underline truncate block">
                                    {application.email}
                                </a>
                            </div>
                        </div>
                        {/* Phone */}
                        <div className="flex items-center gap-3">
                            <div className="bg-white p-2 rounded-full shadow-sm text-blue-600">
                                <Phone className="w-4 h-4" />
                            </div>
                            <div>
                                <p className="text-xs font-semibold text-blue-600 uppercase tracking-widest">Phone</p>
                                <a href={`tel:${application.phone}`} className="text-sm font-medium text-gray-900 hover:text-blue-600 hover:underline">
                                    {application.phone}
                                </a>
                            </div>
                        </div>
                        {/* LinkedIn */}
                        {application.linkedin && (
                            <div className="flex items-center gap-3 md:col-span-2">
                                <div className="bg-white p-2 rounded-full shadow-sm text-blue-600">
                                    <LinkIcon className="w-4 h-4" />
                                </div>
                                <div className="min-w-0 flex-1">
                                    <p className="text-xs font-semibold text-blue-600 uppercase tracking-widest">LinkedIn Profile</p>
                                    <a href={application.linkedin} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-blue-600 hover:underline truncate block">
                                        {application.linkedin}
                                    </a>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Cover Letter */}
                    <div>
                        <div className="flex items-center gap-2 mb-3">
                            <FileText className="w-4 h-4 text-gray-400" />
                            <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest">Cover Letter / Message</p>
                        </div>
                        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 text-gray-700 leading-relaxed whitespace-pre-wrap font-serif text-sm">
                            {application.coverLetter || "No cover letter provided."}
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="p-6 border-t border-gray-100 bg-gray-50/50 flex flex-col sm:flex-row justify-between items-center gap-4">
                    <div className="flex flex-col gap-1 w-full sm:w-auto">
                        <span className="text-xs font-medium text-gray-500 uppercase tracking-widest">Application Status</span>
                        <div className="flex flex-wrap bg-white rounded-md border border-gray-200 p-1 gap-1">
                            {statuses.map(status => (
                                <button
                                    key={status}
                                    onClick={() => handleStatusChange(status)}
                                    disabled={isPending}
                                    className={`px-3 py-1 text-[10px] sm:text-xs font-medium rounded-sm transition-colors ${application.status === status
                                            ? 'bg-blue-600 text-white shadow-sm'
                                            : 'text-gray-500 hover:bg-gray-100'
                                        }`}
                                >
                                    {status}
                                </button>
                            ))}
                        </div>
                    </div>

                    <Button
                        variant="destructive"
                        size="sm"
                        onClick={handleDelete}
                        disabled={isPending}
                        className="w-full sm:w-auto mt-4 sm:mt-0"
                    >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Reject & Delete
                    </Button>
                </div>
            </div>
        </div>
    );
}
