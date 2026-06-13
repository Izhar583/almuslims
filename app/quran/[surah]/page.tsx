'use client';
import { use, useEffect, useState } from 'react';
import Link from 'next/link';

interface Ayah {
  number: number;
  numberInSurah: number;
  text: string;
}

interface Edition {
  englishName: string;
  englishNameTranslation: string;
  numberOfAyahs: number;
  ayahs: Ayah[];
}

// ✅ Next.js 14+ mein params Promise hota hai — use() se unwrap karo
export default function SurahDetail({ params }: { params: Promise<{ surah: string }> }) {
  const { surah: surahId } = use(params);

  const [data, setData] = useState<Edition[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!surahId) return;

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const url = `https://api.alquran.cloud/v1/surah/${surahId}/editions/quran-uthmani,en.asad,ur.jalandhry`;
        const res = await fetch(url);

        if (!res.ok) throw new Error(`API error: ${res.status} ${res.statusText}`);

        const json = await res.json();

        if (json.code !== 200 || !json.data) {
          throw new Error(json.status || 'Invalid response from Quran API');
        }

        setData(json.data);
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Something went wrong';
        console.error('Surah fetch error:', err);
        setError(message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [surahId]);

  // ── Loading ──────────────────────────────────────────────
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <div className="w-10 h-10 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin" />
        <p className="text-gray-500 text-sm">Loading Surah {surahId}…</p>
      </div>
    );
  }

  // ── Error ────────────────────────────────────────────────
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-3 p-6 text-center">
        <p className="text-red-500 font-semibold text-lg">Failed to load surah</p>
        <p className="text-gray-400 text-sm">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-2 px-4 py-2 bg-emerald-600 text-white rounded-lg text-sm hover:bg-emerald-700 transition-colors"
        >
          Try again
        </button>
      </div>
    );
  }

  if (!data) return null;

  const [arabic, english, urdu] = data;

  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      <Link
        href="/quran"
        className="inline-flex items-center gap-2 text-primary/60 hover:text-primary text-sm mb-8 transition-colors"
      >
        &larr; All Surahs
      </Link>

      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold mb-1">{arabic.englishName}</h1>
        <p className="text-gray-500 text-sm">{arabic.englishNameTranslation} · {arabic.numberOfAyahs} Ayahs</p>
      </div>

      {/* Bismillah (skip for Surah 9 — Al-Tawbah) */}
      {surahId !== '9' && (
        <p className="text-center text-3xl font-arabic mb-10 text-emerald-700">
          بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
        </p>
      )}

      {/* Ayahs */}
      {arabic.ayahs.map((ayah, index) => (
        <div key={ayah.number} className="border-b border-gray-100 pb-6 mb-6 last:border-0">
          {/* Ayah number badge */}
          <div className="flex justify-between items-center mb-3">
            <span className="text-xs text-gray-400 font-mono">
              {arabic.englishName} • {ayah.numberInSurah}
            </span>
            <span className="w-7 h-7 flex items-center justify-center rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200">
              {ayah.numberInSurah}
            </span>
          </div>

          {/* Arabic */}
          <p className="text-right text-3xl leading-loose mb-4 font-arabic">
            {ayah.text}
          </p>

          {/* English */}
          {english?.ayahs[index]?.text && (
            <p className="text-emerald-800 font-medium text-sm leading-relaxed">
              {english.ayahs[index].text}
            </p>
          )}

          {/* Urdu */}
          {urdu?.ayahs[index]?.text && (
            <p className="text-gray-500 text-lg mt-2 text-right leading-relaxed font-urdu" dir="rtl">
              {urdu.ayahs[index].text}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}
