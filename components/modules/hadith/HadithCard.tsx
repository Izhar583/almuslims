"use client";

import Link from "next/link";
import { type HadithBook } from "@/data/hadith-collections";

interface BookCardProps {
  book: HadithBook;
  bookIndex: number;
  fiqhId: string;
}

function CardContent({ book, bookIndex }: { book: HadithBook; bookIndex: number }) {
  return (
    <>
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
        style={{
          background: `radial-gradient(ellipse at top left, ${book.color}08, transparent 60%)`,
        }}
      />

      <div className="absolute top-4 right-4 flex items-center gap-2">
        {!book.apiAvailable && (
          <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-400 border border-zinc-700">
            Coming Soon
          </span>
        )}
        <span className="text-xs font-mono opacity-30" style={{ color: book.color }}>
          #{String(bookIndex + 1).padStart(2, "0")}
        </span>
      </div>

      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-5 transition-transform duration-300 group-hover:scale-110"
        style={{ backgroundColor: `${book.color}15` }}
      >
        {book.icon}
      </div>

      <p
        className="text-base mb-1 opacity-50 transition-opacity group-hover:opacity-80"
        dir="rtl"
        style={{ fontFamily: "'Noto Naskh Arabic', serif", color: book.color }}
      >
        {book.arabicName}
      </p>

      <h3
        className="text-lg font-semibold text-white mb-1 transition-colors duration-200"
        style={{ fontFamily: "'Playfair Display', serif" }}
      >
        {book.name}
      </h3>

      <p className="text-zinc-500 text-xs mb-4">{book.author}</p>

      <p className="text-zinc-400 text-sm leading-relaxed flex-1 line-clamp-2">
        {book.description}
      </p>

      <div className="flex items-center justify-between mt-5 pt-4 border-t border-zinc-800">
        <span className="text-xs text-zinc-500">
          <span className="font-semibold" style={{ color: book.color }}>
            {book.totalHadiths.toLocaleString()}
          </span>{" "}
          hadiths
        </span>
        {book.apiAvailable ? (
          <span
            className="flex items-center gap-1.5 text-xs font-medium transition-all duration-300 group-hover:gap-2.5"
            style={{ color: book.color }}
          >
            Read
            <svg
              className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </span>
        ) : (
          <span className="text-xs text-zinc-600">API pending</span>
        )}
      </div>
    </>
  );
}

export default function BookCard({ book, bookIndex, fiqhId }: BookCardProps) {
  const className =
    "group relative flex flex-col p-6 rounded-2xl border bg-zinc-900/60 backdrop-blur-sm transition-all duration-500 overflow-hidden " +
    (book.apiAvailable
      ? "hover:-translate-y-1 hover:shadow-2xl cursor-pointer"
      : "opacity-70 cursor-not-allowed");

  const style = { borderColor: `${book.color}20` };

  if (!book.apiAvailable) {
    return (
      <div className={className} style={style} title="This collection will be available soon">
        <CardContent book={book} bookIndex={bookIndex} />
      </div>
    );
  }

  return (
    <Link
      href={`/hadith/${book.apiSlug}?fiqh=${fiqhId}`}
      className={className}
      style={style}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = `${book.color}60`;
        (e.currentTarget as HTMLElement).style.boxShadow = `0 20px 60px ${book.color}15`;
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = `${book.color}20`;
        (e.currentTarget as HTMLElement).style.boxShadow = "none";
      }}
    >
      <CardContent book={book} bookIndex={bookIndex} />
    </Link>
  );
}
