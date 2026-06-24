"use client";

import React, { useState } from "react";
import { getDailyDua } from "@/data/duas";

export default function DuaCard() {
  const dua = getDailyDua();
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayAudio = () => {
    if (isPlaying) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
      return;
    }
    window.speechSynthesis.cancel();
    const voices = window.speechSynthesis.getVoices();

    const arabicSpeech = new SpeechSynthesisUtterance(dua.text);
    arabicSpeech.voice = voices.find(v => v.lang.includes("ar")) || voices[0];
    arabicSpeech.lang = "ar-SA";
    arabicSpeech.rate = 0.7;

    const englishSpeech = new SpeechSynthesisUtterance(dua.translation);
    englishSpeech.voice = voices.find(v => v.lang.includes("en")) || voices[0];
    englishSpeech.lang = "en-US";
    englishSpeech.rate = 0.9;

    arabicSpeech.onend = () => setTimeout(() => window.speechSynthesis.speak(englishSpeech), 500);
    englishSpeech.onend = () => setIsPlaying(false);

    setIsPlaying(true);
    window.speechSynthesis.speak(arabicSpeech);
  };

  return (
    <div className="h-full flex flex-col p-6 sm:p-8 bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-[#EBE3D5] font-body relative overflow-hidden group">
      
      <div className="flex items-start justify-between mb-6 relative z-10">
        <div>
          <p className="text-[12px] font-bold text-[#1F2926]/ tracking-[0.2em] uppercase mb-2">
            Dua of the Day
          </p>
          <div className="inline-flex items-center">
            <span className="bg-[#D48C46]/10 text-[#D48C46] px-3 py-1 rounded-full text-[9px] font-bold tracking-widest uppercase">
              {dua.category}
            </span>
          </div>
        </div>

        <button
          onClick={handlePlayAudio}
          title={isPlaying ? "Stop" : "Listen to Dua"}
          className={`flex items-center justify-center w-10 h-10 min-w-[40px] min-h-[40px] rounded-full transition-all duration-300 border ${
            isPlaying
              ? "bg-[#0A3A2F] text-white border-[#0A3A2F] shadow-md scale-95"
              : "bg-[#F5F2EB] text-[#1F2926]/50 border-transparent hover:bg-[#0A3A2F] hover:text-white hover:border-[#0A3A2F]"
          }`}
        >
          {isPlaying ? (
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
              <rect x="6" y="6" width="12" height="12" rx="2" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 ml-0.5">
              <path d="M13.5 4.06c0-1.336-1.616-2.005-2.56-1.06l-4.5 4.5H4.508c-1.141 0-2.318.664-2.66 1.905A9.76 9.76 0 001.5 12c0 .898.121 1.768.35 2.595.341 1.24 1.518 1.905 2.659 1.905h1.93l4.5 4.5c.945.945 2.561.276 2.561-1.06V4.06zM18.584 5.106a.75.75 0 011.06 0c3.808 3.807 3.808 9.98 0 13.788a.75.75 0 11-1.06-1.06 8.25 8.25 0 000-11.668.75.75 0 010-1.06z" />
              <path d="M15.932 7.757a.75.75 0 011.061 0 6 6 0 010 8.486.75.75 0 01-1.06-1.061 4.5 4.5 0 000-6.364.75.75 0 010-1.06z" />
            </svg>
          )}
        </button>
      </div>
      <div className="flex-1 flex flex-col justify-center relative z-10">
        <p
          dir="rtl"
          className="text-[1.75rem] sm:text-3xl font-bold text-center leading-relaxed text-[#1F2926] mb-6"
          style={{ fontFamily: "'Amiri', 'Traditional Arabic', serif" }}
        >
          {dua.text}
        </p>

        <div className="bg-[#FAF7F2] p-5 rounded-2xl border border-[#EBE3D5] space-y-3">
          <p className="text-[12px] font-bold text-[#D48C46] tracking-[0.15em] uppercase text-center">
            {dua.reference}
          </p>
          <p className="text-[12px] italic text-[#1F2926]/90 text-center leading-relaxed">
             {dua.transliteration}
          </p>
          <div className="h-px w-12 bg-[#EBE3D5] mx-auto" />
          <p className="text-sm text-[#1F2926]/70 text-center leading-relaxed font-medium">
            {dua.translation}
          </p>
        </div>
      </div>

      <a
        href="/duas"
        className="relative z-10 mt-6 w-full py-3.5 bg-white border border-[#EBE3D5] text-[#1F2926] font-bold text-[11px] tracking-widest uppercase rounded-full hover:bg-[#0A3A2F] hover:text-white hover:border-[#0A3A2F] transition-all duration-300 text-center block shadow-sm"
      >
        View All Duas
      </a>
    </div>
  );
}