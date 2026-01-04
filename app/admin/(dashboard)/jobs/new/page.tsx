import { JobForm } from "@/components/admin/job-form";

export default function NewJobPage() {
    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">Post New Job</h2>
                <p className="text-muted-foreground">Fill in the details below to publish a new position.</p>
            </div>
            <JobForm />
        </div>
    );
}
