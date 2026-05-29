import React from 'react';
import Link from 'next/link';

const categories = [
  { name: "Quran", href: "/quran", desc: "Read, listen and understand", icon: "📖" },
  { name: "Hadith", href: "/hadith", desc: "Authentic sayings of the Prophet", icon: "📜" },
  { name: "Dua", href: "/dua", desc: "Supplications for daily life", icon: "🤲" },
  { name: "Prayer", href: "/prayer", desc: "Salah timings and guides", icon: "🕌" },
  { name: "Seerah", href: "/seerah", desc: "Life of the Prophet Muhammad", icon: "👤" },
  { name: "Islamic", href: "/calendar", desc: "Hijri dates and events", icon: "📅" },
];

export default function CategoriesGrid() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-6 my-10">
      {categories.map((cat) => (
        <Link 
          key={cat.name} 
          href={cat.href} 
          className="group flex flex-col items-center p-6 border rounded-xl hover:bg-emerald-50 transition-all border-gray-100 shadow-sm"
        >
          <span className="text-4xl mb-3">{cat.icon}</span>
          <h3 className="font-bold text-gray-800">{cat.name}</h3>
          <p className="text-gray-500 text-sm text-center">{cat.desc}</p>
        </Link>
      ))}
    </div>
  );
}