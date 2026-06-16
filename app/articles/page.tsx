
"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  FaFacebook,
  FaTwitter,
  FaWhatsapp,
  FaLink,
  FaYoutube,
  FaCheck,
} from "react-icons/fa";
import { HiArrowLeft, HiArrowRight } from "react-icons/hi";

// ─── Static Data ─────────────────────────────────────────────────────────────

const tocItems = [
  { id: "understanding-worship", label: "Understanding Worship" },
  { id: "the-true-purpose", label: "The True Purpose" },
  { id: "living-with-purpose", label: "Living with Purpose" },
  { id: "knowing-your-purpose", label: "Knowing Your Purpose" },
  { id: "conclusion", label: "Conclusion" },
];

const relatedArticles = [
  {
    id: 1,
    title: "The Power of Sincerity in Worship",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1609599006353-e629b1d306b8?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: 2,
    title: "How to Strengthen Your Iman",
    readTime: "7 min read",
    image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: 3,
    title: "Gratitude: The Key to Inner Peace",
    readTime: "8 min read",
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=600&auto=format&fit=crop",
  },
];

const popularCategories = [
  { name: "Faith & Belief", count: 126 },
  { name: "Islamic Wisdom", count: 95 },
  { name: "Purification of Heart", count: 71 },
  { name: "Prophetic Guidance", count: 52 },
];

const youMayAlsoLike = [
  {
    id: 1,
    category: "FAITH & BELIEF",
    categoryColor: "text-amber-600",
    title: "The Beauty of Tawakkul (Complete Trust in Allah)",
    readTime: "7 min read",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: 2,
    category: "QURANIC WISDOM",
    categoryColor: "text-emerald-600",
    title: "Lessons from Surah Al-Ikhlas That Change Lives",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1542816417-0983c9c9ad53?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: 3,
    category: "SPIRITUAL GROWTH",
    categoryColor: "text-blue-600",
    title: "5 Daily Habits That Bring You Closer to Allah",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?q=80&w=600&auto=format&fit=crop",
  },
];

// ─── Components ───────────────────────────────────────────────────────────────

