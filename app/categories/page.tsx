"use client";

import React, { useState, useMemo, useEffect, useRef, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaSearch,
  FaFilter,
  FaBookmark,
  FaRegBookmark,
  FaCheckCircle,
  FaChevronDown,
  FaChevronLeft,
  FaChevronRight,
  FaArrowRight,
  FaPaperPlane,
  FaTimes,
  FaShareAlt,
  FaCheck
} from "react-icons/fa";
import { articles, Article, categoriesMeta, popularTopics } from "@/data/articles";
import {
  PremiumIslamicIcon,
  QuranIcon,
  DuasIcon,
  SeerahIcon,
  NamesOfAllahIcon,
  HadithIcon,
  FiqhIcon,
  AqeedahIcon,
  AllCategoriesIcon
} from "@/components/ui/IslamicIcons";
import { BreadcrumbJsonLd, CategoriesItemListJsonLd } from "@/components/seo/JsonLd";

// ─── Custom Select Dropdown ──────────────────────────────────────────────────
interface DropdownOption {
  value: string;
  label: string;
}

function FilterDropdown({
  value,
  options,
  onChange,
  labelPrefix = ""
}: {
  value: string;
  options: DropdownOption[];
  onChange: (val: string) => void;
  labelPrefix?: string;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const selected = options.find((o) => o.value === value) ?? options[0];

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} className="relative inline-block text-left w-full sm:w-auto">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={`w-full sm:w-auto flex items-center justify-between sm:justify-start gap-2.5 bg-white border rounded-xl py-2.5 px-4 text-xs font-semibold cursor-pointer transition-all ${
          open ? "border-primary ring-2 ring-primary/10 text-primary shadow-sm" : "border-gray-200 text-gray-700 hover:border-gray-300"
        }`}
      >
        <span className="text-gray-500 font-normal">{labelPrefix}</span>
        <span className="font-semibold text-gray-800">{selected.label}</span>
        <FaChevronDown className={`text-[10px] text-gray-400 transition-transform duration-200 ${open ? "rotate-180 text-primary" : ""}`} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -4, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.98 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 sm:left-0 top-[calc(100%+6px)] z-40 w-48 bg-white rounded-xl border border-gray-100 shadow-xl py-1.5 overflow-hidden"
          >
            {options.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => {
                  onChange(opt.value);
                  setOpen(false);
                }}
                className={`w-full flex items-center justify-between px-4 py-2 text-xs font-medium text-left transition-colors cursor-pointer ${
                  opt.value === value
                    ? "bg-primary/5 text-primary font-bold"
                    : "text-gray-600 hover:bg-gray-50 hover:text-primary"
                }`}
              >
                <span>{opt.label}</span>
                {opt.value === value && <FaCheck className="text-[10px] text-primary" />}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Main Categories Page Component ──────────────────────────────────────────
function CategoriesPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "all";
  const initialTopic = searchParams.get("topic") || "";

  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [selectedTopic, setSelectedTopic] = useState(initialTopic);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("all");
  const [sortBy, setSortBy] = useState("latest");
  const [currentPage, setCurrentPage] = useState(1);
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>([]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [showFilterDrawer, setShowFilterDrawer] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterSuccess, setNewsletterSuccess] = useState(false);
  const [footerEmail, setFooterEmail] = useState("");
  const [footerEmailSuccess, setFooterEmailSuccess] = useState(false);

  const articleSectionRef = useRef<HTMLDivElement>(null);
  const ARTICLES_PER_PAGE = 6;

  // Sync category param from URL
  useEffect(() => {
    const cat = searchParams.get("category");
    if (cat && cat !== activeCategory) {
      setActiveCategory(cat);
      setCurrentPage(1);
    }
  }, [searchParams]);

  // Load saved bookmarks from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem("almuslims_bookmarks");
      if (saved) {
        setBookmarkedIds(JSON.parse(saved));
      }
    } catch {
      // ignore
    }
  }, []);

  const toggleBookmark = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    let updated: string[];
    if (bookmarkedIds.includes(id)) {
      updated = bookmarkedIds.filter((item) => item !== id);
      showToast("Removed from saved bookmarks");
    } else {
      updated = [...bookmarkedIds, id];
      showToast("Saved to your bookmarks");
    }
    setBookmarkedIds(updated);
    try {
      localStorage.setItem("almuslims_bookmarks", JSON.stringify(updated));
    } catch {
      // ignore
    }
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Find Featured Article (default to purpose-of-life or highest priority)
  const featuredArticle = useMemo(() => {
    return (
      articles.find((a) => a.isFeatured) ||
      articles.find((a) => a.categoryId === activeCategory) ||
      articles[0]
    );
  }, [activeCategory]);

  // Filter and sort articles
  const filteredArticles = useMemo(() => {
    let list = articles.filter((article) => {
      const matchCat =
        activeCategory === "all" ||
        article.categoryId.toLowerCase() === activeCategory.toLowerCase();

      const matchSearch =
        !searchQuery ||
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.author.toLowerCase().includes(searchQuery.toLowerCase());

      const matchLevel =
        selectedLevel === "all" ||
        article.level.toLowerCase() === selectedLevel.toLowerCase();

      const matchTopic =
        !selectedTopic ||
        (article.topics &&
          article.topics.some((t) =>
            t.toLowerCase().includes(selectedTopic.toLowerCase())
          )) ||
        article.title.toLowerCase().includes(selectedTopic.toLowerCase()) ||
        article.category.toLowerCase().includes(selectedTopic.toLowerCase());

      return matchCat && matchSearch && matchLevel && matchTopic;
    });

    if (sortBy === "latest") {
      list = [...list].sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      );
    } else if (sortBy === "oldest") {
      list = [...list].sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
      );
    } else if (sortBy === "alphabetical") {
      list = [...list].sort((a, b) => a.title.localeCompare(b.title));
    }

    return list;
  }, [activeCategory, searchQuery, selectedLevel, selectedTopic, sortBy]);

  const totalPages = Math.max(1, Math.ceil(filteredArticles.length / ARTICLES_PER_PAGE));
  const currentArticles = useMemo(() => {
    const start = (currentPage - 1) * ARTICLES_PER_PAGE;
    return filteredArticles.slice(start, start + ARTICLES_PER_PAGE);
  }, [filteredArticles, currentPage]);

  const handleCategorySelect = (categoryId: string) => {
    setActiveCategory(categoryId);
    setSelectedTopic("");
    setCurrentPage(1);
    router.push(`/categories?category=${categoryId}`, { scroll: false });
  };

  const handleTopicSelect = (topicName: string) => {
    if (selectedTopic === topicName) {
      setSelectedTopic("");
    } else {
      setSelectedTopic(topicName);
      setCurrentPage(1);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    if (articleSectionRef.current) {
      articleSectionRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) {
      setNewsletterSuccess(true);
      showToast("JazakAllah Khair! You have been subscribed.");
      setTimeout(() => {
        setNewsletterEmail("");
        setNewsletterSuccess(false);
      }, 4000);
    }
  };

  const handleFooterEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (footerEmail) {
      setFooterEmailSuccess(true);
      showToast("JazakAllah Khair! Welcome to the AlMuslims knowledge circle.");
      setTimeout(() => {
        setFooterEmail("");
        setFooterEmailSuccess(false);
      }, 4000);
    }
  };

  const levelOptions: DropdownOption[] = [
    { value: "all", label: "All Levels" },
    { value: "beginner", label: "Beginner" },
    { value: "intermediate", label: "Intermediate" },
    { value: "advanced", label: "Advanced" }
  ];

  const sortOptions: DropdownOption[] = [
    { value: "latest", label: "Latest" },
    { value: "oldest", label: "Oldest" },
    { value: "alphabetical", label: "Alphabetical (A-Z)" }
  ];

  const breadcrumbs = [
    { name: "Home", url: "https://almuslims.com" },
    { name: "Categories", url: "https://almuslims.com/categories" },
    ...(activeCategory !== "all" ? [{ name: activeCategory.toUpperCase(), url: `https://almuslims.com/categories?category=${activeCategory}` }] : [])
  ];

  return (
    <div className="bg-[#FAF7F2] min-h-screen font-body text-gray-800 pb-16">
      <BreadcrumbJsonLd items={breadcrumbs} />
      <CategoriesItemListJsonLd categories={categoriesMeta} />
      
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-6 right-6 z-50 bg-[#0A3A2F] text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 border border-secondary/30 text-xs font-semibold"
          >
            <FaCheckCircle className="text-secondary text-sm" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <section className="relative w-full bg-linear-to-b from-[#F3ECE0]/80 via-[#FAF7F2] to-[#FAF7F2] border-b border-stone-200/60 pt-8 pb-10 overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-15 pointer-events-none hidden md:block">
          <svg className="h-full w-full object-cover" viewBox="0 0 500 300" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M400 300V160C400 120 370 100 370 100C370 100 340 120 340 160V300H400Z" fill="#0A3A2F" />
            <path d="M470 300V200C470 180 450 170 450 170C450 170 430 180 430 200V300H470Z" fill="#D48C46" />
            <path d="M300 300V120C300 80 260 60 260 60C260 60 220 80 220 120V300H300Z" fill="#0A3A2F" />
            <circle cx="260" cy="40" r="10" fill="#D48C46" />
          </svg>
        </div>

        <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <nav className="flex items-center gap-2 text-xs font-semibold text-gray-500 mb-3">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <span className="text-gray-300">›</span>
            <span className="text-secondary font-bold">Categories</span>
            {activeCategory !== "all" && (
              <>
                <span className="text-gray-300">›</span>
                <span className="text-primary capitalize">{activeCategory}</span>
              </>
            )}
          </nav>

          {/* Heading and Subtitle */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
            <div className="max-w-2xl">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-primary tracking-tight leading-tight">
                Explore Categories
              </h1>
              <p className="mt-2 text-sm sm:text-base text-gray-600 leading-relaxed font-normal">
                Authentic knowledge from the Quran, Sunnah and scholars on every aspect of life.
              </p>
            </div>

            {/* Quick stats / summary counter */}
            <div className="hidden lg:flex items-center gap-6 bg-white/70 backdrop-blur-xs px-5 py-2.5 rounded-2xl border border-amber-900/10 shadow-xs">
              <div className="flex items-center gap-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 animate-pulse" />
                <span className="text-xs font-bold text-gray-700">296+ Articles</span>
              </div>
              <div className="w-px h-4 bg-gray-200" />
              <span className="text-xs font-semibold text-gray-500">8 Core Disciplines</span>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Category Selection Cards (Horizontal Slider / Grid) ─── */}
      <section className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        <div className="flex items-center justify-between gap-2 mb-3 px-1">
          <span className="text-xs font-bold uppercase tracking-wider text-gray-400">Featured Streams</span>
          <button 
            onClick={() => setActiveCategory("all")}
            className="text-xs font-bold text-secondary hover:text-primary transition-colors flex items-center gap-1 cursor-pointer"
          >
            <span>View All</span>
            <FaArrowRight className="text-[10px]" />
          </button>
        </div>

        {/* Scrollable Category Row */}
        <div className="flex overflow-x-auto pb-4 pt-1 gap-3.5 -mx-4 px-4 sm:mx-0 sm:px-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
          {categoriesMeta.map((cat) => {
            const isSelected = activeCategory === cat.id || (cat.id === "all" && activeCategory === "all");
            return (
              <button
                key={cat.id}
                onClick={() => handleCategorySelect(cat.id)}
                className={`shrink-0 flex flex-col justify-between p-4 rounded-2xl border transition-all duration-300 cursor-pointer min-w-[145px] sm:min-w-[160px] text-left group ${
                  isSelected
                    ? "bg-[#0A3A2F] text-white border-[#0A3A2F] shadow-lg shadow-emerald-950/15 scale-[1.02]"
                    : "bg-white text-gray-700 border-gray-100/90 hover:border-amber-700/20 hover:shadow-md hover:-translate-y-0.5"
                }`}
              >
                <div className="flex items-center justify-between mb-3 w-full">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110 ${
                      isSelected
                        ? "bg-white/15 text-white"
                        : "bg-[#FAF7F2]"
                    }`}
                  >
                    <PremiumIslamicIcon
                      type={cat.iconType}
                      className="w-6 h-6"
                      primaryColor={isSelected ? "#FFFFFF" : "#0A3A2F"}
                      secondaryColor={isSelected ? "#E89E54" : "#D48C46"}
                    />
                  </div>
                  {isSelected && (
                    <span className="w-2 h-2 rounded-full bg-secondary" />
                  )}
                </div>

                <div>
                  <h3 className={`text-sm font-bold tracking-tight transition-colors ${
                    isSelected ? "text-white" : "text-gray-800 group-hover:text-primary"
                  }`}>
                    {cat.name}
                  </h3>
                  <p className={`text-[11px] font-medium mt-0.5 ${
                    isSelected ? "text-emerald-100/80" : "text-gray-400"
                  }`}>
                    {cat.count} Articles
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* ─── Search, Filter, and Controls Bar ─── */}
      <section className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8 mt-5">
        <div className="bg-white rounded-2xl p-3 sm:p-4 border border-gray-100 shadow-sm flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          
          {/* Search Box */}
          <div className="relative flex-1">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xs pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Search articles, topics or keywords..."
              className="w-full bg-[#FAF7F2] border border-transparent focus:border-primary focus:bg-white rounded-xl pl-10 pr-9 py-2.5 text-xs text-gray-800 placeholder:text-gray-400 focus:outline-none transition-all"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-1 text-xs cursor-pointer"
              >
                <FaTimes />
              </button>
            )}
          </div>

          {/* Controls: Level, Sort, Filter Button */}
          <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
            <FilterDropdown
              value={selectedLevel}
              options={levelOptions}
              onChange={(val) => {
                setSelectedLevel(val);
                setCurrentPage(1);
              }}
            />

            <FilterDropdown
              value={sortBy}
              options={sortOptions}
              onChange={(val) => setSortBy(val)}
              labelPrefix="Sort By: "
            />

            <button
              type="button"
              onClick={() => setShowFilterDrawer(!showFilterDrawer)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-xs font-semibold cursor-pointer transition-colors ${
                showFilterDrawer || selectedTopic
                  ? "bg-primary text-white border-primary"
                  : "bg-white border-gray-200 text-gray-700 hover:border-gray-300"
              }`}
            >
              <FaFilter className="text-[11px]" />
              <span>Filter</span>
              {selectedTopic && (
                <span className="w-2 h-2 rounded-full bg-secondary ml-1" />
              )}
            </button>
          </div>
        </div>

        {/* Expandable Topic Filter Bar */}
        {(showFilterDrawer || selectedTopic) && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-white/80 backdrop-blur-xs rounded-xl p-3 mt-2 border border-gray-100 flex flex-wrap items-center gap-2"
          >
            <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mr-1">Filter by Topic:</span>
            {popularTopics.map((topic) => {
              const isSelected = selectedTopic.toLowerCase() === topic.name.toLowerCase();
              return (
                <button
                  key={topic.name}
                  type="button"
                  onClick={() => handleTopicSelect(topic.name)}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-all cursor-pointer ${
                    isSelected
                      ? "bg-secondary text-white font-bold shadow-xs"
                      : "bg-[#FAF7F2] text-gray-600 hover:bg-gray-200/70"
                  }`}
                >
                  {topic.name} ({topic.count})
                </button>
              );
            })}
            {selectedTopic && (
              <button
                type="button"
                onClick={() => setSelectedTopic("")}
                className="text-[11px] text-red-600 hover:underline ml-2 cursor-pointer font-semibold"
              >
                Clear filter
              </button>
            )}
          </motion.div>
        )}
      </section>

      {/* ─── Main 2-Column Section: Articles & Sidebar ─── */}
      <div ref={articleSectionRef} className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* ════════════ Left Column: Featured + Article Grid (8 Cols) ════════════ */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* 1. Featured Article Card */}
            {featuredArticle && currentPage === 1 && !searchQuery && !selectedTopic && (
              <div className="space-y-3">
                <div className="flex items-center justify-between px-1">
                  <h2 className="text-lg font-heading font-bold text-gray-900">Featured Article</h2>
                  <span className="text-xs text-secondary font-bold tracking-widest uppercase">Editor's Pick</span>
                </div>

                <div className="bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 group">
                  <div className="grid grid-cols-1 md:grid-cols-12 items-stretch">
                    
                    {/* Featured Image */}
                    <div className="md:col-span-6 relative min-h-[260px] md:min-h-[340px] bg-gray-100 overflow-hidden">
                      <Image
                        src={featuredArticle.image}
                        alt={featuredArticle.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                        sizes="(max-width: 768px) 100vw, 50vw"
                        priority
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent md:hidden" />
                      <span className="absolute top-4 left-4 bg-secondary text-white text-[10px] font-black uppercase tracking-widest px-3.5 py-1.5 rounded-full shadow-md">
                        FEATURED
                      </span>
                    </div>

                    {/* Featured Content */}
                    <div className="md:col-span-6 p-6 sm:p-8 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-2.5">
                          <span className="text-[10px] font-extrabold text-secondary tracking-widest uppercase">
                            {featuredArticle.category}
                          </span>
                          <span className="text-[11px] font-semibold text-gray-400">
                            {featuredArticle.readTime}
                          </span>
                        </div>

                        <Link href={`/blog/${featuredArticle.slug}`}>
                          <h3 className="font-heading font-bold text-gray-900 text-xl sm:text-2xl leading-tight group-hover:text-primary transition-colors">
                            {featuredArticle.title}
                          </h3>
                        </Link>

                        <p className="mt-3 text-xs sm:text-sm text-gray-500 line-clamp-3 leading-relaxed font-normal">
                          {featuredArticle.excerpt}
                        </p>
                      </div>

                      <div className="mt-6 pt-5 border-t border-gray-100 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="relative w-9 h-9 rounded-full bg-gray-200 overflow-hidden ring-2 ring-emerald-50">
                            <Image
                              src={featuredArticle.authorImg}
                              alt={featuredArticle.author}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div>
                            <div className="flex items-center gap-1.5">
                              <span className="text-xs font-bold text-gray-800">
                                {featuredArticle.author}
                              </span>
                              {featuredArticle.isVerified && (
                                <FaCheckCircle className="text-blue-500 text-[10px]" title="Verified Scholar" />
                              )}
                            </div>
                            <span className="text-[11px] text-gray-400">
                              {featuredArticle.displayDate}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={(e) => toggleBookmark(featuredArticle.id, e)}
                            className="p-2 rounded-full hover:bg-gray-100 text-gray-400 hover:text-secondary transition-colors cursor-pointer"
                            aria-label="Bookmark"
                          >
                            {bookmarkedIds.includes(featuredArticle.id) ? (
                              <FaBookmark className="text-secondary text-sm" />
                            ) : (
                              <FaRegBookmark className="text-sm" />
                            )}
                          </button>
                          <Link
                            href={`/blog/${featuredArticle.slug}`}
                            className="px-4 py-1.5 bg-primary text-white text-xs font-bold rounded-full hover:bg-primaryHover transition-colors"
                          >
                            Read Article
                          </Link>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            )}

            {/* 2. Articles Grid */}
            <div className="space-y-4">
              <div className="flex items-center justify-between px-1">
                <div>
                  <h2 className="text-lg sm:text-xl font-heading font-bold text-gray-900">
                    {searchQuery
                      ? `Search results for "${searchQuery}"`
                      : selectedTopic
                      ? `Articles on #${selectedTopic}`
                      : activeCategory !== "all"
                      ? `${activeCategory.toUpperCase()} Articles`
                      : "Latest Articles"}
                  </h2>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Showing {currentArticles.length} of {filteredArticles.length} articles
                  </p>
                </div>

                <Link
                  href="/blog"
                  className="text-xs font-bold text-secondary hover:text-primary transition-colors flex items-center gap-1.5 group"
                >
                  <span>View All Articles</span>
                  <FaArrowRight className="text-[10px] group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>

              {currentArticles.length === 0 ? (
                <div className="bg-white rounded-3xl border border-gray-100 p-12 text-center space-y-4">
                  <div className="w-14 h-14 bg-amber-50 text-secondary rounded-2xl flex items-center justify-center mx-auto text-xl">
                    <FaSearch />
                  </div>
                  <h3 className="text-base font-bold text-gray-800">No articles found</h3>
                  <p className="text-xs text-gray-500 max-w-sm mx-auto">
                    We couldn't find any articles matching your search criteria. Try switching categories or clearing active filters.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setActiveCategory("all");
                      setSearchQuery("");
                      setSelectedTopic("");
                      setSelectedLevel("all");
                    }}
                    className="px-5 py-2 bg-primary text-white text-xs font-bold rounded-full hover:bg-primaryHover transition-colors cursor-pointer"
                  >
                    Reset All Filters
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {currentArticles.map((article) => {
                    const isSaved = bookmarkedIds.includes(article.id);
                    return (
                      <div
                        key={article.id}
                        className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col group"
                      >
                        {/* Thumbnail */}
                        <div className="relative h-48 w-full bg-gray-100 overflow-hidden">
                          <Image
                            src={article.image}
                            alt={article.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          />
                          <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent pointer-events-none" />
                          
                          {/* Category Tag */}
                          <span className="absolute top-3 left-3 bg-[#0A3A2F]/90 backdrop-blur-xs text-white text-[9px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider shadow-sm">
                            {article.category}
                          </span>

                          {/* Bookmark Button */}
                          <button
                            type="button"
                            onClick={(e) => toggleBookmark(article.id, e)}
                            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-xs flex items-center justify-center text-gray-500 hover:text-secondary shadow-sm hover:scale-110 transition-all cursor-pointer"
                            aria-label="Save Article"
                          >
                            {isSaved ? (
                              <FaBookmark className="text-secondary text-xs" />
                            ) : (
                              <FaRegBookmark className="text-xs" />
                            )}
                          </button>
                        </div>

                        {/* Body */}
                        <div className="p-5 flex flex-col flex-1 justify-between">
                          <div>
                            <div className="flex items-center justify-between text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">
                              <span className="text-secondary">{article.level}</span>
                              <span>{article.readTime}</span>
                            </div>

                            <Link href={`/blog/${article.slug}`}>
                              <h3 className="font-heading font-bold text-gray-900 text-base leading-snug line-clamp-2 group-hover:text-primary transition-colors">
                                {article.title}
                              </h3>
                            </Link>

                            <p className="mt-2 text-xs text-gray-500 line-clamp-2 leading-relaxed font-normal">
                              {article.excerpt}
                            </p>
                          </div>

                          {/* Author & Date Footer */}
                          <div className="mt-5 pt-4 border-t border-gray-50 flex items-center justify-between">
                            <div className="flex items-center gap-2.5">
                              <div className="relative w-7 h-7 rounded-full bg-gray-200 overflow-hidden shrink-0">
                                <Image
                                  src={article.authorImg}
                                  alt={article.author}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                              <div className="flex flex-col">
                                <span className="text-[11px] font-bold text-gray-800 line-clamp-1">
                                  {article.author}
                                </span>
                              </div>
                            </div>
                            <span className="text-[10px] text-gray-400 font-medium">
                              {article.displayDate}
                            </span>
                          </div>
                        </div>

                      </div>
                    );
                  })}
                </div>
              )}

              {/* 3. Pagination Controls */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 pt-6">
                  <button
                    type="button"
                    disabled={currentPage === 1}
                    onClick={() => handlePageChange(currentPage - 1)}
                    className="w-9 h-9 rounded-xl border border-gray-200 bg-white flex items-center justify-center text-xs font-bold text-gray-600 hover:border-primary hover:text-primary disabled:opacity-30 disabled:pointer-events-none cursor-pointer transition-colors"
                  >
                    <FaChevronLeft className="text-[10px]" />
                  </button>

                  {Array.from({ length: totalPages }).map((_, idx) => {
                    const pageNum = idx + 1;
                    const isActive = pageNum === currentPage;
                    return (
                      <button
                        key={pageNum}
                        type="button"
                        onClick={() => handlePageChange(pageNum)}
                        className={`w-9 h-9 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                          isActive
                            ? "bg-primary text-white shadow-md shadow-emerald-950/15 scale-105"
                            : "bg-white border border-gray-200 text-gray-700 hover:border-gray-300 hover:bg-gray-50"
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}

                  <button
                    type="button"
                    disabled={currentPage === totalPages}
                    onClick={() => handlePageChange(currentPage + 1)}
                    className="w-9 h-9 rounded-xl border border-gray-200 bg-white flex items-center justify-center text-xs font-bold text-gray-600 hover:border-primary hover:text-primary disabled:opacity-30 disabled:pointer-events-none cursor-pointer transition-colors"
                  >
                    <FaChevronRight className="text-[10px]" />
                  </button>
                </div>
              )}
            </div>

          </div>

          {/* ════════════ Right Column: Sidebar (4 Cols) ════════════ */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Widget 1: Popular Topics */}
            <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-heading font-bold text-gray-900 uppercase tracking-wider">
                  Popular Topics
                </h3>
                <span className="text-[10px] font-bold text-secondary">DISCOVER</span>
              </div>

              <div className="divide-y divide-gray-50">
                {popularTopics.map((topic) => {
                  const isSelected = selectedTopic.toLowerCase() === topic.name.toLowerCase();
                  return (
                    <button
                      key={topic.name}
                      type="button"
                      onClick={() => handleTopicSelect(topic.name)}
                      className={`w-full py-3 flex items-center justify-between text-left transition-colors cursor-pointer group ${
                        isSelected ? "text-primary font-bold" : "text-gray-700 hover:text-primary"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs transition-colors ${
                          isSelected ? "bg-primary text-white" : "bg-[#FAF7F2] text-gray-400 group-hover:text-primary"
                        }`}>
                          #
                        </div>
                        <span className="text-xs font-semibold">{topic.name}</span>
                      </div>
                      <span className="text-[11px] font-bold text-gray-400 group-hover:text-secondary bg-gray-50 px-2 py-0.5 rounded-full">
                        {topic.count}
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="mt-4 pt-3 border-t border-gray-100 text-center">
                <button
                  type="button"
                  onClick={() => {
                    setSelectedTopic("");
                    setActiveCategory("all");
                  }}
                  className="text-xs font-bold text-secondary hover:text-primary transition-colors inline-flex items-center gap-1.5 cursor-pointer"
                >
                  <span>View All Topics</span>
                  <FaArrowRight className="text-[10px]" />
                </button>
              </div>
            </div>

            {/* Widget 2: Daily Reminder (Dark Emerald Aesthetic) */}
            <div className="relative overflow-hidden bg-linear-to-br from-[#063327] via-[#0A3A2F] to-[#04241B] rounded-3xl p-6 text-white shadow-lg border border-emerald-800/40">
              {/* Glowing lantern visual highlight */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/15 rounded-full blur-2xl pointer-events-none" />
              
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] font-bold tracking-widest text-secondary uppercase bg-white/10 px-2.5 py-1 rounded-full">
                  Daily Reminder
                </span>
                <span className="text-amber-400 text-sm">✨</span>
              </div>

              <div className="my-6 text-center py-2">
                <p className="font-heading italic text-lg sm:text-xl font-bold leading-relaxed text-amber-100">
                  “So remember Me; I will remember you.”
                </p>
                <span className="block text-xs font-semibold text-white/60 mt-3 uppercase tracking-widest">
                  — Qur'an 2:152
                </span>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-white/70">
                <Link
                  href="/dua-collection"
                  className="text-secondary hover:underline font-bold text-xs flex items-center gap-1"
                >
                  <span>Read Duas & Azkar</span>
                  <FaArrowRight className="text-[9px]" />
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    if (navigator.clipboard) {
                      navigator.clipboard.writeText("“So remember Me; I will remember you.” — Qur'an 2:152");
                      showToast("Copied verse to clipboard!");
                    }
                  }}
                  className="hover:text-white transition-colors cursor-pointer p-1"
                  title="Share Verse"
                >
                  <FaShareAlt className="text-xs" />
                </button>
              </div>
            </div>

            {/* Widget 3: New to Islam? */}
            <div className="bg-[#FFFDF9] rounded-3xl p-6 border border-[#EFE5D5] shadow-xs relative overflow-hidden">
              <div className="w-11 h-11 rounded-2xl bg-amber-100/60 flex items-center justify-center mb-3">
                <QuranIcon className="w-6 h-6" primaryColor="#0A3A2F" secondaryColor="#D48C46" />
              </div>
              <h3 className="text-base font-heading font-bold text-gray-900">
                New to Islam?
              </h3>
              <p className="mt-2 text-xs text-gray-600 leading-relaxed font-normal">
                Explore essential topics designed for beginners to build foundational knowledge and strengthen your faith.
              </p>
              <Link
                href="/categories?category=quran"
                className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 hover:border-primary hover:text-primary rounded-xl text-xs font-bold text-gray-800 transition-all shadow-2xs group"
              >
                <span>Start Learning</span>
                <FaArrowRight className="text-[10px] group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Widget 4: Subscribe to Newsletter */}
            <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-50 text-primary flex items-center justify-center text-sm">
                  <FaPaperPlane />
                </div>
                <div>
                  <h3 className="text-sm font-heading font-bold text-gray-900">
                    Subscribe to Newsletter
                  </h3>
                  <span className="text-[10px] text-gray-400">Weekly spiritual insights</span>
                </div>
              </div>

              <p className="text-xs text-gray-500 leading-relaxed mb-4">
                Get authentic Islamic articles, Surah insights, and daily duas delivered straight to your inbox.
              </p>

              {newsletterSuccess ? (
                <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 text-center text-xs text-emerald-800 font-bold">
                  ✓ Successfully subscribed! JazakAllah Khair.
                </div>
              ) : (
                <form onSubmit={handleNewsletterSubmit} className="space-y-2">
                  <div className="relative">
                    <input
                      type="email"
                      required
                      value={newsletterEmail}
                      onChange={(e) => setNewsletterEmail(e.target.value)}
                      placeholder="Enter your email address"
                      className="w-full bg-[#FAF7F2] border border-gray-200 focus:border-primary focus:bg-white rounded-xl pl-3.5 pr-11 py-2.5 text-xs text-gray-800 placeholder:text-gray-400 focus:outline-none transition-all"
                    />
                    <button
                      type="submit"
                      className="absolute right-1.5 top-1/2 -translate-y-1/2 w-8 h-8 bg-primary hover:bg-primaryHover text-white rounded-lg flex items-center justify-center text-xs cursor-pointer transition-colors"
                      aria-label="Subscribe"
                    >
                      <FaArrowRight className="text-[10px]" />
                    </button>
                  </div>
                  <p className="text-[10px] text-gray-400 text-center">
                    No spam. Unsubscribe anytime.
                  </p>
                </form>
              )}
            </div>

            {/* Widget 5: Core Portals Quick Access */}
            <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">
              <h3 className="text-xs font-heading font-bold text-gray-900 uppercase tracking-wider mb-3">
                Core Islamic Resources
              </h3>
              <div className="grid grid-cols-2 gap-2.5">
                <Link
                  href="/holy-quran"
                  className="p-3.5 rounded-2xl bg-[#FAF7F2] hover:bg-amber-50/70 border border-transparent hover:border-amber-200 transition-all text-left group"
                >
                  <div className="mb-2">
                    <QuranIcon className="w-6 h-6 group-hover:scale-110 transition-transform" primaryColor="#0A3A2F" secondaryColor="#D48C46" />
                  </div>
                  <span className="block text-xs font-bold text-gray-800">Holy Quran</span>
                  <span className="text-[10px] text-gray-400">114 Surahs</span>
                </Link>

                <Link
                  href="/dua-collection"
                  className="p-3.5 rounded-2xl bg-[#FAF7F2] hover:bg-orange-50/70 border border-transparent hover:border-orange-200 transition-all text-left group"
                >
                  <div className="mb-2">
                    <DuasIcon className="w-6 h-6 group-hover:scale-110 transition-transform" primaryColor="#9A3412" secondaryColor="#D48C46" />
                  </div>
                  <span className="block text-xs font-bold text-gray-800">Duas & Azkar</span>
                  <span className="text-[10px] text-gray-400">Daily supplications</span>
                </Link>

                <Link
                  href="/seerah"
                  className="p-3.5 rounded-2xl bg-[#FAF7F2] hover:bg-emerald-50/70 border border-transparent hover:border-emerald-200 transition-all text-left group"
                >
                  <div className="mb-2">
                    <SeerahIcon className="w-6 h-6 group-hover:scale-110 transition-transform" primaryColor="#065F46" secondaryColor="#D48C46" />
                  </div>
                  <span className="block text-xs font-bold text-gray-800">Seerah</span>
                  <span className="text-[10px] text-gray-400">Prophetic life</span>
                </Link>

                <Link
                  href="/names-of-allah"
                  className="p-3.5 rounded-2xl bg-[#FAF7F2] hover:bg-amber-50/70 border border-transparent hover:border-amber-200 transition-all text-left group"
                >
                  <div className="mb-2">
                    <NamesOfAllahIcon className="w-6 h-6 group-hover:scale-110 transition-transform" primaryColor="#B45309" secondaryColor="#D48C46" />
                  </div>
                  <span className="block text-xs font-bold text-gray-800">99 Names</span>
                  <span className="text-[10px] text-gray-400">Asma-ul-Husna</span>
                </Link>
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* ─── Pre-Footer CTA: Continue Your Journey of Knowledge ─── */}
      <section className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <div className="relative overflow-hidden bg-linear-to-r from-[#063327] via-[#0A3A2F] to-[#063327] rounded-3xl p-8 sm:p-12 text-white shadow-2xl border border-white/5">
          {/* Mosque background silhouette */}
          <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none hidden md:block">
            <svg width="320" height="140" viewBox="0 0 320 140" fill="none">
              <path d="M280 140V80C280 60 260 50 260 50C260 50 240 60 240 80V140H280Z" fill="currentColor"/>
              <path d="M200 140V40C200 20 180 10 180 10C180 10 160 20 160 40V140H200Z" fill="currentColor"/>
              <path d="M120 140V70C120 50 100 40 100 40C100 40 80 50 80 70V140H120Z" fill="currentColor"/>
            </svg>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-6 space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-amber-300 text-lg">
                  ✉
                </div>
                <h3 className="text-xl sm:text-2xl md:text-3xl font-heading font-bold text-white">
                  Continue Your Journey of Knowledge
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-white/70 leading-relaxed font-light max-w-lg">
                Join thousands of Muslims and get authentic Islamic content, weekly reminders, and classical insights delivered directly to your inbox.
              </p>
            </div>

            <div className="lg:col-span-6">
              {footerEmailSuccess ? (
                <div className="bg-white/15 backdrop-blur-md rounded-2xl p-4 text-center text-sm text-emerald-100 font-bold border border-white/20">
                  ✓ JazakAllah Khair! You are now part of our newsletter circle.
                </div>
              ) : (
                <form onSubmit={handleFooterEmailSubmit} className="space-y-2">
                  <div className="flex flex-col sm:flex-row gap-2.5">
                    <input
                      type="email"
                      required
                      value={footerEmail}
                      onChange={(e) => setFooterEmail(e.target.value)}
                      placeholder="Enter your email address"
                      className="flex-1 bg-white text-gray-900 px-4 py-3 rounded-2xl text-xs sm:text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-secondary font-medium"
                    />
                    <button
                      type="submit"
                      className="px-6 py-3 bg-[#D48C46] hover:bg-[#b87635] text-white font-bold text-xs sm:text-sm rounded-2xl transition-all shadow-md hover:shadow-lg shrink-0 cursor-pointer"
                    >
                      Subscribe Now
                    </button>
                  </div>
                  <p className="text-[10px] sm:text-[11px] text-white/50 text-center sm:text-left flex items-center gap-1.5">
                    <span>🛡️</span> No spam. Unsubscribe anytime.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}

export default function CategoriesPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#FAF7F2] flex items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <div className="w-10 h-10 border-3 border-primary border-t-transparent rounded-full animate-spin" />
            <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">
              Loading Categories Hub...
            </span>
          </div>
        </div>
      }
    >
      <CategoriesPageContent />
    </Suspense>
  );
}
