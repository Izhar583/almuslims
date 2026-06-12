"use client";

import { useState, useMemo } from "react";
import { DUAS, DUA_CATEGORIES } from "@/data/duas";

export default function DuasPageClient() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<string>("All");

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();
    return DUAS.filter((d) => {
      const matchCat = category === "All" || d.category === category;
      const matchSearch =
        !term ||
        d.translation.toLowerCase().includes(term) ||
        d.transliteration.toLowerCase().includes(term) ||
        d.category.toLowerCase().includes(term) ||
        d.reference.toLowerCase().includes(term);
      return matchCat && matchSearch;
    });
  }, [search, category]);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-10">
        <p className="text-secondary text-xs font-bold tracking-[0.25em] uppercase mb-3">
          Supplications
        </p>
        <h1 className="font-heading text-4xl sm:text-5xl font-bold text-primary mb-3">
          Duas &amp; Azkar
        </h1>
        <p className="text-gray-500 max-w-xl mx-auto text-sm">
          Authentic duas from the Quran and Sunnah for every moment of your day.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mb-8">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search duas…"
          className="flex-1 px-4 py-3 rounded-xl border border-primary/10 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="px-4 py-3 rounded-xl border border-primary/10 bg-white text-sm focus:outline-none"
        >
          <option value="All">All Categories</option>
          {DUA_CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-6">
        {filtered.map((dua) => (
          <article
            key={dua.id}
            className="p-6 sm:p-8 bg-white rounded-2xl border border-[#EBE3D5] shadow-sm"
          >
            <span className="inline-block bg-secondary/10 text-secondary px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase mb-4">
              {dua.category}
            </span>
            <p
              dir="rtl"
              className="text-2xl sm:text-3xl font-bold text-center text-primary mb-4 font-arabic leading-relaxed"
            >
              {dua.text}
            </p>
            <p className="text-xs italic text-gray-400 text-center mb-2">
              {dua.transliteration}
            </p>
            <p className="text-sm text-gray-600 text-center leading-relaxed mb-4">
              {dua.translation}
            </p>
            <p className="text-[10px] font-bold text-secondary tracking-wider uppercase text-center">
              {dua.reference}
            </p>
          </article>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-center text-gray-400 py-12">No duas match your search.</p>
      )}
    </div>
  );
}
