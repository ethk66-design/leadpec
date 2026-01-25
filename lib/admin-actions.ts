'use server';

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAuth } from "@/lib/auth-utils";

export async function updateInquiryStatus(id: string, status: string) {
    if (!prisma) return { error: "Database not available" };
    try {
        await requireAuth();
        await prisma.inquiry.update({
            where: { id },
            data: { status }
        });
        revalidatePath('/admin/inquiries');
        return { success: "Status updated" };
    } catch (error) {
        return { error: "Failed to update status" };
    }
}

export async function updateApplicationStatus(id: string, status: string) {
    if (!prisma) return { error: "Database not available" };
    try {
        await requireAuth();
        await prisma.application.update({
            where: { id },
            data: { status }
        });
        revalidatePath('/admin/applications');
        return { success: "Status updated" };
    } catch (error) {
        return { error: "Failed to update status" };
    }
}

export async function deleteInquiry(id: string) {
    if (!prisma) return { error: "Database not available" };
    try {
        await requireAuth();
        await prisma.inquiry.delete({ where: { id } });
        revalidatePath('/admin/inquiries');
        return { success: "Deleted" };
    } catch (error) {
        return { error: "Failed to delete" };
    }
}

export async function deleteApplication(id: string) {
    if (!prisma) return { error: "Database not available" };
    try {
        await requireAuth();
        await prisma.application.delete({ where: { id } });
        revalidatePath('/admin/applications');
        return { success: "Deleted" };
    } catch (error) {
        return { error: "Failed to delete" };
    }
}

export async function deleteJob(id: string) {
    if (!prisma) return { error: "Database not available" };
    try {
        await requireAuth();
        await prisma.job.delete({ where: { id } });
        revalidatePath('/admin/jobs');
        revalidatePath('/careers');
        return { success: "Job deleted" };
    } catch (error) {
        return { error: "Failed to delete job" };
    }
}

export async function toggleJobStatus(id: string, isActive: boolean) {
    if (!prisma) return { error: "Database not available" };
    try {
        await requireAuth();
        await prisma.job.update({
            where: { id },
            data: { isActive: !isActive }
        });
        revalidatePath('/admin/jobs');
        revalidatePath('/careers');
        return { success: "Status updated" };
    } catch (error) {
        return { error: "Failed to update status" };
    }
}

export async function createJob(formData: FormData) {
    if (!prisma) return { error: "Database not available" };

    try {
        await requireAuth();
    } catch (e) {
        return { error: "Unauthorized" };
    }

    const title = formData.get("title") as string;
    const department = formData.get("department") as string;
    const location = formData.get("location") as string;
    const type = formData.get("type") as string;
    const description = formData.get("description") as string;
    const skills = formData.get("skills") as string;

    if (!title || !department || !location || !type || !description) {
        return { error: "Missing required fields" };
    }

    try {
        await prisma.job.create({
            data: {
                title,
                department,
                location,
                type,
                description,
                skills: skills || "",
                image: (formData.get("image") as string) || null,
            }
        });
    } catch (error) {
        return { error: "Failed to create job" };
    }

    revalidatePath('/admin/jobs');
    revalidatePath('/careers');
    redirect('/admin/jobs');
}

export async function updateJob(id: string, formData: FormData) {
    if (!prisma) return { error: "Database not available" };

    try {
        await requireAuth();
    } catch (e) {
        return { error: "Unauthorized" };
    }

    const title = formData.get("title") as string;
    const department = formData.get("department") as string;
    const location = formData.get("location") as string;
    const type = formData.get("type") as string;
    const description = formData.get("description") as string;
    const skills = formData.get("skills") as string;

    if (!title || !department || !location || !type || !description) {
        return { error: "Missing required fields" };
    }

    try {
        // Fix: Use data object directly
        await prisma.job.update({
            where: { id },
            data: {
                title,
                department,
                location,
                type,
                description,
                skills: skills || "",
                image: (formData.get("image") as string) || null,
            }
        });
    } catch (error) {
        return { error: "Failed to update job" };
    }

    revalidatePath('/admin/jobs');
    revalidatePath('/careers');
    redirect('/admin/jobs');
}
