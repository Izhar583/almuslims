"use client";

import React, { useState, useEffect } from "react";

const NAMES = [
  { ar: "عَلِيّ",     en: "ALI",      meaning: "Noble, Exalted",       def: "Associated with Ali ibn Abi Talib, the fourth Caliph and cousin of the Prophet ﷺ." },
  { ar: "أَمِير",    en: "AMIR",     meaning: "Commander, Prince",     def: "A title of leadership; one entrusted with authority and dignity." },
  { ar: "حَمْزَة",   en: "HAMZA",    meaning: "Strong, Steadfast",     def: "Named after the brave uncle of the Prophet ﷺ, lion of Allah." },
  { ar: "حَسَن",     en: "HASSAN",   meaning: "Handsome, Virtuous",    def: "Grandson of the Prophet ﷺ; embodies beauty and goodness." },
  { ar: "إِدْرِيس",  en: "IDRIS",    meaning: "Interpreter, Learner",  def: "A Prophet mentioned in the Quran, known for his wisdom and devotion." },
  { ar: "كَرِيم",    en: "KAREEM",   meaning: "Generous, Noble",       def: "One of the beautiful names of Allah, signifying boundless generosity." },
  { ar: "مَالِك",    en: "MALIK",    meaning: "King, Sovereign",       def: "A divine attribute; the ultimate sovereignty belongs to Allah alone." },
  { ar: "مُحَمَّد",  en: "MUHAMMAD", meaning: "Praised, Commended",    def: "The most honored name; the Seal of the Prophets ﷺ, praised in every era." },
  { ar: "نَاصِر",    en: "NASIR",    meaning: "Helper, Supporter",     def: "One who stands firm in aid of others; a protector and loyal ally." },
  { ar: "عُمَر",     en: "OMAR",     meaning: "Life, Flourishing",     def: "The second Caliph, renowned for his justice and strength of character." },
  { ar: "زَيْن",     en: "ZAYN",     meaning: "Beauty, Grace",         def: "Elegance of character and appearance; a name of timeless charm." },
  { ar: "أَحْمَد",   en: "AHMAD",    meaning: "Most Praiseworthy",     def: "A name of the Prophet ﷺ mentioned in the Quran, full of heavenly honor." },
  { ar: "عَزِيز",    en: "AZIZ",     meaning: "Powerful, Beloved",     def: "One of Allah's attributes — the Almighty, cherished and invincible." },
  { ar: "بِلَال",    en: "BILAL",    meaning: "Refreshing, Pure Water", def: "The beloved companion of the Prophet ﷺ; first caller to prayer in Islam." },
  { ar: "طَارِق",    en: "TARIQ",    meaning: "Morning Star",          def: "The star that shines before dawn; a name of brightness and guidance." },
  { ar: "هَادِي",    en: "HADI",     meaning: "Guide, Leader",         def: "One who leads others to truth and righteousness; a name of Allah." },
  { ar: "جِبْرِيل",  en: "JIBRIL",   meaning: "Strength of Allah",     def: "Archangel Gabriel, the trusted messenger who conveyed revelation." },
  { ar: "حَكِيم",    en: "HAKEEM",   meaning: "Wise, Judicious",       def: "One endowed with deep wisdom; a name of Allah the All-Wise." },
  { ar: "حُسَيْن",   en: "HUSSEIN",  meaning: "Beautiful, Good",       def: "Grandson of the Prophet ﷺ; his sacrifice at Karbala is eternal." },
  { ar: "جَمَال",    en: "JAMAL",    meaning: "Beauty, Perfection",    def: "Reflecting the divine attribute of beauty; grace in its purest form." },
];

function getDailyName() {
  const start = new Date(2025, 0, 1).getTime();
  const today = new Date(); today.setHours(0, 0, 0, 0);
  return NAMES[Math.floor((today.getTime() - start) / 86400000) % NAMES.length];
}

export default function WordOfTheDayCard() {
  const [wordData, setWordData] = useState<typeof NAMES[0] | null>(null);
  const [dateStr, setDateStr] = useState<string>("");

  // Client-only to avoid SSR hydration mismatch
  useEffect(() => {
    setWordData(getDailyName());
    setDateStr(new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }));
  }, []);

  if (!wordData) {
    return (
      <div className="h-full flex flex-col p-6 sm:p-8 rounded-[1.5rem] animate-pulse min-h-[300px]"
        style={{ background: "linear-gradient(160deg, #FFFDF9, #FDF8F0)", border: "1px solid #F0E8D5" }}>
        <div className="h-3 bg-[#042A1E]/10 rounded-full w-1/2 mx-auto mb-2" />
        <div className="flex-1 flex items-center justify-center">
          <div className="h-16 w-32 bg-[#042A1E]/5 rounded-2xl" />
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col p-6 sm:p-8 rounded-[1.5rem] font-body relative overflow-hidden"
      style={{ background: "linear-gradient(160deg, #FFFDF9 0%, #FDF8F0 100%)", border: "1px solid #F0E8D5" }}>

      {/* Gold accent top line */}
      <div className="absolute top-0 left-8 right-8 h-0.5 rounded-full"
        style={{ background: "linear-gradient(90deg, transparent, #C8A96E, transparent)" }} />

      {/* Watermark */}
      <div className="absolute bottom-12 right-4 text-[80px] font-serif text-[#042A1E]/[0.03] pointer-events-none select-none leading-none">
        ٩٩
      </div>

      {/* Header */}
      <div className="text-center mb-5 relative z-10">
        <p className="text-[10px] font-bold text-[#042A1E]/40 tracking-[0.2em] uppercase mb-1">Word of the Day</p>
        <p className="text-[9px] text-[#C8A96E] font-semibold tracking-wide">{dateStr}</p>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center relative z-10 text-center">
        {/* Arabic Word */}
        <div className="relative mb-2">
          <div className="absolute inset-0 rounded-full blur-2xl opacity-20"
            style={{ background: "radial-gradient(circle, #C8A96E, transparent)" }} />
          <p className="relative text-6xl sm:text-7xl font-bold text-[#042A1E] leading-none"
            style={{ fontFamily: "'Amiri', 'Traditional Arabic', serif" }}>
            {wordData.ar}
          </p>
        </div>

        {/* English name */}
        <p className="text-xs font-black text-[#042A1E]/50 tracking-[0.25em] uppercase mb-1 mt-4">
          {wordData.en}
        </p>

        {/* Meaning badge */}
        <span className="inline-block text-[9px] font-bold text-[#C8A96E] border border-[#C8A96E]/30 px-3 py-1 rounded-full bg-[#C8A96E]/5 tracking-wider mb-4">
          {wordData.meaning}
        </span>

        {/* Divider */}
        <div className="w-10 h-px bg-[#042A1E]/10 mb-4" />

        {/* Definition */}
        <p className="text-xs text-[#042A1E]/55 leading-relaxed px-1 line-clamp-3">
          {wordData.def}
        </p>
      </div>

      {/* Footer */}
      <a href="/names"
        className="relative z-10 mt-6 w-full py-3.5 text-center text-sm font-semibold text-[#042A1E]/70 rounded-full transition-all duration-300 block hover:text-white"
        style={{ border: "1px solid rgba(4,42,30,0.12)" }}
        onMouseEnter={e => (e.currentTarget.style.background = "#042A1E")}
        onMouseLeave={e => (e.currentTarget.style.background = "transparent")}>
        Explore 99 Names
      </a>
    </div>
  );
}