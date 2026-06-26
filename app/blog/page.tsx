"use client";

import { useState, useMemo, useRef, useEffect, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  HiOutlineBookOpen, 
  HiOutlineAcademicCap, 
  HiOutlineSparkles, 
  HiOutlineScale,
  HiOutlineHeart,
  HiOutlineMagnifyingGlass,
  HiOutlineChevronDown,
  HiOutlineEnvelope,
  HiOutlineBookmark,
  HiOutlineArrowRight,
  HiOutlineQueueList,
  HiOutlineMap
} from "react-icons/hi2";
import { articles, Article } from "@/data/articles";

// ─── Static Data ─────────────────────────────────────────────────────────────

const categories = [
  { id: "all", label: "All Categories", icon: <HiOutlineQueueList className="w-6 h-6" /> },
  { id: "quran", label: "Quran", icon: <HiOutlineBookOpen className="w-6 h-6" /> },
  { id: "seerah", label: "Seerah", icon: <HiOutlineAcademicCap className="w-6 h-6" /> },
  { id: "aqeedah", label: "Aqeedah", icon: <HiOutlineSparkles className="w-6 h-6" /> },
  { id: "fiqh", label: "Fiqh", icon: <HiOutlineScale className="w-6 h-6" /> },
  { id: "duas", label: "Duas", icon: <HiOutlineHeart className="w-6 h-6" /> },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function ArticleCard({ article }: { article: Article }) {
  return (
    <Link href={`/blog/${article.slug}`} className="block h-full group">
      <motion.div 
        layout
        className="bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col h-full"
      >
        <div className="relative h-56 w-full bg-gray-100 overflow-hidden text-[0px]">
          <Image 
            src={article.image} 
            alt={article.title} 
            fill 
            className="object-cover group-hover:scale-105 transition-transform duration-700" 
            sizes="(max-w-768px) 100vw, 33vw"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent" />
          <span className="absolute top-4 left-4 bg-primary/90 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1.5 rounded-full shadow-lg uppercase tracking-wider">
            {article.category}
          </span>
          <button className="absolute top-4 right-4 w-9 h-9 bg-white/95 backdrop-blur-md rounded-full flex items-center justify-center text-gray-400 hover:text-primary shadow-sm hover:scale-110 transition-all">
            <HiOutlineBookmark className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 flex flex-col flex-1">
          <span className="text-[9px] font-black text-secondary tracking-widest uppercase mb-2">
            {article.level}
          </span>
          <h3 className="font-heading font-bold text-gray-900 text-lg leading-tight mb-3 line-clamp-2 group-hover:text-primary transition-colors italic">
            {article.title}
          </h3>
          <p className="text-gray-500 text-sm line-clamp-2 mb-6 leading-relaxed font-light">
            {article.excerpt}
          </p>

          <div className="mt-auto flex items-center justify-between pt-5 border-t border-gray-50">
            <div className="flex items-center gap-3">
              <div className="relative w-8 h-8 rounded-full bg-gray-200 overflow-hidden text-[0px] ring-2 ring-gray-50">
                <Image src={article.authorImg} alt={article.author} fill className="object-cover" />
              </div>
              <span className="text-[12px] font-bold text-gray-800">{article.author}</span>
            </div>
            <span className="text-[11px] text-gray-400 font-medium">{article.displayDate}</span>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}

// ─── Custom Dropdown ─────────────────────────────────────────────────────────

type DropdownOption = { value: string; label: string };

function CustomDropdown({
  value,
  options,
  onChange,
}: {
  value: string;
  options: DropdownOption[];
  onChange: (val: string) => void;
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
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className={`flex items-center gap-3 bg-white border rounded-full py-4 px-6 text-[13px] font-bold cursor-pointer hover:shadow-md transition-all min-w-[160px] ${
          open ? "border-primary/30 shadow-md text-primary" : "border-gray-100 text-gray-700"
        }`}
      >
        <HiOutlineChevronDown
          className={`w-4 h-4 text-gray-400 transition-transform duration-300 ${
            open ? "rotate-180 text-primary" : ""
          }`}
        />
        <span className="flex-1 text-left">{selected.label}</span>
      </button>

      {open && (
        <motion.div
          initial={{ opacity: 0, y: -6, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.15 }}
          className="absolute top-[calc(100%+8px)] left-0 z-50 min-w-[200px] bg-white rounded-3xl border border-gray-100 shadow-2xl shadow-gray-200/60 overflow-hidden py-2"
        >
          {options.map((opt) => (
            <button
              key={opt.value}
              onClick={() => {
                onChange(opt.value);
                setOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-5 py-3.5 text-[13px] font-bold text-left transition-all ${
                opt.value === value
                  ? "bg-primary/5 text-primary"
                  : "text-gray-600 hover:bg-gray-50 hover:text-primary"
              }`}
            >
              {opt.value === value && (
                <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
              )}
              {opt.value !== value && (
                <span className="w-1.5 h-1.5 rounded-full bg-transparent shrink-0" />
              )}
              {opt.label}
            </button>
          ))}
        </motion.div>
      )}
    </div>
  );
}

// ─── Inner Page Content ──────────────────────────────────────────────────────

function BlogPageContent() {
  const searchParams = useSearchParams();
  const catParam = searchParams.get("category") || "all";
  
  const [activeCategory, setActiveCategory] = useState("all");
  const [search, setSearch] = useState("");
  const [level, setLevel] = useState("all");
  const [sortBy, setSortBy] = useState("latest");
  const [currentPage, setCurrentPage] = useState(1);
  const ARTICLES_PER_PAGE = 6;

  useEffect(() => {
    if (catParam) {
      setActiveCategory(catParam);
      setCurrentPage(1);
    }
  }, [catParam]);

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: articles.length };
    articles.forEach(article => {
      counts[article.categoryId] = (counts[article.categoryId] || 0) + 1;
    });
    return counts;
  }, []);

  const filteredArticles = useMemo(() => {
    let result = articles.filter((article) => {
      const matchCategory = activeCategory === "all" || article.categoryId === activeCategory;
      const matchSearch = article.title.toLowerCase().includes(search.toLowerCase()) || 
                          article.excerpt.toLowerCase().includes(search.toLowerCase());
      const matchLevel = level === "all" || article.level.toLowerCase() === level.toLowerCase();
      return matchCategory && matchSearch && matchLevel;
    });

    if (sortBy === "latest") {
      result = [...result].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    } else if (sortBy === "oldest") {
      result = [...result].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    } else if (sortBy === "alphabetical") {
      result = [...result].sort((a, b) => a.title.localeCompare(b.title));
    }

    return result;
  }, [activeCategory, search, level, sortBy]);

  const totalPages = Math.ceil(filteredArticles.length / ARTICLES_PER_PAGE);
  const currentArticles = useMemo(() => {
    const start = (currentPage - 1) * ARTICLES_PER_PAGE;
    return filteredArticles.slice(start, start + ARTICLES_PER_PAGE);
  }, [filteredArticles, currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 400, behavior: "smooth" });
  };

  // Find the latest featured article for the hero billboard
  const featuredInsight = useMemo(() => {
    return articles.find(a => a.categoryId === "quran") || articles[0];
  }, []);

  return (
    <main className="bg-[#FAF7F2] min-h-screen font-body">
      {/* ─── Immersive Hero Section ─── */}
      <section className="relative w-full pt-16 pb-24 overflow-hidden">
         <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
         <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-secondary/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3 pointer-events-none" />

         <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
            <div className="flex flex-col lg:flex-row items-center gap-16">
               <div className="flex-1 text-center lg:text-left">
                  <motion.nav 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center justify-center lg:justify-start gap-3 text-xs font-bold text-gray-400 mb-8 uppercase tracking-widest"
                  >
                     <Link href="/" className="hover:text-primary transition-colors">Home</Link>
                     <span className="w-1 h-1 rounded-full bg-gray-300" />
                     <span className="text-primary">Blog</span>
                  </motion.nav>

                  <motion.h1 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="font-heading text-6xl lg:text-8xl font-bold text-[#0A3A2F] mb-8 leading-[1.1] tracking-tight"
                  >
                     Divine <span className="text-secondary italic">Insights</span> <br/> 
                     <span className="text-primary/40">& Knowledge</span>
                  </motion.h1>

                  <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-gray-500 text-xl leading-relaxed max-w-lg mx-auto lg:mx-0 mb-10"
                  >
                     Embark on a journey through the timeless wisdom of Islam. Explore authentic articles curated for your spiritual growth.
                  </motion.p>

                  {/* Quick Stats */}
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="flex flex-wrap items-center justify-center lg:justify-start gap-8"
                  >
                     <div className="flex flex-col">
                        <span className="text-4xl font-heading font-bold text-primary">{articles.length}</span>
                        <span className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">Articles</span>
                     </div>
                     <div className="w-[1px] h-10 bg-gray-200 hidden sm:block" />
                     <div className="flex flex-col">
                        <span className="text-4xl font-heading font-bold text-primary">6+</span>
                        <span className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">Categories</span>
                     </div>
                     <div className="w-[1px] h-10 bg-gray-200 hidden sm:block" />
                     <div className="flex flex-col">
                        <span className="text-4xl font-heading font-bold text-primary">50k+</span>
                        <span className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">Learners</span>
                     </div>
                  </motion.div>
               </div>

               <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2, duration: 0.8 }}
                  className="flex-1 relative"
               >
                  <div className="relative w-full aspect-square max-w-[500px] mx-auto">
                     <div className="absolute -top-10 -left-10 bg-white p-6 rounded-3xl shadow-2xl z-20 hidden xl:block animate-bounce-slow">
                        <div className="flex items-center gap-4">
                           <div className="w-12 h-12 bg-secondary/10 rounded-2xl flex items-center justify-center text-secondary">
                              <HiOutlineSparkles className="w-6 h-6" />
                           </div>
                           <div>
                              <p className="text-sm font-bold text-gray-900">Weekly Update</p>
                              <p className="text-[10px] text-gray-400">New Articles Added</p>
                           </div>
                        </div>
                     </div>

                     <div className="relative w-full h-full rounded-[4rem] overflow-hidden shadow-2xl border-[12px] border-white ring-1 ring-gray-100">
                        <Image 
                           src="https://images.unsplash.com/photo-1542810634-71277d95dcbb?q=80&w=800" 
                           alt="Islamic Journey" 
                           fill 
                           className="object-cover"
                           sizes="(max-w-1024px) 100vw, 40vw"
                        />
                        <div className="absolute inset-0 bg-linear-to-tr from-primary/40 via-transparent to-transparent pointer-events-none" />
                     </div>
                  </div>
               </motion.div>
            </div>
         </div>
      </section>

      {/* ─── Category Selection ─── */}
      <section className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12 -mt-10 mb-24 relative z-20">
         <div className="bg-white/80 backdrop-blur-2xl rounded-[3rem] p-4 shadow-xl border border-white flex items-center gap-3 overflow-x-auto scrollbar-none py-3">
            {categories.map((cat) => (
               <button
                  key={cat.id}
                  onClick={() => {
                    setActiveCategory(cat.id);
                    setCurrentPage(1);
                  }}
                  className={`flex items-center gap-4 px-8 py-5 rounded-[2rem] transition-all duration-500 whitespace-nowrap group
                    ${activeCategory === cat.id 
                       ? "bg-[#0A3A2F] text-white shadow-xl shadow-primary/20 scale-105" 
                       : "bg-white/50 text-gray-500 hover:bg-white hover:text-primary hover:shadow-md"}`}
               >
                  <div className={`p-2.5 rounded-2xl transition-all duration-500 ${activeCategory === cat.id ? "bg-white/10 text-secondary" : "bg-gray-50 text-gray-400 group-hover:text-primary group-hover:bg-primary/5"}`}>
                     {cat.icon}
                  </div>
                  <div className="flex flex-col items-start">
                    <span className="text-[15px] font-bold">{cat.label}</span>
                    <span className={`text-[10px] font-medium transition-opacity ${activeCategory === cat.id ? "opacity-60" : "opacity-40"}`}>
                       {categoryCounts[cat.id] || 0} Articles
                    </span>
                  </div>
               </button>
            ))}
         </div>
      </section>

      {/* ─── Search & Advanced Filters ─── */}
      <section className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12 mb-16">
         <div className="flex flex-wrap items-center gap-6">
            <div className="flex-1 min-w-[320px] relative group">
               <HiOutlineMagnifyingGlass className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 w-6 h-6 group-focus-within:text-primary transition-colors" />
               <input 
                  type="text" 
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setCurrentPage(1);
                  }}
                  placeholder="What would you like to learn today?..." 
                  className="w-full bg-white border border-gray-100 rounded-[2rem] py-5 pl-16 pr-8 text-base focus:outline-none focus:ring-2 focus:ring-primary/10 focus:border-primary/20 shadow-sm transition-all"
               />
            </div>
            
            <div className="flex flex-wrap items-center gap-4 bg-white/50 p-2 rounded-[2.5rem] border border-white shadow-sm">
               <CustomDropdown
                  value={level}
                  onChange={(val) => { setLevel(val); setCurrentPage(1); }}
                  options={[
                    { value: "all", label: "Level: All" },
                    { value: "beginner", label: "Beginner" },
                    { value: "intermediate", label: "Intermediate" },
                    { value: "advanced", label: "Advanced" },
                  ]}
               />

               <CustomDropdown
                  value={sortBy}
                  onChange={(val) => setSortBy(val)}
                  options={[
                    { value: "latest", label: "Sort: Newest First" },
                    { value: "oldest", label: "Sort: Oldest First" },
                    { value: "alphabetical", label: "Sort: Title A–Z" },
                  ]}
               />

               <button 
                  onClick={() => {
                    setSearch("");
                    setActiveCategory("all");
                    setLevel("all");
                    setSortBy("latest");
                    setCurrentPage(1);
                  }}
                  className="px-8 py-4 bg-primary text-white rounded-full text-[13px] font-black uppercase tracking-widest hover:bg-primaryHover shadow-lg shadow-primary/20 active:scale-95 transition-all"
               >
                  Reset
               </button>
            </div>
         </div>
      </section>

      {/* ─── Multi-column Layout ─── */}
      <section className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-16 pb-32">
         
         {/* Main Listing Content */}
         <div className="lg:col-span-8 lg:order-1 order-2 space-y-20">
            {/* Featured Insight Section */}
            {featuredInsight && (
              <div>
                 <div className="flex items-center gap-4 mb-10">
                    <div className="w-12 h-[2px] bg-secondary opacity-50" />
                    <h2 className="font-heading text-3xl font-bold text-gray-900 tracking-tight">Today&apos;s Featured Insight</h2>
                 </div>

                 <motion.div 
                   whileHover={{ y: -5 }}
                   className="bg-white rounded-[4rem] border border-gray-55 overflow-hidden grid grid-cols-1 md:grid-cols-12 shadow-2xl hover:shadow-primary/10 transition-all duration-700 group relative"
                 >
                    <div className="md:col-span-12 relative h-96 xl:h-[450px]">
                       <Image 
                          src={featuredInsight.image} 
                          alt={featuredInsight.title} 
                          fill 
                          className="object-cover group-hover:scale-105 transition-transform duration-[2000ms]" 
                          sizes="(max-w-1200px) 100vw, 60vw"
                       />
                       <div className="absolute inset-0 bg-linear-to-t from-gray-900 via-gray-900/40 to-transparent" />
                       
                       <div className="absolute bottom-0 left-0 p-8 sm:p-12 w-full">
                          <div className="flex items-center gap-3 mb-6">
                             <span className="bg-secondary text-white text-[10px] font-black px-4 py-2 rounded-full uppercase tracking-widest">Featured</span>
                             <span className="bg-white/20 backdrop-blur-md text-white text-[10px] font-bold px-4 py-2 rounded-full uppercase tracking-widest">{featuredInsight.readTime}</span>
                          </div>
                          
                          <h3 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight max-w-2xl italic">
                             {featuredInsight.title}
                          </h3>

                          <div className="flex flex-wrap items-center gap-6">
                             <div className="flex items-center gap-3">
                                <div className="w-12 h-12 rounded-full border-2 border-white/20 overflow-hidden bg-gray-100">
                                   <Image src={featuredInsight.authorImg} alt={featuredInsight.author} width={48} height={48} className="object-cover" />
                                </div>
                                <div>
                                   <p className="text-white font-bold text-sm">{featuredInsight.author}</p>
                                   <p className="text-white/50 text-[11px] font-medium uppercase tracking-widest">{featuredInsight.displayDate}</p>
                                </div>
                             </div>
                             <Link href={`/blog/${featuredInsight.slug}`} className="ml-auto bg-white text-primary px-8 py-4 rounded-full font-black text-[13px] uppercase tracking-widest hover:bg-secondary hover:text-white transition-all">
                                Read Full Article
                             </Link>
                          </div>
                       </div>
                    </div>
                 </motion.div>
              </div>
            )}

            {/* Main Article Feed */}
            <div>
               <div className="flex items-center justify-between mb-12">
                  <h2 className="font-heading text-3xl font-bold text-gray-900 tracking-tight">Recent Knowledge</h2>
                  <div className="text-[12px] font-bold text-gray-400 uppercase tracking-widest">
                    {filteredArticles.length} Results Found
                  </div>
               </div>
               
               <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <AnimatePresence mode="popLayout">
                     {currentArticles.length > 0 ? (
                       currentArticles.map((article) => (
                        <ArticleCard key={article.id} article={article} />
                       ))
                     ) : (
                       <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="col-span-full py-32 text-center bg-white rounded-[3rem] border border-dashed border-gray-200">
                          <p className="text-gray-400 text-lg">No articles match your current filters.</p>
                          <button onClick={() => { setSearch(""); setActiveCategory("all"); }} className="mt-4 text-primary font-bold hover:underline">Clear Filters</button>
                       </motion.div>
                     )}
                  </AnimatePresence>
               </div>
            </div>

            {/* Custom Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-4 pt-16">
                 <button 
                    onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="w-14 h-14 rounded-full border border-gray-100 bg-white flex items-center justify-center text-gray-400 hover:bg-primary hover:text-white disabled:opacity-30 disabled:hover:bg-white disabled:hover:text-gray-400 transition-all shadow-sm"
                 >
                    <HiOutlineArrowRight className="w-5 h-5 rotate-180" />
                 </button>
                 
                 <div className="flex items-center gap-2 bg-white p-2 rounded-full border border-gray-55 shadow-sm">
                    {[...Array(totalPages)].map((_, i) => (
                       <button 
                          key={i}
                          onClick={() => handlePageChange(i + 1)}
                          className={`w-12 h-12 rounded-full font-bold transition-all ${currentPage === i + 1 ? "bg-[#0A3A2F] text-white shadow-md shadow-primary/20" : "text-gray-600 hover:bg-gray-50"}`}
                       >
                          {i + 1}
                       </button>
                    ))}
                 </div>
                 
                 <button 
                    onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                    className="w-14 h-14 rounded-full border border-gray-100 bg-white flex items-center justify-center text-gray-400 hover:bg-primary hover:text-white disabled:opacity-30 disabled:hover:bg-white disabled:hover:text-gray-400 transition-all shadow-sm"
                 >
                    <HiOutlineArrowRight className="w-5 h-5" />
                 </button>
              </div>
            )}
         </div>

         {/* Sticky Sidebar Content */}
         <aside className="lg:col-span-4 lg:order-2 order-1 space-y-12">
            
            {/* Daily Wisdom Segment */}
            <div className="relative bg-[#0A3A2F] rounded-[3.5rem] p-10 text-white shadow-2xl overflow-hidden group">
               <div className="relative z-10 text-center">
                  <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-10 group-hover:scale-110 transition-transform">
                     <HiOutlineMap className="w-8 h-8 text-secondary" />
                  </div>
                  <h4 className="font-heading text-2xl font-bold mb-8">Daily Spiritual Verse</h4>
                  <blockquote className="text-2xl font-bold leading-snug mb-10 italic">
                     &ldquo;So remember Me; I will remember you. Be grateful to Me, and never ungrateful.&rdquo;
                  </blockquote>
                  <div className="w-full h-[1px] bg-white/20 mb-6" />
                  <p className="text-[10px] text-secondary font-black uppercase tracking-widest">Surah Al-Baqarah 2:152</p>
               </div>
               
               <div className="absolute top-0 right-0 w-full h-full bg-linear-to-br from-white/10 to-transparent pointer-events-none" />
            </div>

            {/* Beginner's Path Section */}
            <div className="bg-white rounded-[3.5rem] p-12 border border-gray-55 shadow-2xl relative overflow-hidden group">
               <div className="relative z-10">
                  <h4 className="font-heading text-2xl font-bold text-gray-900 mb-4 tracking-tight">New to Faith?</h4>
                  <p className="text-gray-500 leading-relaxed mb-10 font-light">
                     We&apos;ve curated a specialized learning path for brothers and sisters beginning their spiritual journey.
                  </p>
                  
                  <ul className="space-y-4 mb-12">
                     {["The 5 Pillars", "Arabic for Beginners", "Salah Guide"].map((item) => (
                        <li key={item} className="flex items-center gap-4 text-sm font-bold text-gray-700">
                           <div className="w-1.5 h-1.5 rounded-full bg-secondary" />
                           {item}
                        </li>
                     ))}
                  </ul>

                  <button className="w-full bg-[#FAF7F2] border-2 border-primary text-primary py-5 rounded-[2rem] font-black text-[13px] uppercase tracking-widest hover:bg-primary hover:text-white transition-all flex items-center justify-center gap-3 active:scale-95 shadow-lg shadow-primary/5">
                     Start Learning <HiOutlineArrowRight className="w-4 h-4" />
                  </button>
               </div>
            </div>

            {/* Premium Staff Picks Segment */}
            <div className="bg-white/50 border border-white rounded-[3.5rem] p-10 shadow-sm">
               <h4 className="font-heading text-xl font-bold text-gray-900 mb-8 border-b-2 border-primary/10 pb-4 inline-block">Staff Recommendations</h4>
               
               <div className="space-y-8">
                  {[
                     { title: "Understanding Istikhara", cat: "Duas", time: "5m" },
                     { title: "Manners in the Masjid", cat: "Fiqh", time: "7m" },
                  ].map((pick) => (
                     <div key={pick.title} className="group cursor-pointer">
                        <p className="text-[10px] font-black text-secondary uppercase tracking-widest mb-1">{pick.cat}</p>
                        <h5 className="font-bold text-gray-900 group-hover:text-primary transition-colors mb-2">{pick.title}</h5>
                        <p className="text-[10px] text-gray-400 font-bold uppercase">{pick.time} Read</p>
                     </div>
                  ))}
               </div>
            </div>

         </aside>
      </section>
    </main>
  );
}

export default function BlogPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#FAF7F2] flex items-center justify-center text-zinc-400 font-body">Loading Blog...</div>}>
      <BlogPageContent />
    </Suspense>
  );
}
