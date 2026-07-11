"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { fiqhCategories } from "@/data/hadith-collections";
import { articles } from "@/data/articles";
import { FaSearch, FaTimes, FaBook, FaParagraph, FaHistory, FaStar } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { getSurahSlug } from "@/lib/quran";

interface SearchResultItem {
  title: string;
  category: "Quran" | "Hadith" | "Articles" | "Seerah" | "Duas";
  link: string;
  description: string;
}

// Popular Quran Surahs Database for search matching
const popularSurahs = [
  { name: "Al-Fatihah", no: 1, desc: "The Opening Chapter of the Quran" },
  { name: "Al-Baqarah", no: 2, desc: "The Cow - Largest Quranic Chapter" },
  { name: "Al-Kahf", no: 18, desc: "The Cave - Read every Friday for light" },
  { name: "Ya-Sin", no: 36, desc: "Heart of the Quran" },
  { name: "Ar-Rahman", no: 55, desc: "The Lord of Mercy" },
  { name: "Al-Mulk", no: 67, desc: "The Sovereignty - Protection from grave trial" }
];

// Popular Duas Database for search matching
const popularDuas = [
  { name: "Rabbana Duas", desc: "40 Quranic prayers beginning with Rabbana", link: "/dua-collection" },
  { name: "Dua after Salat", desc: "Daily morning and evening remembrance prayers", link: "/dua-collection" },
  { name: "Istikhara Dua", desc: "Prayer for seeking guidance in decisions", link: "/dua-collection" },
  { name: "Dua Kumayl", desc: "Supplication of Kumayl ibn Ziyad (highly regarded Shia prayer)", link: "/dua-collection" }
];

// Seerah Milestones Database
const seerahMilestones = [
  { name: "Birth of Prophet ﷺ", desc: "Born in Mecca during Year of Elephant (570 CE)", link: "/seerah" },
  { name: "First Revelation", desc: "Ghar-i-Hira on Mount Noor (610 CE)", link: "/seerah" },
  { name: "The Hijrah", desc: "Migration from Mecca to Medina (622 CE)", link: "/seerah" },
  { name: "Conquest of Mecca", desc: "Surrender of Mecca and declaration of general amnesty (630 CE)", link: "/seerah" }
];

