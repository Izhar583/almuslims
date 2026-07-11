"use client";

import { useState, useEffect, useMemo } from "react";

interface NameOfAllah {
  number: number;
  name: string;
  transliteration: string;
  en: { meaning: string };
}

export default function NamesPageClient() {
  const [names, setNames] = useState<NameOfAllah[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<NameOfAllah | null>(null);

  useEffect(() => {
    fetch("https://api.aladhan.com/v1/asmaAlHusna")
      .then((r) => r.json())
      .then((d) => {
        setNames(d.data || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return names;
    return names.filter(
      (n) =>
        n.transliteration.toLowerCase().includes(term) ||
        n.en.meaning.toLowerCase().includes(term) ||
        n.name.includes(term) ||
        String(n.number).includes(term)
    );
  }, [names, search]);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-10">
        <p className="text-secondary text-xs font-bold tracking-[0.25em] uppercase mb-3">
          Asma ul Husna
        </p>
        <h1 className="font-heading text-4xl sm:text-5xl font-bold text-primary mb-3">
          99 Names of Allah
        </h1>
        <p className="text-gray-500 max-w-xl mx-auto text-sm">
          The Beautiful Names of Allah — sourced from AlAdhan API, based on authentic Islamic tradition.
        </p>
      </div>

      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search by name or meaning…"
        className="w-full px-4 py-3 rounded-xl border border-primary/10 bg-white text-sm mb-8 focus:outline-none focus:ring-2 focus:ring-primary/20"
      />

      {selected && (
        <div
          className="mb-8 p-8 rounded-2xl text-center text-white"
          style={{ background: "linear-gradient(135deg, #0A3A2F, #145047)" }}
        >
          <p className="text-xs text-white/50 mb-2">#{selected.number}</p>
          <p className="text-5xl font-arabic mb-3" dir="rtl">
            {selected.name}
          </p>
          <p className="text-secondary font-bold tracking-widest uppercase text-sm mb-2">
            {selected.transliteration}
          </p>
          <p className="text-white/80 text-lg">{selected.en.meaning}</p>
          <button
            onClick={() => setSelected(null)}
            className="mt-4 text-xs text-white/50 hover:text-white transition-colors"
          >
            Close
          </button>
        </div>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {filtered.map((n) => (
          <button
            key={n.number}
            onClick={() => setSelected(n)}
            className="p-4 bg-white rounded-xl border border-primary/5 hover:border-primary/20 transition-all text-left group"
          >
            <span className="text-[10px] text-gray-400 font-mono">{n.number}</span>
            <p className="text-xl font-arabic text-primary my-1" dir="rtl">
              {n.name}
            </p>
            <p className="text-[10px] font-bold text-secondary uppercase tracking-wider truncate">
              {n.transliteration}
            </p>
            <p className="text-xs text-gray-500 mt-1 truncate group-hover:text-gray-700">
              {n.en.meaning}
            </p>
          </button>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-center text-gray-400 py-12">No names match your search.</p>
      )}
    </div>
  );
}
