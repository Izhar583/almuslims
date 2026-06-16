
"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  HiChevronRight, HiCalendar, HiClock, 
  HiLink, HiOutlineMail
} from "react-icons/hi";
import { FaFacebookF, FaTwitter, FaWhatsapp } from "react-icons/fa";

export default function ArticleDetail() {
  const article = {
    title: "The True Purpose of Our Creation",
    category: "FAITH & BELIEF",
    author: "Shaykh Muhammad Ali",
    authorTitle: "Islamic Scholar & Researcher",
    date: "May 24, 2025",
    readTime: "8 min read",
    heroImage: "/assets/Articles/purpose-hero.webp",
    excerpt: "Discover the profound wisdom behind why Allah created us and how understanding this purpose can transform our lives.",
  };

  return (
    <div className="min-h-screen bg-white pb-20">
      
      {/* Breadcrumbs */}
      <div className="max-w-[1400px] mx-auto px-6 py-6 border-b border-gray-50">
        <nav className="flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          <HiChevronRight />
          <Link href="/articles" className="hover:text-primary transition-colors">Articles</Link>
          <HiChevronRight />
          <span className="text-gray-900">{article.category}</span>
        </nav>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 pt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          {/* Main Article Content */}
          <article className="lg:col-span-8">
            <span className="inline-block px-4 py-1.5 bg-secondary/10 text-secondary text-[10px] font-bold rounded-full mb-6 uppercase tracking-widest">
              {article.category}
            </span>
            <h1 className="font-heading text-4xl md:text-6xl font-bold text-gray-900 leading-tight mb-8">
              {article.title}
            </h1>
            <p className="text-xl text-gray-500 leading-relaxed mb-10">
              {article.excerpt}
            </p>

            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-8 py-8 border-y border-gray-100 mb-12">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-100">
                  <Image src="https://i.pravatar.cc/150?u=scholar" alt={article.author} width={48} height={48} />
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-900">{article.author} ✅</p>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">{article.authorTitle}</p>
                </div>
              </div>
              <div className="flex items-center gap-6 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                <span className="flex items-center gap-2"><HiCalendar className="text-lg text-primary/40" /> {article.date}</span>
                <span className="flex items-center gap-2"><HiClock className="text-lg text-primary/40" /> {article.readTime}</span>
              </div>
            </div>

            {/* Content Body - Placeholder for rich text */}
            <div className="prose prose-lg max-w-none prose-emerald">
              <div className="relative w-full aspect-video rounded-[32px] overflow-hidden mb-12 shadow-2xl">
                 <Image src={article.heroImage} alt={article.title} fill className="object-cover" sizes="(max-w-1024px) 100vw, 60vw" />
              </div>
              
              <p className="text-lg text-gray-700 leading-8 mb-8">
                Allah, the Most High, did not create us without reason, nor did He leave us without guidance...
              </p>

              {/* Callout / Verse Card */}
              <div className="bg-[#FFFCF6] border-l-4 border-secondary p-10 rounded-2xl mb-12 text-center">
                <p className="font-arabic text-3xl text-gray-900 mb-6" dir="rtl">
                  وَمَا خَلَقْتُ الْجِنَّ وَالْإِنسَ إِلَّا لِيَعْبُدُونِ
                </p>
                <p className="text-lg font-bold text-gray-800 italic">
                  &quot;And I did not create the jinn and mankind except to worship Me.&quot;
                </p>
                <p className="text-sm text-gray-400 mt-2">— Quran 51:56</p>
              </div>

              <h2 className="text-3xl font-bold text-gray-900 mb-6">Understanding Worship</h2>
              <p className="text-lg text-gray-700 leading-8 mb-8">
                Worship (Ibadah) is the essence of our existence. It is our connection with our Creator...
              </p>

              <div className="flex items-center gap-4 py-10 border-t border-gray-100 mt-12">
                <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">Share this article</p>
                <div className="flex gap-3">
                  {[FaFacebookF, FaTwitter, FaWhatsapp, HiLink].map((Icon, i) => (
                    <button key={i} className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-all">
                      <Icon />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Author Bio Card */}
            <div className="bg-[#FAF9F6] rounded-[40px] p-8 sm:p-12 mt-16 flex flex-col sm:flex-row items-center gap-10">
               <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-200 shrink-0">
                  <Image src="https://i.pravatar.cc/150?u=scholar" alt={article.author} width={128} height={128} />
               </div>
               <div className="text-center sm:text-left flex-1">
                  <div className="flex items-center justify-center sm:justify-between mb-4">
                    <h3 className="text-2xl font-bold text-gray-900">{article.author} ✅</h3>
                    <button className="hidden sm:block text-[10px] font-bold text-primary uppercase tracking-widest px-4 py-2 border border-primary/20 rounded-full hover:bg-primary hover:text-white transition-all">Follow</button>
                  </div>
                  <p className="text-gray-600 leading-relaxed mb-6">
                    Islamic scholar and researcher dedicated to reviving authentic Islamic knowledge...
                  </p>
                  <div className="flex items-center justify-center sm:justify-start gap-4 text-gray-400">
                    <FaFacebookF /> <FaTwitter /> <FaWhatsapp /> <HiLink />
                  </div>
               </div>
            </div>

          </article>

          {/* Sidebar */}
          <aside className="lg:col-span-4 space-y-12 h-fit sticky top-24">
            
            {/* Table of Contents */}
            <div className="bg-white rounded-3xl border border-gray-100 p-8 shadow-sm">
               <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-6">On this page</h4>
               <ul className="space-y-4">
                 {["Understanding Worship", "The True Purpose", "Living with Purpose", "Benefits of Knowing Your Purpose", "Conclusion"].map((item, i) => (
                   <li key={i}>
                     <a href="#" className={`text-sm font-bold transition-colors ${i === 0 ? "text-primary flex items-center gap-3" : "text-gray-500 hover:text-primary"}`}>
                       {i === 0 && <div className="w-1.5 h-1.5 rounded-full bg-primary" />}
                       {item}
                     </a>
                   </li>
                 ))}
               </ul>
            </div>

            {/* Share Sidebar */}
            <div className="bg-white rounded-3xl border border-gray-100 p-8 shadow-sm text-center">
               <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-6">Share this article</h4>
               <div className="flex justify-between items-center px-4">
                 {[
                   { icon: <FaFacebookF />, label: "Facebook" },
                   { icon: <FaTwitter />, label: "Twitter" },
                   { icon: <FaWhatsapp />, label: "WhatsApp" },
                   { icon: <HiLink />, label: "Copy Link" },
                 ].map((social, i) => (
                   <div key={i} className="flex flex-col items-center gap-3">
                     <button className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center text-gray-500 hover:bg-primary/5 hover:text-primary transition-all">
                       {social.icon}
                     </button>
                     <span className="text-[9px] font-bold text-gray-400 uppercase">{social.label}</span>
                   </div>
                 ))}
               </div>
            </div>

            {/* Daily Reminder */}
            <div className="relative rounded-3xl overflow-hidden aspect-video bg-[#0A3A2F] flex items-center justify-center p-8 text-center group">
               <Image src="https://images.unsplash.com/photo-1542810634-71277d95dcbb?q=80&w=800&auto=format&fit=crop" alt="Reminder" fill className="object-cover opacity-20 group-hover:scale-110 transition-transform duration-700" sizes="(max-w-1024px) 100vw, 30vw" />
               <div className="relative z-10 text-white">
                 <p className="text-[10px] font-bold text-white/60 tracking-widest uppercase mb-4">Daily Reminder</p>
                 <p className="font-arabic text-xl mb-4" dir="rtl">فَاذْكُرُونِي أَذْكُرْكُمْ</p>
                 <p className="text-sm font-medium italic mb-2">&quot;So remember Me; I will remember you.&quot;</p>
                 <p className="text-[10px] text-white/40 uppercase tracking-widest">— Quran 2:152</p>
               </div>
            </div>

            {/* Related Articles */}
            <div>
               <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-6">Related Articles</h4>
               <div className="space-y-6">
                 {[
                   { title: "The Power of Sincerity in Worship", time: "5 min read", img: "https://images.unsplash.com/photo-1585036156171-384164a8c675?q=80&w=200&auto=format&fit=crop" },
                   { title: "How to Strengthen Your Iman", time: "7 min read", img: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=200&auto=format&fit=crop" },
                   { title: "Gratitude: The Key to Inner Peace", time: "5 min read", img: "https://images.unsplash.com/photo-1564507592333-c60657eea523?q=80&w=200&auto=format&fit=crop" },
                 ].map((item, i) => (
                   <Link key={i} href="#" className="flex gap-4 group">
                      <div className="w-20 h-20 rounded-2xl overflow-hidden bg-gray-100 shrink-0">
                         <Image src={item.img} alt={item.title} width={80} height={80} className="object-cover group-hover:scale-110 transition-transform duration-500" />
                      </div>
                      <div className="flex flex-col justify-center">
                        <h5 className="text-[14px] font-bold text-gray-900 group-hover:text-primary transition-colors leading-snug line-clamp-2">{item.title}</h5>
                        <p className="text-[10px] text-gray-400 font-bold uppercase mt-2 tracking-widest">{item.time}</p>
                      </div>
                   </Link>
                 ))}
               </div>
               <Link href="/articles" className="inline-flex items-center gap-2 text-[10px] font-bold text-primary uppercase tracking-widest mt-8 group">
                  View all articles <HiChevronRight className="group-hover:translate-x-1 transition-transform" />
               </Link>
            </div>
          </aside>
        </div>

        {/* You May Also Like */}
        <div className="mt-32 pt-20 border-t border-gray-100">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl font-bold text-gray-900">You May Also Like</h2>
            <div className="flex gap-3">
              <button className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:border-primary hover:text-primary transition-all">←</button>
              <button className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:border-primary hover:text-primary transition-all">→</button>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { cat: "FAITH & BELIEF", title: "The Beauty of Tawakkul (Complete Trust in Allah)", time: "7 min read", img: "https://images.unsplash.com/photo-1542810634-71277d95dcbb?q=80&w=600&auto=format&fit=crop" },
              { cat: "QURANIC WISDOM", title: "Lessons from Surah Al-Ikhlas That Change Lives", time: "6 min read", img: "https://images.unsplash.com/photo-1590076175582-459437ff7087?q=80&w=600&auto=format&fit=crop" },
              { cat: "SPIRITUAL GROWTH", title: "5 Daily Habits That Bring You Closer to Allah", time: "8 min read", img: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=600&auto=format&fit=crop" },
            ].map((item, i) => (
              <Link key={i} href="#" className="flex flex-col group">
                 <div className="relative w-full aspect-video rounded-[32px] overflow-hidden bg-gray-100 mb-6">
                    <Image src={item.img} alt={item.title} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                 </div>
                 <span className="text-[10px] font-bold text-secondary tracking-widest uppercase mb-3">{item.cat}</span>
                 <h4 className="text-xl font-bold text-gray-900 group-hover:text-primary transition-colors leading-tight mb-4">{item.title}</h4>
                 <div className="flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                    <HiClock className="text-lg text-primary/40" /> {item.time}
                 </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Newsletter Banner */}
        <div className="mt-32 relative rounded-[40px] overflow-hidden bg-[#0A3A2F] p-12 sm:p-20 text-center">
            <Image src="https://images.unsplash.com/photo-1542810634-71277d95dcbb?q=80&w=1200&auto=format&fit=crop" alt="Newsletter" fill className="object-cover opacity-10" />
            <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
               <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center text-white text-3xl mb-8">
                  <HiOutlineMail />
               </div>
               <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6 leading-tight">
                  Continue Your Journey <br /> of Knowledge
               </h2>
               <p className="text-white/60 text-lg mb-12 max-w-2xl">
                  Join thousands of Muslims and get authentic Islamic content delivered to your inbox.
               </p>
               <div className="w-full max-w-2xl flex flex-col sm:flex-row gap-4">
                  <input type="email" placeholder="Enter your email address" className="flex-1 px-8 py-5 rounded-2xl bg-white focus:outline-none focus:ring-4 focus:ring-secondary/20 shadow-xl" />
                  <button className="px-10 py-5 bg-secondary text-white font-bold rounded-2xl hover:bg-[#c16d05] transition-all shadow-xl shadow-secondary/20">Subscribe Now</button>
               </div>
               <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest mt-6">
                  © No spam, ever. Unsubscribe anytime.
               </p>
            </div>
        </div>

      </div>
    </div>
  );
}
