'use server';

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { sendAdminNotification } from "@/lib/email";

const InquirySchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email"),
    subject: z.string().optional(),
    message: z.string().min(10, "Message must be at least 10 characters"),
});

const ApplicationSchema = z.object({
    jobId: z.string().optional(),
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email"),
    phone: z.string().min(1, "Phone is required"),
    linkedin: z.string().url("Invalid LinkedIn URL").optional().or(z.literal("")),
    coverLetter: z.string().optional(),
});

export async function submitInquiry(formData: FormData) {
    const validatedFields = InquirySchema.safeParse({
        name: formData.get("name"),
        email: formData.get("email"),
        subject: formData.get("subject"),
        message: formData.get("message"),
    });

    if (!validatedFields.success) {
        console.error(validatedFields.error);
        return { error: "Invalid fields. Please check your inputs." };
    }

    if (!prisma) return { error: "Database not available" };
    try {
        const newInquiry = await prisma.inquiry.create({
            data: validatedFields.data,
        });

        // Send Notification
        await sendAdminNotification({
            subject: `[LeadPec Inquiry] ${validatedFields.data.subject || 'New Message'}`,
            text: `Name: ${validatedFields.data.name}\nEmail: ${validatedFields.data.email}\nSubject: ${validatedFields.data.subject}\n\nMessage:\n${validatedFields.data.message}`,
            html: `
                <h3>New Web Inquiry</h3>
                <p><strong>From:</strong> ${validatedFields.data.name} (${validatedFields.data.email})</p>
                <p><strong>Subject:</strong> ${validatedFields.data.subject}</p>
                <hr />
                <p>${validatedFields.data.message.replace(/\n/g, '<br>')}</p>
                <br />
                <a href="${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/admin/inquiries">View in Admin Panel</a>
            `
        });

        return { success: "Message sent successfully! We'll be in touch." };
    } catch (error) {
        return { error: "Failed to send message. Please try again." };
    }
}

export async function submitApplication(formData: FormData) {
    const validatedFields = ApplicationSchema.safeParse({
        jobId: formData.get("jobId"),
        name: formData.get("name"),
        email: formData.get("email"),
        phone: formData.get("phone"),
        linkedin: formData.get("linkedin"),
        coverLetter: formData.get("coverLetter"),
    });

    if (!validatedFields.success) {
        console.error(validatedFields.error);
        return { error: "Invalid fields. Please check your inputs." };
    }

    if (!prisma) return { error: "Database not available" };
    try {
        await prisma.application.create({
            data: {
                ...validatedFields.data,
                jobId: validatedFields.data.jobId || undefined // Handle empty string vs undefined
            },
        });

        // Send Notification
        const jobText = validatedFields.data.jobId ? `Job ID: ${validatedFields.data.jobId}` : "General Application";
        await sendAdminNotification({
            subject: `[LeadPec Application] ${validatedFields.data.name}`,
            text: `New Application Received.\n\nCandidate: ${validatedFields.data.name}\nEmail: ${validatedFields.data.email}\nPhone: ${validatedFields.data.phone}\n${jobText}\n\nLinkedIn: ${validatedFields.data.linkedin || 'N/A'}\n\nCover Letter:\n${validatedFields.data.coverLetter || 'N/A'}`,
            html: `
                <h3>New Job Application</h3>
                <p><strong>Candidate:</strong> ${validatedFields.data.name}</p>
                <p><strong>Email:</strong> ${validatedFields.data.email}</p>
                <p><strong>Phone:</strong> ${validatedFields.data.phone}</p>
                <p><strong>Position:</strong> ${jobText}</p>
                <p><strong>LinkedIn:</strong> ${validatedFields.data.linkedin || 'N/A'}</p>
                <hr />
                <h4>Cover Letter / Message:</h4>
                <p>${(validatedFields.data.coverLetter || 'N/A').replace(/\n/g, '<br>')}</p>
                <br />
                <a href="${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/admin/applications">View in Admin Panel</a>
            `
        });

        return { success: "Application submitted successfully! Good luck." };
    } catch (error) {
        console.error(error);
        return { error: "Failed to submit application. Please try again." };
    }
}

export async function getSiteAssetAction(key: string) {
    if (!prisma) return null;
    try {
        const asset = await prisma.siteAsset.findUnique({
            where: { key }
        });
        return asset?.url || null;
    } catch (error) {
        console.error(`Failed to fetch asset ${key}:`, error);
        return null; // Fail gracefully
    }
}
