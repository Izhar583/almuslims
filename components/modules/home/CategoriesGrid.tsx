import React from 'react';
import Link from 'next/link';

const categories = [
  {
    name: "QURAN",
    href: "/quran",
    desc: "Read, listen and understand",
    icon: (
      <svg className="w-14 h-14" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M32 44C32 44 24 41 12 41V15C24 15 32 20 32 20" stroke="#064E3B" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M32 44C32 44 40 41 52 41V15C40 15 32 20 32 20" stroke="#064E3B" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M32 20V44" stroke="#064E3B" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M16 22C21 22 26 23.5 32 26" stroke="#D97706" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M48 22C43 22 38 23.5 32 26" stroke="#D97706" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M16 28C21 28 26 29.5 32 32" stroke="#D97706" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M48 28C43 28 38 29.5 32 32" stroke="#D97706" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M14 48L24 41L20 54" stroke="#064E3B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M50 48L40 41L44 54" stroke="#064E3B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M22 51L42 51" stroke="#D97706" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    )
  },
  {
    name: "HADITH",
    href: "/hadith",
    desc: "Authentic sayings of the Prophet ﷺ",
    icon: (
      <svg className="w-14 h-14" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M32 8L38 20L51 22L41 31L44 44L32 37L20 44L23 31L13 22L26 20L32 8Z" fill="#FDE68A" stroke="#D97706" strokeWidth="2" strokeLinejoin="round"/>
        <circle cx="32" cy="28" r="12" fill="#064E3B"/>
        <path d="M33 22C30.2386 22 28 24.2386 28 27C28 29.7614 30.2386 32 33 32C33.642 32 34.2555 31.8789 34.819 31.6577C33.8828 33.0238 32.2741 33.9167 30.4583 33.9167C27.4438 33.9167 25 31.4728 25 28.4583C25 25.4438 27.4438 23 30.4583 23C31.5794 23 32.6215 23.3387 33.4542 23.9056C33.1594 22.8021 33.1118 22.3739 33 22Z" fill="#FCD34D"/>
        <path d="M36 29L37.5 26.5L40 28L38.5 30.5L36 29Z" fill="#FCD34D"/>
      </svg>
    )
  },
  {
    name: "DUAS & AZKAR",
    href: "/duas",
    desc: "Supplications for every moment",
    icon: (
      <svg className="w-14 h-14" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M22 46C22 46 16 38 16 30C16 22 20 18 24 18C28 18 30 24 32 28C34 24 36 18 40 18C44 18 48 22 48 30C48 38 42 46 42 46" stroke="#D97706" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M26 24V14C26 12 28 10 30 10C32 10 32 12 32 14V28" stroke="#D97706" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M38 24V14C38 12 36 10 34 10C32 10 32 12 32 14" stroke="#D97706" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="32" cy="5" r="1.5" fill="#064E3B"/>
        <circle cx="22" cy="8" r="1.5" fill="#064E3B"/>
        <circle cx="42" cy="8" r="1.5" fill="#064E3B"/>
        <path d="M22 52H42" stroke="#064E3B" strokeWidth="2.5" strokeLinecap="round"/>
      </svg>
    )
  },
  {
    name: "SEERAH",
    href: "/seerah",
    desc: "Life of the Prophet ﷺ",
    icon: (
      <svg className="w-14 h-14" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M16 48V32C16 24 24 16 32 16C40 16 48 24 48 32V48" stroke="#064E3B" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="#ECFDF5"/>
        <path d="M32 16V8M32 8L28 12M32 8L36 12" stroke="#D97706" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12 48H52" stroke="#064E3B" strokeWidth="2.5" strokeLinecap="round"/>
        <path d="M18 48V20L15 16L12 20V48" stroke="#064E3B" strokeWidth="2" strokeLinejoin="round" fill="#fff"/>
        <path d="M46 48V20L49 16L52 20V48" stroke="#064E3B" strokeWidth="2" strokeLinejoin="round" fill="#fff"/>
        <path d="M28 48V40C28 36 36 36 36 40V48" stroke="#064E3B" strokeWidth="2" strokeLinejoin="round" fill="#D97706"/>
      </svg>
    )
  },
  {
    name: "ARTICLES",
    href: "/articles",
    desc: "Insightful reads on Islamic topics",
    icon: (
      <svg className="w-14 h-14" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="18" y="12" width="28" height="40" rx="3" stroke="#D97706" strokeWidth="2.5" fill="#FFFBEB" strokeLinejoin="round"/>
        <path d="M24 22H40" stroke="#064E3B" strokeWidth="2" strokeLinecap="round"/>
        <path d="M24 30H40" stroke="#064E3B" strokeWidth="2" strokeLinecap="round"/>
        <path d="M24 38H34" stroke="#064E3B" strokeWidth="2" strokeLinecap="round"/>
        <path d="M14 20H22V42L18 38L14 42V20Z" fill="#064E3B"/>
      </svg>
    )
  },
  {
    name: "99 NAMES",
    href: "/names",
    desc: "Discover the beautiful Names of Allah",
    icon: (
      <svg className="w-14 h-14" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M32 6C36 6 39 8 43 9C47 10 50 14 52 18C54 22 56 26 56 32C56 38 54 42 52 46C50 50 47 54 43 55C39 56 36 58 32 58C28 58 25 56 21 55C17 54 14 50 12 46C10 42 8 38 8 32C8 26 10 22 12 18C14 14 17 10 21 9C25 8 28 6 32 6Z" stroke="#064E3B" strokeWidth="2" strokeDasharray="4 4" fill="#ECFDF5"/>
        <circle cx="32" cy="32" r="18" stroke="#D97706" strokeWidth="1.5" fill="none"/>
        <text x="32" y="38" fontSize="20" fontWeight="bold" fill="#064E3B" textAnchor="middle" fontFamily="serif">99</text>
      </svg>
    )
  }
];

export default function CategoriesGrid() {
  return (
    <section className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8 mt-12 mb-16 relative z-20">
      <div className="flex justify-between items-center mb-6 px-1">
        <h2 className="text-emerald-950 text-lg md:text-xl font-serif font-semibold uppercase tracking-widest">
          Explore By Category
        </h2>
        <Link 
          href="/categories" 
          className="text-gray-500 hover:text-emerald-700 text-sm font-medium flex items-center gap-2 group transition-colors"
        >
          View all categories
          <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
        </Link>
      </div>

      <div className="flex overflow-x-auto pb-4 -mx-4 px-4 sm:mx-0 sm:px-0 gap-4 xl:grid xl:grid-cols-6 xl:gap-5 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
        {categories.map((cat) => (
          <Link 
            key={cat.name} 
            href={cat.href} 
            className="flex-shrink-0 w-[270px] xl:w-auto flex items-center gap-4 p-4 rounded-[1.25rem] bg-white border border-emerald-900/5 shadow-sm hover:border-emerald-900/10 hover:-translate-y-0.5 transition-all duration-300 group"
          >
            <div className="flex-shrink-0 flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
              {cat.icon}
            </div>
            <div className="flex flex-col justify-center">
              <h3 className="font-bold text-gray-800 text-[13px] uppercase tracking-wide group-hover:text-emerald-800 transition-colors">{cat.name}</h3>
              <p className="text-gray-500 text-[12px] leading-tight mt-1">{cat.desc}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}