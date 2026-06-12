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

export async function fetchHadithCollection(
  slug: string
): Promise<HadithCollectionData | null> {
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
