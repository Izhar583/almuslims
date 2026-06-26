"use client";

import React, { useState } from "react";
import { FaChevronDown, FaChevronUp, FaBookOpen, FaHistory, FaMapMarkerAlt, FaSun } from "react-icons/fa";
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
    summary: "Born in Mecca to Aminah and Abdullah (who passed away before his birth). Raised by his grandfather Abdul Muttalib and later his uncle Abu Talib.",
    location: "Mecca",
    details: "Prophet Muhammad ﷺ was born in the Year of the Elephant. He spent his early childhood in the desert with his foster mother Halimah Sadia, acquiring pure speech and strength. As a young man, he was known throughout Mecca as 'Al-Amin' (The Trustworthy) and 'Al-Sadiq' (The Truthful) due to his impeccable character. At age 25, he married Khadijah bint Khuwaylid (RA), a noble widow and businesswoman.",
    keyLesson: "Authentic character and integrity must be built long before leadership responsibilities commence."
  },
  {
    id: "2",
    yearAH: "13 BH",
    yearCE: "610 CE",
    title: "The First Revelation (Ghar-i-Hira)",
    phase: "Meccan",
    summary: "At age 40, during a spiritual retreat in the Cave of Hira, Angel Jibril (Gabriel) brought the first revelation of the Holy Quran.",
    location: "Mount Noor, Mecca",
    details: "The Prophet ﷺ sought seclusion in Cave Hira on Mount Noor to contemplate. One night during the month of Ramadan, Angel Jibril appeared and commanded him: 'Iqra!' (Read!). He replied, 'I cannot read.' Jibril embraced him tightly and repeated it thrice before reciting the first five verses of Surah Al-Alaq. Terrified, the Prophet ﷺ ran home, where his wife Khadijah comforted him and took him to her cousin Waraqah ibn Nawfal, who confirmed his prophethood.",
    keyVerse: "Recite in the name of your Lord who created... Created man from a clinging substance. Recite, and your Lord is the most Generous. (Surah Al-Alaq 96:1-3)",
    keyLesson: "Knowledge, contemplation, and seeking spiritual clarity form the foundation of change."
  },
  {
    id: "3",
    yearAH: "10 BH - 3 BH",
    yearCE: "613 - 619 CE",
    title: "Public Preaching & Severe Persecution",
    phase: "Meccan",
    summary: "Upon divine command, the Prophet ﷺ declared Islam publicly. Quraish leaders responded with severe boycotts, torture, and social exclusion.",
    location: "Mecca",
    details: "For three years, preaching was secret. When commanded to preach publicly, the Prophet ﷺ stood on Mount Safa and warned the Quraish. The ruling elite, fearing the loss of their polytheistic authority and trade, initiated physical torture, social boycotts, and economic embargos against early converts, especially slaves like Bilal ibn Rabah. The boycott of Banu Hashim in the valley of Abu Talib lasted three years, causing severe starvation.",
    keyVerse: "And warn, [O Muhammad], your closest relations. (Surah Ash-Shu'ara 26:214)",
    keyLesson: "Sticking to truth and justice requires patience (Sabr) in the face of strong societal opposition."
  },
  {
    id: "4",
    yearAH: "1 AH",
    yearCE: "622 CE",
    title: "The Great Migration (Hijrah)",
    phase: "Medinan",
    summary: "To escape assassination plots and establish a safe society, the Prophet ﷺ and Muslims migrated to Yathrib (Medina). This marks Year 1 of the Islamic Calendar.",
    location: "Mecca to Medina",
    details: "After the death of Abu Talib and Khadijah (the Year of Sorrow), persecution peaked. Leaders of Quraish plotted to assassinate the Prophet ﷺ. Directed by Allah, he escaped his house while Ali ibn Abi Talib (AS) slept in his bed to return people's trusts. Accompanied by Abu Bakr, they hid in Cave Thawr for three days. Upon arriving in Yathrib, the city was renamed Al-Madinah al-Munawwarah (The Illuminated City), and the historic brotherhood (Mu'akhat) between Muhajirun and Ansar was established.",
    keyVerse: "If you do not aid the Prophet - Allah has already aided him when those who disbelieved had driven him out... (Surah At-Tawbah 9:40)",
    keyLesson: "Strategic planning, high trust in God, and absolute brotherhood are keys to constructing a healthy state."
  },
  {
    id: "5",
    yearAH: "2 AH - 6 AH",
    yearCE: "624 - 628 CE",
    title: "Defending the Community & Charter of Medina",
    phase: "Medinan",
    summary: "The Prophet ﷺ drafted the Charter of Medina establishing religious freedom and successfully defended the young state in major battles.",
    location: "Medina & surrounding valleys",
    details: "The Prophet ﷺ established the Charter of Medina, history's first written constitution, defining rights of Muslims, Jews, and pagans alike in a unified coalition. To defend the city from Mecca's repeated invasions, the early state fought defensive campaigns including the Battle of Badr (2 AH, victory against overwhelming odds), the Battle of Uhud (3 AH, containing critical lessons on obedience), and the Battle of the Trench (5 AH, utilizing trench warfare suggested by Salman al-Farsi).",
    keyVerse: "Permission [to fight] has been given to those who are being fought, because they were wronged... (Surah Al-Hajj 22:39)",
    keyLesson: "Constitutional justice, pluralism, and defending collective human rights are mandatory duties."
  },
  {
    id: "6",
    yearAH: "6 AH",
    yearCE: "628 CE",
    title: "The Treaty of Hudaybiyyah",
    phase: "Medinan",
    summary: "A historic 10-year peace pact signed with Meccan elites, enabling peaceful propagation of Islam and recognition of the Islamic state.",
    location: "Hudaybiyyah",
    details: "The Prophet ﷺ set out with 1,400 companions to perform Umrah (pilgrimage). Stopped by the Quraish at Hudaybiyyah, he chose negotiation over conflict. Despite terms appearing unfavorable to Muslims initially, the Prophet ﷺ signed the Treaty. It established a 10-year truce, allowing tribes to ally with either side. It led to massive conversions as people discussed Islam peacefully.",
    keyVerse: "Indeed, We have given you, [O Muhammad], a clear conquest. (Surah Al-Fath 48:1)",
    keyLesson: "Diplomacy, strategic patience, and valuing peace over active confrontation lead to final victory."
  },
  {
    id: "7",
    yearAH: "8 AH",
    yearCE: "630 CE",
    title: "Conquest of Mecca (Fath Makkah)",
    phase: "Medinan",
    summary: "After Quraish allies violated the treaty, the Prophet ﷺ marched with 10,000 soldiers. Mecca surrendered peacefully without bloodshed. He declared general amnesty.",
    location: "Mecca",
    details: "When the Quraish violated the Treaty of Hudaybiyyah by attacking allies of Muslims, the Prophet ﷺ marched on Mecca. Entering the city in complete humility with his head bowed down on his camel, he faced no resistance. Instead of taking revenge on those who persecuted him for 20 years, he declared a general amnesty: 'Go, for you are free.' He then purified the Kaaba by clearing it of all 360 idols.",
    keyVerse: "And say, 'Truth has come, and falsehood has departed. Indeed is falsehood, [by nature], ever bound to depart.' (Surah Al-Isra 17:81)",
    keyLesson: "Mercy, humility in victory, and forgiveness are the ultimate hallmarks of prophethood."
  },
  {
    id: "8",
    yearAH: "10 AH - 11 AH",
    yearCE: "632 CE",
    title: "The Farewell Pilgrimage & Demise",
    phase: "Medinan",
    summary: "The Prophet ﷺ performed his final Hajj, delivering the famous Farewell Sermon (Khutbah Hajjat al-Wada) summarizing Islamic ethics, before passing away.",
    location: "Arafat & Medina",
    details: "In his Farewell Sermon on Mount Arafat, the Prophet ﷺ declared the absolute equality of all human beings: 'An Arab has no superiority over a non-Arab, nor a non-Arab has any superiority over an Arab.' He prohibited racism, gender exploitation, and economic interest (riba). A few months later, back in Medina, the Prophet ﷺ fell ill and passed away on 12th Rabi al-Awwal, 11 AH, leaving behind the Quran and his Sunnah.",
    keyVerse: "...This day I have perfected for you your religion and completed My favor upon you and have approved for you Islam as religion... (Surah Al-Ma'idah 5:3)",
    keyLesson: "Fulfilling one's mission entirely and leaving behind structured ethical frameworks for generations."
  }
];

