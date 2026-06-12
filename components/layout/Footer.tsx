import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="w-full bg-primary text-white mt-auto border-t border-white/10 relative overflow-hidden font-body">
      
      {/* Main 4-Column Grid Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10">
        
        {/* Column 1: Logo & Description */}
        <div className="space-y-4">
          <h3 className="font-heading text-2xl font-bold text-secondary">AlMuslims</h3>
          <p className="text-sm text-white/70 leading-relaxed">
            Your trusted digital companion for learning Islamic values, reading the Quran, and exploring Hadith.
          </p>
        </div>

        {/* Column 2: Quick Links */}
        <div>
          <h4 className="text-sm font-semibold text-secondary uppercase tracking-wider mb-4">Quick Links</h4>
          <ul className="space-y-2 text-sm text-white/80">
            <li><Link href="/" className="hover:underline">Home</Link></li>
            <li><Link href="/about" className="hover:underline">About Us</Link></li>
            <li><Link href="/scholar" className="hover:underline">Ask a Scholar</Link></li>
          </ul>
        </div>

        {/* Column 3: Categories */}
        <div>
          <h4 className="text-sm font-semibold text-secondary uppercase tracking-wider mb-4">Categories</h4>
          <ul className="space-y-2 text-sm text-white/80">
            <li><Link href="/quran" className="hover:underline">Holy Quran</Link></li>
            <li><Link href="/hadith" className="hover:underline">Hadith Books</Link></li>
            <li><Link href="/prayer-times" className="hover:underline">Prayer Timings</Link></li>
          </ul>
        </div>

        {/* Column 4: Contact & Resources */}
        <div>
          <h4 className="text-sm font-semibold text-secondary uppercase tracking-wider mb-4">Contact</h4>
          <p className="text-sm text-white/70 mb-2">Have questions? Reach out to us.</p>
          <p className="text-sm text-white/90 font-medium">support@almuslims.com</p>
        </div>

      </div>

      {/* Copyright Bar */}
      <div className="w-full border-t border-white/10 py-4 text-center text-xs text-white/50 relative z-10">
        © {new Date().getFullYear()} AlMuslims. All rights reserved.
      </div>

    </footer>
  );
}