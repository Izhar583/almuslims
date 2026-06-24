"use client"; 
import Link from "next/link";
import React, { useState, useEffect } from "react";
const quranicVerses = [
  "Indeed, in the remembrance of Allah do hearts find rest. (13:28)",
  "And He is with you wherever you are. (57:4)",
  "So remember Me; I will remember you. (2:152)",
];

export default function AnnouncementBar() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % quranicVerses.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full bg-secondary text-primary py-2 px-6 font-body text-xs md:text-sm flex flex-col md:flex-row justify-between items-center gap-2 shadow-sm">
      
      <div className="font-medium animate-fade-in transition-all duration-500 text-center md:text-left">
        ✨ {quranicVerses[currentIndex]}
      </div>
      <div className="flex items-center gap-6">
        <div className="flex gap-4 font-semibold">
          <Link href="/about" className="hover:underline">About Us</Link>
        </div>
        </div>
    </div>
  );
}