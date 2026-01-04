import { prisma } from "@/lib/db";
import { JobForm } from "@/components/admin/job-form";
import { notFound } from "next/navigation";

interface EditJobPageProps {
    params: {
        id: string;
    };
}

export const dynamic = 'force-dynamic';

export default async function EditJobPage({ params }: EditJobPageProps) {
    if (!prisma) {
        notFound();
    }

    const job = await prisma.job.findUnique({
        where: { id: params.id }
    });

    if (!job) {
        notFound();
    }

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">Edit Job</h2>
                <p className="text-muted-foreground">{job.title}</p>
            </div>
            <JobForm job={job} />
        </div>
    );
}
