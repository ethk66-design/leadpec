"use client";

import { Job } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { createJob, updateJob } from "@/lib/admin-actions";
import Link from "next/link";
import { useFormStatus } from "react-dom";
import { useState } from "react";
import { SECTORS } from "@/lib/constants";

interface JobFormProps {
    job?: Job;
}

export function JobForm({ job }: JobFormProps) {
    // If job exists, we are editing. Otherwise creating.
    const isEditing = !!job;
    const handleSubmit = async (formData: FormData) => {
        const result = isEditing
            ? await updateJob(job.id, formData)
            : await createJob(formData);

        if (result?.error) {
            alert(result.error);
        }
    };

    return (
        <form action={handleSubmit} className="space-y-8 max-w-2xl bg-white p-6 rounded-lg border shadow-sm">
            <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                    <label className="text-sm font-medium">Job Title</label>
                    <Input name="title" defaultValue={job?.title} required placeholder="e.g. Senior Piping Engineer" />
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-medium">Department</label>
                    <Select name="department" defaultValue={job?.department} required>
                        <SelectTrigger>
                            <SelectValue placeholder="Select Sector" />
                        </SelectTrigger>
                        <SelectContent>
                            {SECTORS.map((sector) => (
                                <SelectItem key={sector.title} value={sector.title}>
                                    {sector.title}
                                </SelectItem>
                            ))}
                            <SelectItem value="Other">Other</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                    <label className="text-sm font-medium">Location</label>
                    <Input name="location" defaultValue={job?.location} required placeholder="e.g. Abu Dhabi, UAE" />
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-medium">Job Type</label>
                    <Select name="type" defaultValue={job?.type} required>
                        <SelectTrigger>
                            <SelectValue placeholder="Select Type" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Contract">Contract</SelectItem>
                            <SelectItem value="Permanent">Permanent</SelectItem>
                            <SelectItem value="Temporary">Temporary</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            <div className="space-y-2">
                <label className="text-sm font-medium">Description</label>
                <div className="text-xs text-muted-foreground mb-1">
                    Describe the role responsibilities and requirements.
                </div>
                <Textarea
                    name="description"
                    defaultValue={job?.description}
                    required
                    className="min-h-[200px]"
                    placeholder="Role Overview..."
                />
            </div>

            <div className="space-y-2">
                <label className="text-sm font-medium">Required Skills (Optional)</label>
                <Input name="skills" defaultValue={job?.skills} placeholder="e.g. AutoCAD, PMP, Offshore Safety (Comma separated)" />
            </div>

            <div className="flex items-center gap-4 pt-4">
                <SubmitButton isEditing={isEditing} />
                <Button variant="outline" asChild>
                    <Link href="/admin/jobs">Cancel</Link>
                </Button>
            </div>
        </form>
    );
}

function SubmitButton({ isEditing }: { isEditing: boolean }) {
    const { pending } = useFormStatus();

    return (
        <Button type="submit" className="bg-[#008CBA] hover:bg-[#007ba3]" disabled={pending}>
            {pending ? "Saving..." : isEditing ? "Update Job" : "Create Job"}
        </Button>
    );
}
