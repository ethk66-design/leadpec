import { prisma } from "@/lib/db";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Plus } from "lucide-react";
import { JobsTable } from "./jobs-table";

export const dynamic = 'force-dynamic';

export default async function JobsPage() {
    let jobs: any[] = [];
    if (prisma) {
        jobs = await prisma.job.findMany({
            orderBy: {
                postedDate: "desc"
            }
        });
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Jobs</h2>
                    <p className="text-muted-foreground">Manage your job listings and applications here.</p>
                </div>
                <Button asChild className="bg-[#008CBA] hover:bg-[#007ba3]">
                    <Link href="/admin/jobs/new">
                        <Plus className="mr-2 h-4 w-4" /> Add New Job
                    </Link>
                </Button>
            </div>

            <JobsTable initialJobs={jobs} />
        </div>
    );
}
