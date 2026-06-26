
"use client";

import React, { useState, useMemo, useRef, useEffect } from "react";
import Image from "next/image";
import {
  HiSearch, HiBookmark, HiHeart, HiVolumeUp,
  HiChevronRight, HiChevronDown,
  HiOutlineBookmark, HiOutlineHeart, HiOutlineVolumeUp
} from "react-icons/hi";
import { motion, AnimatePresence } from "framer-motion";
import {
  PiHandsPraying,
  PiClock,
  PiSun,
  PiMoonStars,
  PiBed,
  PiMosque,
  PiHeart
} from "react-icons/pi";
import { FaKaaba } from "react-icons/fa6";

const categoryStyles: Record<string, { inactiveBg: string; inactiveText: string }> = {
  all: { inactiveBg: "bg-emerald-50/70", inactiveText: "text-[#0A3A2F]" },
  daily: { inactiveBg: "bg-amber-50/70", inactiveText: "text-amber-600" },
  morning: { inactiveBg: "bg-orange-50/70", inactiveText: "text-orange-500" },
  evening: { inactiveBg: "bg-indigo-50/70", inactiveText: "text-indigo-500" },
  sleep: { inactiveBg: "bg-blue-50/70", inactiveText: "text-blue-600" },
  prayer: { inactiveBg: "bg-teal-50/70", inactiveText: "text-teal-600" },
  hajj: { inactiveBg: "bg-yellow-50/70", inactiveText: "text-[#D48C46]" },
  wellbeing: { inactiveBg: "bg-rose-50/70", inactiveText: "text-rose-500" },
};

const getCategoryIcon = (id: string, className = "w-5 h-5") => {
  switch (id) {
    case "all":
      return <PiHandsPraying className={className} />;
    case "daily":
      return <PiClock className={className} />;
    case "morning":
      return <PiSun className={className} />;
    case "evening":
      return <PiMoonStars className={className} />;
    case "sleep":
      return <PiBed className={className} />;
    case "prayer":
      return <PiMosque className={className} />;
    case "hajj":
      return <FaKaaba className={className} />;
    case "wellbeing":
      return <PiHeart className={className} />;
    default:
      return <PiHandsPraying className={className} />;
  }
};



interface Dua {
  id: number;
  category: string;
  title: string;
  arabic: string;
  transliteration: string;
  translation: string;
  reference: string;
}


const categories = [
  { id: "all", label: "All Duas" },
  { id: "daily", label: "Daily Duas" },
  { id: "morning", label: "Morning Duas" },
  { id: "evening", label: "Evening Duas" },
  { id: "sleep", label: "Before Sleep" },
  { id: "prayer", label: "After Salah" },
  { id: "hajj", label: "Hajj & Umrah" },
  { id: "wellbeing", label: "Wellbeing" },
];

