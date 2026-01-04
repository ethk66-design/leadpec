"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X, Trash2, Mail, Calendar, User } from "lucide-react";
import { updateInquiryStatus, deleteInquiry } from "@/lib/admin-actions";
import { useRouter } from "next/navigation";

// Define the type based on Prisma model
interface InquiryType {
    id: string;
    name: string;
    email: string;
    subject: string | null;
    message: string;
    status: string;
    createdAt: Date;
}

export function InquiryViewModal({ inquiry }: { inquiry: InquiryType }) {
    const [open, setOpen] = useState(false);
    const [isPending, startTransition] = useTransition();
    const router = useRouter(); // To handle potential router refresh if needed, though server action revalidates

    // Status options
    const statuses = ["PENDING", "REVIEWED", "ARCHIVED"];

    function handleStatusChange(newStatus: string) {
        startTransition(async () => {
            await updateInquiryStatus(inquiry.id, newStatus);
            // Optionally close modal or show success toast
        });
    }

    function handleDelete() {
        if (!confirm("Are you sure you want to delete this inquiry?")) return;
        startTransition(async () => {
            await deleteInquiry(inquiry.id);
            setOpen(false);
        });
    }

    if (!open) {
        return (
            <Button variant="outline" size="sm" onClick={() => setOpen(true)}>
                View
            </Button>
        );
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
            <div
                className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex justify-between items-start p-6 border-b border-gray-100 bg-gray-50/50">
                    <div>
                        <h3 className="text-xl font-bold text-gray-900 line-clamp-1">
                            {inquiry.subject || "No Subject"}
                        </h3>
                        <div className="flex items-center gap-2 mt-2 text-sm text-gray-500">
                            <Calendar className="w-4 h-4" />
                            {new Date(inquiry.createdAt).toLocaleString()}
                        </div>
                    </div>
                    <Button variant="ghost" size="icon" onClick={() => setOpen(false)} className="text-gray-400 hover:text-gray-600">
                        <X className="w-5 h-5" />
                    </Button>
                </div>

                {/* Body */}
                <div className="p-6 overflow-y-auto flex-1 space-y-6">
                    {/* Sender Info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-blue-50/50 p-4 rounded-lg border border-blue-100">
                        <div className="flex items-start gap-3">
                            <div className="bg-white p-2 rounded-full shadow-sm text-blue-600">
                                <User className="w-4 h-4" />
                            </div>
                            <div>
                                <p className="text-xs font-semibold text-blue-600 uppercase tracking-widest">From</p>
                                <p className="text-sm font-medium text-gray-900">{inquiry.name}</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <div className="bg-white p-2 rounded-full shadow-sm text-blue-600">
                                <Mail className="w-4 h-4" />
                            </div>
                            <div>
                                <p className="text-xs font-semibold text-blue-600 uppercase tracking-widest">Email</p>
                                <a href={`mailto:${inquiry.email}`} className="text-sm font-medium text-gray-900 hover:text-blue-600 hover:underline">
                                    {inquiry.email}
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Message Content */}
                    <div>
                        <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">Message Content</p>
                        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 text-gray-700 leading-relaxed whitespace-pre-wrap">
                            {inquiry.message}
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="p-6 border-t border-gray-100 bg-gray-50/50 flex flex-col sm:flex-row justify-between items-center gap-4">
                    <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-gray-600">Status:</span>
                        <div className="flex bg-white rounded-md border border-gray-200 p-1">
                            {statuses.map(status => (
                                <button
                                    key={status}
                                    onClick={() => handleStatusChange(status)}
                                    disabled={isPending}
                                    className={`px-3 py-1 text-xs font-medium rounded-sm transition-colors ${inquiry.status === status
                                            ? 'bg-slate-900 text-white shadow-sm'
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
                        className="w-full sm:w-auto"
                    >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete Inquiry
                    </Button>
                </div>
            </div>
        </div>
    );
}
