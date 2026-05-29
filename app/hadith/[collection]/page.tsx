import Link from "next/link";
import { fiqhCategories } from "@/data/hadith-collections";

// Fetching hadith data from the open-source GitHub CDN
async function getHadiths(collectionSlug: string) {
  try {
    // English translation
    const engRes = await fetch(`https://cdn.jsdelivr.net/gh/fawazahmed0/hadith-api@1/editions/eng-${collectionSlug}.json`, { next: { revalidate: 3600 } });
    // Arabic original
    const araRes = await fetch(`https://cdn.jsdelivr.net/gh/fawazahmed0/hadith-api@1/editions/ara-${collectionSlug}.json`, { next: { revalidate: 3600 } });
    
    if (!engRes.ok || !araRes.ok) {
      return null;
    }

    const engData = await engRes.json();
    const araData = await araRes.json();
    
    return {
      metadata: engData.metadata,
      hadiths: engData.hadiths.map((h: any, i: number) => ({
        ...h,
        arabictext: araData.hadiths[i]?.text || ""
      }))
    };
  } catch (err) {
    console.error("Failed to fetch hadiths", err);
    return null;
  }
}

export default async function HadithCollectionPage({ params, searchParams }: { params: { collection: string }, searchParams: { fiqh?: string } }) {
  const collectionSlug = params.collection;
  const data = await getHadiths(collectionSlug);
  
  // Find the book from data for color/styles
  let bookData = null;
  for (const fiqh of fiqhCategories) {
    const found = fiqh.books.find(b => b.apiSlug === collectionSlug);
    if (found) {
      bookData = found;
      break;
    }
  }

  const color = bookData?.color || "#C8A96E";

  if (!data) {
    return (
      <main className="min-h-screen bg-zinc-950 text-white flex flex-col items-center justify-center p-8">
        <h1 className="text-3xl font-bold text-red-400 mb-4">Collection Not Found</h1>
        <p className="text-zinc-400 mb-8">We could not load the hadiths for this collection. It may not be available on our free API at this time.</p>
        <Link href="/hadith" className="px-6 py-3 rounded-full bg-zinc-800 hover:bg-zinc-700 transition">
          Return to Collections
        </Link>
      </main>
    );
  }

  const { metadata, hadiths } = data;
  
  // Just show first 50 for performance on this simple page
  const displayHadiths = hadiths.slice(0, 50);

  return (
    <main className="min-h-screen bg-zinc-950 text-white pb-24">
      {/* ── Decorative background ── */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/4 w-150 h-150 rounded-full bg-amber-900/10 blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-125 h-125 rounded-full bg-blue-900/10 blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        {/* Header */}
        <Link href="/hadith" className="inline-flex items-center gap-2 text-zinc-400 hover:text-white transition mb-10">
          <span>&larr;</span> Back to Collections
        </Link>
        
        <div className="mb-16 border-b border-zinc-800 pb-10">
          <h1 className="text-5xl font-bold mb-4" style={{ fontFamily: "'Playfair Display', serif", color }}>
            {metadata.name}
          </h1>
          <p className="text-xl text-zinc-400 max-w-2xl">
            {metadata.section["1"] || "Exploring the authentic traditions of the Prophet ﷺ"}
          </p>
          <div className="mt-6 flex items-center gap-4">
             <span className="px-4 py-1.5 rounded-full border text-sm" style={{ borderColor: `${color}40`, backgroundColor: `${color}10`, color }}>
                {hadiths.length.toLocaleString()} Narrations
             </span>
          </div>
        </div>

        {/* Hadith List */}
        <div className="space-y-8">
          {displayHadiths.map((hadith: any, idx: number) => (
            <div key={idx} className="p-8 rounded-2xl border bg-zinc-900/60 transition-colors hover:border-opacity-50" style={{ borderColor: `${color}20` }}>
              <div className="flex items-center justify-between mb-6">
                <span className="text-sm font-mono opacity-50" style={{ color }}>
                  Hadith {hadith.hadithnumber}
                </span>
                {hadith.grades?.length > 0 && (
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-900/30 text-green-400 border border-green-800/50">
                    {hadith.grades[0].grade}
                  </span>
                )}
              </div>
              
              {/* Arabic Text */}
              {hadith.arabictext && (
                <p className="text-2xl sm:text-3xl leading-relaxed mb-8 text-right opacity-90" dir="rtl" style={{ fontFamily: "'Noto Naskh Arabic', serif", color: "#fefefe" }}>
                  {hadith.arabictext}
                </p>
              )}

              {/* English Text */}
              <p className="text-zinc-300 text-lg leading-relaxed">
                {hadith.text}
              </p>
              
              {/* Reference info */}
              <div className="mt-8 pt-4 border-t border-zinc-800/50 flex flex-wrap gap-4 text-sm text-zinc-500">
                 {hadith.reference?.book && (
                   <span>Book: {hadith.reference.book}</span>
                 )}
                 {hadith.reference?.hadith && (
                   <span>Hadith: {hadith.reference.hadith}</span>
                 )}
              </div>
            </div>
          ))}
        </div>
        
        {hadiths.length > 50 && (
           <div className="mt-12 text-center text-zinc-500">
             Showing first 50 narrations.
           </div>
        )}
      </div>
    </main>
  );
}