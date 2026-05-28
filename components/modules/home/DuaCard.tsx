"use client"; // Interactive browser buttons ke liye

import React from "react";

// Authentic 10+ Duas Database Array
const COMPACT_DUAS_DATABASE = [
  {
    id: 1,
    category: "Knowledge",
    text: "رَبِّ زِدْنِي عِلْمًا",
    transliteration: "Rabbi zidni ilma",
    translation: "My Lord, increase me in knowledge.",
    reference: "Quran 20:114"
  },
  {
    id: 2,
    category: "Success & Protection",
    text: "رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ",
    transliteration: "Rabbana atina fid-dunya hasanatan wa fil-akhirati hasanatan wa qina 'adhaban-nar",
    translation: "Our Lord, give us in this world that which is good and in the Hereafter that which is good and protect us from the punishment of the Fire.",
    reference: "Quran 2:201"
  },
  {
    id: 3,
    category: "Trust & Faith",
    text: "حَسْبُنَا اللَّهُ وَنِعْمَ الْوَكِيلُ",
    transliteration: "Hasbunallahu wa ni'mal wakeel",
    translation: "Sufficient for us is Allah, and He is the best Disposer of affairs.",
    reference: "Quran 3:173"
  },
  {
    id: 4,
    category: "Forgiveness",
    text: "رَبِّ إِنِّي ظَلَمْتُ نَفْسِي فَاغْفِرْ Lِي",
    transliteration: "Rabbi inni zalamtu nafsi faghfir li",
    translation: "My Lord, indeed I have wronged myself, so forgive me.",
    reference: "Quran 28:16"
  },
  {
    id: 5,
    category: "Patience",
    text: "رَبَّنَا أَفْرِغْ عَلَيْنَا صَبْرًا وَتَوَفَّنَا مُسْلِمِينَ",
    transliteration: "Rabbana afrigh 'alayna sabran wa tawaffana muslimeen",
    translation: "Our Lord, pour upon us patience and let us die as Muslims in submission to You.",
    reference: "Quran 7:126"
  },
  {
    id: 6,
    category: "Guidance",
    text: "رَبَّنَا لَا تُزِغْ قُلُوبَنَا بَعْدَ إِذْ هَدَيْتَنَا وَهَبْ لَنَا مِن لَّدُنكَ رَحْمَةً",
    transliteration: "Rabbana la tuzigh quloobana ba'da idh hadaytana wa hab lana mil ladunka rahmah",
    translation: "Our Lord, let not our hearts deviate after You have guided us and grant us from Yourself mercy.",
    reference: "Quran 3:8"
  },
  {
    id: 7,
    category: "Gratitude",
    text: "رَبِّ أَوْزِعْنِي أَنْ أَشْكُرَ نِعْمَتَكَ الَّتِي أَنْعَمْتَ عَلَيَّ",
    transliteration: "Rabbi awzi'ni an ashkura ni'matakal lati an'amta 'alayya",
    translation: "My Lord, enable me to be grateful for Your favor which You have bestowed upon me.",
    reference: "Quran 27:19"
  },
  {
    id: 8,
    category: "Rizq & Provisions",
    text: "اللَّهُمَّ إِنِّي أَسْأَلُكَ عِلْمًا نَافِعًا وَرِزْقًا طَيِّبًا وَعَمَلًا مُتَقَبَّلًا",
    transliteration: "Allahumma inni as'aluka 'ilman nafi'an, wa rizqan tayyiban, wa 'amalan mutaqabbalan",
    translation: "O Allah, I ask You for knowledge that is of benefit, a good provision, and deeds that will be accepted.",
    reference: "Ibn Majah: 925"
  },
  {
    id: 9,
    category: "Ease & Relief",
    text: "اللَّهُمَّ لَا سَهْلَ إِلَّا مَا جَعَلْتَهُ سَهْلًا وَأَنْتَ تَجْعَلُ الْحَزْنَ إِذَا شِئْتَ سَهْلًا",
    transliteration: "Allahumma la sahla illa ma ja'altahu sahla, wa anta taj'alul-hazna idha shi'ta sahla",
    translation: "O Allah, there is no ease except in that which You have made easy, and You make the difficulty, if You wish, easy.",
    reference: "Ibn Hibban: 974"
  },
  {
    id: 10,
    category: "Health & Well-being",
    text: "اللَّهُمَّ عَافِنِي فِي بَدَنِي اللَّهُمَّ عَافِنِي فِي سَمْعِي اللَّهُمَّ عَافِنِي فِي بَصَرِي",
    transliteration: "Allahumma 'afini fi badani, Allahumma 'afini fi sam'i, Allahumma 'afini fi basari",
    translation: "O Allah, grant me health in my body. O Allah, grant me health in my hearing. O Allah, grant me health in my sight.",
    reference: "Abu Dawud: 5090"
  }
];

