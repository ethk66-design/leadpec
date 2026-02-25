import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Briefcase, FileText, Users } from "lucide-react";
import { prisma } from "@/lib/db";

export const dynamic = 'force-dynamic';

export default async function DashboardPage() {
    // 1. Jobs Data
    const totalJobs = await prisma.job.count({
        where: { isActive: true }
    });

    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const recentJobs = await prisma.job.count({
        where: {
            isActive: true,
            postedDate: { gte: thirtyDaysAgo }
        }
    });

    // 2. Blogs Data
    const totalBlogs = await prisma.post.count({
        where: { published: true }
    });

    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const recentBlogs = await prisma.post.count({
        where: {
            published: true,
            createdAt: { gte: sevenDaysAgo }
        }
    });

    // 3. Applications Data
    const totalApplications = await prisma.application.count();
    const recentApplications = await prisma.application.count({
        where: { createdAt: { gte: sevenDaysAgo } }
    });

    return (
        <div>
            <h2 className="text-3xl font-bold tracking-tight mb-8">Dashboard</h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Jobs</CardTitle>
                        <Briefcase className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{totalJobs}</div>
                        <p className="text-xs text-muted-foreground">+{recentJobs} from last month</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Active Blogs</CardTitle>
                        <FileText className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{totalBlogs}</div>
                        <p className="text-xs text-muted-foreground">+{recentBlogs} this week</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Applications</CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{totalApplications}</div>
                        <p className="text-xs text-muted-foreground">+{recentApplications} new</p>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
