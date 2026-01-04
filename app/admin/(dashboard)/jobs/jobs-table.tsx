"use client";

import { Job } from "@prisma/client";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Pencil, Trash, EyeOff, Eye } from "lucide-react";
import Link from "next/link";
import { deleteJob, toggleJobStatus } from "@/lib/admin-actions";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { Badge } from "@/components/ui/badge";

interface JobsTableProps {
    initialJobs: Job[];
}

export function JobsTable({ initialJobs }: JobsTableProps) {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();

    const handleDelete = async (id: string) => {
        if (confirm("Are you sure you want to delete this job?")) {
            await deleteJob(id);
        }
    };

    const handleToggle = async (id: string, currentStatus: boolean) => {
        await toggleJobStatus(id, !currentStatus);
    };

    return (
        <div className="rounded-md border bg-white">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Title</TableHead>
                        <TableHead>Department</TableHead>
                        <TableHead>Location</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Posted</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {initialJobs.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={7} className="text-center h-24 text-muted-foreground">
                                No jobs found. Create one to get started.
                            </TableCell>
                        </TableRow>
                    ) : (
                        initialJobs.map((job) => (
                            <TableRow key={job.id}>
                                <TableCell className="font-medium">{job.title}</TableCell>
                                <TableCell>{job.department}</TableCell>
                                <TableCell>{job.location}</TableCell>
                                <TableCell>{job.type}</TableCell>
                                <TableCell>
                                    <Badge variant={job.isActive ? "default" : "secondary"} className={job.isActive ? "bg-green-600" : "bg-gray-400"}>
                                        {job.isActive ? "Active" : "Draft"}
                                    </Badge>
                                </TableCell>
                                <TableCell>{new Date(job.postedDate).toLocaleDateString()}</TableCell>
                                <TableCell className="text-right">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" className="h-8 w-8 p-0">
                                                <span className="sr-only">Open menu</span>
                                                <MoreHorizontal className="h-4 w-4" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                            <DropdownMenuItem asChild>
                                                <Link href={`/admin/jobs/${job.id}`}>
                                                    <Pencil className="mr-2 h-4 w-4" /> Edit
                                                </Link>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem onClick={() => handleToggle(job.id, job.isActive)}>
                                                {job.isActive ? (
                                                    <><EyeOff className="mr-2 h-4 w-4" /> Deactivate</>
                                                ) : (
                                                    <><Eye className="mr-2 h-4 w-4" /> Activate</>
                                                )}
                                            </DropdownMenuItem>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem
                                                className="text-red-600 focus:bg-red-50"
                                                onClick={() => handleDelete(job.id)}
                                            >
                                                <Trash className="mr-2 h-4 w-4" /> Delete
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </div>
    );
}
