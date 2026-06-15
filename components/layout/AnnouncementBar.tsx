"use client"; // Kyunki hum useState use kar rahe hain, isliye Next.js ko batana zaroori ha

import React, { useState, useEffect } from "react";
import { FaYoutube, FaFacebook, FaInstagram } from "react-icons/fa"; // Icons import kiye

// Quranic Verses ka array jo rotate karega
const quranicVerses = [
  "Indeed, in the remembrance of Allah do hearts find rest. (13:28)",
  "And He is with you wherever you are. (57:4)",
  "So remember Me; I will remember you. (2:152)",
];

export default function AnnouncementBar() {
  // useState hook jo verse ka index yaad rakhega
  const [currentIndex, setCurrentIndex] = useState(0);

  // Har 5 seconds baad verse ko khud badalne ke liye logic
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % quranicVerses.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full bg-secondary text-primary py-2 px-6 font-body text-xs md:text-sm flex flex-col md:flex-row justify-between items-center gap-2 shadow-sm">
      
      {/* Left Side: Rotating Quranic Verse */}
      <div className="font-medium animate-fade-in transition-all duration-500 text-center md:text-left">
        ✨ {quranicVerses[currentIndex]}
      </div>

      {/* Right Side: Links + Social Icons */}
      <div className="flex items-center gap-6">
        {/* Navigation Links */}
        <div className="flex gap-4 font-semibold">
          <a href="#about" className="hover:underline">About Us</a>
        </div>

        {/* Social Media Icons Divider Line */}
        <div className="h-4 w-px bg-primary/30 hidden md:block" />

        {/* Social Icons */}
        <div className="flex items-center gap-3 text-base">
          <a href="https://youtube.com" target="_blank" rel="noreferrer" className="hover:text-red-700 transition-colors">
            <FaYoutube />
          </a>
          <a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:text-blue-700 transition-colors">
            <FaFacebook />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-pink-700 transition-colors">
            <FaInstagram />
          </a>
        </div>
      </div>

    </div>
  );
}