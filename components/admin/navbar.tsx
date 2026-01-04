"use client";

import { Button } from "@/components/ui/button";
import { handleSignOut } from "@/lib/actions";
import { LogOut } from "lucide-react";

export function Navbar() {
    return (
        <div className="flex items-center p-4 border-b border-gray-200 bg-white justify-end h-16">
            <div className="flex items-center gap-x-4">
                <form action={handleSignOut}>
                    <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-600 hover:bg-red-50">
                        <LogOut className="h-4 w-4 mr-2" />
                        Sign Out
                    </Button>
                </form>
            </div>
        </div>
    );
}
