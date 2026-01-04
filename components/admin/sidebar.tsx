"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
    LayoutDashboard,
    Briefcase,
    FileText,
    Users,
    Settings,
    LogOut,
    MessageSquare,
    Construction
} from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react"; // Client side signout

const routes = [
    {
        label: "Dashboard",
        icon: LayoutDashboard,
        href: "/admin/dashboard",
        color: "text-sky-500",
    },
    {
        label: "Jobs",
        icon: Briefcase,
        href: "/admin/jobs",
        color: "text-violet-500",
    },
    {
        label: "Content",
        icon: FileText,
        href: "/admin/content",
        color: "text-pink-700",
    },
    {
        label: "Applications",
        icon: Users,
        href: "/admin/applications",
        color: "text-orange-700",
    },
    {
        label: "Blog Posts",
        icon: FileText,
        href: "/admin/posts",
        color: "text-emerald-500",
    },
    {
        label: "Inquiries",
        icon: MessageSquare,
        href: "/admin/inquiries",
        color: "text-emerald-500",
    },
    {
        label: "Sectors",
        icon: Construction,
        href: "/admin/sectors",
        color: "text-yellow-500",
    },
    {
        label: "Settings",
        icon: Settings,
        href: "/admin/settings",
        color: "text-gray-500",
    },
];

export function Sidebar() {
    const pathname = usePathname();

    return (
        <div className="space-y-4 py-4 flex flex-col h-full bg-[#0B1B32] text-white border-r border-white/10">
            <div className="px-3 py-2 flex-1">
                <Link href="/admin/dashboard" className="flex items-center pl-3 mb-14">
                    <div className="relative w-32 h-10 mr-4">
                        <Image
                            fill
                            alt="Logo"
                            src="/logo.png"
                            className="object-contain"
                        />
                    </div>
                </Link>
                <div className="space-y-1">
                    {routes.map((route) => (
                        <Link
                            key={route.href}
                            href={route.href}
                            className={cn(
                                "text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition",
                                pathname === route.href ? "text-white bg-white/10" : "text-zinc-400"
                            )}
                        >
                            <div className="flex items-center flex-1">
                                <route.icon className={cn("h-5 w-5 mr-3", route.color)} />
                                {route.label}
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
            <div className="px-3 py-2">
                {/* Sign out is usually handled via server action or NextAuth client */}
            </div>
        </div>
    );
}
