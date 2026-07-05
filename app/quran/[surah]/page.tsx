
'use client';

import { use, useEffect, useState } from 'react';
import Link from 'next/link';
import { HiArrowLeft, HiChevronLeft, HiChevronRight, HiCollection, HiBookOpen } from "react-icons/hi";

interface Ayah {
  number: number;
  numberInSurah: number;
  text: string;
}

interface Edition {
  englishName: string;
  englishNameTranslation: string;
  numberOfAyahs: number;
  revelationType: string;
  ayahs: Ayah[];
}

interface SurahMeta {
  number: number;
  englishName: string;
}

// Helper: convert englishName to URL slug
function toSlug(name: string) {
  return name.toLowerCase().replace(/\s+/g, '-');
}

export default function SurahDetail({ params }: { params: Promise<{ surah: string }> }) {
  const { surah: surahSlug } = use(params);
  const [data, setData] = useState<Edition[] | null>(null);
  const [allSurahs, setAllSurahs] = useState<SurahMeta[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'reading' | 'translation'>('translation');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Step 1: Get all surahs list to find number from name slug
        const listRes = await fetch('https://api.alquran.cloud/v1/surah');
        if (!listRes.ok) throw new Error(`API error: ${listRes.status}`);
        const listJson = await listRes.json();
        const surahs: SurahMeta[] = listJson.data;
        setAllSurahs(surahs);

        // Step 2: Find surah by matching slug
        const matched = surahs.find(s => toSlug(s.englishName) === surahSlug);
        if (!matched) throw new Error(`Surah "${surahSlug}" not found`);

        // Step 3: Fetch surah detail by number
        const url = `https://api.alquran.cloud/v1/surah/${matched.number}/editions/quran-uthmani,en.asad,ur.jalandhry`;
        const res = await fetch(url);
        if (!res.ok) throw new Error(`API error: ${res.status}`);
        const json = await res.json();
        if (json.code !== 200 || !json.data) throw new Error('Invalid response');
        setData(json.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Something went wrong');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [surahSlug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FDFCF9]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#FDFCF9] p-6 text-center">
        <p className="text-red-500 font-bold mb-4">Error: {error || 'Surah not found'}</p>
        <Link href="/quran" className="px-6 py-2 bg-primary text-white rounded-xl shadow-lg">Back to Quran</Link>
      </div>
    );
  }

  const [arabic, english, urdu] = data;
  const currentNum = arabic.ayahs[0]?.number
    ? allSurahs.find(s => toSlug(s.englishName) === surahSlug)?.number ?? 1
    : 1;

  const prevSurah = allSurahs.find(s => s.number === currentNum - 1);
  const nextSurah = allSurahs.find(s => s.number === currentNum + 1);

  return (
    <div className="min-h-screen bg-[#FDFCF9] pb-20">
      
      {/* Top Banner & Header */}
      <div className="bg-white border-b border-gray-100 pt-8 pb-10 shadow-sm relative overflow-hidden">
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-primary/5 to-transparent opacity-50"></div>
        
        <div className="max-w-5xl mx-auto px-4 relative z-10">
          <div className="flex items-center justify-between mb-8">
            <Link href="/quran" className="inline-flex items-center gap-2 text-gray-400 hover:text-primary transition-colors text-sm group">
              <HiArrowLeft className="group-hover:-translate-x-1 transition-transform" />
              All Surahs
            </Link>

            {/* View Switcher */}
            <div className="flex bg-gray-100 p-1 rounded-xl">
              <button 
                onClick={() => setViewMode('reading')}
                className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  viewMode === 'reading' ? "bg-white text-primary shadow-sm" : "text-gray-400 hover:text-gray-600"
                }`}
              >
                <HiBookOpen className="text-sm" />
                Reading Mode
              </button>
              <button 
                onClick={() => setViewMode('translation')}
                className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  viewMode === 'translation' ? "bg-white text-primary shadow-sm" : "text-gray-400 hover:text-gray-600"
                }`}
              >
                <HiCollection className="text-sm" />
                Translation Mode
              </button>
            </div>
          </div>

          <div className="flex flex-col items-center text-center">
            <h1 className="font-heading text-4xl sm:text-5xl font-bold text-gray-900 mb-2">
              {arabic.englishName}
            </h1>
            <div className="flex items-center gap-2 text-gray-500 text-sm font-medium">
              <span>{arabic.englishNameTranslation}</span>
              <span className="w-1 h-1 rounded-full bg-gray-300"></span>
              <span>{arabic.numberOfAyahs} Ayahs</span>
              <span className="w-1 h-1 rounded-full bg-gray-300"></span>
              <span className="uppercase tracking-wider">{arabic.revelationType}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-12">
        
        {/* Reading Mode (Continuous Text) */}
        {viewMode === 'reading' && (
          <div className="bg-white rounded-[40px] border border-gray-100 p-8 sm:p-16 shadow-lg shadow-primary/5 hover:shadow-primary/10 transition-shadow">
            {/* Bismillah */}
            {currentNum !== 9 && (
              <div className="text-center mb-16">
                <p className="font-arabic text-4xl sm:text-5xl text-primary leading-normal italic">
                  بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
                </p>
              </div>
            )}
            
            <div className="relative">
              <p className="font-arabic text-4xl sm:text-5xl lg:text-6xl text-right leading-[2.5] lg:leading-[3] text-gray-900 break-words" dir="rtl">
                {arabic.ayahs.map((ayah) => {
                  let text = ayah.text;
                  if (currentNum !== 1 && currentNum !== 9 && ayah.numberInSurah === 1) {
                    text = text.replace("بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ ", "");
                  }
                  return (
                    <span key={ayah.number} className="inline group cursor-pointer hover:bg-primary/5 rounded-lg transition-colors p-1">
                      {text}
                      <span className="inline-flex items-center justify-center w-10 h-10 mx-3 rounded-full border-2 border-primary/20 text-primary text-xl font-bold translate-y-1">
                        {ayah.numberInSurah}
                      </span>
                    </span>
                  );
                })}
              </p>
            </div>
          </div>
        )}

        {/* Translation Mode (Ayah by Ayah) */}
        {viewMode === 'translation' && (
          <div className="space-y-6">
             {/* Bismillah */}
             {currentNum !== 9 && (
              <div className="text-center mb-10 py-6">
                <p className="font-arabic text-4xl text-gray-900">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</p>
              </div>
            )}

            {arabic.ayahs.map((ayah, index) => {
              let ayahText = ayah.text;
              if (currentNum !== 1 && currentNum !== 9 && ayah.numberInSurah === 1) {
                ayahText = ayahText.replace("بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ ", "");
              }

              return (
                <div key={ayah.number} className="bg-white rounded-3xl border border-gray-100 p-6 sm:p-8 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-center mb-6">
                    <div className="w-8 h-8 rounded-lg bg-primary/5 flex items-center justify-center text-xs font-bold text-primary">
                      {ayah.numberInSurah}
                    </div>
                  </div>
                  <p className="font-arabic text-3xl sm:text-4xl text-right leading-[2.2] text-gray-900 mb-8" dir="rtl">{ayahText}</p>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-8 border-t border-gray-50">
                    <div className="border-l-2 border-primary/20 pl-6">
                      <p className="text-gray-700 text-sm sm:text-base leading-relaxed">{english?.ayahs[index]?.text}</p>
                      <p className="text-[10px] font-bold text-primary/40 uppercase mt-2 tracking-widest">ENGLISH • ASAD</p>
                    </div>
                    <div className="text-right border-r-2 border-secondary/20 pr-6" dir="rtl">
                      <p className="font-urdu text-lg sm:text-xl text-gray-600 leading-relaxed">{urdu?.ayahs[index]?.text}</p>
                      <p className="text-[10px] font-bold text-secondary/40 uppercase mt-2 tracking-widest">اردو • جالندھری</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="mt-20 flex items-center justify-between border-t border-gray-100 pt-10">
          {prevSurah ? (
            <Link href={`/quran/${toSlug(prevSurah.englishName)}`} className="flex items-center gap-2 text-gray-500 hover:text-primary transition-colors font-semibold group">
              <HiChevronLeft className="text-xl group-hover:-translate-x-1 transition-transform" />
              Previous Surah
            </Link>
          ) : <div />}

          {nextSurah && (
            <Link href={`/quran/${toSlug(nextSurah.englishName)}`} className="flex items-center gap-2 text-gray-500 hover:text-primary transition-colors font-semibold group">
              Next Surah
              <HiChevronRight className="text-xl group-hover:translate-x-1 transition-transform" />
            </Link>
          )}
        </div>
      </div>

    </div>
  );
}
