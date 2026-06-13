import Link from "next/link";
import { Suspense } from "react";
import { fiqhCategories } from "@/data/hadith-collections";
import {
  fetchHadithCollection,
  filterHadiths,
  HADITHS_PER_PAGE,
  type HadithEntry,
  isShiaBook,
} from "@/lib/api/hadith";
import HadithSearch from "@/components/modules/hadith/HadithSearch";
import PaginationControls from "@/components/modules/hadith/PaginationControls";

async function getHadiths(collectionSlug: string, page: number, search: string) {
  return fetchHadithCollection(collectionSlug, page, search);
}


function HadithListItem({
  hadith,
  color,
}: {
  hadith: HadithEntry;
  color: string;
}) {
  return (
    <div
      className="p-8 rounded-2xl border bg-white dark:bg-card border-zinc-200/50 dark:border-zinc-800/80 transition-colors"
      style={{ borderColor: `${color}20` }}
    >
      <div className="flex items-center justify-between mb-6">
        <span className="text-sm font-mono opacity-60" style={{ color }}>
          Hadith {hadith.hadithnumber}
        </span>
        {hadith.grades && hadith.grades.length > 0 && (
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-900/50">
            {hadith.grades[0].grade}
          </span>
        )}
      </div>

      {hadith.arabictext && (
        <p
          className="text-2xl sm:text-3xl leading-relaxed mb-8 text-right text-zinc-800 dark:text-zinc-100"
          dir="rtl"
          style={{ fontFamily: "'Amiri', 'Traditional Arabic', serif" }}
        >
          {hadith.arabictext}
        </p>
      )}

      <p className="text-zinc-700 dark:text-zinc-350 text-lg leading-relaxed">{hadith.text}</p>

      <div className="mt-8 pt-4 border-t border-zinc-200/60 dark:border-zinc-800/80 flex flex-wrap gap-4 text-sm text-zinc-550 dark:text-zinc-400">
        {hadith.reference?.book != null && (
          <span>Book: {hadith.reference.book}</span>
        )}
        {hadith.reference?.hadith != null && (
          <span>Hadith: {hadith.reference.hadith}</span>
        )}
      </div>
    </div>
  );
}

