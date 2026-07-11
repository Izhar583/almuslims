"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  FaBookOpen,
  FaHistory,
  FaMapMarkerAlt,
  FaStar,
  FaMosque,
  FaFeatherAlt,
} from "react-icons/fa";
import {
  HiOutlineMagnifyingGlass,
  HiOutlineChevronDown,
  HiOutlineMapPin,
  HiOutlineCalendar,
  HiOutlineLightBulb,
} from "react-icons/hi2";
import { motion, AnimatePresence } from "framer-motion";

interface TimelineEvent {
  id: string;
  yearAH: string;
  yearCE: string;
  title: string;
  phase: "Meccan" | "Medinan";
  summary: string;
  location: string;
  details: string;
  keyVerse?: string;
  keyLesson: string;
}

const seerahTimeline: TimelineEvent[] = [
  {
    id: "1",
    yearAH: "Pre-Hijrah",
    yearCE: "570 CE",
    title: "Birth and Early Life",
    phase: "Meccan",
    summary:
      "Born in Mecca to Aminah and Abdullah (who passed away before his birth). Raised by his grandfather Abdul Muttalib and later his uncle Abu Talib.",
    location: "Mecca",
    details:
      "Prophet Muhammad ﷺ was born in the Year of the Elephant. He spent his early childhood in the desert with his foster mother Halimah Sadia, acquiring pure speech and strength. As a young man, he was known throughout Mecca as 'Al-Amin' (The Trustworthy) and 'Al-Sadiq' (The Truthful) due to his impeccable character. At age 25, he married Khadijah bint Khuwaylid (RA), a noble widow and businesswoman.",
    keyLesson:
      "Authentic character and integrity must be built long before leadership responsibilities commence.",
  },
  {
    id: "2",
    yearAH: "13 BH",
    yearCE: "610 CE",
    title: "The First Revelation (Ghar-i-Hira)",
    phase: "Meccan",
    summary:
      "At age 40, during a spiritual retreat in the Cave of Hira, Angel Jibril (Gabriel) brought the first revelation of the Holy Quran.",
    location: "Mount Noor, Mecca",
    details:
      "The Prophet ﷺ sought seclusion in Cave Hira on Mount Noor to contemplate. One night during the month of Ramadan, Angel Jibril appeared and commanded him: 'Iqra!' (Read!). He replied, 'I cannot read.' Jibril embraced him tightly and repeated it thrice before reciting the first five verses of Surah Al-Alaq. Terrified, the Prophet ﷺ ran home, where his wife Khadijah comforted him and took him to her cousin Waraqah ibn Nawfal, who confirmed his prophethood.",
    keyVerse:
      "Recite in the name of your Lord who created... Created man from a clinging substance. Recite, and your Lord is the most Generous. (Surah Al-Alaq 96:1-3)",
    keyLesson:
      "Knowledge, contemplation, and seeking spiritual clarity form the foundation of change.",
  },
  {
    id: "3",
    yearAH: "10 BH - 3 BH",
    yearCE: "613 - 619 CE",
    title: "Public Preaching & Severe Persecution",
    phase: "Meccan",
    summary:
      "Upon divine command, the Prophet ﷺ declared Islam publicly. Quraish leaders responded with severe boycotts, torture, and social exclusion.",
    location: "Mecca",
    details:
      "For three years, preaching was secret. When commanded to preach publicly, the Prophet ﷺ stood on Mount Safa and warned the Quraish. The ruling elite, fearing the loss of their polytheistic authority and trade, initiated physical torture, social boycotts, and economic embargos against early converts, especially slaves like Bilal ibn Rabah. The boycott of Banu Hashim in the valley of Abu Talib lasted three years, causing severe starvation.",
    keyVerse:
      "And warn, [O Muhammad], your closest relations. (Surah Ash-Shu'ara 26:214)",
    keyLesson:
      "Sticking to truth and justice requires patience (Sabr) in the face of strong societal opposition.",
  },
  {
    id: "4",
    yearAH: "1 AH",
    yearCE: "622 CE",
    title: "The Great Migration (Hijrah)",
    phase: "Medinan",
    summary:
      "To escape assassination plots and establish a safe society, the Prophet ﷺ and Muslims migrated to Yathrib (Medina). This marks Year 1 of the Islamic Calendar.",
    location: "Mecca to Medina",
    details:
      "After the death of Abu Talib and Khadijah (the Year of Sorrow), persecution peaked. Leaders of Quraish plotted to assassinate the Prophet ﷺ. Directed by Allah, he escaped his house while Ali ibn Abi Talib (AS) slept in his bed to return people's trusts. Accompanied by Abu Bakr, they hid in Cave Thawr for three days. Upon arriving in Yathrib, the city was renamed Al-Madinah al-Munawwarah (The Illuminated City), and the historic brotherhood (Mu'akhat) between Muhajirun and Ansar was established.",
    keyVerse:
      "If you do not aid the Prophet - Allah has already aided him when those who disbelieved had driven him out... (Surah At-Tawbah 9:40)",
    keyLesson:
      "Strategic planning, high trust in God, and absolute brotherhood are keys to constructing a healthy state.",
  },
  {
    id: "5",
    yearAH: "2 AH - 6 AH",
    yearCE: "624 - 628 CE",
    title: "Defending the Community & Charter of Medina",
    phase: "Medinan",
    summary:
      "The Prophet ﷺ drafted the Charter of Medina establishing religious freedom and successfully defended the young state in major battles.",
    location: "Medina & surrounding valleys",
    details:
      "The Prophet ﷺ established the Charter of Medina, history's first written constitution, defining rights of Muslims, Jews, and pagans alike in a unified coalition. To defend the city from Mecca's repeated invasions, the early state fought defensive campaigns including the Battle of Badr (2 AH, victory against overwhelming odds), the Battle of Uhud (3 AH, containing critical lessons on obedience), and the Battle of the Trench (5 AH, utilizing trench warfare suggested by Salman al-Farsi).",
    keyVerse:
      "Permission [to fight] has been given to those who are being fought, because they were wronged... (Surah Al-Hajj 22:39)",
    keyLesson:
      "Constitutional justice, pluralism, and defending collective human rights are mandatory duties.",
  },
  {
    id: "6",
    yearAH: "6 AH",
    yearCE: "628 CE",
    title: "The Treaty of Hudaybiyyah",
    phase: "Medinan",
    summary:
      "A historic 10-year peace pact signed with Meccan elites, enabling peaceful propagation of Islam and recognition of the Islamic state.",
    location: "Hudaybiyyah",
    details:
      "The Prophet ﷺ set out with 1,400 companions to perform Umrah (pilgrimage). Stopped by the Quraish at Hudaybiyyah, he chose negotiation over conflict. Despite terms appearing unfavorable to Muslims initially, the Prophet ﷺ signed the Treaty. It established a 10-year truce, allowing tribes to ally with either side. It led to massive conversions as people discussed Islam peacefully.",
    keyVerse:
      "Indeed, We have given you, [O Muhammad], a clear conquest. (Surah Al-Fath 48:1)",
    keyLesson:
      "Diplomacy, strategic patience, and valuing peace over active confrontation lead to final victory.",
  },
  {
    id: "7",
    yearAH: "8 AH",
    yearCE: "630 CE",
    title: "Conquest of Mecca (Fath Makkah)",
    phase: "Medinan",
    summary:
      "After Quraish allies violated the treaty, the Prophet ﷺ marched with 10,000 soldiers. Mecca surrendered peacefully without bloodshed. He declared general amnesty.",
    location: "Mecca",
    details:
      "When the Quraish violated the Treaty of Hudaybiyyah by attacking allies of Muslims, the Prophet ﷺ marched on Mecca. Entering the city in complete humility with his head bowed down on his camel, he faced no resistance. Instead of taking revenge on those who persecuted him for 20 years, he declared a general amnesty: 'Go, for you are free.' He then purified the Kaaba by clearing it of all 360 idols.",
    keyVerse:
      "And say, 'Truth has come, and falsehood has departed. Indeed is falsehood, [by nature], ever bound to depart.' (Surah Al-Isra 17:81)",
    keyLesson:
      "Mercy, humility in victory, and forgiveness are the ultimate hallmarks of prophethood.",
  },
  {
    id: "8",
    yearAH: "10 AH - 11 AH",
    yearCE: "632 CE",
    title: "The Farewell Pilgrimage & Demise",
    phase: "Medinan",
    summary:
      "The Prophet ﷺ performed his final Hajj, delivering the famous Farewell Sermon (Khutbah Hajjat al-Wada) summarizing Islamic ethics, before passing away.",
    location: "Arafat & Medina",
    details:
      "In his Farewell Sermon on Mount Arafat, the Prophet ﷺ declared the absolute equality of all human beings: 'An Arab has no superiority over a non-Arab, nor a non-Arab has any superiority over an Arab.' He prohibited racism, gender exploitation, and economic interest (riba). A few months later, back in Medina, the Prophet ﷺ fell ill and passed away on 12th Rabi al-Awwal, 11 AH, leaving behind the Quran and his Sunnah.",
    keyVerse:
      "...This day I have perfected for you your religion and completed My favor upon you and have approved for you Islam as religion... (Surah Al-Ma'idah 5:3)",
    keyLesson:
      "Fulfilling one's mission entirely and leaving behind structured ethical frameworks for generations.",
  },
];

