"use client"; // Animations aur interactive elements ke liye client component zaroori ha

import React from "react";
import Image from "next/image"; // Next.js Optimized Image component
import { motion } from "framer-motion"; // Animation library

export default function HeroSection() {
  return (
    <section className="relative w-full min-h-[80vh] flex items-center bg-bg px-4 sm:px-6 lg:px-8 py-12 md:py-20 overflow-hidden">
      
      {/* Main Two-column Responsive Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full z-10">
        
        {/* Left Column: Text & Buttons (Animated) */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }} // Shuru me invisible aur 30px neeche
          animate={{ opacity: 1, y: 0 }}  // Load hone par visible aur apni jagah par
          transition={{ duration: 0.6 }}   // 0.6 seconds ka animation time
          className="space-y-6 text-center lg:text-left"
        >
          <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl font-bold text-primary leading-tight">
            Authentic Islamic Knowledge <br />
            <span className="text-secondary">For Your Daily Life</span>
          </h1>
          
          <p className="font-body text-base sm:text-lg text-primary/80 max-w-xl mx-auto lg:mx-0 leading-relaxed">
            Explore verified Quranic verses, authentic Hadith books, and accurate prayer timings. Your modern companion for a spiritual journey.
          </p>

          {/* CTA Buttons Group */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-2">
            {/* Filled Green Button */}
            <a 
              href="/resources" 
              className="px-8 py-3.5 bg-primary text-white font-body font-semibold rounded-md shadow-md hover:bg-primary-hover transition-all text-center"
            >
              Explore Resources
            </a>
            {/* White with Orange/Secondary Border Button */}
            <a 
              href="/quran" 
              className="px-8 py-3.5 bg-white text-secondary border-2 border-secondary font-body font-semibold rounded-md hover:bg-secondary/5 transition-all text-center"
            >
              Read Quran
            </a>
          </div>
        </motion.div>

        {/* Right Column: Optimized Kaaba Image */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative w-full aspect-[4/3] sm:aspect-[16/11] lg:aspect-auto lg:h-[480px] rounded-2xl overflow-hidden shadow-2xl border border-primary/10 flex items-center justify-center bg-primary/5"
        >
          <Image 
            src="/assets/kaaba.png" 
            alt="Beautiful view of Masjid al-Haram and Kaaba" 
            fill
            priority={true} 
            className="object-cover object-bottom select-none" 
            sizes="(max-w-1024px) 100vw, 50vw"
          />
        </motion.div>

      </div>

      {/* Decorative Background Element */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/5 rounded-l-full blur-3xl -z-10 hidden lg:block" />
    </section>
  );
}