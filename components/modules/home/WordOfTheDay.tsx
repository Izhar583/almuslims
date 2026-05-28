'use client';

import React from 'react';

// Aapki 50 names ki list
const nameList = [
  { ar: "علي", en: "ALI", def: "Noble or exalted, associated with the fourth Caliph." },
  { ar: "أمير", en: "AMIR", def: "Prince or commander, a popular name with deep roots." },
  { ar: "حمزة", en: "HAMZA", def: "Strong, steadfast; named after the brave uncle of the Prophet." },
  { ar: "حسن", en: "HASSAN", def: "Handsome or good; named after the companion of the Prophet." },
  { ar: "إدريس", en: "IDRIS", def: "Interpreter; name of a Prophet mentioned in tradition." },
  { ar: "كريم", en: "KAREEM", def: "Generous or noble; one of the 99 names of Allah." },
  { ar: "مالك", en: "MALIK", def: "King; another of the 99 names of Allah." },
  { ar: "محمد", en: "MUHAMMAD", def: "Praised or commendable; the name of the founder of Islam." },
  { ar: "ناصر", en: "NASIR", def: "Helper or protector; a name popular among Muslims." },
  { ar: "عمر", en: "OMAR", def: "Flourishing and life; a name associated with the second Caliph." },
  { ar: "سمير", en: "SAMIR", def: "A companion in evening talk; a friendly and social name." },
  { ar: "زين", en: "ZAYN", def: "Beauty or grace; a name symbolizing elegance." },
  { ar: "أكرم", en: "AKRAM", def: "Most generous; a superlative form of nobility." },
  { ar: "بلال", en: "BILAL", def: "Refreshing, moistening; named after a companion of the Prophet." },
  { ar: "دانيال", en: "DANIYAL", def: "God is my judge; a classic name across cultures." },
  { ar: "فريد", en: "FARID", def: "Unique and precious; perfect for one-of-a-kind." },
  { ar: "مروان", en: "MARWAN", def: "Fragrant plant; named after the sacred hills near Mecca." },
  { ar: "نزيه", en: "NAZIH", def: "Honest and virtuous; a person of high integrity." },
  { ar: "قاسم", en: "QASIM", def: "One who divides; a generous sharer of goods." },
  { ar: "سهيل", en: "SUHAIL", def: "Canopus; the second brightest star in the sky." },
  { ar: "أحمد", en: "AHMED", def: "Most commendable; a powerful and timeless name." },
  { ar: "عزيز", en: "AZIZ", def: "Powerful, respected, and beloved; name of Allah." },
  { ar: "فاروق", en: "FARUQ", def: "One who distinguishes right from wrong." },
  { ar: "هشام", en: "HISHAM", def: "Generous; traditionally associated with sharing bread." },
  { ar: "مكرم", en: "MAKRAM", def: "Noble traits and generosity; a gift to your child." },
  { ar: "محمود", en: "MAHMUD", def: "Praised; borne by many great historical rulers." },
  { ar: "محمد", en: "MEHMED", def: "A variant of Muhammad, meaning to praise." },
  { ar: "نبيل", en: "NABIL", def: "Noble; one who possesses outstanding qualities." },
  { ar: "رافع", en: "RAFI", def: "Elevated, sublime; a name indicating high status." },
  { ar: "سلطان", en: "SULTAN", def: "Ruler; a regal title representing authority." },
  { ar: "عادل", en: "ADIL", def: "Honest or fair; a symbol of righteousness." },
  { ar: "أنس", en: "ANAS", def: "Friendly and companionable; name of a Prophet's companion." },
  { ar: "بدر", en: "BADR", def: "Full moon; a beautiful celestial name." },
  { ar: "حبيب", en: "HABIB", def: "Beloved; an endearing and warm name." },
  { ar: "هادي", en: "HADI", def: "Guide; one who leads others to the right path." },
  { ar: "جبريل", en: "JIBRIL", def: "Gabriel; the archangel and messenger of God." },
  { ar: "ناجي", en: "NAJI", def: "Safe, secure, and a loyal friend." },
  { ar: "نزار", en: "NIZAR", def: "Shine or little; a bright and adorable name." },
  { ar: "طارق", en: "TARIQ", def: "Morning star; the star that shines before sunrise." },
  { ar: "زكي", en: "ZAKI", def: "Pure; a name signifying clarity and goodness." },
  { ar: "عبد الله", en: "ABDULLAH", def: "Servant of Allah; a name of profound devotion." },
  { ar: "أحمد", en: "AHMAD", def: "Most commendable; highly praised." },
  { ar: "هارون", en: "HARUN", def: "Exalted; high mountain, symbolizing strength." },
  { ar: "جبار", en: "JABARI", def: "Almighty and powerful." },
  { ar: "جلال", en: "JALAL", def: "Greatness; a goal of high achievement." },
  { ar: "أنور", en: "ANWAR", def: "Brighter or more luminous." },
  { ar: "غسان", en: "GHASSAN", def: "Youth; honoring the beauty of childhood." },
  { ar: "حكيم", en: "HAKEEM", def: "Wise and intelligent; a seeker of knowledge." },
  { ar: "حسين", en: "HUSSEIN", def: "Handsome; a heart-winning name." },
  { ar: "جمال", en: "JAMAL", def: "Beauty; representing the grace in life." },
];

const WordOfTheDayCard = () => {
  // Logic: Aaj ki date ke hisaab se array ka index choose karein (0-49)
  const dayIndex = (new Date().getDate() - 1) % nameList.length;
  const wordData = nameList[dayIndex];
  
  const today = new Date().toLocaleDateString('en-US', { 
    month: 'long', day: 'numeric', year: 'numeric' 
  });

  return (
    <div className="h-full flex flex-col justify-between p-6 sm:p-8 bg-white border border-primary/5 rounded-[1.5rem] shadow-sm hover:shadow-lg transition-all duration-300 group">
      {/* Header */}
      <div className="text-center mb-6">
        <h2 className="text-[11px] font-bold text-primary/50 tracking-widest uppercase mb-1.5">
          Word of the Day
        </h2>
        <p className="text-[10px] text-primary/40 font-medium tracking-wide uppercase">{today}</p>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center text-center mb-8">
        <div className="text-6xl text-primary mb-3 font-serif">
          {wordData.ar}
        </div>
        <p className="text-sm font-bold text-primary/70 mb-5 tracking-widest uppercase">
          ({wordData.en})
        </p>
        <p className="text-sm text-primary/60 leading-relaxed px-2">
          {wordData.def}
        </p>
      </div>

      {/* Footer Button */}
      <button className="w-full py-3 border border-primary/10 text-primary/80 font-semibold text-sm rounded-full hover:bg-primary hover:text-white transition-colors duration-300">
        Learn More
      </button>
    </div>
  );
};

export default WordOfTheDayCard;