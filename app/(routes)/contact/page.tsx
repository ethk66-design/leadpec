import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ContactContent } from "@/components/pages/contact-content";

export const dynamic = 'force-dynamic';

export default function ContactPage() {
    return (
        <div className="flex min-h-screen flex-col bg-[#051120]">
            <Header />
            <ContactContent />
            <Footer />
        </div>
    );
}
