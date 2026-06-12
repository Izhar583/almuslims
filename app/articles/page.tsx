"use client";

import React, { useState } from "react";
import Link from "next/link";
import { articles, type Article } from "@/data/articles";
import { FaSearch, FaBookOpen, FaUser, FaCalendarAlt, FaClock } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const categories = ["All", "Quranic Studies", "Hadith Studies", "Spirituality"];

export default function ArticlesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredArticles = articles.filter((article) => {
    const matchesSearch =
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || article.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredArticle = articles[0]; // First article is featured

  return (
    <main className="min-h-screen bg-background text-zinc-800 dark:text-zinc-200 transition-colors py-12">
      {/* Decorative Background Glows */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10 opacity-30 dark:opacity-20">
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] rounded-full bg-primary/10 blur-[120px]" />
        <div className="absolute bottom-10 left-1/4 w-[400px] h-[400px] rounded-full bg-secondary/10 blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-secondary text-sm font-mono tracking-[0.2em] uppercase mb-3">
            Islamic Wisdom & Thought
          </p>
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-primary dark:text-zinc-100 mb-6">
            Articles & Insights
          </h1>
          <p className="text-zinc-500 dark:text-zinc-400 max-w-2xl mx-auto text-base">
            Delve into rich, scholarly analyses of Quranic interpretation, Hadith preservation, spirituality, and modern contemporary issues.
          </p>
        </div>

        {/* Featured Article Hero Section */}
        {featuredArticle && searchQuery === "" && selectedCategory === "All" && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-16 bg-white dark:bg-card border border-zinc-200/50 dark:border-zinc-800/80 rounded-3xl overflow-hidden shadow-xl"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2">
              {/* Cover Gradient/Image */}
              <div 
                className="h-64 lg:h-auto min-h-[300px] flex items-center justify-center p-8 text-white relative"
                style={{ background: featuredArticle.image }}
              >
                <div className="absolute inset-0 bg-black/10 backdrop-blur-[2px]" />
                <div className="relative z-10 text-center">
                  <FaBookOpen size={48} className="mx-auto mb-4 opacity-90 text-secondary" />
                  <span className="px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-md text-xs font-semibold uppercase tracking-wider">
                    {featuredArticle.category}
                  </span>
                </div>
              </div>
              
              {/* Content Details */}
              <div className="p-8 sm:p-12 flex flex-col justify-between">
                <div>
                  <div className="flex flex-wrap items-center gap-4 text-xs text-zinc-500 dark:text-zinc-400 mb-4 font-body">
                    <span className="flex items-center gap-1"><FaUser /> {featuredArticle.author}</span>
                    <span className="flex items-center gap-1"><FaCalendarAlt /> {featuredArticle.date}</span>
                    <span className="flex items-center gap-1"><FaClock /> {featuredArticle.readTime}</span>
                  </div>
                  
                  <h2 className="text-2xl sm:text-3xl font-bold font-heading text-primary dark:text-zinc-100 hover:text-primaryHover dark:hover:text-secondary mb-4 transition-colors">
                    <Link href={`/articles/${featuredArticle.slug}`}>
                      {featuredArticle.title}
                    </Link>
                  </h2>
                  
                  <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed mb-6 font-body text-sm sm:text-base">
                    {featuredArticle.excerpt}
                  </p>
                </div>
                
                <div>
                  <Link 
                    href={`/articles/${featuredArticle.slug}`}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white hover:bg-primaryHover rounded-xl text-sm font-semibold transition-all shadow-md hover:shadow-lg"
                  >
                    Read Full Article &rarr;
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Filter Controls */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          {/* Categories */}
          <div className="flex flex-wrap gap-2 order-2 md:order-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? "bg-primary text-white shadow-md"
                    : "bg-white dark:bg-card border border-zinc-200/50 dark:border-zinc-800/80 hover:bg-zinc-50 dark:hover:bg-zinc-800"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search bar */}
          <div className="relative w-full md:max-w-md order-1 md:order-2">
            <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-zinc-400">
              <FaSearch size={14} />
            </span>
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-white dark:bg-card border border-zinc-200/50 dark:border-zinc-800/80 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all shadow-sm"
            />
          </div>
        </div>

        {/* Articles Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredArticles.map((article, index) => (
              <motion.article
                key={article.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="flex flex-col bg-white dark:bg-card border border-zinc-200/50 dark:border-zinc-800/80 rounded-2xl overflow-hidden shadow-sm transition-all"
              >
                {/* Header Gradient */}
                <div 
                  className="h-44 flex items-center justify-center p-6 text-white relative font-semibold"
                  style={{ background: article.image }}
                >
                  <div className="absolute inset-0 bg-black/10 backdrop-blur-[1px]" />
                  <span className="relative z-10 px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-[10px] uppercase tracking-wider">
                    {article.category}
                  </span>
                </div>

                {/* Card Content */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-3 text-[11px] text-zinc-500 dark:text-zinc-400 mb-3 font-body">
                      <span className="flex items-center gap-1"><FaCalendarAlt /> {article.date}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1"><FaClock /> {article.readTime}</span>
                    </div>

                    <h3 className="text-lg font-bold font-heading text-primary dark:text-zinc-100 hover:text-secondary dark:hover:text-secondary mb-3 transition-colors line-clamp-2">
                      <Link href={`/articles/${article.slug}`}>
                        {article.title}
                      </Link>
                    </h3>

                    <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed mb-6 font-body line-clamp-3">
                      {article.excerpt}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-zinc-100 dark:border-zinc-800">
                    <span className="text-[11px] font-medium text-zinc-400">By {article.author}</span>
                    <Link 
                      href={`/articles/${article.slug}`}
                      className="text-xs font-bold text-primary dark:text-secondary hover:underline"
                    >
                      Read More &rarr;
                    </Link>
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredArticles.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            className="text-center py-16"
          >
            <p className="text-zinc-500 dark:text-zinc-400 text-lg">
              No articles found matching your criteria.
            </p>
          </motion.div>
        )}
      </div>
    </main>
  );
}
