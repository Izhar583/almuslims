"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { HiSortAscending, HiSortDescending, HiSearch } from "react-icons/hi";
import { getSurahSlug } from "@/lib/quran";

interface Surah {
  number: number;
  name: string;
  englishName: string;
  numberOfAyahs: number;
  revelationType: string;
}

export default function QuranPage() {
  const [surahs, setSurahs] = useState<Surah[]>([]);
  const [order, setOrder] = useState<"asc" | "desc">("asc");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://api.alquran.cloud/v1/surah")
      .then((res) => res.json())
      .then((data) => {
        setSurahs(data.data);
        setLoading(false);
      })
      .catch((err) => console.error(err));
  }, []);

  const filteredSurahs = surahs.filter(s =>
    s.englishName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.number.toString() === searchQuery
  );

  const sortedSurahs = [...filteredSurahs].sort((a, b) =>
    order === "asc" ? a.number - b.number : b.number - a.number
  );

  const revelationLabel = (type: string) =>
    type === "Meccan" ? "Makki" : type === "Medinan" ? "Madani" : type;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FDFCF9] py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">

        {/* Header Section */}
        <div className="mb-10 text-center">
          <h1 className="font-heading text-4xl font-bold text-gray-900 mb-2">The Holy Qur&apos;an</h1>
          <p className="text-gray-500 max-w-lg mx-auto">Read and explore the 114 Surahs of the Holy Qur&apos;an with authentic Arabic text and English meanings.</p>
        </div>

        {/* Controls Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">

          {/* Search Bar */}
          <div className="relative w-full md:w-96 group">
            <HiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors text-xl" />
            <input
              type="text"
              placeholder="Search Surah by name or number..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
            />
          </div>

          {/* Sort Switcher */}
          <div className="flex items-center p-1 bg-white border border-gray-200 rounded-2xl shadow-sm">
            <button
              onClick={() => setOrder("asc")}
              className={`flex items-center gap-2 px-6 py-2 rounded-xl text-sm font-semibold transition-all ${order === "asc"
                  ? "bg-primary text-white shadow-md shadow-primary/20"
                  : "text-gray-500 hover:text-gray-900"
                }`}
            >
              <HiSortAscending className="text-lg" />
              1 → 114
            </button>
            <button
              onClick={() => setOrder("desc")}
              className={`flex items-center gap-2 px-6 py-2 rounded-xl text-sm font-semibold transition-all ${order === "desc"
                  ? "bg-primary text-white shadow-md shadow-primary/20"
                  : "text-gray-500 hover:text-gray-900"
                }`}
            >
              <HiSortDescending className="text-lg" />
              114 → 1
            </button>
          </div>
        </div>

        {/* Grid List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedSurahs.map((surah) => (
            <Link href={`/holy-quran/${getSurahSlug(surah.number)}`} key={surah.number}>
              <div className="group relative bg-white p-6 rounded-3xl border border-gray-100 shadow-sm transition-all duration-300 overflow-hidden">
                {/* Background Decor */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-bl-full -mr-10 -mt-10 transition-all group-hover:scale-150 group-hover:bg-primary/10"></div>

                <div className="relative z-10 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    {/* Number Circle */}
                    <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary font-bold text-lg group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                      {surah.number}
                    </div>
                    <div>
                      <h2 className="font-bold text-gray-900 text-lg leading-tight group-hover:text-primary transition-colors">
                        {surah.englishName}
                      </h2>
                      <p className="text-xs text-gray-400 font-medium uppercase tracking-wider mt-1">
                        {surah.numberOfAyahs} Ayats • {revelationLabel(surah.revelationType)}
                      </p>
                    </div>
                  </div>

                  {/* Arabic Name */}
                  <div className="text-right">
                    <p className="font-arabic text-2xl text-gray-800 leading-none mb-1">
                      {surah.name}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Not Found */}
        {sortedSurahs.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-400 text-lg">No Surah found matching your search.</p>
          </div>
        )}

      </div>
    </div>
  );
}
