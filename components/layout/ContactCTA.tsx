
"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { HiOutlineMail } from "react-icons/hi";

export default function ContactCTA() {
  return (
    <div className="w-full max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8 mb-12 mt-12">
      <div className="bg-[#F8FAF9] rounded-[32px] border border-[#E8EEEB] p-8 sm:px-12 py-10 flex flex-col sm:flex-row items-center justify-between gap-8 relative overflow-hidden group shadow-sm transition-shadow hover:shadow-md">
        
        {/* Left Side: Icon & Text */}
        <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-10 text-center sm:text-left relative z-10">
          <div className="w-16 h-16 sm:w-20 sm:h-20 relative shrink-0">
            <Image 
              src="/assets/lantern.png" 
              alt="Lantern Icon" 
              fill 
              className="object-contain group-hover:scale-110 transition-transform duration-500"
            />
          </div>
          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
              Still can&apos;t find what you&apos;re looking for?
            </h3>
            <p className="text-gray-500 text-sm sm:text-base font-medium">
              Our team is here to help you.
            </p>
          </div>
        </div>

        {/* Right Side: CTA Button */}
        <div className="relative z-10">
          <Link 
            href="/about#contact" 
            className="flex items-center gap-3 px-8 py-4 bg-[#0A3A2F] text-white rounded-2xl font-bold text-sm hover:bg-[#0d4a3c] transition-all shadow-xl shadow-primary/10 active:scale-95"
          >
            <HiOutlineMail className="text-xl" />
            Contact Us
          </Link>
        </div>

        {/* Subtle Background Art */}
        <div className="absolute top-0 right-0 w-64 h-full bg-linear-to-l from-primary/5 to-transparent pointer-events-none"></div>
      </div>
    </div>
  );
}
