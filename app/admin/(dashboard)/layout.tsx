import { Navbar } from "@/components/admin/navbar";
import { Sidebar } from "@/components/admin/sidebar";

export const dynamic = 'force-dynamic';

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="h-full relative bg-gray-50">
            <div className="hidden h-full md:flex md:w-72 md:flex-col md:fixed md:inset-y-0 z-[80] bg-gray-900">
                <Sidebar />
            </div>
            <main className="md:pl-72">
                <Navbar />
                <div className="p-8">
                    {children}
                </div>
            </main>
        </div>
    );
}