const phaseFilters = [
  { id: "all", label: "All Events" },
  { id: "Meccan", label: "Makki Period" },
  { id: "Medinan", label: "Madani Period" },
];

function EventCard({
  event,
  index,
}: {
  event: TimelineEvent;
  index: number;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const isMeccan = event.phase === "Meccan";

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.45, delay: index * 0.05 }}
      className="group relative bg-white dark:bg-card rounded-[2rem] border border-gray-100 dark:border-zinc-800/60 shadow-sm transition-all duration-300 overflow-hidden"
    >
      {/* Top accent bar */}
      <div
        className={`h-1 w-full ${
          isMeccan
            ? "bg-gradient-to-r from-amber-400 via-amber-500 to-orange-400"
            : "bg-gradient-to-r from-primary via-primaryHover to-teal-600"
        }`}
      />

      <div className="p-7">
        {/* Header Row */}
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            {/* Number badge */}
            <div
              className={`flex-shrink-0 w-11 h-11 rounded-2xl flex items-center justify-center text-sm font-bold transition-colors duration-300 ${
                isMeccan
                  ? "bg-amber-50 text-amber-600 group-hover:bg-amber-500 group-hover:text-white dark:bg-amber-900/20 dark:text-amber-400 dark:group-hover:bg-amber-500 dark:group-hover:text-white"
                  : "bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white dark:bg-primary/20 dark:text-primary dark:group-hover:bg-primary dark:group-hover:text-white"
              }`}
            >
              {String(index + 1).padStart(2, "0")}
            </div>
            <div className="min-w-0">
              <p
                className={`text-[10px] font-bold uppercase tracking-widest mb-0.5 ${
                  isMeccan
                    ? "text-amber-500"
                    : "text-primary dark:text-primary"
                }`}
              >
                {event.phase === "Meccan" ? "Makki" : "Madani"} Phase
              </p>
              <h2 className="font-heading text-lg font-bold text-gray-900 dark:text-zinc-100 leading-tight truncate">
                {event.title}
              </h2>
            </div>
          </div>

          {/* Phase icon */}
          <div
            className={`flex-shrink-0 p-2.5 rounded-xl ${
              isMeccan
                ? "bg-amber-50 text-amber-500 dark:bg-amber-900/20 dark:text-amber-400"
                : "bg-primary/10 text-primary dark:bg-primary/20"
            }`}
          >
            {isMeccan ? (
              <FaStar className="w-4 h-4" />
            ) : (
              <FaMosque className="w-4 h-4" />
            )}
          </div>
        </div>

        {/* Meta row */}
        <div className="flex flex-wrap items-center gap-3 mb-4 text-xs text-gray-400 dark:text-zinc-500">
          <span className="flex items-center gap-1.5">
            <HiOutlineCalendar className="w-3.5 h-3.5" />
            {event.yearCE}{" "}
            <span className="text-gray-300 dark:text-zinc-600">·</span>{" "}
            {event.yearAH}
          </span>
          <span className="flex items-center gap-1.5">
            <HiOutlineMapPin className="w-3.5 h-3.5" />
            {event.location}
          </span>
        </div>

        {/* Summary */}
        <p className="text-sm text-gray-500 dark:text-zinc-400 leading-relaxed mb-5">
          {event.summary}
        </p>

        {/* Expand button */}
        <button
          id={`seerah-expand-${event.id}`}
          onClick={() => setIsOpen(!isOpen)}
          className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-xs font-bold transition-all duration-300 ${
            isOpen
              ? isMeccan
                ? "bg-amber-50 text-amber-600 dark:bg-amber-900/20 dark:text-amber-400"
                : "bg-primary/5 text-primary dark:bg-primary/10"
              : "bg-gray-50 text-gray-500 hover:bg-gray-100 dark:bg-zinc-800/50 dark:text-zinc-400 dark:hover:bg-zinc-800"
          }`}
        >
          <span>{isOpen ? "Hide Details" : "Read More & Key Lessons"}</span>
          <HiOutlineChevronDown
            className={`w-4 h-4 transition-transform duration-300 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        {/* Expandable section */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="mt-5 space-y-4 text-sm font-body border-t border-gray-100 dark:border-zinc-800/50 pt-5">
                {/* Historical detail */}
                <div>
                  <h4 className="flex items-center gap-2 font-bold text-gray-800 dark:text-zinc-200 mb-2 text-xs uppercase tracking-wider">
                    <FaHistory className="text-secondary" />
                    Historical Detail
                  </h4>
                  <p className="text-gray-500 dark:text-zinc-400 leading-relaxed text-sm">
                    {event.details}
                  </p>
                </div>

                {/* Key verse */}
                {event.keyVerse && (
                  <div
                    className={`p-4 rounded-2xl border ${
                      isMeccan
                        ? "bg-amber-50/50 border-amber-100 dark:bg-amber-900/10 dark:border-amber-900/30"
                        : "bg-primary/5 border-primary/10 dark:bg-primary/5 dark:border-primary/20"
                    }`}
                  >
                    <h4
                      className={`flex items-center gap-2 font-bold mb-2 text-xs uppercase tracking-wider ${
                        isMeccan
                          ? "text-amber-600 dark:text-amber-400"
                          : "text-primary dark:text-primary"
                      }`}
                    >
                      <FaBookOpen />
                      Associated Revelation
                    </h4>
                    <p className="text-gray-700 dark:text-zinc-300 italic leading-relaxed text-sm">
                      &ldquo;{event.keyVerse}&rdquo;
                    </p>
                  </div>
                )}

                {/* Core lesson */}
                <div
                  className={`flex gap-3 p-4 rounded-2xl ${
                    isMeccan
                      ? "bg-amber-50/50 dark:bg-amber-900/10"
                      : "bg-primary/5 dark:bg-primary/5"
                  }`}
                >
                  <HiOutlineLightBulb
                    className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
                      isMeccan
                        ? "text-amber-500"
                        : "text-primary dark:text-primary"
                    }`}
                  />
                  <div>
                    <p className="font-bold text-xs uppercase tracking-wider text-gray-400 dark:text-zinc-500 mb-1">
                      Core Lesson
                    </p>
                    <p className="font-semibold text-gray-800 dark:text-zinc-200 text-sm leading-relaxed">
                      {event.keyLesson}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export default function SeerahPage() {
  const [activePhase, setActivePhase] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = useMemo(() => {
    return seerahTimeline.filter((e) => {
      const matchPhase = activePhase === "all" || e.phase === activePhase;
      const q = searchQuery.toLowerCase();
      const matchSearch =
        !q ||
        e.title.toLowerCase().includes(q) ||
        e.summary.toLowerCase().includes(q) ||
        e.location.toLowerCase().includes(q);
      return matchPhase && matchSearch;
    });
  }, [activePhase, searchQuery]);

  const meccanCount = seerahTimeline.filter((e) => e.phase === "Meccan").length;
  const medinanCount = seerahTimeline.filter(
    (e) => e.phase === "Medinan"
  ).length;

  return (
    <main className="bg-[#FAF7F2] dark:bg-background min-h-screen font-body text-zinc-800 dark:text-zinc-200">
      {/* ─── Hero Section ─── */}
      <section className="relative w-full pt-14 pb-20 overflow-hidden">
        {/* Glow blobs */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none dark:bg-primary/10" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-secondary/5 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3 pointer-events-none dark:bg-secondary/10" />

        <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-gray-400 dark:text-zinc-500 mb-8">
            <Link href="/" className="hover:text-primary transition-colors">
              Home
            </Link>
            <span className="w-1 h-1 rounded-full bg-gray-300 dark:bg-zinc-600" />
            <span className="text-primary dark:text-primary">Seerah</span>
          </nav>

          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10">
            <div className="max-w-2xl">
              {/* Label */}
              <p className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-secondary bg-secondary/10 px-4 py-2 rounded-full mb-5">
                <FaFeatherAlt className="text-secondary" />
                Biography of the Prophet ﷺ
              </p>

              <h1 className="font-heading text-5xl lg:text-7xl font-bold text-[#0A3A2F] dark:text-zinc-100 mb-5 leading-tight">
                Seerah Timeline
              </h1>
              <p className="text-gray-500 dark:text-zinc-400 text-lg leading-relaxed">
                Explore the key milestones in the blessed life of Prophet
                Muhammad ﷺ — his spiritual mission, constitutional
                achievements, and timeless ethical legacy.
              </p>
            </div>

            {/* Stats panel */}
            <div className="flex flex-row lg:flex-col gap-4 lg:gap-3 flex-shrink-0">
              {[
                {
                  label: "Total Events",
                  value: seerahTimeline.length,
                  color: "text-primary",
                  bg: "bg-primary/10 dark:bg-primary/20",
                },
                {
                  label: "Meccan Phase",
                  value: meccanCount,
                  color: "text-amber-600 dark:text-amber-400",
                  bg: "bg-amber-50 dark:bg-amber-900/20",
                },
                {
                  label: "Medinan Phase",
                  value: medinanCount,
                  color: "text-teal-600 dark:text-teal-400",
                  bg: "bg-teal-50 dark:bg-teal-900/20",
                },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className={`${stat.bg} px-6 py-4 rounded-2xl text-center min-w-[110px]`}
                >
                  <p className={`text-3xl font-bold font-heading ${stat.color}`}>
                    {stat.value}
                  </p>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400 dark:text-zinc-500 mt-0.5">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── Search & Filter Controls ─── */}
      <section className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12 -mt-10 mb-14 relative z-20">
        <div className="bg-white dark:bg-card rounded-[2.5rem] p-7 shadow-xl border border-white dark:border-zinc-800/50">
          {/* Search */}
          <div className="relative mb-6">
            <HiOutlineMagnifyingGlass className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              id="seerah-search"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search events, locations, or topics..."
              className="w-full bg-[#FAF7F2] dark:bg-background/60 border-none rounded-2xl py-4 pl-14 pr-6 text-sm focus:ring-2 focus:ring-primary/20 transition-all font-medium text-gray-700 dark:text-zinc-200 placeholder:text-gray-400 dark:placeholder:text-zinc-500"
            />
          </div>

          {/* Phase filter tabs */}
          <div className="flex items-center gap-3 flex-wrap">
            {phaseFilters.map((f) => (
              <button
                key={f.id}
                id={`seerah-filter-${f.id}`}
                onClick={() => setActivePhase(f.id)}
                className={`px-6 py-3 rounded-2xl text-xs font-bold whitespace-nowrap transition-all duration-300 ${
                  activePhase === f.id
                    ? f.id === "Meccan"
                      ? "bg-amber-500 text-white shadow-lg shadow-amber-200 dark:shadow-amber-900/30"
                      : f.id === "Medinan"
                      ? "bg-primary text-white shadow-lg shadow-primary/20"
                      : "bg-primary text-white shadow-lg shadow-primary/20"
                    : "bg-white dark:bg-zinc-800/60 text-gray-500 dark:text-zinc-400 border border-gray-100 dark:border-zinc-700 hover:border-primary/20 hover:text-primary dark:hover:text-primary"
                }`}
              >
                {f.label}
              </button>
            ))}

            {/* Result count */}
            <span className="ml-auto text-xs text-gray-400 dark:text-zinc-500 font-medium">
              {filtered.length}{" "}
              {filtered.length === 1 ? "event" : "events"} found
            </span>
          </div>
        </div>
      </section>

      {/* ─── Main Content ─── */}
      <section className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-10 pb-20">
        {/* Timeline cards grid */}
        <div className="lg:col-span-8">
          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {filtered.map((event, index) => (
                <EventCard key={event.id} event={event} index={index} />
              ))}
            </div>
          ) : (
            <div className="text-center py-24">
              <p className="text-4xl mb-3">🔍</p>
              <p className="text-gray-400 dark:text-zinc-500 font-medium">
                No events found. Try a different search or filter.
              </p>
            </div>
          )}
        </div>

        {/* Sticky Sidebar */}
        <div className="lg:col-span-4 space-y-6 h-fit lg:sticky lg:top-28">
          {/* Quranic reminder card */}
          <div className="relative rounded-3xl overflow-hidden min-h-[280px] bg-[#0A3A2F] dark:bg-[#071A14] flex items-center justify-center p-8 text-center">
            <div
              className="absolute inset-0 bg-cover bg-center opacity-15"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1542810634-71277d95dcbb?q=80&w=800')",
              }}
            />
            <div className="relative z-10 text-white font-body">
              <p className="text-[10px] font-bold text-white/60 tracking-widest uppercase mb-4">
                Salawat
              </p>
              <p className="font-arabic text-2xl mb-3 leading-loose" dir="rtl">
                اللَّهُمَّ صَلِّ عَلَىٰ مُحَمَّدٍ
              </p>
              <p className="text-sm font-medium italic mb-2 text-white/80">
                &quot;O Allah, send blessings upon Muhammad.&quot;
              </p>
              <p className="text-[10px] text-white/40 uppercase tracking-widest">
                — Darood Ibrahim
              </p>
            </div>
          </div>

          {/* Phase legend */}
          <div className="bg-white dark:bg-card rounded-3xl p-6 border border-gray-100 dark:border-zinc-800/50 shadow-sm">
            <h3 className="font-heading font-bold text-gray-900 dark:text-zinc-100 text-base mb-4">
              About the Phases
            </h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="mt-1 w-3 h-3 rounded-full bg-amber-400 flex-shrink-0" />
                <div>
                  <p className="font-bold text-sm text-gray-800 dark:text-zinc-200">
                    Makki Period
                  </p>
                  <p className="text-xs text-gray-400 dark:text-zinc-500 leading-relaxed">
                    13 years of secret & public dawah, patience under
                    persecution, spiritual foundation building.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="mt-1 w-3 h-3 rounded-full bg-primary flex-shrink-0" />
                <div>
                  <p className="font-bold text-sm text-gray-800 dark:text-zinc-200">
                    Madani Period
                  </p>
                  <p className="text-xs text-gray-400 dark:text-zinc-500 leading-relaxed">
                    10 years of state-building, legislation, defense, diplomacy,
                    and the completion of Islam.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick facts */}
          <div className="bg-white dark:bg-card rounded-3xl p-6 border border-gray-100 dark:border-zinc-800/50 shadow-sm">
            <h3 className="font-heading font-bold text-gray-900 dark:text-zinc-100 text-base mb-4">
              Quick Facts
            </h3>
            <ul className="space-y-3 text-xs text-gray-500 dark:text-zinc-400">
              {[
                { label: "Birth year", value: "570 CE" },
                { label: "Year of prophethood", value: "610 CE" },
                { label: "Hijrah (Migration)", value: "622 CE" },
                { label: "Conquest of Mecca", value: "630 CE" },
                { label: "Demise", value: "632 CE" },
                { label: "Total missions", value: "~23 years" },
              ].map((fact) => (
                <li
                  key={fact.label}
                  className="flex justify-between items-center border-b border-gray-50 dark:border-zinc-800/50 pb-2 last:border-0 last:pb-0"
                >
                  <span className="font-medium">{fact.label}</span>
                  <span className="font-bold text-primary dark:text-primary">
                    {fact.value}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
}
