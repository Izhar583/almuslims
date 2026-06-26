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
            <div className="flex flex-wrap items-center gap-8 py-8 border-y border-gray-100 mb-12">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-100 relative">
                  <Image src={article.authorImg} alt={article.author} fill className="object-cover" />
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-900">{article.author} ✅</p>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Islamic Scholar</p>
                </div>
              </div>
              <div className="flex items-center gap-6 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                <span className="flex items-center gap-2"><HiCalendar className="text-lg text-primary/40" /> {article.displayDate}</span>
                <span className="flex items-center gap-2"><HiClock className="text-lg text-primary/40" /> {article.readTime}</span>
              </div>
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

              <div className="flex items-center gap-4 py-10 border-t border-gray-100 mt-12">
                <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">Share this article</p>
                <div className="flex gap-3">
                  <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(typeof window !== "undefined" ? window.location.href : "")}`} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-all">
                    <FaFacebookF />
                  </a>
                  <a href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(typeof window !== "undefined" ? window.location.href : "")}`} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-all">
                    <FaTwitter />
                  </a>
                  <a href={`https://api.whatsapp.com/send?text=${encodeURIComponent(typeof window !== "undefined" ? window.location.href : "")}`} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-all">
                    <FaWhatsapp />
                  </a>
                  <button onClick={handleCopyLink} className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-all">
                    <HiLink />
                  </button>
                </div>
              </div>
            </div>

            {/* Author Bio Card */}
            <div className="bg-[#FAF9F6] rounded-[40px] p-8 sm:p-12 mt-16 flex flex-col sm:flex-row items-center gap-10">
              <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-200 shrink-0 relative">
                <Image src={article.authorImg} alt={article.author} fill className="object-cover" />
              </div>
              <div className="text-center sm:text-left flex-1">
                <div className="flex items-center justify-center sm:justify-between mb-4">
                  <h3 className="text-2xl font-bold text-gray-900">{article.author} ✅</h3>
                  <button className="hidden sm:block text-[10px] font-bold text-primary uppercase tracking-widest px-4 py-2 border border-primary/20 rounded-full hover:bg-primary hover:text-white transition-all">Follow</button>
                </div>
                <p className="text-gray-600 leading-relaxed mb-6">
                  Dedicated writer and speaker focusing on Quranic exegesis, theological fundamentals, and spiritual purification. Striving to make traditional knowledge accessible to all.
                </p>
                <div className="flex items-center justify-center sm:justify-start gap-4 text-gray-400">
                  <FaFacebookF /> <FaTwitter /> <FaWhatsapp /> <HiLink />
                </div>
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

            {/* Related Articles */}
            <div>
              <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-6">Related Articles</h4>
              <div className="space-y-6">
                {finalRelatedArticles.map((item) => (
                  <Link key={item.id} href={`/blog/${item.slug}`} className="flex gap-4 group">
                    <div className="w-20 h-20 rounded-2xl overflow-hidden bg-gray-100 shrink-0 relative">
                      <Image src={item.image} alt={item.title} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                    </div>
                    <div className="flex flex-col justify-center">
                      <h5 className="text-[14px] font-bold text-gray-900 group-hover:text-primary transition-colors leading-snug line-clamp-2">{item.title}</h5>
                      <p className="text-[10px] text-gray-400 font-bold uppercase mt-2 tracking-widest">{item.readTime}</p>
                    </div>
                  </Link>
                ))}
              </div>
              <Link href="/blog" className="inline-flex items-center gap-2 text-[10px] font-bold text-primary uppercase tracking-widest mt-8 group">
                View all articles <HiChevronRight className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </aside>
        </div>

        {/* You May Also Like */}
        <div className="mt-32 pt-20 border-t border-gray-100">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl font-bold text-gray-900">You May Also Like</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {youMayAlsoLike.map((item) => (
              <Link key={item.id} href={`/blog/${item.slug}`} className="flex flex-col group">
                <div className="relative w-full aspect-video rounded-[32px] overflow-hidden bg-gray-100 mb-6">
                  <Image src={item.image} alt={item.title} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                </div>
                <span className="text-[10px] font-bold text-secondary tracking-widest uppercase mb-3">{item.category}</span>
                <h4 className="text-xl font-bold text-gray-900 group-hover:text-primary transition-colors leading-tight mb-4">{item.title}</h4>
                <div className="flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                  <HiClock className="text-lg text-primary/40" /> {item.readTime}
                </div>
              </Link>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
