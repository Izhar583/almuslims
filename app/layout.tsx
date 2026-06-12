import type { Metadata } from "next";
import "./globals.css";
import AnnouncementBar from "@/components/layout/AnnouncementBar"; 
import Navbar from "@/components/layout/Navbar"; // Nayi Navbar import ki
import Footer from "@/components/layout/Footer"; // Naya Footer import kiya
import { ThemeProvider } from "@/components/layout/ThemeProvider";
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
    <html lang="en">
      <body className="antialiased bg-background text-zinc-800 dark:text-zinc-200 min-h-screen flex flex-col m-0 p-0">
        <ThemeProvider>
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

          {/* Unified Global Search Overlay */}
          <GlobalSearch />
        </ThemeProvider>
      </body>
    </html>
  );
}
