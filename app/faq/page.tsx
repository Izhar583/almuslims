"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
  HiOutlineMagnifyingGlass,
  HiOutlineChevronDown,
  HiOutlineAcademicCap,
  HiOutlineChatBubbleLeftRight,
} from "react-icons/hi2";

const faqCategories = [
  { id: "all", label: "All Questions" },
  { id: "general", label: "General" },
  { id: "quran-hadith", label: "Quran & Hadith" },
  { id: "worship", label: "Duas & Worship" },
  { id: "tools", label: "Features & Tools" },
  { id: "support", label: "Account & Support" },
];

const faqs = [
  {
    category: "general",
    question: "What is AlMuslims?",
    answer: "AlMuslims is a comprehensive digital portal dedicated to providing authentic Islamic knowledge, curated and verified by scholars. Our mission is to make timeless wisdom accessible to everyone in a modern, user-friendly format.",
  },
  {
    category: "general",
    question: "Is the content on AlMuslims authentic and reliable?",
    answer: "Yes, authenticity is our highest priority. All articles, Duas, and Islamic content are cross-referenced with primary sources (Quran and Sahih Hadith) and reviewed by qualified students of knowledge and scholars.",
  },
  {
    category: "general",
    question: "Is AlMuslims free to use?",
    answer: "AlMuslims is completely free to use. We are a community-driven project aiming to spread knowledge. We do not charge for access to any of our core educational resources.",
  },
  {
    category: "general",
    question: "Who writes and reviews the content?",
    answer: "Our content is written by a team of dedicated researchers and verified contributors. Every piece undergoes a multi-stage review process involving academic researchers and traditional Islamic scholars.",
  },
  {
    category: "support",
    question: "How can I ask a question to a scholar?",
    answer: "You can use our 'Ask a Scholar' feature found in the sidebar or menu. Simply submit your query, and it will be assigned to a qualified scholar. We typically respond within 24–48 hours.",
  },
  {
    category: "general",
    question: "How often is the content updated?",
    answer: "We update our library weekly with new articles, research papers, and translated works. Our technical tools (like prayer times) are updated in real-time using verified APIs.",
  },
  {
    category: "support",
    question: "Can I contribute or write for AlMuslims?",
    answer: "Absolutely! We are always looking for passionate writers and researchers. Please visit our 'Write for Us' page to learn about our editorial guidelines and application process.",
  },
  {
    category: "tools",
    question: "How do I use the Zakat Calculator?",
    answer: "Our Zakat Calculator simplifies the process by guiding you through your assets (gold, silver, cash, investments) and calculating the due amount based on current Nisab values.",
  },
  {
    category: "tools",
    question: "How accurate is the Islamic Date Converter?",
    answer: "Our converter uses the Umm al-Qura calendar and standard astronomical calculations. While highly accurate, we always recommend following local moonsighting for religious dates.",
  },
  {
    category: "tools",
    question: "Can I save my Tasbih counts and dhikr sessions?",
    answer: "Yes, if you are logged into your AlMuslims account, your Digital Tasbih progress and personal dhikr logs are synchronized across all your devices.",
  },
  {
    category: "support",
    question: "How do I contact AlMuslims for support?",
    answer: "For technical issues or general inquiries, you can reach out via our Contact Us page or email us at officialalmuslims@gmail.com. We aim to respond within 24–48 hours.",
  },
];

