"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  FaHome, 
  FaArrowLeft, 
  FaBookOpen, 
  FaBook,
  FaClock, 
  FaStar,
  FaEnvelope, 
  FaChevronRight 
} from "react-icons/fa";
import { motion } from "framer-motion";

export default function NotFound() {
  const router = useRouter();

  // Cards for "You might be looking for"
  const navigationCards = [
    {
      title: "Quran",
      desc: "Read and explore the words of Allah.",
      link: "/quran",
      icon: <FaBook className="text-[#0A3A2F]" size={20} />
    },
    {
      title: "Duas & Azkar",
      desc: "Supplications for every moment of life.",
      link: "/duas",
      icon: <FaStar className="text-[#0A3A2F]" size={20} />
    },
    {
      title: "Seerah",
      desc: "Discover the life of our beloved Prophet ﷺ.",
      link: "/seerah",
      icon: <FaBookOpen className="text-[#0A3A2F]" size={20} />
    },
    {
      title: "Articles",
      desc: "Islamic articles on a wide range of topics.",
      link: "/articles",
      icon: <FaBookOpen className="text-[#0A3A2F]" size={20} />
    },
    {
      title: "Prayer Times",
      desc: "Check accurate daily prayer timings.",
      link: "/prayer-times",
      icon: <FaClock className="text-[#0A3A2F]" size={20} />
    },
    {
      title: "99 Names",
      desc: "Discover the beautiful Names of Allah.",
      link: "/names",
      icon: <FaStar className="text-[#0A3A2F]" size={20} />
    }
  ];

  return (
    <main className="min-h-screen bg-[#FAF7F2] py-12 sm:py-16 font-body text-zinc-800">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* ── TOP HERO SECTION: 404 MESSAGE & SVG ILLUSTRATION ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Side: 404 Text */}
          <div className="lg:col-span-5 space-y-6 text-center lg:text-left">
            <h1 className="font-heading text-7xl sm:text-8xl lg:text-9xl font-bold text-primary leading-none">
              404
            </h1>
            <div className="space-y-2">
              <h2 className="font-heading text-2xl sm:text-3xl font-bold text-primary">
                Page Not Found
              </h2>
              <div className="w-16 h-1 bg-secondary mx-auto lg:mx-0" />
            </div>
            
            <p className="text-sm sm:text-base text-zinc-500 leading-relaxed max-w-md mx-auto lg:mx-0">
              The page you're looking for doesn't exist or has been moved. Let's get you back on the right path.
            </p>
            
            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-2">
              <Link
                href="/"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-primary text-white font-bold text-sm rounded-xl hover:bg-primaryHover transition-all shadow cursor-pointer"
              >
                <FaHome /> Go to Homepage
              </Link>
              <button
                onClick={() => router.back()}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-white border border-[#EBE3D5] text-[#1F2926] font-bold text-sm rounded-xl hover:bg-zinc-50 transition-all shadow cursor-pointer"
              >
                <FaArrowLeft /> Go Back
              </button>
            </div>
          </div>
          
          {/* Right Side: Mosque & Signpost Illustration */}
          <div className="lg:col-span-7 flex justify-center items-center">
            <div className="relative w-full max-w-[500px] aspect-square">
              <svg viewBox="0 0 500 500" className="w-full h-full drop-shadow-2xl" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Arch Background Frame */}
                <path d="M50 250C50 139.543 139.543 50 250 50C360.457 50 450 139.543 450 250V450H50V250Z" fill="url(#arch-gradient)" />
                <path d="M50 250C50 139.543 139.543 50 250 50C360.457 50 450 139.543 450 250V450H50V250Z" stroke="#FAF7F2" strokeWidth="6" />
                
                {/* Stars and Crescent Moon */}
                <circle cx="340" cy="110" r="1.5" fill="white" opacity="0.6"/>
                <circle cx="160" cy="140" r="2" fill="white" opacity="0.8"/>
                <circle cx="200" cy="90" r="1" fill="white" opacity="0.4"/>
                <path d="M320 80C320 66.1929 308.807 55 295 55C292.083 55 289.283 55.5001 286.683 56.4168C296.483 60.9168 303.333 70.5833 303.333 81.9167C303.333 93.2501 296.483 102.917 286.683 107.417C289.283 108.333 292.083 108.833 295 108.833C308.807 108.833 320 97.6404 320 83.8333V80Z" fill="#FAF7F2" opacity="0.9"/>
                
                {/* Mosque Minarets */}
                <path d="M110 400V200H120V400H110ZM115 180L118 195H112L115 180Z" fill="#FAF7F2" opacity="0.4"/>
                <path d="M380 400V220H390V400H380ZM385 200L388 215H382L385 200Z" fill="#FAF7F2" opacity="0.4"/>
                
                {/* Green Mosque Dome (Masjid an-Nabawi style) */}
                <path d="M170 400V300C170 240 210 210 250 210C290 210 330 240 330 300V400H170Z" fill="#0A3A2F" />
                <path d="M250 170L253 195H247L250 170Z" fill="#D48C46" />
                <circle cx="250" cy="205" r="4" fill="#D48C46" />
                <path d="M210 300C210 270 230 250 250 250C270 250 290 270 290 300" stroke="#D48C46" strokeWidth="2" strokeDasharray="3 3"/>
                
                {/* Walking Path */}
                <path d="M210 400L240 340H260L290 400H210Z" fill="#FAF7F2" opacity="0.3" />
                
                {/* Wooden Signpost (Main post) */}
                <rect x="340" y="250" width="12" height="180" rx="2" fill="#8B5A2B" />
                <path d="M334 430H358" stroke="#8B5A2B" strokeWidth="4" strokeLinecap="round"/>
                
                {/* Sign 1: Quran (pointing left) */}
                <g filter="url(#shadow)">
                  <path d="M346 270H250L240 285L250 300H346V270Z" fill="#D48C46" />
                  <text x="295" y="289" fill="white" fontSize="11" fontWeight="bold" fontFamily="sans-serif" textAnchor="middle">QURAN</text>
                  <circle cx="258" cy="285" r="1.5" fill="white"/>
                </g>

                {/* Sign 2: Articles (pointing right) */}
                <g filter="url(#shadow)">
                  <path d="M334 315H420L430 330L420 345H334V315Z" fill="#D48C46" />
                  <text x="377" y="334" fill="white" fontSize="11" fontWeight="bold" fontFamily="sans-serif" textAnchor="middle">ARTICLES</text>
                  <circle cx="412" cy="330" r="1.5" fill="white"/>
                </g>

                {/* Sign 3: Duas & Azkar (pointing left) */}
                <g filter="url(#shadow)">
                  <path d="M346 360H230L220 375L230 390H346V360Z" fill="#0A3A2F" />
                  <text x="285" y="379" fill="white" fontSize="9" fontWeight="bold" fontFamily="sans-serif" textAnchor="middle">DUAS & AZKAR</text>
                  <circle cx="238" cy="375" r="1.5" fill="white"/>
                </g>

                {/* Definitions */}
                <defs>
                  <linearGradient id="arch-gradient" x1="250" y1="50" x2="250" y2="450" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#ECFDF5" />
                    <stop offset="100%" stopColor="#D1FAE5" />
                  </linearGradient>
                  <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
                    <feDropShadow dx="1" dy="1" stdDeviation="1.5" floodOpacity="0.2"/>
                  </filter>
                </defs>
              </svg>
            </div>
          </div>

        </div>

        {/* ── MIDDLE SECTION: SUGGESTIONS GRID ── */}
        <div className="space-y-8">
          <div className="text-center space-y-2">
            <h3 className="font-heading text-xl sm:text-2xl font-bold text-primary flex items-center justify-center gap-2">
              You might be looking for
            </h3>
            <div className="w-16 h-0.5 bg-secondary mx-auto" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {navigationCards.map((card, idx) => (
              <Link 
                key={idx}
                href={card.link}
                className="bg-white border border-[#EBE3D5] rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-primary/20 transition-all duration-300 flex items-start gap-4 group"
              >
                <div className="w-10 h-10 rounded-xl bg-[#0A3A2F]/5 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform duration-300">
                  {card.icon}
                </div>
                <div className="space-y-1 flex-1">
                  <h4 className="font-bold text-sm text-primary group-hover:text-secondary transition-colors uppercase tracking-wide">
                    {card.title}
                  </h4>
                  <p className="text-xs text-zinc-500 leading-normal font-medium">
                    {card.desc}
                  </p>
                  <div className="pt-2 flex items-center gap-1 text-[10px] font-bold text-primary group-hover:text-secondary transition-colors">
                    Navigate <FaChevronRight size={8} className="group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* ── BOTTOM BANNER: CONTACT US ── */}
        <div className="bg-[#FAF7F2] border border-[#EBE3D5] rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm">
          <div className="flex items-center gap-4 text-center sm:text-left flex-col sm:flex-row">
            {/* SVG Lamp icon */}
            <div className="w-12 h-12 text-[#0A3A2F] shrink-0">
              <svg viewBox="0 0 100 100" fill="none" className="w-full h-full" stroke="currentColor">
                <path d="M50 15V30M35 50C35 35 65 35 65 50C65 60 55 65 55 75H45C45 65 35 60 35 50Z" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M42 75V85H58V75H42Z" fill="currentColor"/>
                <path d="M47 85L38 95H62L53 85" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div className="space-y-1">
              <h4 className="font-heading text-base font-bold text-primary">
                Still can't find what you're looking for?
              </h4>
              <p className="text-xs text-zinc-500 font-medium leading-relaxed">
                Our support team is here to assist you with any questions or issues.
              </p>
            </div>
          </div>
          
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3.5 bg-primary text-white font-bold text-xs rounded-xl hover:bg-primaryHover transition-all shadow shrink-0 cursor-pointer"
          >
            <FaEnvelope /> Contact Us
          </Link>
        </div>

      </div>
    </main>
  );
}
