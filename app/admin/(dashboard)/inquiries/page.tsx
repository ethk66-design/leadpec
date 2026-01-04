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
import { InquiryViewModal } from "@/components/admin/inquiry-view-modal";

export const dynamic = 'force-dynamic';

export default async function InquiriesPage() {
    let inquiries: any[] = [];
    if (prisma) {
        inquiries = await prisma.inquiry.findMany({
            orderBy: {
                createdAt: "desc"
            }
        });
    }

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">Inquiries</h2>
                <p className="text-muted-foreground">Messages from the Contact Us form.</p>
            </div>

            <div className="rounded-md border bg-white">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>From</TableHead>
                            <TableHead>Subject</TableHead>
                            <TableHead>Message</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {inquiries.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={6} className="text-center h-24 text-muted-foreground">
                                    No messages found.
                                </TableCell>
                            </TableRow>
                        ) : (
                            inquiries.map((msg) => (
                                <TableRow key={msg.id}>
                                    <TableCell className="font-medium">
                                        <div>{msg.name}</div>
                                        <div className="text-xs text-muted-foreground">{msg.email}</div>
                                    </TableCell>
                                    <TableCell>{msg.subject || "No Subject"}</TableCell>
                                    <TableCell className="max-w-md truncate text-muted-foreground">
                                        {msg.message}
                                    </TableCell>
                                    <TableCell>{new Date(msg.createdAt).toLocaleDateString()}</TableCell>
                                    <TableCell>
                                        <Badge variant="outline">{msg.status}</Badge>
                                    </TableCell>
                                    <TableCell>
                                        <InquiryViewModal inquiry={msg} />
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
