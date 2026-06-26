"use client";
import Link from "next/link";
import Image from "next/image";
import { HiArrowRight } from "react-icons/hi";
import { articles } from "@/data/articles";

// Sort by date descending to always show the newest articles first
const sortedArticles = [...articles].sort(
  (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
);

const featuredArticle = sortedArticles[0];
const sideArticles = sortedArticles.slice(1, 4);

export default function FeaturedArticles() {
  return (
    <section className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8 py-10 mb-10">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-0 mb-8">
        <div>
          <h2 className="text-emerald-950 text-2xl md:text-[32px] font-serif font-semibold uppercase tracking-widest">
            Featured Articles
          </h2>
          <div className="h-1 w-12 bg-secondary mt-2 rounded-full" />
        </div>
        <Link 
          href="/blog" 
          className="px-5 py-2.5 bg-white border border-[#EBE3D5] text-[#0A3A2F] hover:bg-[#0A3A2F] hover:text-white hover:border-[#0A3A2F] font-bold text-[10px] tracking-widest uppercase rounded-full shadow-sm flex items-center gap-2 group transition-all duration-300"
        >
          View all articles
          <span className="group-hover:translate-x-1 transition-transform duration-300 text-xs">→</span>
        </Link>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Featured Card (Left - 40%) */}
        {featuredArticle && (
          <Link
            href={`/blog/${featuredArticle.slug}`}
            className="lg:col-span-2 group flex flex-col rounded-[32px] overflow-hidden bg-white border border-gray-100 hover:shadow-2xl transition-all duration-500"
          >
            <div className="relative w-full h-[300px] lg:h-[400px] bg-gray-100 overflow-hidden">
              <Image
                src={featuredArticle.image}
                alt={featuredArticle.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
                priority
                sizes="(max-w-1024px) 100vw, 40vw"
              />
              <span className="absolute top-4 left-4 bg-secondary text-white text-[10px] font-bold uppercase tracking-widest px-4 py-2 rounded-full shadow-lg">
                {featuredArticle.category}
              </span>
            </div>
            <div className="p-8 flex flex-col flex-1">
              <h3 className="font-heading text-2xl font-bold text-gray-900 leading-tight group-hover:text-primary transition-colors">
                {featuredArticle.title}
              </h3>
              <p className="text-sm text-gray-500 mt-4 leading-relaxed line-clamp-3 flex-1">
                {featuredArticle.excerpt}
              </p>
              <div className="flex items-center gap-4 mt-6 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                <span>{featuredArticle.readTime}</span>
                <span className="w-1 h-1 rounded-full bg-gray-300" />
                <span>{featuredArticle.displayDate}</span>
              </div>
            </div>
          </Link>
        )}
        <div className="lg:col-span-3 flex flex-col gap-6">
          {sideArticles.map((article) => (
            <Link
              key={article.id}
              href={`/blog/${article.slug}`}
              className="group flex flex-col sm:flex-row gap-6 bg-white rounded-[32px] border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-500 p-4"
            >
              <div className="relative w-full sm:w-56 h-48 sm:h-auto shrink-0 bg-gray-100 rounded-[24px] overflow-hidden">
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-w-640px) 100vw, 25vw"
                />
              </div>

              <div className="flex flex-col justify-center flex-1 py-4">
                <span className="text-[10px] font-bold tracking-widest text-secondary uppercase mb-2">
                  {article.category}
                </span>
                <h3 className="font-heading text-lg sm:text-xl font-bold text-gray-900 leading-snug group-hover:text-primary transition-colors line-clamp-2">
                  {article.title}
                </h3>
                <div className="flex items-center gap-4 mt-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                  <span>{article.readTime}</span>
                  <span className="w-1 h-1 rounded-full bg-gray-300" />
                  <span>{article.displayDate}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

