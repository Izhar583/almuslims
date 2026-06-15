"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  FaSearch,
  FaFilter,
  FaChevronDown,
  FaArrowRight,
  FaBookmark,
  FaClock,
  FaEnvelope,
} from "react-icons/fa";
import { HiArrowRight } from "react-icons/hi";

// ─── Static Data ─────────────────────────────────────────────────────────────

const categories = [
  { label: "All Categories", href: "/categories", icon: "📖" },
  { label: "Quran", href: "/categories/quran", icon: "🕌" },
  { label: "Seerah", href: "/categories/seerah", icon: "🌙" },
  { label: "99 Names of Allah", href: "/categories/99-names-of-allah", icon: "⭐" },
  { label: "Fiqh", href: "/categories/fiqh", icon: "⚖️" },
  { label: "Duas", href: "/categories/duas", icon: "🤲" },
];

const popularTopics = [
  { name: "Tawheed", count: 28 },
  { name: "Prayer", count: 24 },
  { name: "Ramadan", count: 20 },
  { name: "Patience", count: 18 },
  { name: "Family", count: 16 },
];

const latestArticles = [
  {
    id: 1,
    category: "QURAN",
    categoryColor: "bg-emerald-100 text-emerald-700",
    title: "Lessons from Surah Al-Kahf for Our Daily Lives",
    excerpt: "Discover timeless lessons from the Quran that guide our actions.",
    author: "Shaykh Ahmed Saeed",
    authorImg: "/authors/ahmed.jpg",
    date: "May 16, 2025",
    readTime: "6 min read",
    image: "/articles/surah-kahf.jpg",
  },
  {
    id: 2,
    category: "SEERAH",
    categoryColor: "bg-blue-100 text-blue-700",
    title: "The Migration to Madinah: A Turning Point",
    excerpt: "The event that changed the course of Islamic history forever.",
    author: "Shaykh Farhan Malik",
    authorImg: "/authors/farhan.jpg",
    date: "May 17, 2025",
    readTime: "9 min read",
    image: "/articles/migration.jpg",
  },
  {
    id: 3,
    category: "FIQH",
    categoryColor: "bg-orange-100 text-orange-700",
    title: "Islamic Rulings on Modern Financial Issues",
    excerpt: "Learn how Islam guides our financial transactions today.",
    author: "Shaykh Assim Al Hakeem",
    authorImg: "/authors/assim.jpg",
    date: "May 14, 2025",
    readTime: "8 min read",
    image: "/articles/finance.jpg",
  },
  {
    id: 4,
    category: "DUAS",
    categoryColor: "bg-purple-100 text-purple-700",
    title: "Powerful Duas for Every Situation",
    excerpt: "Collection of authentic duas for everyday challenges.",
    author: "Ustadhah Aisha Khalid",
    authorImg: "/authors/aisha.jpg",
    date: "May 15, 2025",
    readTime: "5 min read",
    image: "/articles/duas.jpg",
  },
  {
    id: 5,
    category: "AQEEDAH",
    categoryColor: "bg-yellow-100 text-yellow-700",
    title: "Understanding Tawheed the Right Way",
    excerpt: "Strengthen your belief in the Oneness of Allah with clarity.",
    author: "Shaykh Abu Bakr Zoud",
    authorImg: "/authors/abubakr.jpg",
    date: "May 14, 2025",
    readTime: "4 min read",
    image: "/articles/tawheed.jpg",
  },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function ArticleCard({
  article,
}: {
  article: (typeof latestArticles)[number];
}) {
  return (
    <div className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
      <div className="relative h-44 w-full bg-gray-100">
        <Image
          src={article.image}
          alt={article.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <span
          className={`absolute top-3 left-3 text-[10px] font-bold px-2 py-1 rounded-full ${article.categoryColor}`}
        >
          {article.category}
        </span>
        <button className="absolute top-3 right-3 w-7 h-7 bg-white/90 rounded-full flex items-center justify-center text-gray-400 hover:text-primary transition-colors">
          <FaBookmark className="text-xs" />
        </button>
      </div>

      <div className="p-4">
        <h3 className="font-heading font-bold text-gray-900 text-sm leading-snug mb-1 line-clamp-2 group-hover:text-primary transition-colors">
          {article.title}
        </h3>
        <p className="text-xs text-gray-500 line-clamp-2 mb-3">
          {article.excerpt}
        </p>

        <div className="flex items-center gap-2">
          <div className="relative w-6 h-6 rounded-full bg-gray-200 overflow-hidden shrink-0">
            <Image src={article.authorImg} alt={article.author} fill className="object-cover" />
          </div>
          <span className="text-xs font-medium text-gray-700 truncate">
            {article.author}
          </span>
        </div>
        <div className="flex items-center gap-3 mt-2 text-xs text-gray-400">
          <span>{article.date}</span>
          <span className="flex items-center gap-1">
            <FaClock className="text-[10px]" />
            {article.readTime}
          </span>
        </div>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function CategoriesPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [search, setSearch] = useState("");
  const [email, setEmail] = useState("");

  return (
    <main className="bg-bg min-h-screen">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 text-sm text-gray-500">
        <Link href="/" className="hover:text-primary">Home</Link>
        <span className="mx-2">›</span>
        <span className="text-gray-700">Categories</span>
      </div>

      {/* Hero */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-3 rounded-2xl overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <Image
            src="/contact-hero.jpg"
            alt="Masjid"
            fill
            className="object-cover object-right opacity-25"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-bg via-bg/80 to-transparent" />
        </div>
        <div className="py-10 max-w-xl">
          <h1 className="font-heading text-4xl sm:text-5xl font-bold text-gray-900">
            Explore Categories
          </h1>
          <p className="mt-3 text-gray-500">
            Authentic knowledge from the Quran, Sunnah and scholars on every
            aspect of life.
          </p>
        </div>
      </section>

      {/* Category Tabs */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {categories.map((cat) => (
            <button
              key={cat.href}
              onClick={() => setActiveCategory(cat.href)}
              className={`flex flex-col items-center shrink-0 px-5 py-3 rounded-xl border transition-all text-xs font-medium gap-1 min-w-[88px]
                ${
                  activeCategory === cat.href
                    ? "bg-primary text-white border-primary"
                    : "bg-white text-gray-600 border-gray-200 hover:border-primary/40 hover:text-primary"
                }`}
            >
              <span className="text-xl">{cat.icon}</span>
              <span>{cat.label}</span>
            </button>
          ))}
        </div>
      </section>

      {/* Search + Filter */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-5">
        <div className="flex flex-wrap gap-3">
          {/* Search */}
          <div className="relative flex-1 min-w-[200px]">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search articles, topics or keywords..."
              className="w-full rounded-xl border border-gray-200 bg-white pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
            />
          </div>

          {/* Level dropdown */}
          <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-gray-200 bg-white text-sm text-gray-600 hover:border-primary/40 transition-colors">
            All Levels <FaChevronDown className="text-xs text-gray-400" />
          </button>

          {/* Sort dropdown */}
          <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-gray-200 bg-white text-sm text-gray-600 hover:border-primary/40 transition-colors">
            Sort By: Latest <FaChevronDown className="text-xs text-gray-400" />
          </button>

          {/* Filter */}
          <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-gray-200 bg-white text-sm text-gray-600 hover:border-primary/40 transition-colors">
            <FaFilter className="text-xs" /> Filter
          </button>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8 pb-16">
        {/* Left: Featured + Latest */}
        <div className="lg:col-span-2 space-y-10">
          {/* Featured Article */}
          <div>
            <h2 className="font-heading text-xl font-bold text-gray-900 mb-4">
              Featured Article
            </h2>
            <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden grid grid-cols-1 sm:grid-cols-2 hover:shadow-md transition-shadow">
              <div className="relative h-52 sm:h-auto bg-gray-100">
                <Image
                  src="/articles/featured.jpg"
                  alt="Featured"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6 flex flex-col justify-center">
                <span className="inline-block text-[10px] font-bold px-2 py-1 rounded-full bg-secondary/15 text-secondary mb-3 w-fit">
                  FEATURED
                </span>
                <h3 className="font-heading text-xl font-bold text-gray-900 leading-tight mb-2">
                  The Purpose of Life in the Light of the Quran
                </h3>
                <p className="text-sm text-gray-500 mb-4">
                  Understanding why we are here and how to live a meaningful
                  life according to the Quran.
                </p>
                <div className="flex items-center gap-2">
                  <div className="relative w-8 h-8 rounded-full bg-gray-200 overflow-hidden">
                    <Image
                      src="/authors/shaykh.jpg"
                      alt="Shaykh Muhammad Ali"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-800">
                      Shaykh Muhammad Ali ✓
                    </p>
                    <p className="text-xs text-gray-400">
                      May 20, 2025 · 8 min read
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Latest Articles */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-heading text-xl font-bold text-gray-900">
                Latest Articles
              </h2>
              <Link
                href="/articles"
                className="flex items-center gap-1 text-primary text-sm font-medium hover:underline"
              >
                View All Articles <HiArrowRight />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {latestArticles.slice(0, 4).map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>

          </div>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          {/* Popular Topics */}
          <div className="bg-white rounded-2xl border border-gray-100 p-5">
            <h3 className="font-heading font-bold text-gray-900 mb-4">
              Popular Topics
            </h3>
            <ul className="space-y-3">
              {popularTopics.map((topic) => (
                <li
                  key={topic.name}
                  className="flex items-center justify-between group cursor-pointer"
                >
                  <div className="flex items-center gap-2 text-sm text-gray-700 group-hover:text-primary transition-colors">
                    <span className="w-1.5 h-1.5 rounded-full bg-secondary inline-block" />
                    {topic.name}
                  </div>
                  <span className="text-xs text-gray-400">{topic.count}</span>
                </li>
              ))}
            </ul>
            <Link
              href="/topics"
              className="flex items-center gap-1 text-primary text-xs font-medium mt-4 hover:underline"
            >
              View All Topics <HiArrowRight />
            </Link>
          </div>

          {/* Daily Reminder */}
          <div className="relative bg-primary rounded-2xl p-5 text-white overflow-hidden">
            <div className="absolute -bottom-4 -right-4 opacity-20 w-24 h-24">
              <Image src="/lantern.png" alt="" fill className="object-contain" />
            </div>
            <p className="text-xs font-semibold text-white/60 uppercase tracking-widest mb-2">
              Daily Reminder
            </p>
            <blockquote className="font-heading text-lg font-bold leading-snug mb-3">
              "So remember Me; I will remember you."
            </blockquote>
            <p className="text-xs text-white/60">Qur'an 2:152</p>
          </div>

          {/* New to Islam */}
          <div className="bg-white rounded-2xl border border-gray-100 p-5">
            <h3 className="font-heading font-bold text-gray-900 mb-1">
              New to Islam?
            </h3>
            <p className="text-sm text-gray-500 mb-4">
              Explore essential topics to build your knowledge and strengthen
              your faith.
            </p>
            <Link
              href="/new-to-islam"
              className="inline-flex items-center gap-2 bg-primary text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-primary-hover transition-colors"
            >
              Start Learning <HiArrowRight />
            </Link>
          </div>

          {/* Newsletter */}
          <div className="bg-white rounded-2xl border border-gray-100 p-5">
            <div className="flex items-center gap-2 mb-1">
              <FaEnvelope className="text-primary" />
              <h3 className="font-heading font-bold text-gray-900">
                Subscribe to Newsletter
              </h3>
            </div>
            <p className="text-sm text-gray-500 mb-4">
              Get authentic Islamic content straight to your inbox.
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 rounded-xl border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
              />
              <button className="bg-primary text-white rounded-xl px-3 py-2 hover:bg-primary-hover transition-colors">
                <HiArrowRight className="text-base" />
              </button>
            </div>
            <p className="text-[11px] text-gray-400 mt-2">
              🔒 No spam. Unsubscribe anytime.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
