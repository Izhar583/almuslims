"use client";

import React, { useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  HiChevronRight, HiCalendar, HiClock,
  HiLink, HiOutlineMail
} from "react-icons/hi";
import { FaFacebookF, FaTwitter, FaWhatsapp } from "react-icons/fa";
import { articles, Article } from "@/data/articles";

interface PageProps {
  params: React.ComponentProps<any>['params'];
}

export default function ArticleDetail({ params }: PageProps) {
  const unwrappedParams = React.use(params) as { id: string };
  const { id } = unwrappedParams;

  // Find article by slug or id, fallback to first article if not found
  const article = useMemo(() => {
    return articles.find(a => a.slug === id || a.id === id) || articles[0];
  }, [id]);

  // Find related articles (same category)
  const finalRelatedArticles = useMemo(() => {
    const primaryRelated = articles
      .filter(a => a.id !== article.id)
      .filter(a => a.categoryId === article.categoryId);

    if (primaryRelated.length >= 3) {
      return primaryRelated.slice(0, 3);
    }

    // Fill up with other articles if less than 3
    const ids = new Set(primaryRelated.map(a => a.id));
    const extras = articles.filter(a => a.id !== article.id && !ids.has(a.id));
    return [...primaryRelated, ...extras].slice(0, 3);
  }, [article]);

  // Recommendations section (excluding current article and related articles)
  const youMayAlsoLike = useMemo(() => {
    const relatedIds = new Set(finalRelatedArticles.map(a => a.id));
    return articles
      .filter(a => a.id !== article.id && !relatedIds.has(a.id))
      .slice(0, 3);
  }, [article, finalRelatedArticles]);

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  return (
    <div className="min-h-screen bg-white pb-20">

      {/* Breadcrumbs */}
      <div className="max-w-[1400px] mx-auto px-6 py-6 border-b border-gray-50 font-body">
        <nav className="flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          <HiChevronRight />
          <Link href="/blog" className="hover:text-primary transition-colors">Blog</Link>
          <HiChevronRight />
          <span className="text-gray-900">{article.category}</span>
        </nav>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 pt-12 font-body">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">

          {/* Main Article Content */}
          <article className="lg:col-span-8">
            <span className="inline-block px-4 py-1.5 bg-secondary/10 text-secondary text-[10px] font-bold rounded-full mb-6 uppercase tracking-widest">
              {article.category}
            </span>
            <h1 className="font-heading text-4xl md:text-6xl font-bold text-gray-900 leading-tight mb-8">
              {article.title}
            </h1>
            <p className="text-xl text-gray-500 leading-relaxed mb-10">
              {article.excerpt}
            </p>

            {/* Meta Info */}
            <div className="flex items-center gap-6 text-[10px] font-bold text-gray-400 uppercase tracking-widest py-8 border-y border-gray-100 mb-12">
              <span className="flex items-center gap-2"><HiCalendar className="text-lg text-primary/40" /> {article.displayDate}</span>
              <span className="flex items-center gap-2"><HiClock className="text-lg text-primary/40" /> {article.readTime}</span>
            </div>

            {/* Content Body */}
            <div className="prose prose-lg max-w-none prose-emerald">
              <div className="relative w-full aspect-video rounded-[32px] overflow-hidden mb-12 shadow-2xl">
                <Image src={article.image} alt={article.title} fill className="object-cover" sizes="(max-w-1024px) 100vw, 60vw" priority />
              </div>

              <div
                className="text-lg text-gray-700 leading-8 mb-8"
                dangerouslySetInnerHTML={{ __html: article.content }}
              />


            </div>

            {/* Author Bio Card */}
            <div className="bg-[#FAF9F6] rounded-[40px] p-8 sm:p-12 mt-16 flex flex-col sm:flex-row items-center gap-10">
              <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-200 shrink-0 relative">
                <Image src={article.authorImg} alt={article.author} fill className="object-cover" />
              </div>
              <div className="text-center sm:text-left flex-1">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{article.author} ✅</h3>
                <p className="text-gray-600 leading-relaxed">
                  Dedicated writer and speaker focusing on Quranic exegesis, theological fundamentals, and spiritual purification. Striving to make traditional knowledge accessible to all.
                </p>
              </div>
            </div>

          </article>

          {/* Sidebar */}
          <aside className="lg:col-span-4 space-y-12 h-fit lg:sticky lg:top-24">

            {/* Table of Contents */}
            <div className="bg-white rounded-3xl border border-gray-100 p-8 shadow-sm">
              <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-6">Key Insights</h4>
              <ul className="space-y-4">
                <li>
                  <span className="text-sm font-bold text-primary flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                    Authentic Foundations
                  </span>
                </li>
                <li><span className="text-sm font-bold text-gray-500 hover:text-primary">Timeless Lessons</span></li>
                <li><span className="text-sm font-bold text-gray-500 hover:text-primary">Spiritual Growth</span></li>
                <li><span className="text-sm font-bold text-gray-500 hover:text-primary">Practical Implementations</span></li>
              </ul>
            </div>

            {/* Daily Reminder */}
            <div className="relative rounded-3xl overflow-hidden aspect-video bg-[#0A3A2F] flex items-center justify-center p-8 text-center group">
              <Image src="https://images.unsplash.com/photo-1542810634-71277d95dcbb?q=80&w=800" alt="Reminder" fill className="object-cover opacity-20 group-hover:scale-110 transition-transform duration-700" sizes="(max-w-1024px) 100vw, 30vw" />
              <div className="relative z-10 text-white font-body">
                <p className="text-[10px] font-bold text-white/60 tracking-widest uppercase mb-4">Daily Reminder</p>
                <p className="font-arabic text-xl mb-4" dir="rtl">فَاذْكُرُونِي أَذْكُرْكُمْ</p>
                <p className="text-sm font-medium italic mb-2">&quot;So remember Me; I will remember you.&quot;</p>
                <p className="text-[10px] text-white/40 uppercase tracking-widest">— Quran 2:152</p>
              </div>
            </div>


          </aside>
        </div>



      </div>
    </div>
  );
}
