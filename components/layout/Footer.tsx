import React from "react";
import Link from "next/link";
import Image from "next/image";
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube, FaEnvelope, FaPhoneAlt, FaMapMarkerAlt, FaChevronRight } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="w-full bg-[#063327] text-white mt-auto border-t border-white/5 relative overflow-hidden font-body">
      
      {/* Background Mosque Silhouette (Optional decorative touch) */}
      <div className="absolute bottom-0 right-0 opacity-10 pointer-events-none">
        <svg width="400" height="150" viewBox="0 0 400 150" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M350 150V80C350 60 330 50 330 50C330 50 310 60 310 80V150H350Z" fill="currentColor"/>
          <path d="M280 150V40C280 20 250 10 250 10C250 10 220 20 220 40V150H280Z" fill="currentColor"/>
          <path d="M190 150V60C190 45 175 35 175 35C175 35 160 45 160 60V150H190Z" fill="currentColor"/>
          <path d="M100 150V90C100 75 85 65 85 65C85 65 70 75 70 90V150H100Z" fill="currentColor"/>
          <path d="M250 5L255 15H245L250 5Z" fill="currentColor"/>
          <path d="M175 25L180 35H170L175 25Z" fill="currentColor"/>
        </svg>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 relative z-10">
        
        {/* Column 1: Logo, Description & Socials */}
        <div className="space-y-6 lg:pr-4">
          <Link href="/" className="flex flex-col items-start gap-2 group w-fit">
            <div className="bg-white/95 p-2 rounded-xl shadow-sm transition-transform duration-300 group-hover:scale-105">
              <Image 
                src="/logo.png" 
                alt="AlMuslims Logo" 
                width={100} 
                height={100} 
                className="h-[80px] w-auto object-contain"
              />
            </div>
            <div className="flex flex-col mt-2">
              <span className="font-logo text-3xl font-bold leading-tight text-white tracking-wide">
                AlMuslims
              </span>
              <span className="text-[9px] tracking-[0.25em] text-secondary uppercase mt-1 font-bold">
                Authentic Islamic Knowledge
              </span>
            </div>
          </Link>
          <p className="text-sm text-white/70 leading-relaxed font-light">
            Your trusted source for authentic Islamic knowledge. Learn, reflect, and grow — for the sake of Allah.
          </p>
          <div className="flex items-center gap-4 pt-2">
            <a href="#" className="w-8 h-8 rounded-full flex items-center justify-center bg-white/5 hover:bg-[#1877F2] text-white transition-all"><FaFacebookF size={14} /></a>
            <a href="#" className="w-8 h-8 rounded-full flex items-center justify-center bg-white/5 hover:bg-[#1DA1F2] text-white transition-all"><FaTwitter size={14} /></a>
            <a href="#" className="w-8 h-8 rounded-full flex items-center justify-center bg-white/5 hover:bg-[#E4405F] text-white transition-all"><FaInstagram size={14} /></a>
            <a href="#" className="w-8 h-8 rounded-full flex items-center justify-center bg-white/5 hover:bg-[#FF0000] text-white transition-all"><FaYoutube size={14} /></a>
          </div>
        </div>

        {/* Column 2: Quick Links */}
        <div>
          <h4 className="text-[13px] font-bold text-secondary uppercase tracking-widest mb-6">Quick Links</h4>
          <ul className="space-y-5 text-[14px] text-white/80">
            <li><Link href="/" className="hover:text-secondary transition-colors flex items-center gap-2"><FaChevronRight size={10} className="text-secondary"/> Home</Link></li>
            <li><Link href="/about" className="hover:text-secondary transition-colors flex items-center gap-2"><FaChevronRight size={10} className="text-secondary"/> About Us</Link></li>
            <li><Link href="/contact" className="hover:text-secondary transition-colors flex items-center gap-2"><FaChevronRight size={10} className="text-secondary"/> Contact Us</Link></li>
            <li><Link href="/write" className="hover:text-secondary transition-colors flex items-center gap-2"><FaChevronRight size={10} className="text-secondary"/> Write for Us</Link></li>
            <li><Link href="/faq" className="hover:text-secondary transition-colors flex items-center gap-2"><FaChevronRight size={10} className="text-secondary"/> FAQ</Link></li>
            <li><Link href="/privacy" className="hover:text-secondary transition-colors flex items-center gap-2"><FaChevronRight size={10} className="text-secondary"/> Privacy Policy</Link></li>
            <li><Link href="/terms" className="hover:text-secondary transition-colors flex items-center gap-2"><FaChevronRight size={10} className="text-secondary"/> Terms & Conditions</Link></li>
          </ul>
        </div>

        {/* Column 3: Categories */}
        <div>
          <h4 className="text-[13px] font-bold text-secondary uppercase tracking-widest mb-6">Categories</h4>
          <ul className="space-y-5 text-[14px] text-white/80">
            <li><Link href="/quran" className="hover:text-secondary transition-colors flex items-center gap-2"><FaChevronRight size={10} className="text-secondary"/> Quran</Link></li>
            <li><Link href="/duas" className="hover:text-secondary transition-colors flex items-center gap-2"><FaChevronRight size={10} className="text-secondary"/> Duas & Azkar</Link></li>
            <li><Link href="/seerah" className="hover:text-secondary transition-colors flex items-center gap-2"><FaChevronRight size={10} className="text-secondary"/> Seerah</Link></li>
            <li><Link href="/articles" className="hover:text-secondary transition-colors flex items-center gap-2"><FaChevronRight size={10} className="text-secondary"/> Islamic Articles</Link></li>
            <li><Link href="/names" className="hover:text-secondary transition-colors flex items-center gap-2"><FaChevronRight size={10} className="text-secondary"/> 99 Names of Allah</Link></li>
          </ul>
        </div>

        {/* Column 4: Resources */}
        <div>
          <h4 className="text-[13px] font-bold text-secondary uppercase tracking-widest mb-6">Resources</h4>
          <ul className="space-y-5 text-[14px] text-white/80">
            <li><Link href="/prayer-times" className="hover:text-secondary transition-colors flex items-center gap-2"><FaChevronRight size={10} className="text-secondary"/> Prayer Times</Link></li>
            <li><Link href="/qibla" className="hover:text-secondary transition-colors flex items-center gap-2"><FaChevronRight size={10} className="text-secondary"/> Qibla Finder</Link></li>
            <li><Link href="/calendar" className="hover:text-secondary transition-colors flex items-center gap-2"><FaChevronRight size={10} className="text-secondary"/> Islamic Calendar</Link></li>
            <li><Link href="/zakat" className="hover:text-secondary transition-colors flex items-center gap-2"><FaChevronRight size={10} className="text-secondary"/> Zakat Calculator</Link></li>
            <li><Link href="/hajj" className="hover:text-secondary transition-colors flex items-center gap-2"><FaChevronRight size={10} className="text-secondary"/> Hajj & Umrah Guide</Link></li>
            <li><Link href="/halal" className="hover:text-secondary transition-colors flex items-center gap-2"><FaChevronRight size={10} className="text-secondary"/> Halal & Haram</Link></li>
          </ul>
        </div>

        {/* Column 5: Get In Touch */}
        <div>
          <h4 className="text-[13px] font-bold text-secondary uppercase tracking-widest mb-6">Get In Touch</h4>
          <div className="space-y-5 text-[14px] text-white/80">
            <div className="flex items-start gap-4">
              <FaEnvelope className="text-secondary mt-1" size={14} />
              <p>info@almuslims.com</p>
            </div>
            <div className="flex items-start gap-4">
              <FaPhoneAlt className="text-secondary mt-1" size={14} />
              <p>+92 300 1234567</p>
            </div>
            <div className="flex items-start gap-4">
              <FaMapMarkerAlt className="text-secondary mt-1" size={14} />
              <p>Lahore, Pakistan</p>
            </div>
          </div>
        </div>

      </div>

      {/* Copyright Bar */}
      <div className="w-full bg-[#04281E] py-5 border-t border-white/5 relative z-10">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12 text-[13px] text-white/50 flex flex-col md:flex-row justify-between items-center gap-4">
          <p>© {new Date().getFullYear()} AlMuslims.com - All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <span className="opacity-30">|</span>
            <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>

    </footer>
  );
}