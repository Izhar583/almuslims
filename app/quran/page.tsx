"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

interface Surah {
  number: number;
  name: string;
  englishName: string;
  numberOfAyahs: number;
}

export default function QuranPage() {
  const [surahs, setSurahs] = useState<Surah[]>([]);
  const [order, setOrder] = useState<"asc" | "desc">("asc");
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

  const sortedSurahs = [...surahs].sort((a, b) => 
    order === "asc" ? a.number - b.number : b.number - a.number
  );

  if (loading) return <div className="p-10 text-center">Loading Quran...</div>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex gap-4 mb-6">
        <button onClick={() => setOrder("asc")} className="px-4 py-2 bg-emerald-600 text-white rounded">Ascending</button>
        <button onClick={() => setOrder("desc")} className="px-4 py-2 bg-emerald-600 text-white rounded">Descending</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {sortedSurahs.map((surah) => (
          <Link href={`/quran/${surah.number}`} key={surah.number}>
            <div className="p-4 border rounded-lg hover:bg-emerald-50 transition shadow-sm">
              <h2 className="font-bold text-lg">{surah.englishName}</h2>
              <p className="text-sm text-gray-500">{surah.name} • {surah.numberOfAyahs} Ayahs</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}