export default async function HadithCollectionPage(props: {
  params: Promise<{ collection: string }>;
  searchParams: Promise<{ fiqh?: string; page?: string; search?: string }>;
}) {
  const params = await props.params;
  const searchParams = await props.searchParams;
  const collectionSlug = params.collection;
  const currentPage = Math.max(1, parseInt(searchParams.page || "1", 10) || 1);
  const searchTerm = searchParams.search || "";

  const data = await getHadiths(collectionSlug, currentPage, searchTerm);

  let bookData = null;
  for (const fiqh of fiqhCategories) {
    const found = fiqh.books.find((b) => b.apiSlug === collectionSlug);
    if (found) {
      bookData = found;
      break;
    }
  }

  const color = bookData?.color || "#C8A96E";

  if (bookData && !bookData.apiAvailable) {
    return (
      <main className="min-h-screen bg-zinc-950 text-white flex flex-col items-center justify-center p-8">
        <h1 className="text-3xl font-bold text-amber-400 mb-4">{bookData.name}</h1>
        <p className="text-zinc-400 mb-8 max-w-md text-center">
          This Shia hadith collection is not yet available through our authenticated API source.
          We are working to add verified Jafria collections soon.
        </p>
        <Link
          href="/hadith"
          className="px-6 py-3 rounded-full bg-zinc-800 hover:bg-zinc-700 transition"
        >
          Return to Collections
        </Link>
      </main>
    );
  }

  if (!data) {
    return (
      <main className="min-h-screen bg-zinc-950 text-white flex flex-col items-center justify-center p-8">
        <h1 className="text-3xl font-bold text-red-400 mb-4">Collection Not Found</h1>
        <p className="text-zinc-400 mb-8 max-w-md text-center">
          We could not load this hadith collection. Please try again later.
        </p>
        <Link
          href="/hadith"
          className="px-6 py-3 rounded-full bg-zinc-800 hover:bg-zinc-700 transition"
        >
          Return to Collections
        </Link>
      </main>
    );
  }

  const isShia = isShiaBook(collectionSlug);
  const { metadata, hadiths } = data;
  const filtered = isShia && searchTerm ? hadiths : filterHadiths(hadiths, searchTerm);

  let totalPages = 1;
  let pageHadiths = [];
  let safePage = currentPage;

  if (isShia) {
    if (searchTerm) {
      totalPages = Math.max(1, Math.ceil(filtered.length / HADITHS_PER_PAGE));
      safePage = Math.min(currentPage, totalPages);
      const start = (safePage - 1) * HADITHS_PER_PAGE;
      pageHadiths = filtered.slice(start, start + HADITHS_PER_PAGE);
    } else {
      const totalHadiths = bookData ? bookData.totalHadiths : 1000;
      totalPages = Math.max(1, Math.ceil(totalHadiths / HADITHS_PER_PAGE));
      safePage = Math.min(currentPage, totalPages);
      pageHadiths = filtered; // Already paginated inside fetchHadithCollection
    }
  } else {
    totalPages = Math.max(1, Math.ceil(filtered.length / HADITHS_PER_PAGE));
    safePage = Math.min(currentPage, totalPages);
    const start = (safePage - 1) * HADITHS_PER_PAGE;
    pageHadiths = filtered.slice(start, start + HADITHS_PER_PAGE);
  }

  return (
    <main className="min-h-screen bg-zinc-950 text-white pb-24">
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/4 w-150 h-150 rounded-full bg-amber-900/10 blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-125 h-125 rounded-full bg-blue-900/10 blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Link
          href="/hadith"
          className="inline-flex items-center gap-2 text-zinc-400 hover:text-white transition mb-10"
        >
          <span>&larr;</span> Back to Collections
        </Link>

        <div className="mb-10 border-b border-zinc-800 pb-10">
          <h1
            className="text-4xl sm:text-5xl font-bold mb-4"
            style={{ fontFamily: "'Playfair Display', serif", color }}
          >
            {metadata.name}
          </h1>
          <p className="text-lg text-zinc-400 max-w-2xl">
            {metadata.section?.["1"] ||
              "Authentic narrations from the Prophet Muhammad ﷺ"}
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <span
              className="px-4 py-1.5 rounded-full border text-sm"
              style={{
                borderColor: `${color}40`,
                backgroundColor: `${color}10`,
                color,
              }}
            >
              {hadiths.length.toLocaleString()} narrations
            </span>
            <span className="text-xs text-zinc-600">
              Source: sunnah.com via fawazahmed0/hadith-api
            </span>
          </div>
        </div>

        <div className="mb-8">
          <Suspense fallback={<div className="h-12 bg-zinc-900 rounded-xl animate-pulse" />}>
            <HadithSearch accentColor={color} defaultValue={searchTerm} />
          </Suspense>
        </div>

        {searchTerm && (
          <p className="text-sm text-zinc-500 mb-6">
            {filtered.length} result{filtered.length !== 1 ? "s" : ""} for &ldquo;{searchTerm}&rdquo;
          </p>
        )}

        <div className="space-y-8">
          {pageHadiths.length > 0 ? (
            pageHadiths.map((hadith) => (
              <HadithListItem key={hadith.hadithnumber} hadith={hadith} color={color} />
            ))
          ) : (
            <p className="text-center text-zinc-500 py-12">No hadiths match your search.</p>
          )}
        </div>

        <Suspense fallback={null}>
          <PaginationControls
            currentPage={safePage}
            totalPages={totalPages}
            accentColor={color}
          />
        </Suspense>
      </div>
    </main>
  );
}
