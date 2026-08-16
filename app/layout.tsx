import type { Metadata, Viewport } from "next";
import "./globals.css";
import StickyHeader from "@/components/layout/StickyHeader";
import Footer from "@/components/layout/Footer";
import GlobalSearch from "@/components/layout/GlobalSearch";
import { OrganizationAndWebsiteJsonLd } from "@/components/seo/JsonLd";

export const viewport: Viewport = {
  themeColor: "#0A3A2F",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://almuslims.com"),
  title: {
    default: "AlMuslims — Authentic Islamic Knowledge",
    template: "%s | AlMuslims",
  },
  description:
    "Explore authentic Islamic knowledge on the Holy Quran, Hadith, Duas & Azkar, Seerah of Prophet Muhammad ﷺ, 99 Names of Allah, Fiqh, and Aqeedah.",
  applicationName: "AlMuslims",
  authors: [{ name: "AlMuslims Scholars & Research Team" }],
  generator: "Next.js",
  keywords: [
    "Quran",
    "Hadith",
    "Islamic Knowledge",
    "Duas and Azkar",
    "Seerah",
    "99 Names of Allah",
    "Fiqh",
    "Aqeedah",
    "Tafsir",
    "Prayer Times",
    "Islamic Articles",
    "AlMuslims"
  ],
  creator: "AlMuslims",
  publisher: "AlMuslims",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  // As requested, keep non-indexed for now
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://almuslims.com",
    siteName: "AlMuslims",
    title: "AlMuslims — Authentic Islamic Knowledge",
    description:
      "Explore authentic Islamic knowledge on the Holy Quran, Hadith, Duas & Azkar, Seerah, 99 Names of Allah, and Fiqh.",
    images: [
      {
        url: "/logo.png",
        width: 800,
        height: 600,
        alt: "AlMuslims - Authentic Islamic Knowledge",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AlMuslims — Authentic Islamic Knowledge",
    description:
      "Explore authentic Islamic knowledge on the Holy Quran, Hadith, Duas & Azkar, Seerah, 99 Names of Allah, and Fiqh.",
    images: ["/logo.png"],
    creator: "@officialalmuslims",
  },
  alternates: {
    canonical: "https://almuslims.com",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <OrganizationAndWebsiteJsonLd />
        {/* Link to LLM standard directory */}
        <link rel="help" href="/llms.txt" type="text/markdown" title="LLM Site Summary" />
      </head>
      <body suppressHydrationWarning className="flex flex-col min-h-screen">
        <StickyHeader />
        
        {/* Main Content Area */}
        <main className="flex-1 w-full pt-[124px] md:pt-[110px]">
          {children}
        </main>
        
        <Footer />
        <GlobalSearch />
      </body>
    </html>
  );
}
