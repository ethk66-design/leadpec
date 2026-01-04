"use client";

import { useState } from "react";
import { useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Send } from "lucide-react";
import { submitApplication } from "@/lib/public-actions";

export function ApplicationForm({ jobId, jobTitle }: { jobId: string, jobTitle: string }) {
    const [isPending, startTransition] = useTransition();
    const [message, setMessage] = useState<{ text: string, type: 'success' | 'error' } | null>(null);

    async function handleSubmit(formData: FormData) {
        setMessage(null);
        startTransition(async () => {
            // Append Job ID to formData
            formData.append("jobId", jobId);

            const result = await submitApplication(formData);
            if (result.error) {
                setMessage({ text: result.error, type: 'error' });
            } else {
                setMessage({ text: result.success as string, type: 'success' });
            }
        });
    }

    return (
        <div className="bg-[#0B1B32] p-8 rounded-xl border border-white/10">
            <h3 className="text-2xl font-bold text-white mb-6">Apply for this position</h3>
            <form action={handleSubmit} className="space-y-6">
                <input type="hidden" name="jobId" value={jobId} />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label htmlFor="name" className="text-sm font-medium text-gray-300">Full Name *</label>
                        <Input name="name" id="name" required placeholder="John Doe" className="bg-[#051120] border-white/10 text-white placeholder:text-gray-500 focus:border-[#008CBA]" />
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-medium text-gray-300">Email Address *</label>
                        <Input name="email" id="email" type="email" required placeholder="john@example.com" className="bg-[#051120] border-white/10 text-white placeholder:text-gray-500 focus:border-[#008CBA]" />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label htmlFor="phone" className="text-sm font-medium text-gray-300">Phone Number *</label>
                        <Input name="phone" id="phone" required placeholder="+1 234 567 890" className="bg-[#051120] border-white/10 text-white placeholder:text-gray-500 focus:border-[#008CBA]" />
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="linkedin" className="text-sm font-medium text-gray-300">LinkedIn Profile (Optional)</label>
                        <Input name="linkedin" id="linkedin" placeholder="https://linkedin.com/in/..." className="bg-[#051120] border-white/10 text-white placeholder:text-gray-500 focus:border-[#008CBA]" />
                    </div>
                </div>

                <div className="space-y-2">
                    <label htmlFor="coverLetter" className="text-sm font-medium text-gray-300">Cover Letter / Message</label>
                    <Textarea name="coverLetter" id="coverLetter" placeholder="Tell us why you are a great fit..." className="bg-[#051120] border-white/10 text-white placeholder:text-gray-500 focus:border-[#008CBA] min-h-[150px]" />
                </div>

                {message && (
                    <div className={`p-3 rounded-md text-sm ${message.type === 'success' ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
                        {message.text}
                    </div>
                )}

                <Button type="submit" disabled={isPending} className="w-full bg-[#008CBA] hover:bg-[#007da6] text-white py-6 text-lg font-bold">
                    {isPending ? "Submitting Application..." : "Submit Application"}
                </Button>

                <p className="text-xs text-gray-500 text-center">
                    By submitting, you agree to our privacy policy and consent to be contacted regarding this application.
                </p>
            </form>
        </div>
    );
}
