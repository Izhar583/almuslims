import React from "react";
import Link from "next/link";
import {
  HiOutlineShieldCheck,
  HiOutlineEye,
  HiOutlineLockClosed,
  HiOutlineGlobeAlt,
  HiOutlineTrash,
  HiOutlineBell,
  HiOutlineEnvelope,
  HiOutlineArrowRight,
} from "react-icons/hi2";

export const metadata = {
  title: "Privacy Policy — AlMuslims",
  description:
    "Read AlMuslims' Privacy Policy to understand how we handle and protect your personal information.",
};

const sections = [
  {
    number: "01",
    icon: <HiOutlineEye className="w-6 h-6" />,
    title: "Information We Collect",
    content:
      "AlMuslims respects your privacy and collects only minimal information required to deliver the best possible experience. This may include basic usage data such as pages visited, search queries, and general interaction patterns — all used exclusively to improve our services. We do not collect sensitive personal information unless you explicitly provide it (e.g., through a contact form).",
  },
  {
    number: "02",
    icon: <HiOutlineShieldCheck className="w-6 h-6" />,
    title: "How We Use Your Data",
    content:
      "Any information collected is used solely for improving the platform, analyzing traffic trends, and ensuring our content remains relevant and accessible to the Muslim community worldwide. We do not sell, trade, or rent your personal data to any third parties. Your trust is paramount to us.",
  },
  {
    number: "03",
    icon: <HiOutlineGlobeAlt className="w-6 h-6" />,
    title: "Third-Party Services",
    content:
      "We may use third-party APIs — such as AlQuran.cloud or AlAdhan — to provide authentic Islamic content like Quranic verses and prayer times. These services have their own privacy policies. We are not responsible for the data collection practices of these external providers and encourage you to review their policies independently.",
  },
  {
    number: "04",
    icon: <HiOutlineLockClosed className="w-6 h-6" />,
    title: "Data Security",
    content:
      "We implement appropriate technical and organizational measures to protect any information from unauthorized access, loss, or misuse. Our platform uses secure HTTPS connections and follows industry-standard security practices. However, no method of transmission over the internet is 100% secure, and we encourage you to use our platform responsibly.",
  },
  {
    number: "05",
    icon: <HiOutlineBell className="w-6 h-6" />,
    title: "Cookies & Local Storage",
    content:
      "AlMuslims may use cookies or browser local storage to remember your preferences such as selected themes, saved duas, or Quran reading progress. These are strictly functional and never used for tracking or advertising purposes. You may clear these at any time through your browser settings.",
  },
  {
    number: "06",
    icon: <HiOutlineTrash className="w-6 h-6" />,
    title: "Your Rights",
    content:
      "You have the right to request deletion of any personal data we may hold. You may also opt out of any communications at any time. If you have concerns about how your data is handled, please contact us and we will respond promptly and transparently.",
  },
];

export default function PrivacyPage() {
  return (
    <main className="bg-[#FAF7F2] min-h-screen font-body">

      {/* ── Hero ── */}
      <section className="relative overflow-hidden pt-16 pb-24">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl -translate-y-1/3 translate-x-1/4 pointer-events-none" />

        <div className="max-w-[1100px] mx-auto px-6 sm:px-10 lg:px-16 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-12">
            <div className="lg:col-span-7 space-y-8">
              {/* Breadcrumb */}
              <nav className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-400">
                <Link href="/" className="hover:text-primary transition-colors">Home</Link>
                <span className="w-1 h-1 rounded-full bg-gray-300" />
                <span className="text-primary">Privacy Policy</span>
              </nav>

              <div>
                <h1 className="font-heading text-5xl sm:text-7xl font-black text-[#0A3A2F] leading-tight tracking-tight">
                  Privacy <span className="text-secondary italic">Policy</span>
                </h1>
                <div className="w-24 h-1.5 bg-secondary rounded-full mt-6" />
              </div>

              <p className="text-gray-500 text-lg leading-relaxed max-w-xl">
                We believe in transparency. This policy explains exactly how AlMuslims handles your information so you can use our platform with complete confidence.
              </p>

              <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">
                Last updated: June 2025
              </p>
            </div>

            {/* Decorative Icon Panel */}
            <div className="lg:col-span-5 hidden lg:flex justify-center items-center">
              <div className="relative w-72 h-72">
                <div className="absolute inset-0 bg-primary/8 rounded-[4rem] rotate-6" />
                <div className="absolute inset-0 bg-white rounded-[4rem] shadow-2xl flex flex-col items-center justify-center gap-6 p-10">
                  <div className="w-20 h-20 bg-primary/5 rounded-3xl flex items-center justify-center text-primary">
                    <HiOutlineShieldCheck className="w-10 h-10" />
                  </div>
                  <p className="font-heading text-xl font-bold text-center text-gray-900 leading-snug">Your Data,<br/>Our Responsibility</p>
                  <div className="flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-secondary">
                    <span className="w-2 h-2 rounded-full bg-secondary" />
                    Secure & Transparent
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Content Sections ── */}
      <section className="max-w-[1100px] mx-auto px-6 sm:px-10 lg:px-16 pb-24 space-y-6">
        {sections.map((sec) => (
          <div
            key={sec.number}
            className="group bg-white rounded-[2.5rem] border border-gray-100 p-8 sm:p-10 shadow-sm hover:shadow-lg hover:border-primary/10 transition-all duration-500 flex gap-8"
          >
            {/* Left accent */}
            <div className="hidden sm:flex flex-col items-center gap-4 pt-1">
              <div className="w-12 h-12 rounded-2xl bg-primary/5 flex items-center justify-center text-primary group-hover:bg-primary/10 transition-all">
                {sec.icon}
              </div>
              <span className="text-[11px] font-black text-gray-200 uppercase tracking-widest writing-mode-vertical rotate-180 select-none" style={{writingMode: "vertical-rl"}}>
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
