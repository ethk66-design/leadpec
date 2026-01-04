import { HeaderClient } from "./header-client";
import { prisma } from "@/lib/db";

export async function Header() {
    let sectors: any[] = [];
    if (prisma) {
        sectors = await prisma.sector.findMany({
            orderBy: { title: "asc" }
        });
    }

    return <HeaderClient sectors={sectors} />;
}
