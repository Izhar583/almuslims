import React from "react";
import Link from "next/link";
import {
  HiOutlineDocumentText,
  HiOutlineComputerDesktop,
  HiOutlineBookOpen,
  HiOutlineLink,
  HiOutlineScale,
  HiOutlineArrowPath,
  HiOutlineEnvelope,
  HiOutlineArrowRight,
  HiOutlineShieldCheck,
} from "react-icons/hi2";

export const metadata = {
  title: "Terms & Conditions — AlMuslims",
  description:
    "Read the Terms and Conditions for using the AlMuslims platform and all its services.",
};

const sections = [
  {
    number: "01",
    icon: <HiOutlineShieldCheck className="w-6 h-6" />,
    title: "Acceptance of Terms",
    content:
      "By accessing and using AlMuslims.com, you confirm that you have read, understood, and agree to be bound by these Terms and Conditions. If you do not agree with any part of these terms, you must not use our website or services. We reserve the right to update these terms at any time, and your continued use of the platform constitutes acceptance of the revised terms.",
  },
  {
    number: "02",
    icon: <HiOutlineComputerDesktop className="w-6 h-6" />,
    title: "Use of the Website",
    content:
      "You agree to use AlMuslims.com for lawful purposes only. You must not use the website in any way that may damage, disable, overburden, or impair the site, or interfere with any other party's use. You are responsible for ensuring that any information you submit through our platform is accurate, lawful, and does not violate the rights of any third party.",
  },
  {
    number: "03",
    icon: <HiOutlineBookOpen className="w-6 h-6" />,
    title: "Content Disclaimer",
    content:
      "The content provided on AlMuslims.com — including Quranic translations, Hadith, articles, and scholarly opinions — is for general informational and educational purposes only. While we strive to ensure accuracy, we do not guarantee that all information is complete, reliable, or up to date. Always consult qualified scholars for specific Islamic rulings and personal matters of faith.",
  },
  {
    number: "04",
    icon: <HiOutlineDocumentText className="w-6 h-6" />,
    title: "Intellectual Property",
    content:
      "All content on this website — including articles, text, graphics, logos, UI designs, and images — is the property of AlMuslims.com unless stated otherwise. You may not copy, reproduce, republish, or distribute any content without our prior written permission. Quranic texts and Hadiths are from public Islamic sources and attributed accordingly.",
  },
  {
    number: "05",
    icon: <HiOutlineLink className="w-6 h-6" />,
    title: "External Links",
    content:
      "Our website may contain links to third-party websites for convenience and informational purposes. These links do not constitute our endorsement of the content on those sites. We are not responsible for the content, policies, accuracy, or practices of any third-party websites. We encourage you to review the terms and privacy policies of any external site you visit.",
  },
  {
    number: "06",
    icon: <HiOutlineScale className="w-6 h-6" />,
    title: "Limitation of Liability",
    content:
      "AlMuslims.com shall not be held liable for any loss or damage — direct, indirect, incidental, or consequential — arising from the use or inability to use our website or any information provided on it. This includes, but is not limited to, errors in content, service interruptions, or unauthorized access to user data.",
  },
  {
    number: "07",
    icon: <HiOutlineArrowPath className="w-6 h-6" />,
    title: "Changes to These Terms",
    content:
      "We reserve the right to update or modify these Terms and Conditions at any time without prior notice. Changes will be effective immediately upon posting to this page. We recommend reviewing this page periodically so you remain aware of any updates. Your continued use of the platform after changes are posted constitutes your acceptance of the revised terms.",
  },
  {
    number: "08",
    icon: <HiOutlineEnvelope className="w-6 h-6" />,
    title: "Contact Us",
    content:
      "If you have any questions, concerns, or feedback about these Terms and Conditions, please do not hesitate to reach out to us. You can contact us via our Contact page or directly at info@almuslims.com. We are committed to addressing your concerns promptly and transparently.",
  },
];

