import { fiqhCategories } from "@/data/hadith-collections";

const HADITH_CDN = "https://cdn.jsdelivr.net/gh/fawazahmed0/hadith-api@1/editions";

export interface HadithEntry {
  hadithnumber: number;
  text: string;
  arabictext: string;
  grades?: { grade: string; name?: string }[];
  reference?: { book?: number; hadith?: number };
}

export interface HadithCollectionData {
  metadata: {
    name: string;
    section?: Record<string, string>;
  };
  hadiths: HadithEntry[];
}

export function isShiaBook(slug: string): boolean {
  const shiaKeywords = ["Kulayni", "Saduq", "Radi", "Abidin"];
  return shiaKeywords.some(keyword => slug.includes(keyword));
}

const mapThaqalaynToHadithEntry = (item: any): HadithEntry => {
  const grading = item.majlisiGrading || item.mohseniGrading || item.behbudiGrading || "";
  return {
    hadithnumber: item.id,
    text: item.englishText || "",
    arabictext: item.arabicText || "",
    grades: grading ? [{ grade: grading, name: "Grading" }] : undefined,
    reference: {
      book: item.volume,
      hadith: item.id,
    },
  };
};

export async function fetchHadithCollection(
  slug: string,
  page: number = 1,
  search: string = ""
): Promise<HadithCollectionData | null> {
  if (isShiaBook(slug)) {
    try {
      const bookData = fiqhCategories
        .find((f) => f.id === "jafria")
        ?.books.find((b) => b.apiSlug === slug);

      if (search.trim() !== "") {
        // Fetch search results from Thaqalayn query endpoint
        const res = await fetch(
          `https://www.thaqalayn-api.net/api/v2/query?q=${encodeURIComponent(search)}`,
          { next: { revalidate: 3600 } }
        );
        if (!res.ok) return null;
        const data = await res.json();
        
        // Filter by bookId
        const filtered = Array.isArray(data)
          ? data.filter((item: any) => item.bookId?.toLowerCase() === slug.toLowerCase())
          : [];

        return {
          metadata: {
            name: bookData?.name || slug.replace(/-/g, " "),
          },
          hadiths: filtered.map(mapThaqalaynToHadithEntry),
        };
      } else {
        // Browse: Fetch hadiths for page parallelly
        const totalHadiths = bookData ? bookData.totalHadiths : 1000;
        const startId = (page - 1) * HADITHS_PER_PAGE + 1;
        const endId = Math.min(page * HADITHS_PER_PAGE, totalHadiths);

        if (startId > totalHadiths) {
          return {
            metadata: { name: bookData?.name || slug.replace(/-/g, " ") },
            hadiths: [],
          };
        }

        const promises = [];
        for (let id = startId; id <= endId; id++) {
          promises.push(
            fetch(`https://www.thaqalayn-api.net/api/v2/${slug}/${id}`, {
              next: { revalidate: 3600 },
            })
              .then((res) => (res.ok ? res.json() : null))
              .catch(() => null)
          );
        }

        const results = await Promise.all(promises);
        const validResults = results
          .filter((r) => r !== null && r.id !== undefined)
          .map(mapThaqalaynToHadithEntry);

        return {
          metadata: {
            name: bookData?.name || slug.replace(/-/g, " "),
          },
          hadiths: validResults,
        };
      }
    } catch {
      return null;
    }
  }

  // Sunni books loading (unchanged)
  try {
    const [engRes, araRes] = await Promise.all([
      fetch(`${HADITH_CDN}/eng-${slug}.json`, { next: { revalidate: 3600 } }),
      fetch(`${HADITH_CDN}/ara-${slug}.json`, { next: { revalidate: 3600 } }),
    ]);

    if (!engRes.ok || !araRes.ok) return null;

    const engData = await engRes.json();
    const araData = await araRes.json();

    return {
      metadata: engData.metadata,
      hadiths: engData.hadiths.map(
        (h: Omit<HadithEntry, "arabictext">, i: number) => ({
          ...h,
          arabictext: araData.hadiths[i]?.text || "",
        })
      ),
    };
  } catch {
    return null;
  }
}

export function filterHadiths(
  hadiths: HadithEntry[],
  search: string
): HadithEntry[] {
  const term = search.trim().toLowerCase();
  if (!term) return hadiths;

  return hadiths.filter(
    (h) =>
      h.text.toLowerCase().includes(term) ||
      h.arabictext.includes(term) ||
      String(h.hadithnumber).includes(term)
  );
}

export const HADITHS_PER_PAGE = 20;

