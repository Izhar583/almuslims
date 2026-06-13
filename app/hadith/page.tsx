// app/hadith/page.tsx
// Server Component — no "use client" needed

import Link from "next/link";
import { fiqhCategories, type FiqhCategory, type HadithBook } from "@/data/hadith-collections";
import BookCard from "@/components/modules/hadith/HadithCard";

export const metadata = {
  title: "Hadith Collections — AlMuslims",
  description:
    "Browse authentic Hadith collections from Fiqh Hanafi and Fiqh Jafria traditions.",
};

export default function HadithPage() {
  return (
    <main className="min-h-screen bg-background text-zinc-800 dark:text-zinc-200 transition-colors">
      {/* ── Decorative background ── */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/4 w-150 h-150 rounded-full bg-primary/5 blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-125 h-125 rounded-full bg-secondary/5 blur-[120px]" />
        <div
          className="absolute inset-0 opacity-[0.015] dark:opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%230A3A2F' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

        {/* ── Page Header ── */}
        <div className="text-center mb-20">
          <p className="text-secondary text-sm font-mono tracking-[0.3em] uppercase mb-4 font-bold">
            Sacred Knowledge
          </p>
          <h1
            className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-tight text-primary dark:text-zinc-100"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Hadith Collections
          </h1>
          <p className="text-zinc-650 dark:text-zinc-400 text-lg max-w-2xl mx-auto leading-relaxed">
            Explore authentic narrations of the Prophet ﷺ and Islamic wisdom,
            organized by jurisprudential school
          </p>

          <p
            className="mt-8 text-primary/70 dark:text-secondary/70 text-3xl"
            dir="rtl"
            style={{ fontFamily: "'Amiri', 'Traditional Arabic', serif" }}
          >
            إِنَّمَا الْأَعْمَالُ بِالنِّيَّاتِ
          </p>
          <p className="text-zinc-550 dark:text-zinc-500 text-xs mt-1">
            &ldquo;Actions are but by intentions&rdquo; &mdash; Bukhari &amp; Muslim
          </p>
        </div>

        {/* ── Fiqh Category Sections ── */}
        <div className="space-y-24">
          {fiqhCategories.map((fiqh: FiqhCategory, fiqhIndex: number) => (
            <section key={fiqh.id} className="relative">

              {/* Category Header */}
              <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
                <div>
                  <span
                    className="inline-flex items-center gap-2 text-xs font-mono tracking-widest uppercase px-3 py-1.5 rounded-full border mb-4"
                    style={{
                      color: fiqh.color,
                      borderColor: `${fiqh.color}40`,
                      backgroundColor: `${fiqh.color}10`,
                    }}
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full animate-pulse"
                      style={{ backgroundColor: fiqh.color }}
                    />
                    Madhab {fiqhIndex + 1} of 2
                  </span>

                  <h2
                    className="text-4xl font-bold mb-1"
                    style={{ fontFamily: "'Playfair Display', serif", color: fiqh.color }}
                  >
                    {fiqh.name}
                  </h2>
                  <p
                    className="text-2xl mb-3 opacity-60"
                    dir="rtl"
                    style={{ fontFamily: "'Amiri', 'Traditional Arabic', serif", color: fiqh.color }}
                  >
                    {fiqh.arabicName}
                  </p>
                  <p className="text-zinc-650 dark:text-zinc-400 max-w-2xl text-sm leading-relaxed">
                    {fiqh.description}
                  </p>
                </div>

                {/* Stats */}
                <div className="flex gap-4 shrink-0">
                  <div
                    className="text-center px-5 py-3 rounded-2xl border border-zinc-200/60 dark:border-zinc-800/80 bg-white dark:bg-card"
                    style={{ borderColor: `${fiqh.color}25` }}
                  >
                    <p className="text-2xl font-bold" style={{ color: fiqh.color }}>
                      {fiqh.books.length}
                    </p>
                    <p className="text-zinc-500 dark:text-zinc-400 text-xs mt-0.5">Books</p>
                  </div>
                  <div
                    className="text-center px-5 py-3 rounded-2xl border border-zinc-200/60 dark:border-zinc-800/80 bg-white dark:bg-card"
                    style={{ borderColor: `${fiqh.color}25` }}
                  >
                    <p className="text-2xl font-bold" style={{ color: fiqh.color }}>
                      {fiqh.books
                        .reduce((a: number, b: HadithBook) => a + b.totalHadiths, 0)
                        .toLocaleString()}
                    </p>
                    <p className="text-zinc-500 dark:text-zinc-400 text-xs mt-0.5">Hadiths</p>
                  </div>
                </div>
              </div>

              {/* Horizontal rule */}
              <div
                className="h-px w-full mb-10 opacity-20"
                style={{
                  background: `linear-gradient(to right, transparent, ${fiqh.color}, transparent)`,
                }}
              />

              {/* Books Grid — uses BookCard Client Component */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {fiqh.books.map((book: HadithBook, bookIndex: number) => (
                  <BookCard
                    key={book.id}
                    book={book}
                    bookIndex={bookIndex}
                    fiqhId={fiqh.id}
                  />
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* ── Bottom CTA ── */}
        <div className="mt-24 text-center">
          <p
            className="text-5xl text-primary/80 dark:text-zinc-200 mb-4"
            dir="rtl"
            style={{ fontFamily: "'Amiri', 'Traditional Arabic', serif" }}
          >
            بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
          </p>
          <p className="text-zinc-550 dark:text-zinc-450 text-sm">
            May Allah grant us beneficial knowledge. Ameen.
          </p>
        </div>
      </div>
    </main>
  );
}