export default function GlobalSearch() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResultItem[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Listen to open search event
    const handleOpenSearch = () => {
      setIsOpen(true);
      setTimeout(() => inputRef.current?.focus(), 100);
    };

    // Keyboard shortcut (Ctrl + K)
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen(true);
        setTimeout(() => inputRef.current?.focus(), 100);
      }
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("open-global-search", handleOpenSearch);
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("open-global-search", handleOpenSearch);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const term = query.toLowerCase().trim();
    const matches: SearchResultItem[] = [];

    // 1. Search Quran Surahs
    popularSurahs.forEach((surah) => {
      if (surah.name.toLowerCase().includes(term) || surah.desc.toLowerCase().includes(term)) {
        matches.push({
          title: surah.name,
          category: "Quran",
          link: `/holy-quran/${getSurahSlug(surah.no)}`,
          description: surah.desc,
        });
      }
    });

    // 2. Search Hadith Books
    fiqhCategories.forEach((fiqh) => {
      fiqh.books.forEach((book) => {
        if (
          book.name.toLowerCase().includes(term) ||
          book.description.toLowerCase().includes(term) ||
          book.author.toLowerCase().includes(term)
        ) {
          matches.push({
            title: book.name,
            category: "Hadith",
            link: `/hadith/${book.apiSlug}`,
            description: `${book.author} — ${book.totalHadiths.toLocaleString()} Hadiths`,
          });
        }
      });
    });

    // 3. Search Articles
    articles.forEach((art) => {
      if (
        art.title.toLowerCase().includes(term) ||
        art.excerpt.toLowerCase().includes(term) ||
        art.category.toLowerCase().includes(term)
      ) {
        matches.push({
          title: art.title,
          category: "Articles",
          link: `/blog/${art.slug}`,
          description: art.excerpt,
        });
      }
    });

    // 4. Search Duas
    popularDuas.forEach((dua) => {
      if (dua.name.toLowerCase().includes(term) || dua.desc.toLowerCase().includes(term)) {
        matches.push({
          title: dua.name,
          category: "Duas",
          link: dua.link,
          description: dua.desc,
        });
      }
    });

    // 5. Search Seerah Milestones
    seerahMilestones.forEach((milestone) => {
      if (milestone.name.toLowerCase().includes(term) || milestone.desc.toLowerCase().includes(term)) {
        matches.push({
          title: milestone.name,
          category: "Seerah",
          link: milestone.link,
          description: milestone.desc,
        });
      }
    });

    setResults(matches.slice(0, 8)); // Limit to top 8 matches
  }, [query]);

  const closeSearch = () => {
    setIsOpen(false);
    setQuery("");
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Quran":
        return <FaBook className="text-secondary" />;
      case "Hadith":
        return <FaBook className="text-primary dark:text-zinc-300" />;
      case "Articles":
        return <FaParagraph className="text-green-500" />;
      case "Seerah":
        return <FaHistory className="text-amber-500" />;
      case "Duas":
        return <FaStar className="text-yellow-500" />;
      default:
        return <FaSearch className="text-zinc-400" />;
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-100 flex items-start justify-center pt-[10vh] px-4 font-body">
          {/* Overlay click background */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeSearch}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Search Card Dialog */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.25 }}
            className="relative w-full max-w-2xl bg-white dark:bg-card border border-zinc-200/50 dark:border-zinc-800/80 rounded-3xl shadow-2xl overflow-hidden z-10"
          >
            {/* Input Wrapper */}
            <div className="flex items-center gap-3 px-6 py-4.5 border-b border-zinc-100 dark:border-zinc-800/80">
              <FaSearch className="text-zinc-400" size={16} />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search Surahs, Hadith books, articles, duas, or seerah..."
                className="flex-1 text-sm sm:text-base focus:outline-none text-zinc-800 dark:text-zinc-100 bg-transparent"
              />
              <button 
                onClick={closeSearch} 
                className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 cursor-pointer"
                aria-label="Close search"
              >
                <FaTimes size={16} />
              </button>
            </div>

            {/* Results Section */}
            <div className="max-h-[350px] overflow-y-auto p-4 space-y-2">
              {query.trim() === "" ? (
                <div className="text-center py-10 text-zinc-400 text-xs sm:text-sm">
                  Type a keyword or press <kbd className="px-1.5 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 border dark:border-zinc-700 text-[10px] font-mono shadow-sm">Ctrl + K</kbd> to search AlMuslims.
                </div>
              ) : results.length > 0 ? (
                results.map((item, idx) => (
                  <Link
                    key={idx}
                    href={item.link}
                    onClick={closeSearch}
                    className="flex items-start gap-4 p-3.5 hover:bg-zinc-50 dark:hover:bg-zinc-800 rounded-2xl transition-colors cursor-pointer group text-left"
                  >
                    <div className="p-2.5 bg-zinc-100 dark:bg-background rounded-xl shrink-0 group-hover:scale-105 transition-transform">
                      {getCategoryIcon(item.category)}
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-primary dark:text-zinc-100 group-hover:text-secondary transition-colors">
                          {item.title}
                        </span>
                        <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-500">
                          {item.category}
                        </span>
                      </div>
                      <p className="text-zinc-500 dark:text-zinc-400 text-xs leading-relaxed line-clamp-1">
                        {item.description}
                      </p>
                    </div>
                  </Link>
                ))
              ) : (
                <div className="text-center py-10 text-zinc-400 text-xs sm:text-sm">
                  No matching results found. Try search terms like <span className="italic font-medium text-zinc-500">'Bukhari'</span>, <span className="italic font-medium text-zinc-500">'kafi'</span>, or <span className="italic font-medium text-zinc-500">'Tazkiyah'</span>.
                </div>
              )}
            </div>
            
            {/* Footer */}
            <div className="px-6 py-3 border-t border-zinc-100 dark:border-zinc-800/80 bg-zinc-50/50 dark:bg-background/25 flex items-center justify-between text-[10px] text-zinc-400">
              <span>Press <kbd className="px-1 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 border dark:border-zinc-700">ESC</kbd> to exit</span>
              <span>AlMuslims Unified Search</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