function getDailyRotationItem<T>(items: T[]): T {
  const startDate = new Date(2025, 0, 1).getTime();
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const dayIndex = Math.floor((today.getTime() - startDate) / 86400000);
  return items[dayIndex % items.length];
}

export default function DuaCard() {
  const todaysDua = getDailyRotationItem(COMPACT_DUAS_DATABASE);
  const totalCount = 350; // Counter layout update

 const handlePlayAudio = () => {
    window.speechSynthesis.cancel();

    // Voices ko load karein taake Arabic accent mil sake
    const voices = window.speechSynthesis.getVoices();
    
    // 1. Arabic Speech Setup
    const arabicSpeech = new SpeechSynthesisUtterance(todaysDua.text);
    // Arabic voice dhoondein (agar na mile to default use karein)
    const arabicVoice = voices.find(v => v.lang.includes("ar")) || voices[0];
    arabicSpeech.voice = arabicVoice;
    arabicSpeech.lang = "ar-SA";
    arabicSpeech.rate = 0.7; // Thoda slow takay lafz clear hon

    // 2. English Speech Setup
    const englishSpeech = new SpeechSynthesisUtterance(todaysDua.translation);
    const englishVoice = voices.find(v => v.lang.includes("en")) || voices[0];
    englishSpeech.voice = englishVoice;
    englishSpeech.lang = "en-US";
    englishSpeech.rate = 0.9;

    // Sequence: Arabic -> Pause -> English
    arabicSpeech.onend = () => {
      setTimeout(() => {
        window.speechSynthesis.speak(englishSpeech);
      }, 500);
    };

    window.speechSynthesis.speak(arabicSpeech);
  };

  return (
    <div className="max-w-4xl mx-auto my-12 p-6 sm:p-8 bg-white border border-primary/10 rounded-2xl shadow-xl text-primary font-body relative overflow-hidden">
      
      {/* Top Header Row */}
      <div className="flex justify-between items-center mb-6 border-b border-primary/5 pb-4">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
          <h3 className="text-lg sm:text-xl font-bold font-heading">Dua of the Day</h3>
        </div>
        <span className="text-[10px] sm:text-xs bg-primary/5 text-primary/80 px-3 py-1 rounded-md font-medium uppercase tracking-wider">
          {todaysDua.category}
        </span>
      </div>

      {/* Main Content Layout */}
      <div className="space-y-6 text-center sm:text-left">
        
        {/* Arabic Text (Right-to-Left) */}
        <p dir="rtl" className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-right leading-loose font-heading text-primary my-4 tracking-wide">
          {todaysDua.text}
        </p>

        {/* Translation Box */}
        <div className="space-y-3 border-l-4 border-secondary/40 pl-4 py-1 text-left">
          <p className="text-sm sm:text-base italic text-primary/70 font-medium">
            {"\""}{todaysDua.transliteration}{"\""}
          </p>
          <p className="text-base sm:text-lg font-medium text-primary/90 leading-relaxed">
            {todaysDua.translation}
          </p>
        </div>

        {/* Footer Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-between pt-4 border-t border-primary/5 gap-4">
          
          <div className="flex items-center gap-4 w-full sm:w-auto justify-center sm:justify-start">
            <button 
              onClick={handlePlayAudio}
              title="Listen Dua & Translation"
              className="p-2.5 rounded-full bg-primary/5 hover:bg-primary/10 text-primary transition-all border border-primary/10 group active:scale-95 shadow-sm"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 group-hover:scale-110 text-secondary transition-transform">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" />
              </svg>
            </button>
            <span className="text-xs sm:text-sm font-medium text-primary/60">
              Source: <span className="text-primary/80 font-semibold">{todaysDua.reference}</span>
            </span>
          </div>

          <a 
            href="/duas" 
            className="text-sm font-semibold text-secondary hover:text-amber-700 transition-colors flex items-center gap-1 group w-full sm:w-auto justify-center"
          >
            Explore All {totalCount}+ Duas
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4 group-hover:translate-x-1 transition-transform">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </a>

        </div>

      </div>

    </div>
  );
}