const allDuas: Dua[] = [
  {
    id: 1,
    category: "wellbeing",
    title: "Dua for Guidance",
    arabic: "رَبِّ اهْدِنِي",
    transliteration: "Rabbi ihdinee",
    translation: "My Lord, guide me.",
    reference: "Qur'an 1:6",
  },
  {
    id: 2,
    category: "daily",
    title: "Dua for Forgiveness",
    arabic: "أَسْتَغْفِرُ اللَّهَ",
    transliteration: "Astaghfirullah",
    translation: "I seek forgiveness from Allah.",
    reference: "Sahih Bukhari 6306",
  },
  {
    id: 3,
    category: "wellbeing",
    title: "Dua for Ease",
    arabic: "رَبِّ اشْرَحْ لِي صَدْرِي وَيَسِّرْ لِي أَمْرِي",
    transliteration: "Rabbi sharh li sadri wa yassir li amri",
    translation: "My Lord, expand for me my chest and ease for me my task.",
    reference: "Qur'an 20:25-26",
  },
  {
    id: 4,
    category: "daily",
    title: "Dua for Protection",
    arabic: "أَعُوذُ بِكَلِمَاتِ اللَّهِ التَّامَّاتِ مِنْ شَرِّ مَا خَلَقَ",
    transliteration: "A'udhu bikalimatillahit-tammati min sharri ma khalaq",
    translation: "I seek protection in the perfect words of Allah from the evil of what He has created.",
    reference: "Sahih Muslim 2708",
  },
  {
    id: 5,
    category: "wellbeing",
    title: "Dua for Patience",
    arabic: "رَبَّنَا أَفْرِغْ عَلَيْنَا صَبْرًا وَتَوَفَّنَا مُسْلِمِينَ",
    transliteration: "Rabbana afrigh 'alayna sabran wa tawaffana muslimeen",
    translation: "Our Lord, pour upon us patience and let us die as Muslims.",
    reference: "Qur'an 7:126",
  },
  {
    id: 6,
    category: "wellbeing",
    title: "Dua for Parents",
    arabic: "رَّبِّ ارْحَمْهُمَا كَمَا رَبَّيَانِي صَغِيرًا",
    transliteration: "Rabbi irhamhuma kama rabbayanee sagheera",
    translation: "My Lord, have mercy upon them as they brought me up [when I was] small.",
    reference: "Qur'an 17:24",
  },
  {
    id: 7,
    category: "daily",
    title: "Dua for Rizq (Provision)",
    arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ عِلْمًا نَافِعًا وَرِزْقًا طَيِّبًا",
    transliteration: "Allahumma inni as'aluka 'ilman nafi'an wa rizqan tayyiban",
    translation: "O Allah, I ask You for knowledge that is of benefit and a good provision.",
    reference: "Sunan Ibn Majah",
  },
  {
    id: 8,
    category: "wellbeing",
    title: "Dua for Strength",
    arabic: "حَسْبِيَ اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ ۖ عَلَيْهِ تَوَكَّلْتُ",
    transliteration: "Hasbiyallahu la ilaha illa huwa 'alayhi tawakkaltu",
    translation: "Sufficient for me is Allah; there is no deity except Him. I trust in Him.",
    reference: "Qur'an 9:129",
  },
  {
    id: 9,
    category: "daily",
    title: "Dua for Gratitude",
    arabic: "رَبِّ أَوْزِعْنِي أَنْ أَشْكُرَ نِعْمَتَكَ",
    transliteration: "Rabbi awzi'nee an ashkura ni'matak",
    translation: "My Lord, enable me to be grateful for Your favor.",
    reference: "Qur'an 27:19",
  },
  {
    id: 10,
    category: "morning",
    title: "Morning Remembrance",
    arabic: "أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ",
    transliteration: "Asbahna wa-asbahal-mulku lillah",
    translation: "We have reached the morning, and the dominion belongs to Allah.",
    reference: "Sahih Muslim",
  },
  {
    id: 11,
    category: "sleep",
    title: "Dua Before Sleeping",
    arabic: "بِاسْمِكَ رَبِّي وَضَعْتُ جَنْبِي",
    transliteration: "Bismika Rabbi wada'tu janbi",
    translation: "In Your name, my Lord, I lay down my side.",
    reference: "Sahih Bukhari",
  },
  {
    id: 12,
    category: "prayer",
    title: "Dua After Salah",
    arabic: "اللَّهُمَّ أَعِنِّي عَلَىٰ ذِكْرِكَ وَشُكْرِكَ وَحُسْنِ عِبَادَتِكَ",
    transliteration: "Allahumma a'inni 'ala dhikrika wa shukrika wa husni 'ibadatik",
    translation: "O Allah, help me to remember You, give thanks to You, and worship You well.",
    reference: "Abu Dawud",
  },
  {
    id: 13,
    category: "wellbeing",
    title: "Dua for Anxiety",
    arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْهَمِّ وَالْحُزْنِ",
    transliteration: "Allahumma inni a'udhu bika minal-hammi wal-huzn",
    translation: "O Allah, I seek refuge in You from anxiety and sorrow.",
    reference: "Sahih Bukhari",
  },
  {
    id: 14,
    category: "hajj",
    title: "Dua for Safar (Travel)",
    arabic: "سُبْحَانَ الَّذِي سَخَّرَ لَنَا هَٰذَا",
    transliteration: "Subhanalladhi sakhara lana hadha",
    translation: "Exalted is He who has subjected this to us.",
    reference: "Qur'an 43:13",
  },
];

