import { SectorForm } from "@/components/admin/sector-form";

export default function NewSectorPage() {
    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">Add New Sector</h2>
                <p className="text-muted-foreground">Create a new industry sector.</p>
            </div>
            <SectorForm />
        </div>
    );
}