function FAQItem({
  question,
  answer,
  isOpen,
  onClick,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
}) {
  return (
    <div className="border-b border-gray-100 last:border-0">
      <button
        onClick={onClick}
        className="w-full py-6 flex items-center justify-between text-left group transition-all"
      >
        <span
          className={`text-[15px] font-bold transition-colors ${
            isOpen ? "text-primary" : "text-gray-700 group-hover:text-primary"
          }`}
        >
          {question}
        </span>
        <HiOutlineChevronDown
          className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${
            isOpen ? "rotate-180 text-primary" : ""
          }`}
        />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="pb-6 text-sm text-gray-500 leading-relaxed">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const filteredFaqs = useMemo(() => {
    return faqs.filter((faq) => {
      const matchCategory =
        activeCategory === "all" || faq.category === activeCategory;
      const matchSearch =
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCategory && matchSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <main className="bg-[#FAF7F2] min-h-screen font-body text-zinc-800">
      {/* ─── Hero Section ─── */}
      <section className="relative w-full pt-16 pb-20 overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />

        <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12 relative z-10 text-center lg:text-left">
          <nav className="flex items-center justify-center lg:justify-start gap-2 text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-6">
            <Link href="/" className="hover:text-primary transition-colors">
              Home
            </Link>
            <span className="w-1 h-1 rounded-full bg-gray-300" />
            <span className="text-primary">FAQ</span>
          </nav>

          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            <div className="max-w-2xl">
              <h1 className="font-heading text-5xl lg:text-7xl font-bold text-[#0A3A2F] mb-6 leading-tight">
                Frequently Asked{" "}
                <span className="text-secondary italic">Questions</span>
              </h1>
              <p className="text-gray-500 text-lg leading-relaxed mb-8">
                Find answers to common questions about Islam, our platform, and
                how to make the most of AlMuslims.
              </p>
            </div>
            <div className="hidden lg:block w-full max-w-[400px] h-[300px] relative">
              <Image
                src="/contact-hero.jpg"
                alt="Mosque"
                fill
                className="w-full h-full object-cover rounded-[3rem] shadow-2xl opacity-80"
              />
              <div className="absolute inset-0 bg-primary/20 rounded-[3rem] shadow-inner" />
            </div>
          </div>
        </div>
      </section>

      {/* ─── Search & Categories ─── */}
      <section className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12 -mt-12 mb-16 relative z-20">
        <div className="bg-white rounded-[3rem] p-8 shadow-xl border border-white">
          <div className="relative mb-10">
            <HiOutlineMagnifyingGlass className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 w-6 h-6" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for answers..."
              className="w-full bg-[#FAF7F2] border-none rounded-3xl py-5 pl-16 pr-8 text-base focus:ring-2 focus:ring-primary/10 transition-all font-medium"
            />
          </div>

          <div className="flex items-center gap-3 overflow-x-auto scrollbar-hide">
            {faqCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-6 py-3.5 rounded-2xl text-xs font-bold whitespace-nowrap transition-all duration-300 ${
                  activeCategory === cat.id
                    ? "bg-primary text-white shadow-lg shadow-primary/20"
                    : "bg-white text-gray-500 border border-gray-100 hover:border-primary/20 hover:text-primary"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Main Content Grid ─── */}
      <section className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Accordion Column */}
        <div className="lg:col-span-8 space-y-4">
          <div className="bg-white rounded-[3rem] p-8 sm:p-12 shadow-sm border border-gray-100">
            {filteredFaqs.length > 0 ? (
              filteredFaqs.map((faq, idx) => (
                <FAQItem
                  key={idx}
                  question={faq.question}
                  answer={faq.answer}
                  isOpen={openIndex === idx}
                  onClick={() =>
                    setOpenIndex(openIndex === idx ? null : idx)
                  }
                />
              ))
            ) : (
              <div className="text-center py-20">
                <p className="text-gray-400 font-medium">
                  No questions found matching your search.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar Column */}
        <div className="lg:col-span-4 space-y-8">
          <div className="bg-[#0A3A2F] rounded-[3rem] p-10 text-center text-white relative overflow-hidden group">
            <div className="relative z-10">
              <h3 className="font-heading text-2xl font-bold mb-4">
                Still Need Help?
              </h3>
              <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-500">
                <HiOutlineAcademicCap className="w-8 h-8 text-secondary" />
              </div>
              <p className="text-white/60 text-xs leading-relaxed mb-8 px-4">
                Our scholars are here to help you with any Islamic question.
                Typically responds within 24-48 hours.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-primary font-black text-[11px] uppercase tracking-widest rounded-2xl hover:bg-secondary hover:text-white transition-all shadow-xl"
              >
                <HiOutlineChatBubbleLeftRight className="w-4 h-4" /> Ask a
                Scholar
              </Link>
            </div>
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
          </div>
        </div>
      </section>
    </main>
  );
}