export default function SeerahPage() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    if (expandedId === id) {
      setExpandedId(null);
    } else {
      setExpandedId(id);
    }
  };

  return (
    <main className="min-h-screen bg-background text-zinc-800 dark:text-zinc-200 py-16 transition-colors">
      {/* Background decorations */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10 opacity-30 dark:opacity-20">
        <div className="absolute top-1/4 left-1/4 w-[450px] h-[450px] rounded-full bg-primary/10 blur-[130px]" />
        <div className="absolute bottom-10 right-1/4 w-[450px] h-[450px] rounded-full bg-secondary/10 blur-[130px]" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-20">
          <p className="text-secondary text-sm font-mono tracking-[0.2em] uppercase mb-3 flex items-center justify-center gap-1.5">
            <FaSun className="animate-spin-slow text-amber-500" /> Life of the Noble Prophet ﷺ
          </p>
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-primary dark:text-zinc-100 mb-6">
            Interactive Seerah Timeline
          </h1>
          <p className="text-zinc-500 dark:text-zinc-400 max-w-2xl mx-auto text-base">
            Explore the key milestones in the blessed biography of the Prophet Muhammad ﷺ, mapping his spiritual mission, constitutional achievements, and ethical legacy.
          </p>
        </div>

        {/* Timeline Container */}
        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-primary/20 dark:bg-secondary/20 transform md:-translate-x-1/2" />

          {seerahTimeline.map((event, index) => {
            const isLeft = index % 2 === 0;
            const isExpanded = expandedId === event.id;

            return (
              <div
                key={event.id}
                className={`relative mb-16 last:mb-0 w-full md:w-1/2 pl-10 md:pl-0 ${isLeft ? "md:ml-0 md:mr-auto md:pr-10" : "md:ml-auto md:pl-10"
                  }`}
              >
                {/* Timeline Circle Bullet */}
                <div
                  className={`absolute top-2 w-5 h-5 rounded-full border-4 border-white dark:border-card shadow-md z-10 transition-all cursor-pointer hover:scale-110 duration-200
                    left-4 -translate-x-1/2
                    ${isLeft
                      ? "md:left-auto md:right-0 md:translate-x-1/2"
                      : "md:right-auto md:left-0 md:-translate-x-1/2"
                    }
                    ${event.phase === "Meccan"
                      ? "bg-primary"
                      : "bg-secondary"
                    }
                  `}
                  onClick={() => toggleExpand(event.id)}
                />

                {/* Timeline Card */}
                <div
                  className={`relative ${isLeft ? "md:text-right" : "md:text-left"
                    }`}
                >
                  <motion.div
                    initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.5 }}
                    className="bg-white dark:bg-card border border-zinc-200/50 dark:border-zinc-800/80 rounded-2xl p-6 shadow-md transition-all text-left"
                  >
                    {/* Phase Badge */}
                    <div className={`flex flex-wrap items-center gap-2 mb-3 text-xs font-mono font-bold ${isLeft ? "md:justify-end" : "md:justify-start"
                      }`}>
                      <span className={`px-2.5 py-1 rounded-full ${event.phase === "Meccan"
                          ? "bg-primary/10 text-primary dark:bg-primary/20"
                          : "bg-secondary/10 text-secondary dark:bg-secondary/20"
                        }`}>
                        {event.phase} Phase
                      </span>
                      <span className="text-zinc-400">
                        {event.location}
                      </span>
                    </div>

                    {/* Years */}
                    <p className={`text-xs font-mono font-bold text-secondary tracking-wider mb-1 ${isLeft ? "md:text-right" : "md:text-left"
                      }`}>
                      {event.yearCE} ({event.yearAH})
                    </p>

                    {/* Title */}
                    <h2 className={`font-heading text-xl font-bold text-primary dark:text-zinc-100 mb-3 ${isLeft ? "md:text-right" : "md:text-left"
                      }`}>
                      {event.title}
                    </h2>

                    {/* Excerpt Summary */}
                    <p className={`text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed mb-4 font-body ${isLeft ? "md:text-right" : "md:text-left"
                      }`}>
                      {event.summary}
                    </p>

                    {/* Expand/Collapse Button */}
                    <div className={isLeft ? "md:text-right" : "md:text-left"}>
                      <button
                        onClick={() => toggleExpand(event.id)}
                        className="inline-flex items-center gap-2 text-xs font-bold text-primary dark:text-secondary hover:underline cursor-pointer"
                      >
                        {isExpanded ? (
                          <>
                            Hide Details <FaChevronUp />
                          </>
                        ) : (
                          <>
                            View Details & Lessons <FaChevronDown />
                          </>
                        )}
                      </button>
                    </div>

                    {/* Expandable Content Panel */}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden text-left"
                        >
                          <div className="mt-4 pt-4 border-t border-zinc-100 dark:border-zinc-800/60 space-y-4 text-xs sm:text-sm font-body">

                            {/* Rich Detail */}
                            <div>
                              <h4 className="font-bold text-zinc-800 dark:text-zinc-200 mb-1.5 flex items-center gap-1.5">
                                <FaHistory className="text-secondary" /> Historical Summary
                              </h4>
                              <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                                {event.details}
                              </p>
                            </div>

                            {/* Related verse */}
                            {event.keyVerse && (
                              <div className="p-3.5 bg-primary/5 dark:bg-background/40 border border-primary/10 rounded-xl">
                                <h4 className="font-bold text-primary dark:text-secondary mb-1 flex items-center gap-1.5">
                                  <FaBookOpen /> Associated Revelation
                                </h4>
                                <p className="text-zinc-700 dark:text-zinc-300 italic leading-relaxed">
                                  &ldquo;{event.keyVerse}&rdquo;
                                </p>
                              </div>
                            )}

                            {/* Moral / Lesson */}
                            <div className="border-l-2 border-secondary pl-3">
                              <h4 className="font-bold text-secondary mb-1">
                                Core Spiritual Lesson
                              </h4>
                              <p className="text-zinc-700 dark:text-zinc-300 font-medium">
                                {event.keyLesson}
                              </p>
                            </div>

                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
