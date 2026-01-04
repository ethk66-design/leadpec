import { prisma } from "@/lib/db";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ApplicationViewModal } from "@/components/admin/application-view-modal";

export const dynamic = 'force-dynamic';

export default async function ApplicationsPage() {
    let applications: any[] = [];
    if (prisma) {
        applications = await prisma.application.findMany({
            include: {
                job: true // Include job details
            },
            orderBy: {
                createdAt: "desc"
            }
        });
    }

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">Applications</h2>
                <p className="text-muted-foreground">Manage incoming job applications.</p>
            </div>

            <div className="rounded-md border bg-white">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Candidate</TableHead>
                            <TableHead>Applying For</TableHead>
                            <TableHead>Contact</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {applications.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={6} className="text-center h-24 text-muted-foreground">
                                    No applications yet.
                                </TableCell>
                            </TableRow>
                        ) : (
                            applications.map((app) => (
                                <TableRow key={app.id}>
                                    <TableCell className="font-medium">
                                        <div>{app.name}</div>
                                        <div className="text-xs text-muted-foreground">{app.email}</div>
                                    </TableCell>
                                    <TableCell>
                                        {app.job ? (
                                            <span className="font-medium text-blue-600">{app.job.title}</span>
                                        ) : (
                                            <span className="text-gray-400">General Application</span>
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        <div className="space-y-1">
                                            <div className="text-xs">{app.phone}</div>
                                            {app.linkedin && (
                                                <a href={app.linkedin} target="_blank" rel="noopener noreferrer" className="text-xs text-[#008CBA] hover:underline">
                                                    LinkedIn Profile
                                                </a>
                                            )}
                                        </div>
                                    </TableCell>
                                    <TableCell>{new Date(app.createdAt).toLocaleDateString()}</TableCell>
                                    <TableCell>
                                        <Badge variant="outline">{app.status}</Badge>
                                    </TableCell>
                                    <TableCell>
                                        <ApplicationViewModal application={app} />
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