// ─── Components ─────────────────────────────────────────────────────────────

export default function DuasPageClient() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("Most Popular");
  const [isSortOpen, setIsSortOpen] = useState(false);
  const sortRef = useRef<HTMLDivElement>(null);

  const [bookmarked, setBookmarked] = useState<number[]>([]);
  const [liked, setLiked] = useState<number[]>([]);

  const sortOptions = ["Most Popular", "Recently Added", "Alphabetic"];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sortRef.current && !sortRef.current.contains(event.target as Node)) {
        setIsSortOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredDuas = useMemo(() => {
    return allDuas.filter((dua) => {
      const matchCategory = activeCategory === "all" || dua.category === activeCategory;
      const matchSearch = dua.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        dua.arabic.includes(searchQuery) ||
        dua.translation.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCategory && matchSearch;
    });
  }, [activeCategory, searchQuery]);

  const toggleBookmark = (id: number) => {
    setBookmarked(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const toggleLike = (id: number) => {
    setLiked(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const getCount = (catId: string) => {
    if (catId === "all") return allDuas.length;
    return allDuas.filter(d => d.category === catId).length;
  };

  return (
    <div className="min-h-screen bg-[#FBFAF7] pb-20 pt-8">
      <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8">

        {/* Hero Section */}
        <section className="relative rounded-3xl overflow-hidden bg-[#0A3A2F] mb-10 h-[250px] sm:h-[350px]">
          <Image
            src="https://images.unsplash.com/photo-1674508304566-f67ee711750a?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Dua Collection"
            fill
            className="object-cover opacity-20"
          />
          <div className="absolute inset-0 flex items-center px-10 sm:px-20">
            <div className="max-w-2xl z-10 text-white">
              <h1 className="font-heading text-4xl sm:text-6xl font-bold mb-4">Dua Collection</h1>
              <p className="text-white/70 text-base sm:text-xl leading-relaxed max-w-lg">
                Authentic supplications from the Quran and Sunnah.
              </p>
            </div>
          </div>
        </section>

        <div className="grid grid-cols-12 gap-6 lg:gap-10">

          {/* Sidebar */}
          <aside className="col-span-12 lg:col-span-3 lg:sticky lg:top-24 h-fit">
            <div className="bg-white rounded-[32px] border border-gray-100 p-6 shadow-sm">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-6 px-4">Categories</p>
              <div className="space-y-1.5">
                {categories.map((cat) => {
                  const isActive = activeCategory === cat.id;
                  const styles = categoryStyles[cat.id] || categoryStyles.all;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setActiveCategory(cat.id)}
                      className={`w-full flex items-center justify-between px-4 py-2.5 rounded-2xl transition-all duration-300 ${isActive
                        ? "bg-[#0A3A2F] text-white shadow-xl shadow-primary/20 scale-[1.02]"
                        : "text-gray-600 hover:bg-gray-50/80 hover:translate-x-1"
                        }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-300 ${isActive
                          ? "bg-white/15 text-[#D48C46] shadow-inner"
                          : `${styles.inactiveBg} ${styles.inactiveText}`
                          }`}>
                          {getCategoryIcon(cat.id, "w-5 h-5")}
                        </div>
                        <span className="text-sm font-bold">{cat.label}</span>
                      </div>
                      <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${isActive ? "bg-white/20 text-white" : "bg-gray-100 text-gray-400"
                        }`}>
                        {getCount(cat.id)}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="col-span-12 lg:col-span-9 space-y-8">


            {/* Search & Sort Bar (Premium Redesign) */}
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <div className="relative flex-1 w-full group">
                <HiSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 text-xl group-focus-within:text-primary transition-colors" />
                <input
                  type="text"
                  placeholder="Search by title, meaning or keyword..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-14 pr-6 py-4 bg-white rounded-3xl border border-gray-100 focus:outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary transition-all shadow-sm text-sm font-medium"
                />
              </div>

              {/* Custom Premium Dropdown */}
              <div className="relative w-full sm:w-60" ref={sortRef}>
                <button
                  onClick={() => setIsSortOpen(!isSortOpen)}
                  className="w-full px-6 py-4 bg-white rounded-3xl border border-gray-100 shadow-sm flex items-center justify-between text-sm font-bold text-gray-900 hover:border-primary transition-all"
                >
                  <span className="truncate">{sortBy}</span>
                  <HiChevronDown className={`text-xl transition-transform duration-300 ${isSortOpen ? "rotate-180" : ""}`} />
                </button>

                <AnimatePresence>
                  {isSortOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute top-full right-0 mt-2 w-full bg-white rounded-[24px] border border-gray-100 shadow-2xl z-50 overflow-hidden"
                    >
                      {sortOptions.map((option) => (
                        <button
                          key={option}
                          onClick={() => {
                            setSortBy(option);
                            setIsSortOpen(false);
                          }}
                          className={`w-full px-6 py-4 text-left text-sm font-semibold transition-colors flex items-center justify-between ${sortBy === option ? "bg-primary/5 text-primary" : "text-gray-600 hover:bg-gray-50"
                            }`}
                        >
                          {option}
                          {sortBy === option && <div className="w-1.5 h-1.5 rounded-full bg-primary" />}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Dua Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              <AnimatePresence mode="popLayout">
                {filteredDuas.map((dua) => {
                  const isBookmarked = bookmarked.includes(dua.id);
                  const isLiked = liked.includes(dua.id);

                  return (
                    <motion.div
                      layout
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      key={dua.id}
                      className="bg-white rounded-[40px] border border-gray-100 p-10 shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col items-center text-center group relative overflow-hidden"
                    >
                      <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-bl-full -mr-12 -mt-12 group-hover:scale-150 transition-transform duration-700" />
                      <div className="w-14 h-14 rounded-2xl bg-primary/5 flex items-center justify-center mb-8 text-[#0A3A2F] group-hover:bg-[#0A3A2F] group-hover:text-[#D48C46] transition-all duration-500 shadow-sm border border-primary/5">
                        {getCategoryIcon(dua.category, "w-6 h-6 transition-transform duration-500 group-hover:scale-110")}
                      </div>
                      <p className="text-[12px] font-bold text-primary/70 uppercase tracking-[0.2em] mb-2">{dua.title}</p>
                      <span className="font-arabic text-3xl text-gray-900 leading-normal mb-8 min-h-[90px] flex items-center" dir="rtl">{dua.arabic}</span>
                      <div className="space-y-3 mb-10 flex-1">
                        <p className="text-xs font-bold text-gray-900">{dua.transliteration}</p>
                        <p className="text-md text-gray-900 leading-relaxed italic">&quot;{dua.translation}&quot;</p>
                        <div className="pt-4">
                          <span className="text-[12px] font-bold text-gray-400 px-3 py-1 bg-gray-50 rounded-full">{dua.reference}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-8 pt-8 border-t border-gray-50 w-full justify-center">
                        <button className="text-gray-400 hover:text-primary transition-all"><HiOutlineVolumeUp className="text-2xl" /></button>

                        <button
                          onClick={() => toggleLike(dua.id)}
                          className={`transition-all ${isLiked ? "text-rose-500" : "text-gray-400 hover:text-rose-500"}`}
                        >
                          {isLiked ? <HiHeart className="text-2xl" /> : <HiOutlineHeart className="text-2xl" />}
                        </button>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
            {filteredDuas.length === 0 && <div className="text-center py-20 text-gray-400">No Duas found.</div>}
          </main>
        </div>
      </div>
    </div>
  );
}
