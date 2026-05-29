import type { Metadata } from "next";
import "./globals.css";
import AnnouncementBar from "@/components/layout/AnnouncementBar"; 
import Navbar from "@/components/layout/Navbar"; // Nayi Navbar import ki
import Footer from "@/components/layout/Footer"; // Naya Footer import kiya

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
    <html lang="en">
      <body className="antialiased bg-background text-primary min-h-screen flex flex-col m-0 p-0">
        
        {/* Top Header Group */}
        <header className="w-full block z-50">
          <AnnouncementBar />
          <Navbar /> {/* Announcement Bar ke foran baad Navbar set ho gayi! */}
        </header>
        
        {/* Main Content Area */}
        <div className="flex-1 w-full block">
          {children}
        </div>
        
        {/* Footer */}
        <Footer />

      </body>
    </html>
  );
}