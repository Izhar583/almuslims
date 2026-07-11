"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  HiOutlineHome,
  HiOutlineArrowLeft,
  HiOutlineBookOpen,
  HiOutlineAcademicCap,
  HiOutlineSparkles,
  HiOutlineScale,
  HiOutlineHeart,
  HiOutlineEnvelope,
  HiOutlineArrowRight,
  HiOutlineQueueList,
} from "react-icons/hi2";

const navLinks = [
  {
    title: "Quran",
    desc: "Read and explore the words of Allah.",
    link: "/quran",
    icon: <HiOutlineBookOpen className="w-5 h-5 text-primary" />,
  },
  {
    title: "Duas & Azkar",
    desc: "Supplications for every moment of life.",
    link: "/dua-collection",
    icon: <HiOutlineHeart className="w-5 h-5 text-primary" />,
  },
  {
    title: "Seerah",
    desc: "Discover the life of our beloved Prophet ﷺ.",
    link: "/seerah",
    icon: <HiOutlineAcademicCap className="w-5 h-5 text-primary" />,
  },
  {
    title: "Blog",
    desc: "Islamic articles on a wide range of topics.",
    link: "/blog",
    icon: <HiOutlineQueueList className="w-5 h-5 text-primary" />,
  },
  {
    title: "Aqeedah",
    desc: "Strengthen your foundational belief in Allah.",
    link: "/blog?category=aqeedah",
    icon: <HiOutlineSparkles className="w-5 h-5 text-primary" />,
  },
  {
    title: "Fiqh",
    desc: "Islamic rulings for modern-day life.",
    link: "/blog?category=fiqh",
    icon: <HiOutlineScale className="w-5 h-5 text-primary" />,
  },
];