export default function TermsPage() {
  return (
    <main className="bg-[#FAF7F2] min-h-screen font-body">

      {/* ── Hero ── */}
      <section className="relative overflow-hidden pt-16 pb-24">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-3xl -translate-y-1/3 -translate-x-1/4 pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-3xl translate-y-1/3 translate-x-1/4 pointer-events-none" />

        <div className="max-w-[1100px] mx-auto px-6 sm:px-10 lg:px-16 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-12">
            <div className="lg:col-span-7 space-y-8">
              {/* Breadcrumb */}
              <nav className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-400">
                <Link href="/" className="hover:text-primary transition-colors">Home</Link>
                <span className="w-1 h-1 rounded-full bg-gray-300" />
                <span className="text-primary">Terms & Conditions</span>
              </nav>

              <div>
                <h1 className="font-heading text-5xl sm:text-7xl font-black text-[#0A3A2F] leading-tight tracking-tight">
                  Terms &<br/>
                  <span className="text-secondary italic">Conditions</span>
                </h1>
                <div className="w-24 h-1.5 bg-secondary rounded-full mt-6" />
              </div>

              <p className="text-gray-500 text-lg leading-relaxed max-w-xl">
                By using AlMuslims, you agree to the following terms. Please read them carefully. We&apos;ve written them plainly so they&apos;re easy to understand.
              </p>

              {/* Welcome card */}
              <div className="inline-block bg-white/80 backdrop-blur-sm rounded-2xl border border-primary/10 px-8 py-5 shadow-sm">
                <p className="text-sm text-gray-700 leading-relaxed">
                  <span className="font-bold text-primary">Welcome to AlMuslims.</span>{" "}
                  By accessing and using AlMuslims.com, you agree to comply with and be bound by the following Terms and Conditions. Please read them carefully.
                </p>
              </div>
            </div>

            {/* Decorative Icon Panel */}
            <div className="lg:col-span-5 hidden lg:flex justify-center items-center">
              <div className="relative w-72 h-72">
                <div className="absolute inset-0 bg-secondary/10 rounded-[4rem] -rotate-6" />
                <div className="absolute inset-0 bg-white rounded-[4rem] shadow-2xl flex flex-col items-center justify-center gap-6 p-10">
                  <div className="w-20 h-20 bg-secondary/10 rounded-3xl flex items-center justify-center text-secondary">
                    <HiOutlineDocumentText className="w-10 h-10" />
                  </div>
                  <p className="font-heading text-xl font-bold text-center text-gray-900 leading-snug">Fair Terms,<br/>Clear Rules</p>
                  <div className="flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-primary">
                    <span className="w-2 h-2 rounded-full bg-primary" />
                    Effective June 2025
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="max-w-[1100px] mx-auto px-6 sm:px-10 lg:px-16 pb-24 space-y-6">
        {sections.map((sec) => (
          <div
            key={sec.number}
            className="group bg-white rounded-[2.5rem] border border-gray-100 p-8 sm:p-10 shadow-sm hover:shadow-lg hover:border-primary/10 transition-all duration-500 flex gap-8"
          >
            {/* Left accent */}
            <div className="hidden sm:flex flex-col items-center gap-4 pt-1">
              <div className="w-12 h-12 rounded-2xl bg-secondary/10 flex items-center justify-center text-secondary group-hover:bg-secondary/20 transition-all">
                {sec.icon}
              </div>
              <span
                className="text-[11px] font-black text-gray-200 uppercase tracking-widest select-none"
                style={{ writingMode: "vertical-rl", rotate: "180deg" }}
              >
                {sec.number}
              </span>
            </div>

            {/* Right content */}
            <div className="flex-1">
              <h2 className="font-heading text-2xl font-bold text-[#0A3A2F] mb-4 flex items-center gap-3">
                <span className="text-secondary font-black text-base">{sec.number}.</span>
                {sec.title}
              </h2>
              <p className="text-gray-500 leading-relaxed text-[15px]">{sec.content}</p>
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}
