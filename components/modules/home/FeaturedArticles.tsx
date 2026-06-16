"use client";
import Link from "next/link";
import Image from "next/image";
import { HiArrowRight } from "react-icons/hi";
const featuredArticle = {
  id: 1,
  category: "QURANIC REMINDERS",
  title: "The True Purpose of Our Creation",
  excerpt: "And I did not create the jinn and mankind except to worship Me. — Qur'an 51:56",
  readTime: "5 min read",
  date: "May 24, 2025",
  image: "/assets/Articles/purpose-hero.webp",
};
const sideArticles = [
  {
    id: 2,
    category: "HADITH",
    title: "The Importance of Good Character in Islam",
    readTime: "4 min read",
    date: "May 23, 2025",
    image: "https://images.unsplash.com/photo-1585036156171-384164a8c675?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: 3,
    category: "SEERAH",
    title: "Lessons from the Life of Prophet Muhammad ﷺ",
    readTime: "6 min read",
    date: "May 22, 2025",
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: 4,
    category: "DUAS",
    title: "Powerful Duas for Peace and Contentment",
    readTime: "3 min read",
    date: "May 21, 2025",
    image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?q=80&w=600&auto=format&fit=crop",
  },
];
export default function FeaturedArticles() {
  return (
    <section className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8 py-10 mb-10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-emerald-950 text-lg md:text-xl font-serif font-semibold uppercase tracking-widest">
            Featured Articles
          </h2>
          <div className="h-1 w-12 bg-secondary mt-2 rounded-full" />
        </div>
        <Link
          href="/articles"
          className="text-sm text-gray-500 hover:text-secondary font-medium flex items-center gap-2 group transition-colors"
        >
          View all articles 
          <HiArrowRight className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Featured Card (Left - 40%) */}
        <Link
          href={`/articles/${featuredArticle.id}`}
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
              <span>{featuredArticle.date}</span>
            </div>
          </div>
        </Link>
        <div className="lg:col-span-3 flex flex-col gap-6">
          {sideArticles.map((article) => (
            <Link
              key={article.id}
              href={`/articles/${article.id}`}
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
                  <span>{article.date}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
