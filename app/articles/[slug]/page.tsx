"use client";

import React, { use } from "react";
import Link from "next/link";
import { articles } from "@/data/articles";
import { FaArrowLeft, FaCalendarAlt, FaClock, FaUser, FaBookOpen } from "react-icons/fa";
import { motion } from "framer-motion";

export default function ArticleDetailsPage(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = use(props.params);
  const article = articles.find((a) => a.slug === params.slug);

  if (!article) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center p-8 text-center bg-background text-zinc-800 dark:text-zinc-200">
        <h1 className="text-3xl font-bold text-red-500 mb-4">Article Not Found</h1>
        <p className="text-zinc-500 mb-8 max-w-sm">
          The article you are looking for does not exist or has been removed.
        </p>
        <Link
          href="/articles"
          className="px-6 py-3 rounded-xl bg-primary text-white hover:bg-primaryHover transition"
        >
          Return to Articles
        </Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background text-zinc-800 dark:text-zinc-200 py-16">
      {/* Scroll indicator */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back Link */}
        <Link
          href="/articles"
          className="inline-flex items-center gap-2 text-zinc-500 hover:text-primary dark:hover:text-secondary font-semibold transition mb-10 group"
        >
          <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" /> Back to Articles
        </Link>

        {/* Article Wrapper */}
        <motion.article 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white dark:bg-card border border-zinc-200/50 dark:border-zinc-800/80 rounded-3xl overflow-hidden shadow-2xl p-6 sm:p-12"
        >
          {/* Category Badge */}
          <div className="flex mb-6">
            <span 
              className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider text-white"
              style={{ backgroundColor: article.color }}
            >
              <FaBookOpen size={11} /> {article.category}
            </span>
          </div>

          {/* Title */}
          <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-primary dark:text-zinc-100 leading-tight mb-6">
            {article.title}
          </h1>

          {/* Author Details & Date */}
          <div className="flex flex-wrap items-center gap-6 text-sm text-zinc-500 dark:text-zinc-400 pb-8 border-b border-zinc-100 dark:border-zinc-800/60 mb-10 font-body">
            <span className="flex items-center gap-1.5 font-semibold text-zinc-700 dark:text-zinc-300">
              <FaUser className="text-secondary" /> {article.author}
            </span>
            <span className="flex items-center gap-1.5">
              <FaCalendarAlt /> {article.date}
            </span>
            <span className="flex items-center gap-1.5">
              <FaClock /> {article.readTime}
            </span>
          </div>

          {/* Cover Header Graphic */}
          <div 
            className="w-full h-44 rounded-2xl mb-10 opacity-80"
            style={{ background: article.image }}
          />

          {/* Article Main Content (using rendered HTML from mock data) */}
          <div 
            className="prose prose-zinc max-w-none dark:prose-invert font-body text-base sm:text-lg leading-relaxed text-zinc-700 dark:text-zinc-300"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />

          {/* Footer Signature */}
          <div className="mt-12 pt-8 border-t border-zinc-100 dark:border-zinc-800/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <p className="text-sm text-zinc-400 italic">
              Share beneficial knowledge. May Allah reward you.
            </p>
            <div className="flex gap-3">
              <button 
                onClick={() => window.print()}
                className="px-4 py-2 border border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 rounded-xl text-xs font-semibold cursor-pointer transition-colors"
              >
                Print Article
              </button>
            </div>
          </div>
        </motion.article>

      </div>
    </main>
  );
}
