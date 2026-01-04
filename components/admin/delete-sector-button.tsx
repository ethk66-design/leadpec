"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { deleteSector } from "@/lib/sector-actions";
import { toast } from "sonner";

interface DeleteSectorButtonProps {
    id: string;
}

export function DeleteSectorButton({ id }: DeleteSectorButtonProps) {
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = async () => {
        if (!confirm("Are you sure you want to delete this sector? This action cannot be undone.")) {
            return;
        }

        setIsDeleting(true);
        try {
            const result = await deleteSector(id);
            if (result.success) {
                toast.success(result.success);
            } else if (result.error) {
                toast.error(result.error);
            }
        } catch (error) {
            toast.error("An unexpected error occurred.");
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <Button
            variant="ghost"
            size="sm"
            onClick={handleDelete}
            disabled={isDeleting}
            className="text-red-500 hover:text-red-700 hover:bg-red-50"
        >
            <Trash2 className="w-4 h-4" />
        </Button>
    );
}