function ShareBar({ compact = false }: { compact?: boolean }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`flex items-center gap-3 ${compact ? "flex-row" : "flex-wrap"}`}>
      <button className="flex items-center gap-1.5 text-xs text-gray-600 hover:text-blue-600 transition-colors">
        <span className="w-7 h-7 rounded-full bg-blue-50 flex items-center justify-center">
          <FaFacebook className="text-blue-600 text-sm" />
        </span>
        {!compact && <span>Facebook</span>}
      </button>
      <button className="flex items-center gap-1.5 text-xs text-gray-600 hover:text-sky-500 transition-colors">
        <span className="w-7 h-7 rounded-full bg-sky-50 flex items-center justify-center">
          <FaTwitter className="text-sky-500 text-sm" />
        </span>
        {!compact && <span>Twitter</span>}
      </button>
      <button className="flex items-center gap-1.5 text-xs text-gray-600 hover:text-green-600 transition-colors">
        <span className="w-7 h-7 rounded-full bg-green-50 flex items-center justify-center">
          <FaWhatsapp className="text-green-600 text-sm" />
        </span>
        {!compact && <span>WhatsApp</span>}
      </button>
      <button
        onClick={handleCopy}
        className="flex items-center gap-1.5 text-xs text-gray-600 hover:text-primary transition-colors"
      >
        <span className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center">
          {copied ? (
            <FaCheck className="text-primary text-sm" />
          ) : (
            <FaLink className="text-gray-500 text-sm" />
          )}
        </span>
        {!compact && <span>{copied ? "Copied!" : "Copy Link"}</span>}
      </button>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function BlogPage() {
  const [activeSection, setActiveSection] = useState("understanding-worship");

  return (
    <main className="bg-bg min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="pt-4 text-sm text-gray-500 flex items-center gap-1">
          <Link href="/" className="hover:text-primary">Home</Link>
          <span>›</span>
          <Link href="/articles" className="hover:text-primary">Articles</Link>
          <span>›</span>
          <span className="text-gray-700">Faith & Belief</span>
        </div>

        {/* Hero */}
        <section className="mt-4 relative rounded-2xl overflow-hidden bg-gray-100 grid grid-cols-1 lg:grid-cols-2 min-h-[340px]">
          {/* Left: Text */}
          <div className="relative z-10 p-8 sm:p-10 flex flex-col justify-center">
            <span className="inline-block text-[10px] font-bold tracking-widest text-secondary uppercase mb-3">
              Faith & Belief
            </span>
            <h1 className="font-heading text-3xl sm:text-4xl font-bold text-gray-900 leading-tight mb-3">
              The True Purpose of Our Creation
            </h1>
            <p className="text-gray-500 text-sm leading-relaxed mb-6 max-w-md">
              Discover the profound wisdom behind why Allah created us and how
              understanding this purpose can transform our lives.
            </p>
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 rounded-full bg-gray-200 overflow-hidden shrink-0">
                <Image
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop"
                  alt="Shaykh Muhammad Ali"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-800">
                  Written by
                </p>
                <p className="text-sm font-bold text-gray-900">
                  Shaykh Muhammad Ali ✓
                </p>
                <p className="text-xs text-gray-400">
                  Islamic Scholar & Researcher
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4 mt-4 text-xs text-gray-400">
              <span>📅 May 24, 2025</span>
              <span>🕐 8 min read</span>
            </div>
          </div>

          {/* Right: Image */}
          <div className="relative h-56 lg:h-auto">
            <Image
              src="/assets/articles/purpose-hero.webp"
              alt="Person in front of Masjid"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-bg/60 via-transparent to-transparent lg:hidden" />
          </div>
        </section>

        {/* Body Grid */}
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-10 pb-20">
          {/* ── Article Content ── */}
          <article className="lg:col-span-2 space-y-8">
            {/* Full-width article image */}
            <div className="relative w-full h-64 rounded-2xl overflow-hidden bg-gray-100">
              <Image
                src="https://images.unsplash.com/photo-1585036156171-384164a8c675?q=80&w=1200&auto=format&fit=crop"
                alt="Quran with lantern"
                fill
                className="object-cover"
              />
            </div>

            {/* Body text */}
            <div className="prose prose-sm max-w-none text-gray-700 leading-relaxed space-y-5">
              <p>
                Allah, the Most High, did not create us without reason, nor did
                He leave us without direction. Every one of us has a purpose —
                a purpose that, when understood, brings meaning, direction, and
                tranquility to our lives.
              </p>
              <p>
                In a world filled with distractions, it is essential to return
                to the truth of why we were created.
              </p>

              {/* Ayah Block */}
              <div className="bg-primary/5 border-l-4 border-primary rounded-xl p-6 text-center my-8">
                <p
                  dir="rtl"
                  className="font-arabic text-3xl text-gray-900 leading-loose mb-3"
                >
                  وَمَا خَلَقْتُ الْجِنَّ وَالْإِنسَ إِلَّا لِيَعْبُدُونِ
                </p>
                <p className="text-sm text-gray-600 italic mt-2">
                  "And I did not create the jinn and mankind except to worship
                  Me."
                </p>
                <p className="text-xs text-gray-400 mt-1">Qur'an 51:56</p>
              </div>

              <p>
                Worship here is not limited to rituals alone. It encompasses
                every aspect of life when done with sincerity for the sake of
                Allah — our actions, intentions, and even our struggles.
              </p>
            </div>

            {/* Section: Understanding Worship */}
            <section id="understanding-worship" className="scroll-mt-24">
              <h2 className="font-heading text-2xl font-bold text-gray-900 mb-3">
                Understanding Worship
              </h2>
              <p className="text-gray-700 text-sm leading-relaxed">
                Worship (ʿIbādah) is the essence of our existence. It is our
                connection with our Creator, the One who knows us better than
                we know ourselves.
              </p>
              <p className="text-gray-600 text-sm mt-2">The Prophet ﷺ said:</p>

              {/* Hadith block */}
              <div className="bg-secondary/5 border border-secondary/20 rounded-xl p-5 my-4 flex gap-4">
                <div className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center shrink-0 text-secondary font-bold text-lg">
                  ﷺ
                </div>
                <div>
                  <p className="text-sm text-gray-800 font-medium leading-relaxed">
                    "Verily, actions are judged by intentions, and every person
                    will get reward according to what he has intended."
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    Sahih Bukhari:1
                  </p>
                </div>
              </div>

              <p className="text-gray-700 text-sm leading-relaxed">
                When our intention is pure, even the simplest actions become
                acts of worship.
              </p>
            </section>

            {/* Section: Living with Purpose */}
            <section id="living-with-purpose" className="scroll-mt-24">
              <h2 className="font-heading text-2xl font-bold text-gray-900 mb-3">
                Living with Purpose
              </h2>
              <p className="text-gray-700 text-sm leading-relaxed">
                Knowing our purpose gives life clarity. Our challenges become
                easier, our patience stronger, and our hearts content.
              </p>
              <p className="text-gray-700 text-sm leading-relaxed mt-3">
                Ask yourself daily: "Am I living for the pleasure of Allah?"
                When the answer is yes, you are on the right path.
              </p>
            </section>

            {/* Section: Knowing Your Purpose */}
            <section id="knowing-your-purpose" className="scroll-mt-24">
              <h2 className="font-heading text-2xl font-bold text-gray-900 mb-3">
                Knowing Your Purpose
              </h2>
              <p className="text-gray-700 text-sm leading-relaxed">
                The Quran and Sunnah are our maps. They reveal the path to
                fulfilling our purpose — through knowledge, action, and
                constant remembrance of Allah.
              </p>
            </section>

            {/* Section: Conclusion */}
            <section id="conclusion" className="scroll-mt-24">
              <h2 className="font-heading text-2xl font-bold text-gray-900 mb-3">
                Conclusion
              </h2>
              <p className="text-gray-700 text-sm leading-relaxed">
                Our creation has profound meaning. We are not here by accident.
                We are here to worship Allah, to grow, to contribute, and
                ultimately to return to Him. May Allah make us among those who
                fulfil their purpose.
              </p>
            </section>

            {/* Share this article */}
            <div className="border-t border-gray-100 pt-6">
              <p className="text-sm font-semibold text-gray-700 mb-3">
                Share this article
              </p>
              <ShareBar />
            </div>

            {/* Author Card */}
            <div className="bg-white border border-gray-100 rounded-2xl p-6 flex flex-col sm:flex-row gap-5 items-start">
              <div className="relative w-16 h-16 rounded-full bg-gray-200 overflow-hidden shrink-0">
                <Image
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop"
                  alt="Shaykh Muhammad Ali"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div>
                    <p className="font-bold text-gray-900">
                      Shaykh Muhammad Ali ✓
                    </p>
                    <p className="text-xs text-gray-400">
                      Islamic Scholar & Researcher
                    </p>
                  </div>
                  <button className="text-xs border border-primary text-primary rounded-lg px-4 py-1.5 hover:bg-primary hover:text-white transition-colors">
                    Follow
                  </button>
                </div>
                <p className="text-sm text-gray-500 mt-2 leading-relaxed">
                  Dedicated to reviving authentic Islamic knowledge and helping
                  Muslims strengthen their connection with Allah through the
                  Quran and Sunnah.
                </p>
                <div className="flex items-center gap-3 mt-3">
                  {[FaFacebook, FaTwitter, FaYoutube].map((Icon, i) => (
                    <a
                      key={i}
                      href="#"
                      className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:text-primary hover:bg-primary/10 transition-colors"
                    >
                      <Icon className="text-xs" />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* You May Also Like */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-heading text-xl font-bold text-gray-900">
                  You May Also Like
                </h2>
                <div className="flex gap-2">
                  <button className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:border-primary hover:text-primary transition-colors">
                    <HiArrowLeft />
                  </button>
                  <button className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:border-primary hover:text-primary transition-colors">
                    <HiArrowRight />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {youMayAlsoLike.map((article) => (
                  <Link
                    key={article.id}
                    href={`/articles/${article.id}`}
                    className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-md transition-shadow"
                  >
                    <div className="relative h-36 bg-gray-100">
                      <Image
                        src={article.image}
                        alt={article.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-3">
                      <span className={`text-[10px] font-bold ${article.categoryColor}`}>
                        {article.category}
                      </span>
                      <h3 className="text-sm font-semibold text-gray-900 mt-1 leading-snug line-clamp-2 group-hover:text-primary transition-colors">
                        {article.title}
                      </h3>
                      <p className="text-xs text-gray-400 mt-1 flex items-center gap-1">
                        🕐 {article.readTime}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </article>

          {/* ── Sidebar ── */}
          <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
            {/* Table of Contents */}
            <div className="bg-white rounded-2xl border border-gray-100 p-5">
              <p className="text-[10px] font-bold tracking-widest text-gray-400 uppercase mb-4">
                On This Page
              </p>
              <ul className="space-y-2">
                {tocItems.map((item) => (
                  <li key={item.id}>
                    <button
                      onClick={() => {
                        setActiveSection(item.id);
                        document
                          .getElementById(item.id)
                          ?.scrollIntoView({ behavior: "smooth" });
                      }}
                      className={`text-sm text-left w-full transition-colors ${activeSection === item.id
                          ? "text-primary font-semibold border-l-2 border-primary pl-3"
                          : "text-gray-500 hover:text-primary pl-3"
                        }`}
                    >
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Share This Article */}
            <div className="bg-white rounded-2xl border border-gray-100 p-5">
              <p className="text-[10px] font-bold tracking-widest text-gray-400 uppercase mb-4">
                Share This Article
              </p>
              <ShareBar compact />
            </div>

            {/* Daily Reminder */}
            <div className="relative bg-[#0A3A2F] rounded-2xl p-5 text-white overflow-hidden shadow-sm">
              <div className="absolute inset-0 z-0">
                <Image
                  src="https://images.unsplash.com/photo-1576489922094-2cfe8979a25a?q=80&w=400&auto=format&fit=crop"
                  alt="Daily Reminder background"
                  fill
                  className="object-cover opacity-20 filter brightness-50"
                />
              </div>
              <div className="relative z-10">
                <p className="text-[10px] font-bold tracking-widest text-[#D48C46] uppercase mb-3">
                  Daily Reminder
                </p>
                <blockquote className="font-heading text-base font-bold leading-snug mb-2">
                  "So remember Me; I will remember you."
                </blockquote>
                <p className="text-xs text-white/70">Qur'an 2:152</p>
              </div>
            </div>

            {/* Related Articles */}
            <div className="bg-white rounded-2xl border border-gray-100 p-5">
              <p className="text-[10px] font-bold tracking-widest text-gray-400 uppercase mb-4">
                Related Articles
              </p>
              <ul className="space-y-4">
                {relatedArticles.map((article) => (
                  <li key={article.id}>
                    <Link
                      href={`/articles/${article.id}`}
                      className="flex gap-3 group"
                    >
                      <div className="relative w-14 h-14 rounded-xl bg-gray-100 overflow-hidden shrink-0">
                        <Image
                          src={article.image}
                          alt={article.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900 leading-snug group-hover:text-primary transition-colors line-clamp-2">
                          {article.title}
                        </p>
                        <p className="text-xs text-gray-400 mt-1">
                          🕐 {article.readTime}
                        </p>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
              <Link
                href="/articles"
                className="flex items-center gap-1 text-primary text-xs font-medium mt-4 hover:underline"
              >
                View all articles <HiArrowRight />
              </Link>
            </div>

            {/* Popular Categories */}
            <div className="bg-white rounded-2xl border border-gray-100 p-5">
              <p className="text-[10px] font-bold tracking-widest text-gray-400 uppercase mb-4">
                Popular Categories
              </p>
              <ul className="space-y-3">
                {popularCategories.map((cat) => (
                  <li key={cat.name}>
                    <Link
                      href={`/categories/${cat.name.toLowerCase().replace(/ /g, "-")}`}
                      className="flex items-center justify-between group"
                    >
                      <div className="flex items-center gap-2 text-sm text-gray-700 group-hover:text-primary transition-colors">
                        <span className="w-1.5 h-1.5 rounded-full bg-secondary inline-block" />
                        {cat.name}
                      </div>
                      <span className="text-xs text-gray-400">
                        {cat.count} Articles
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
              <Link
                href="/categories"
                className="flex items-center gap-1 text-primary text-xs font-medium mt-4 hover:underline"
              >
                View all categories <HiArrowRight />
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
