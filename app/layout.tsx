import type { Metadata } from "next";
import { Titillium_Web, Roboto } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Toaster } from "sonner";

const titillium = Titillium_Web({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-heading",
  display: "swap",
});
const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "LEADPEC | Global Recruitment & Executive Search",
  description: "LEADPEC is a global leader in recruitment, talent sourcing, and executive search, connecting businesses with top-tier talent worldwide.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={cn(titillium.variable, roboto.variable, "font-sans antialiased overflow-x-hidden w-full")}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}

