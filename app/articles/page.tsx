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
  image: "/assets/articles/purpose-hero.webp",
};
const sideArticles = [
  {
    id: 2,
    category: "HADITH",
    title: "The Importance of Good Character in Islam",
    readTime: "4 min read",
    date: "May 23, 2025",
    image:
      "https://images.unsplash.com/photo-1585036156171-384164a8c675?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: 3,
    category: "SEERAH",
    title: "Lessons from the Life of Prophet Muhammad ﷺ",
    readTime: "6 min read",
    date: "May 22, 2025",
    image:
      "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: 4,
    category: "DUAS",
    title: "Powerful Duas for Peace and Contentment",
    readTime: "3 min read",
    date: "May 21, 2025",
    image:
      "https://images.unsplash.com/photo-1564507592333-c60657eea523?q=80&w=600&auto=format&fit=crop",
  },
];
export default function ArticlesPage() {
  return (
    <main className="bg-bg min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 pb-20">
        <div className="flex items-center justify-between mb-6">
          <h1 className="font-heading text-2xl font-bold text-gray-900 uppercase tracking-wide">
            Featured Articles
          </h1>
          <Link
            href="/articles/all"
            className="text-sm text-secondary font-medium flex items-center gap-1 hover:underline"
          >
            View all articles <HiArrowRight />
          </Link>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
          <Link
            href={`/articles/${featuredArticle.id}`}
            className="lg:col-span-2 group flex flex-col rounded-2xl overflow-hidden bg-white border border-gray-100 hover:shadow-lg transition-shadow"
          >
            {/* Image */}
            <div className="relative w-full h-80 lg:h-96 bg-gray-100 overflow-hidden">
              <Image
                src={featuredArticle.image}
                alt={featuredArticle.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                priority
              />
              {/* Category badge */}
              <span className="absolute bottom-3 left-3 bg-secondary text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full">
                {featuredArticle.category}
              </span>
            </div>

            {/* Text */}
            <div className="p-5 flex flex-col flex-1">
              <h2 className="font-heading text-xl font-bold text-gray-900 leading-snug group-hover:text-primary transition-colors">
                {featuredArticle.title}
              </h2>
              <p className="text-sm text-gray-500 mt-2 leading-relaxed line-clamp-3 flex-1">
                {featuredArticle.excerpt}
              </p>
              <div className="flex items-center gap-3 mt-4 text-xs text-gray-400">
                <span>🕐 {featuredArticle.readTime}</span>
                <span className="w-1 h-1 rounded-full bg-gray-300 inline-block" />
                <span>📅 {featuredArticle.date}</span>
              </div>
            </div>
          </Link>

          {/* ── Right: 3 Side Articles (60%) ── */}
          <div className="lg:col-span-3 flex flex-col gap-4">
            {sideArticles.map((article) => (
              <Link
                key={article.id}
                href={`/articles/${article.id}`}
                className="group flex gap-4 bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-md transition-shadow p-0"
              >
                {/* Thumbnail */}
                <div className="relative w-48 h-44 sm:w-56 sm:h-44 shrink-0 bg-gray-100 rounded-l-2xl overflow-hidden">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Info */}
                <div className="flex flex-col justify-center py-4 pr-4">
                  <span className="text-[10px] font-bold tracking-widest text-secondary uppercase mb-1">
                    {article.category}
                  </span>
                  <h3 className="font-heading text-sm sm:text-base font-bold text-gray-900 leading-snug group-hover:text-primary transition-colors line-clamp-2">
                    {article.title}
                  </h3>
                  <div className="flex items-center gap-3 mt-2 text-xs text-gray-400">
                    <span>🕐 {article.readTime}</span>
                    <span className="w-1 h-1 rounded-full bg-gray-300 inline-block" />
                    <span>📅 {article.date}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
