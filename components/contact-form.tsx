"use client";

import { useState } from "react";
import { useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Send } from "lucide-react";
import { submitInquiry } from "@/lib/public-actions";


export function ContactForm() {
    const [isPending, startTransition] = useTransition();
    const [message, setMessage] = useState<{ text: string, type: 'success' | 'error' } | null>(null);

    async function handleSubmit(formData: FormData) {
        setMessage(null);
        startTransition(async () => {
            const result = await submitInquiry(formData);
            if (result.error) {
                setMessage({ text: result.error, type: 'error' });
            } else {
                setMessage({ text: result.success as string, type: 'success' });
                // Reset form? formData doesn't reset automatically.
                // In a real app we might use useRef to reset HTMLFormElement
            }
        });
    }

    return (
        <form action={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium text-gray-300">Full Name</label>
                    <Input name="name" id="name" required placeholder="John Doe" className="bg-[#0B1B32] border-white/10 text-white placeholder:text-gray-500 focus:border-[#008CBA]" />
                </div>
                <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium text-gray-300">Email Address</label>
                    <Input name="email" id="email" type="email" required placeholder="john@example.com" className="bg-[#0B1B32] border-white/10 text-white placeholder:text-gray-500 focus:border-[#008CBA]" />
                </div>
            </div>

            <div className="space-y-2">
                <label htmlFor="subject" className="text-sm font-medium text-gray-300">Subject</label>
                <Input name="subject" id="subject" placeholder="Recruitment Inquiry" className="bg-[#0B1B32] border-white/10 text-white placeholder:text-gray-500 focus:border-[#008CBA]" />
            </div>

            <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium text-gray-300">Message</label>
                <Textarea name="message" id="message" required placeholder="How can we help you?" className="bg-[#0B1B32] border-white/10 text-white placeholder:text-gray-500 focus:border-[#008CBA] min-h-[150px]" />
            </div>

            {message && (
                <div className={`p-3 rounded-md text-sm ${message.type === 'success' ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
                    {message.text}
                </div>
            )}

            <Button type="submit" disabled={isPending} className="w-full md:w-auto bg-[#008CBA] hover:bg-[#007da6] text-white">
                {isPending ? "Sending..." : <><Send className="w-4 h-4 mr-2" /> Send Message</>}
            </Button>
        </form>
    );
}
