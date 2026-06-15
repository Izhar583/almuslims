"use client";

import React, { useState, useEffect, useMemo } from "react";
import { DUAS, DUA_CATEGORIES, Dua, getDailyDua } from "@/data/duas";
import { 
  FaSearch, 
  FaVolumeUp, 
  FaVolumeMute, 
  FaBookmark, 
  FaRegBookmark, 
  FaHeart, 
  FaRegHeart, 
  FaShareAlt, 
  FaCheck, 
  FaAward, 
  FaBookOpen, 
  FaStar, 
  FaLightbulb
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

export default function DuasPageClient() {
  const dailyDua = useMemo(() => getDailyDua(), []);
  
  // State
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("Popular"); // Popular | A-Z | ID
  const [favorites, setFavorites] = useState<number[]>([]);
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);
  const [playingId, setPlayingId] = useState<number | null>(null);
  const [copiedId, setCopiedId] = useState<number | null>(null);

  // Load Favorites from LocalStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("almuslims_dua_favorites");
      if (saved) {
        try {
          setFavorites(JSON.parse(saved));
        } catch (e) {
          console.error("Error loading favorites", e);
        }
      }
    }
  }, []);

  // Save Favorites to LocalStorage
  const toggleFavorite = (id: number) => {
    const isFav = favorites.includes(id);
    let updated: number[];
    if (isFav) {
      updated = favorites.filter((favId) => favId !== id);
    } else {
      updated = [...favorites, id];
    }
    setFavorites(updated);
    localStorage.setItem("almuslims_dua_favorites", JSON.stringify(updated));
  };

  // Share Dua
  const shareDua = (dua: Dua) => {
    const text = `*${dua.title}*\n\n${dua.text}\n\n_${dua.transliteration}_\n\n"${dua.translation}"\n\nReference: ${dua.reference}\n\nShared via AlMuslims`;
    navigator.clipboard.writeText(text).then(() => {
      setCopiedId(dua.id);
      setTimeout(() => setCopiedId(null), 2000);
    });
  };

  // Audio Playback
  const handlePlayAudio = (dua: Dua) => {
    if (playingId === dua.id) {
      window.speechSynthesis.cancel();
      setPlayingId(null);
      return;
    }

    window.speechSynthesis.cancel();
    const voices = window.speechSynthesis.getVoices();

    const arabicSpeech = new SpeechSynthesisUtterance(dua.text);
    arabicSpeech.voice = voices.find(v => v.lang.includes("ar")) || voices[0];
    arabicSpeech.lang = "ar-SA";
    arabicSpeech.rate = 0.65;

    const englishSpeech = new SpeechSynthesisUtterance(dua.translation);
    englishSpeech.voice = voices.find(v => v.lang.includes("en")) || voices[0];
    englishSpeech.lang = "en-US";
    englishSpeech.rate = 0.85;

    arabicSpeech.onend = () => {
      setTimeout(() => {
        if (playingId === dua.id) {
          window.speechSynthesis.speak(englishSpeech);
        }
      }, 400);
    };

    englishSpeech.onend = () => {
      setPlayingId(null);
    };

    setPlayingId(dua.id);
    window.speechSynthesis.speak(arabicSpeech);
  };

  // Categories count computation
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    DUAS.forEach((d) => {
      counts[d.category] = (counts[d.category] || 0) + 1;
    });
    return counts;
  }, []);

  // Filter & Sort logic
  const filteredDuas = useMemo(() => {
    let result = DUAS.filter((dua) => {
      const matchesCategory = selectedCategory === "All" || dua.category === selectedCategory;
      const matchesFavorites = !showOnlyFavorites || favorites.includes(dua.id);
      
      const term = searchQuery.trim().toLowerCase();
      const matchesSearch = !term ||
        dua.title.toLowerCase().includes(term) ||
        dua.translation.toLowerCase().includes(term) ||
        dua.transliteration.toLowerCase().includes(term) ||
        dua.text.toLowerCase().includes(term) ||
        dua.category.toLowerCase().includes(term) ||
        dua.reference.toLowerCase().includes(term);

      return matchesCategory && matchesFavorites && matchesSearch;
    });

    if (sortBy === "A-Z") {
      result.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortBy === "ID") {
      result.sort((a, b) => a.id - b.id);
    } // "Popular" just keeps original order

    return result;
  }, [searchQuery, selectedCategory, sortBy, favorites, showOnlyFavorites]);

  return (
    <div className="min-h-screen bg-[#FAF7F2] py-8 sm:py-12">
      <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* ── HEADER BLOCK ── */}
        <div className="relative w-full bg-linear-to-r from-primary to-primaryHover rounded-[2.5rem] p-8 sm:p-12 overflow-hidden shadow-xl text-white flex flex-col lg:flex-row items-center justify-between gap-8" style={{ background: "linear-gradient(135deg, #0A3A2F, #145047)" }}>
          {/* Background shapes */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.08),transparent_60%)] pointer-events-none" />
          
          <div className="space-y-4 max-w-xl text-center lg:text-left z-10">
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
              Dua Collection
            </h1>
            <p className="font-body text-sm sm:text-base text-white/80 leading-relaxed">
              Authentic duas from the Quran and Sunnah for every moment of your life. Strengthen your connection with the Creator through daily supplications.
            </p>
          </div>
          
          {/* Mosque & Hands Illustration SVG */}
          <div className="relative z-10 w-full max-w-[360px] aspect-[4/3] flex items-center justify-center">
            <svg viewBox="0 0 400 300" className="w-full h-full drop-shadow-2xl" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Stars & Moon */}
              <circle cx="90" cy="80" r="1.5" fill="#FAF7F2" opacity="0.6"/>
              <circle cx="310" cy="100" r="2" fill="#FAF7F2" opacity="0.8"/>
              <circle cx="210" cy="50" r="1" fill="#FAF7F2" opacity="0.4"/>
              <circle cx="150" cy="110" r="1.5" fill="#FAF7F2" opacity="0.5"/>
              <path d="M280 60C280 43.4315 266.569 30 250 30C246.5 30 243.14 30.6001 240.02 31.7002C251.78 37.1002 260 48.7001 260 62.3001C260 75.9001 251.78 87.5002 240.02 92.9002C243.14 94.0002 246.5 94.6001 250 94.6001C266.569 94.6001 280 81.1686 280 64.6001V60Z" fill="#FAF7F2" opacity="0.95"/>
              
              {/* Mosque Silhouette in Background */}
              <path d="M60 220V170C60 160 70 155 70 155C70 155 80 160 80 170V220H60Z" fill="#FAF7F2" opacity="0.15"/>
              <path d="M300 220V160C300 148 312 142 312 142C312 142 324 148 324 160V220H300Z" fill="#FAF7F2" opacity="0.15"/>
              <path d="M90 220V120H100V220H90ZM95 105L98 115H92L95 105Z" fill="#FAF7F2" opacity="0.2"/>
              <path d="M280 220V110H290V220H280ZM285 95L288 105H282L285 95Z" fill="#FAF7F2" opacity="0.2"/>
              
              {/* Big Dome */}
              <path d="M120 220V160C120 125 150 110 180 110C210 110 240 125 240 160V220H120Z" fill="#FAF7F2" opacity="0.25"/>
              <path d="M180 95L183 105H177L180 95Z" fill="#FAF7F2" opacity="0.3"/>
              
              {/* Praying Hands */}
              <path d="M155 240C165 200 178 180 188 180C192 180 196 185 196 195C196 205 190 215 190 215L170 240H155Z" fill="#FAF7F2" opacity="0.9"/>
              <path d="M225 240C215 200 202 180 192 180C188 180 184 185 184 195C184 205 190 215 190 215L210 240H225Z" fill="#FAF7F2" opacity="0.9"/>
              <path d="M178 200C181 190 186 185 190 185C194 185 199 190 202 200L190 212L178 200Z" fill="#D48C46" opacity="0.85"/>
            </svg>
          </div>
        </div>

        {/* ── STATISTICS BAR ── */}
        <div className="bg-white rounded-[2rem] p-6 shadow-[0_8px_30px_rgb(0,0,0,0.02)] border border-primary/5">
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 xl:divide-x xl:divide-primary/10">
            {/* Stat 1 */}
            <div className="flex items-center gap-4 px-4">
              <div className="w-12 h-12 rounded-2xl bg-secondary/10 text-secondary flex items-center justify-center shrink-0">
                <FaBookOpen size={20} />
              </div>
              <div>
                <p className="font-heading text-lg font-bold text-primary">500+</p>
                <p className="text-xs text-zinc-500 font-medium font-body">Authentic Duas</p>
              </div>
            </div>
            {/* Stat 2 */}
            <div className="flex items-center gap-4 px-4">
              <div className="w-12 h-12 rounded-2xl bg-secondary/10 text-secondary flex items-center justify-center shrink-0">
                <FaAward size={20} />
              </div>
              <div>
                <p className="font-heading text-lg font-bold text-primary">Verified</p>
                <p className="text-xs text-zinc-500 font-medium font-body">From Quran & Sunnah</p>
              </div>
            </div>
            {/* Stat 3 */}
            <div className="flex items-center gap-4 px-4">
              <div className="w-12 h-12 rounded-2xl bg-secondary/10 text-secondary flex items-center justify-center shrink-0">
                <FaStar size={20} />
              </div>
              <div>
                <p className="font-heading text-lg font-bold text-primary">Easy to Use</p>
                <p className="text-xs text-zinc-500 font-medium font-body">Search, Listen & Share</p>
              </div>
            </div>
            {/* Stat 4 */}
            <div className="flex items-center gap-4 px-4">
              <div className="w-12 h-12 rounded-2xl bg-secondary/10 text-secondary flex items-center justify-center shrink-0">
                <FaHeart size={20} />
              </div>
              <div>
                <p className="font-heading text-lg font-bold text-primary">Save Favorites</p>
                <p className="text-xs text-zinc-500 font-medium font-body">Your personal collection</p>
              </div>
            </div>
          </div>
        </div>

        {/* ── MAIN LAYOUT GRID ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* ── LEFT COLUMN: SIDEBAR (lg:col-span-3) ── */}
          <aside className="lg:col-span-3 space-y-6">
            
            {/* Categories Card */}
            <div className="bg-white rounded-[2rem] border border-[#EBE3D5] p-6 shadow-sm space-y-4 font-body">
              <div className="flex items-center justify-between pb-3 border-b border-zinc-100">
                <h3 className="font-bold text-sm uppercase tracking-wider text-primary">Categories</h3>
                <span className="text-[10px] font-bold bg-[#FAF7F2] text-secondary px-2 py-0.5 rounded">
                  {DUA_CATEGORIES.length - 1} Total
                </span>
              </div>
              
              <div className="max-h-[360px] overflow-y-auto pr-1 space-y-1.5 scrollbar-thin scrollbar-thumb-zinc-200">
                {/* All Duas */}
                <button
                  onClick={() => {
                    setSelectedCategory("All");
                    setShowOnlyFavorites(false);
                  }}
                  className={`w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-xs font-semibold tracking-wide transition-all ${
                    selectedCategory === "All" && !showOnlyFavorites
                      ? "bg-primary text-white shadow-md font-bold scale-[1.02]"
                      : "text-zinc-600 hover:bg-[#FAF7F2] hover:text-primary"
                  }`}
                >
                  <span>All Duas</span>
                  <span className={`px-2 py-0.5 rounded-full text-[9px] ${
                    selectedCategory === "All" && !showOnlyFavorites
                      ? "bg-white/20 text-white"
                      : "bg-[#FAF7F2] text-zinc-500"
                  }`}>{DUAS.length}</span>
                </button>

                {/* Categories mapping */}
                {DUA_CATEGORIES.filter(c => c !== "All").map((cat) => {
                  const isActive = selectedCategory === cat && !showOnlyFavorites;
                  return (
                    <button
                      key={cat}
                      onClick={() => {
                        setSelectedCategory(cat);
                        setShowOnlyFavorites(false);
                      }}
                      className={`w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-xs font-semibold tracking-wide transition-all ${
                        isActive
                          ? "bg-primary text-white shadow-md font-bold scale-[1.02]"
                          : "text-zinc-600 hover:bg-[#FAF7F2] hover:text-primary"
                      }`}
                    >
                      <span>{cat}</span>
                      <span className={`px-2 py-0.5 rounded-full text-[9px] ${
                        isActive ? "bg-white/20 text-white" : "bg-[#FAF7F2] text-zinc-500"
                      }`}>{categoryCounts[cat] || 0}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Dua of the Day Card */}
            <div className="bg-[#FAF7F2] border border-[#EBE3D5] rounded-[2rem] p-6 shadow-sm flex flex-col items-center justify-between relative overflow-hidden font-body text-center group">
              <div className="space-y-1.5 w-full">
                <p className="text-[10px] font-bold text-[#1F2926]/40 tracking-[0.2em] uppercase">
                  Dua of the Day
                </p>
                <div className="w-8 h-0.5 bg-secondary mx-auto mb-4" />
              </div>
              
              <div className="space-y-4 w-full flex-1 flex flex-col justify-center">
                <span className="mx-auto bg-secondary/10 text-secondary px-3 py-0.5 rounded-full text-[9px] font-bold tracking-widest uppercase w-fit">
                  {dailyDua.category}
                </span>
                <p 
                  dir="rtl" 
                  className="text-2xl font-bold text-[#1F2926] font-arabic leading-relaxed"
                >
                  {dailyDua.text}
                </p>
                <p className="text-[11px] italic text-[#1F2926]/40 font-medium">
                  "{dailyDua.transliteration}"
                </p>
                <p className="text-xs font-medium text-[#1F2926]/70 leading-relaxed max-w-[200px] mx-auto">
                  {dailyDua.translation}
                </p>
                <p className="text-[10px] font-bold text-secondary tracking-wide uppercase">
                  {dailyDua.reference}
                </p>
              </div>

              <button
                onClick={() => {
                  setSearchQuery(dailyDua.title);
                  setSelectedCategory("All");
                  setShowOnlyFavorites(false);
                }}
                className="mt-6 w-full py-3 bg-white border border-[#EBE3D5] text-[#1F2926] font-bold text-[10px] tracking-widest uppercase rounded-full hover:bg-primary hover:text-white hover:border-primary transition-all duration-300 shadow-sm"
              >
                View Detailed Card
              </button>
            </div>

          </aside>

          {/* ── RIGHT COLUMN: CONTENT GRID (lg:col-span-9) ── */}
          <main className="lg:col-span-9 space-y-6">
            
            {/* Filter controls row */}
            <div className="bg-white rounded-[1.5rem] border border-primary/5 p-4 shadow-sm flex flex-col sm:flex-row gap-4 justify-between items-center font-body">
              
              {/* Search Box */}
              <div className="relative w-full sm:max-w-md">
                <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-zinc-400">
                  <FaSearch size={14} />
                </span>
                <input
                  type="text"
                  placeholder="Search duas by title, keyword or Arabic text..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 bg-[#FAF7F2] border border-[#EBE3D5] rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium"
                />
              </div>

              {/* Sort By Dropdown */}
              <div className="flex items-center gap-3 shrink-0">
                <span className="text-xs text-zinc-500 font-semibold">Sort By</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-[#FAF7F2] border border-[#EBE3D5] rounded-xl px-4 py-2.5 text-xs font-bold text-primary focus:outline-none cursor-pointer"
                >
                  <option value="Popular">Most Popular</option>
                  <option value="A-Z">Alphabetical</option>
                  <option value="ID">ID Sequence</option>
                </select>
              </div>
            </div>

            {/* Duas count label */}
            <div className="flex items-center justify-between px-1">
              <div className="flex items-center gap-2">
                <span className="font-heading text-lg font-bold text-primary">
                  {showOnlyFavorites ? "Favorite Duas" : selectedCategory === "All" ? "All Duas" : `${selectedCategory} Duas`}
                </span>
                <span className="bg-secondary/15 text-secondary text-[10px] font-bold px-2 py-0.5 rounded">
                  {filteredDuas.length} Found
                </span>
              </div>
              
              {/* Toggle Favorites Filter Button */}
              <button
                onClick={() => {
                  setShowOnlyFavorites(!showOnlyFavorites);
                  setSelectedCategory("All");
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  showOnlyFavorites 
                    ? "bg-secondary text-white shadow-sm"
                    : "bg-white border border-[#EBE3D5] text-zinc-600 hover:bg-zinc-50"
                }`}
              >
                {showOnlyFavorites ? <FaHeart /> : <FaRegHeart />}
                <span>Favorites Only</span>
              </button>
            </div>

            {/* Grid of Duas */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              <AnimatePresence mode="popLayout">
                {filteredDuas.map((dua) => {
                  const isFav = favorites.includes(dua.id);
                  const isPlaying = playingId === dua.id;
                  const isCopied = copiedId === dua.id;

                  return (
                    <motion.article
                      key={dua.id}
                      layout
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.35 }}
                      className="bg-white border border-[#EBE3D5] rounded-[1.5rem] p-6 flex flex-col justify-between shadow-sm hover:shadow-md hover:border-primary/10 transition-all duration-300 font-body relative group"
                    >
                      {/* Top Header info */}
                      <div className="flex justify-between items-start mb-4">
                        <span className="bg-secondary/10 text-secondary px-2.5 py-0.5 rounded-full text-[9px] font-bold tracking-widest uppercase">
                          {dua.category}
                        </span>
                        <span className="text-[10px] font-bold text-zinc-400 font-mono">#{dua.id}</span>
                      </div>

                      {/* Content */}
                      <div className="space-y-4 flex-1 flex flex-col justify-center text-center pb-4">
                        <h4 className="font-heading text-base font-bold text-primary group-hover:text-secondary transition-colors">
                          {dua.title}
                        </h4>
                        
                        <p 
                          dir="rtl" 
                          className="text-2xl font-bold text-[#1F2926] font-arabic leading-relaxed py-2 select-all"
                        >
                          {dua.text}
                        </p>
                        
                        <p className="text-[11px] italic text-[#1F2926]/40 leading-normal font-medium">
                          {dua.transliteration}
                        </p>
                        
                        <div className="h-px w-8 bg-[#EBE3D5] mx-auto" />
                        
                        <p className="text-xs text-[#1F2926]/70 leading-relaxed font-medium">
                          {dua.translation}
                        </p>
                        
                        <p className="text-[10px] font-bold text-secondary tracking-wider uppercase font-mono">
                          {dua.reference}
                        </p>
                      </div>

                      {/* Actions Card Footer */}
                      <div className="flex items-center justify-between border-t border-zinc-100 pt-4 mt-2">
                        {/* Audio Button */}
                        <button
                          onClick={() => handlePlayAudio(dua)}
                          className={`p-2.5 rounded-full transition-all border ${
                            isPlaying
                              ? "bg-primary text-white border-primary shadow-sm"
                              : "bg-[#FAF7F2] text-zinc-400 border-transparent hover:bg-primary hover:text-white"
                          }`}
                          title={isPlaying ? "Mute" : "Listen to audio"}
                        >
                          {isPlaying ? <FaVolumeMute size={12} /> : <FaVolumeUp size={12} />}
                        </button>

                        {/* Middle Action: Bookmark/Favorite */}
                        <button
                          onClick={() => toggleFavorite(dua.id)}
                          className={`p-2.5 rounded-full transition-all border ${
                            isFav
                              ? "bg-secondary/10 text-secondary border-secondary/20"
                              : "bg-[#FAF7F2] text-zinc-400 border-transparent hover:bg-secondary/10 hover:text-secondary"
                          }`}
                          title={isFav ? "Remove from Favorites" : "Add to Favorites"}
                        >
                          {isFav ? <FaHeart size={12} /> : <FaRegHeart size={12} />}
                        </button>

                        {/* Right: Share Button */}
                        <button
                          onClick={() => shareDua(dua)}
                          className="p-2.5 rounded-full bg-[#FAF7F2] text-zinc-400 hover:bg-[#FAF7F2] hover:text-primary transition-all border border-transparent relative"
                          title="Copy to share"
                        >
                          {isCopied ? <FaCheck size={12} className="text-green-600" /> : <FaShareAlt size={12} />}
                          
                          {/* Tooltip confirmation */}
                          {isCopied && (
                            <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-zinc-800 text-white text-[9px] px-2 py-0.5 rounded shadow font-bold">
                              Copied!
                            </span>
                          )}
                        </button>
                      </div>
                    </motion.article>
                  );
                })}
              </AnimatePresence>
            </div>

            {/* Empty view state */}
            {filteredDuas.length === 0 && (
              <div className="bg-white rounded-[2rem] border border-[#EBE3D5] p-12 text-center font-body space-y-3">
                <p className="text-lg font-bold text-primary">No Duas Match Your Search</p>
                <p className="text-xs text-zinc-400 max-w-sm mx-auto">
                  Try adjusting your keywords, selecting a different category, or resetting your favorites filter.
                </p>
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCategory("All");
                    setShowOnlyFavorites(false);
                  }}
                  className="px-6 py-2.5 bg-primary text-white rounded-xl text-xs font-semibold hover:bg-primaryHover transition-all cursor-pointer shadow"
                >
                  Reset All Filters
                </button>
              </div>
            )}

          </main>
        </div>

        {/* ── BOTTOM CARDS SECTION ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 font-body">
          {/* Card 1: Habit */}
          <div className="bg-linear-to-br from-white to-[#FAF7F2] border border-[#EBE3D5] rounded-[2.5rem] p-8 sm:p-10 shadow-sm flex flex-col sm:flex-row justify-between items-center gap-6 relative overflow-hidden group" style={{ background: "linear-gradient(135deg, #FFFFFF, #FAF7F2)" }}>
            <div className="space-y-4 max-w-sm text-center sm:text-left z-10">
              <span className="inline-block bg-[#0A3A2F]/10 text-primary px-3 py-1 rounded-full text-[9px] font-bold tracking-widest uppercase">
                Explore Daily
              </span>
              <h3 className="font-heading text-xl sm:text-2xl font-bold text-primary">
                Make Dua a Daily Habit
              </h3>
              <p className="text-xs text-zinc-500 leading-relaxed">
                Regular duas bring peace to the heart and draw you closer to Allah. Explore the compiled daily supplications.
              </p>
              <button
                onClick={() => {
                  const randomCategory = DUA_CATEGORIES[Math.floor(Math.random() * (DUA_CATEGORIES.length - 1)) + 1];
                  setSelectedCategory(randomCategory);
                  setShowOnlyFavorites(false);
                  window.scrollTo({ top: 500, behavior: "smooth" });
                }}
                className="inline-flex items-center gap-2 text-xs font-bold text-primary hover:text-secondary transition-colors"
              >
                Explore Daily Duas <span>&rarr;</span>
              </button>
            </div>
            {/* SVG Lamp illustration */}
            <div className="w-24 h-24 shrink-0 opacity-80 group-hover:scale-105 transition-transform duration-300">
              <svg viewBox="0 0 100 100" fill="none" className="w-full h-full text-secondary" stroke="currentColor">
                <path d="M50 10V25M30 45C30 30 70 30 70 45C70 55 58 60 58 70H42C42 60 30 55 30 45Z" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M40 70V80H60V70H40Z" fill="currentColor"/>
                <path d="M45 80L35 90H65L55 80" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="50" cy="45" r="5" fill="currentColor"/>
              </svg>
            </div>
          </div>

          {/* Card 2: Collection */}
          <div className="bg-linear-to-br from-white to-[#FAF7F2] border border-[#EBE3D5] rounded-[2.5rem] p-8 sm:p-10 shadow-sm flex flex-col sm:flex-row justify-between items-center gap-6 relative overflow-hidden group" style={{ background: "linear-gradient(135deg, #FFFFFF, #FAF7F2)" }}>
            <div className="space-y-4 max-w-sm text-center sm:text-left z-10">
              <span className="inline-block bg-[#D48C46]/10 text-secondary px-3 py-1 rounded-full text-[9px] font-bold tracking-widest uppercase">
                Personal Saved
              </span>
              <h3 className="font-heading text-xl sm:text-2xl font-bold text-primary">
                Create Your Collection
              </h3>
              <p className="text-xs text-zinc-500 leading-relaxed">
                Save your favorite duas locally on your device to access and recite them quickly at any time.
              </p>
              <button
                onClick={() => {
                  setShowOnlyFavorites(true);
                  setSelectedCategory("All");
                  window.scrollTo({ top: 500, behavior: "smooth" });
                }}
                className="inline-flex items-center gap-2 text-xs font-bold text-primary hover:text-secondary transition-colors"
              >
                Sign in to Save (View Saved) <span>&rarr;</span>
              </button>
            </div>
            {/* Bookmark SVG */}
            <div className="w-24 h-24 shrink-0 opacity-80 group-hover:scale-105 transition-transform duration-300">
              <svg viewBox="0 0 100 100" fill="none" className="w-full h-full text-secondary" stroke="currentColor">
                <path d="M30 15H70C72.7614 15 75 17.2386 75 20V85L50 68L25 85V20C25 17.2386 27.2386 15 30 15Z" strokeWidth="2.5" strokeLinejoin="round" fill="currentColor" opacity="0.15"/>
                <path d="M30 15H70C72.7614 15 75 17.2386 75 20V85L50 68L25 85V20C25 17.2386 27.2386 15 30 15Z" strokeWidth="2.5" strokeLinejoin="round"/>
                <circle cx="50" cy="40" r="6" strokeWidth="2"/>
                <path d="M50 34V46M44 40H56" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
