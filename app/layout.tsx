
import type { Metadata } from "next";
import "./globals.css";
import StickyHeader from "@/components/layout/StickyHeader";
import Footer from "@/components/layout/Footer";
import ContactCTA from "@/components/layout/ContactCTA";
import GlobalSearch from "@/components/layout/GlobalSearch";

export const metadata: Metadata = {
  title: "AlMuslims",
  description: "Your Professional Islamic Portal",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning className="flex flex-col min-h-screen">
        <StickyHeader />
        
        {/* Main Content Area */}
        <main className="flex-1 w-full pt-[124px] md:pt-[110px]">
          {children}
        </main>
        
        <ContactCTA />
        <Footer />
        <GlobalSearch />
      </body>
    </html>
  );
}
