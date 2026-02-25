import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ContactContent } from "@/components/pages/contact-content";
import { prisma } from "@/lib/db";

export const dynamic = 'force-dynamic';

export default async function ContactPage() {
    let supportImage: string | null = null;

    if (prisma) {
        try {
            const asset = await prisma.siteAsset.findUnique({
                where: { key: "CONTACT_SUPPORT_IMG" }
            });
            if (asset) supportImage = asset.url;
        } catch (e) {
            console.warn("DB unavailable, using fallback asset for contact");
        }
    }

    return (
        <div className="flex min-h-screen flex-col bg-[#051120]">
            <Header />
            <ContactContent supportImage={supportImage} />
            <Footer />
        </div>
    );
}