export default function NotFound() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-[#FAF7F2] font-body text-zinc-800">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-8 lg:px-12 py-16 sm:py-24 space-y-24">

        {/* ── HERO: 404 + SVG Illustration ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

          {/* Left: Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-5 space-y-8 text-center lg:text-left"
          >
            {/* Big 404 */}
            <div>
              <h1 className="font-heading leading-none font-black text-[#0A3A2F]"
                style={{ fontSize: "clamp(6rem, 18vw, 10rem)" }}
              >
                404
              </h1>
              <h2 className="font-heading text-2xl sm:text-4xl font-bold text-primary mt-2">
                Page Not Found
              </h2>
              <div className="w-20 h-1.5 bg-secondary mt-4 mx-auto lg:mx-0 rounded-full" />
            </div>

            <p className="text-base text-zinc-500 leading-relaxed max-w-sm mx-auto lg:mx-0">
              The page you&apos;re looking for doesn&apos;t exist or has been moved.
              <br />
              <span className="font-semibold text-primary/70">Let&apos;s get you back on the right path.</span>
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link
                href="/"
                className="inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-[#0A3A2F] text-white font-bold text-sm rounded-2xl hover:bg-[#0d4a3b] transition-all shadow-xl shadow-primary/20 active:scale-95"
              >
                <HiOutlineHome className="w-5 h-5" /> Go to Homepage
              </Link>
              <button
                onClick={() => router.back()}
                className="inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-white border border-gray-200 text-gray-700 font-bold text-sm rounded-2xl hover:bg-gray-50 transition-all shadow-sm active:scale-95"
              >
                <HiOutlineArrowLeft className="w-5 h-5" /> Go Back
              </button>
            </div>
          </motion.div>

          {/* Right: SVG Scene */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="lg:col-span-7 flex justify-center items-center"
          >
            <div className="relative w-full max-w-[520px] mx-auto">
              <svg
                viewBox="0 0 520 480"
                className="w-full h-auto drop-shadow-2xl"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <radialGradient id="bgGrad" cx="50%" cy="40%" r="55%">
                    <stop offset="0%" stopColor="#d1fae5" />
                    <stop offset="100%" stopColor="#a7f3d0" stopOpacity="0.3" />
                  </radialGradient>
                  <filter id="cardShadow" x="-5%" y="-5%" width="110%" height="130%">
                    <feDropShadow dx="0" dy="4" stdDeviation="5" floodOpacity="0.12" />
                  </filter>
                  <filter id="domeShadow">
                    <feDropShadow dx="0" dy="6" stdDeviation="8" floodOpacity="0.2" />
                  </filter>
                </defs>

                {/* Arch Background */}
                <path
                  d="M50 260C50 144 144 50 260 50C376 50 470 144 470 260V460H50V260Z"
                  fill="url(#bgGrad)"
                />
                <path
                  d="M50 260C50 144 144 50 260 50C376 50 470 144 470 260V460H50V260Z"
                  stroke="#FAF7F2"
                  strokeWidth="8"
                />

                {/* Stars */}
                <circle cx="120" cy="110" r="2" fill="white" opacity="0.7" />
                <circle cx="200" cy="80" r="1.5" fill="white" opacity="0.5" />
                <circle cx="360" cy="100" r="2.5" fill="white" opacity="0.7" />
                <circle cx="420" cy="150" r="1.5" fill="white" opacity="0.4" />
                <circle cx="100" cy="180" r="1" fill="white" opacity="0.5" />

                {/* Crescent Moon */}
                <path
                  d="M350 75C350 60 339 48 325 48C322 48 319 48.5 316.5 49.5C325 53.5 331 62 331 72.5C331 83 325 91.5 316.5 95.5C319 96.5 322 97 325 97C339 97 350 85 350 75Z"
                  fill="white"
                  opacity="0.9"
                />

                {/* Distant Minarets */}
                <rect x="90" y="220" width="14" height="200" rx="3" fill="#FAF7F2" opacity="0.4" />
                <polygon points="97,210 90,220 104,220" fill="#FAF7F2" opacity="0.4" />
                <rect x="420" y="240" width="14" height="200" rx="3" fill="#FAF7F2" opacity="0.4" />
                <polygon points="427,230 420,240 434,240" fill="#FAF7F2" opacity="0.4" />

                {/* Main Mosque Dome */}
                <g filter="url(#domeShadow)">
                  <path
                    d="M175 460V310C175 248 215 215 260 215C305 215 345 248 345 310V460H175Z"
                    fill="#0A3A2F"
                  />
                  {/* Arched windows on mosque */}
                  <path d="M215 380C215 368 222 360 230 360C238 360 245 368 245 380V420H215V380Z" fill="#D48C46" opacity="0.25" />
                  <path d="M275 380C275 368 282 360 290 360C298 360 305 368 305 380V420H275V380Z" fill="#D48C46" opacity="0.25" />
                  {/* Finial + globe */}
                  <line x1="260" y1="175" x2="260" y2="215" stroke="#D48C46" strokeWidth="3" />
                  <circle cx="260" cy="175" r="6" fill="#D48C46" />
                  {/* Dome details */}
                  <path d="M215 310C215 280 235 260 260 260C285 260 305 280 305 310" stroke="#D48C46" strokeWidth="1.5" strokeDasharray="4 3" opacity="0.5" />
                </g>

                {/* Ground path */}
                <ellipse cx="260" cy="455" rx="100" ry="8" fill="#0A3A2F" opacity="0.07" />

                {/* Foliage */}
                <ellipse cx="148" cy="430" rx="22" ry="30" fill="#10623F" opacity="0.5" />
                <ellipse cx="135" cy="430" rx="16" ry="24" fill="#0A3A2F" opacity="0.35" />
                <ellipse cx="380" cy="430" rx="20" ry="28" fill="#10623F" opacity="0.5" />
                <ellipse cx="393" cy="432" rx="14" ry="22" fill="#0A3A2F" opacity="0.35" />

                {/* Wooden Sign Post */}
                <rect x="388" y="265" width="14" height="175" rx="3" fill="#92632A" />
                <rect x="390" y="267" width="4" height="175" rx="2" fill="#A0722A" opacity="0.3" />
                {/* Roots */}
                <path d="M388 440 Q380 455 370 460" stroke="#92632A" strokeWidth="3.5" strokeLinecap="round" />
                <path d="M402 440 Q410 455 420 458" stroke="#92632A" strokeWidth="3.5" strokeLinecap="round" />

                {/* Sign 1 — Quran (left arrow) */}
                <g filter="url(#cardShadow)">
                  <path d="M395 280H295L280 295L295 310H395V280Z" fill="#D48C46" rx="4" />
                  <text x="336" y="299" fill="white" fontSize="11" fontWeight="800" fontFamily="sans-serif" textAnchor="middle" letterSpacing="1">QURAN</text>
                  <polygon points="289,295 280,295 289,288" fill="white" opacity="0.3" />
                </g>

                {/* Sign 2 — Articles (right arrow) */}
                <g filter="url(#cardShadow)">
                  <path d="M395 326H485L500 341L485 356H395V326Z" fill="#D48C46" />
                  <text x="446" y="344" fill="white" fontSize="11" fontWeight="800" fontFamily="sans-serif" textAnchor="middle" letterSpacing="1">ARTICLES</text>
                  <polygon points="491,341 500,341 491,348" fill="white" opacity="0.3" />
                </g>

                {/* Sign 3 — Ask a Scholar (right arrow) */}
                <g filter="url(#cardShadow)">
                  <path d="M395 372H488L503 387L488 402H395V372Z" fill="#0A3A2F" />
                  <text x="446" y="390" fill="white" fontSize="9.5" fontWeight="800" fontFamily="sans-serif" textAnchor="middle" letterSpacing="0.5">ASK A SCHOLAR</text>
                  <polygon points="494,387 503,387 494,394" fill="white" opacity="0.2" />
                </g>
              </svg>
            </div>
          </motion.div>
        </div>

        {/* ── SUGGESTIONS GRID ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.6 }}
          className="space-y-10"
        >
          <div className="text-center space-y-3">
            <h3 className="font-heading text-2xl sm:text-3xl font-bold text-primary">
              You might be looking for
            </h3>
            <div className="flex items-center justify-center gap-3">
              <div className="w-12 h-0.5 bg-secondary/50 rounded-full" />
              <HiOutlineBookOpen className="w-5 h-5 text-secondary" />
              <div className="w-12 h-0.5 bg-secondary/50 rounded-full" />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {navLinks.map((card, idx) => (
              <Link
                key={idx}
                href={card.link}
                className="group bg-white border border-gray-100 rounded-3xl p-7 shadow-sm hover:shadow-lg hover:border-primary/15 hover:-translate-y-1 transition-all duration-300 flex flex-col gap-5"
              >
                <div className="w-12 h-12 rounded-2xl bg-primary/5 flex items-center justify-center group-hover:bg-primary/10 group-hover:scale-110 transition-all duration-300">
                  {card.icon}
                </div>
                <div className="flex-1 space-y-1.5">
                  <h4 className="font-bold text-sm text-primary uppercase tracking-widest group-hover:text-secondary transition-colors">
                    {card.title}
                  </h4>
                  <p className="text-[13px] text-zinc-500 leading-relaxed">{card.desc}</p>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] font-black uppercase tracking-widest text-primary group-hover:text-secondary transition-colors">
                  Navigate <HiOutlineArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </motion.div>
      </div>
    </main>
  );
}
