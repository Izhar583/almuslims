// data/hadith-collections.ts
// All hadith collections organized by Fiqh madhab

export interface HadithBook {
  id: string;
  name: string;
  arabicName: string;
  author: string;
  description: string;
  totalHadiths: number;
  apiSlug: string; // slug for hadithapi.com
  color: string;   // accent color for the card
  icon: string;    // emoji icon
}

export interface FiqhCategory {
  id: string;
  name: string;
  arabicName: string;
  urduName: string;
  description: string;
  color: string;       // primary color
  accentColor: string; // accent/glow color
  bgGradient: string;  // Tailwind gradient classes
  books: HadithBook[];
}

export const fiqhCategories: FiqhCategory[] = [
  {
    id: "hanafi",
    name: "Fiqh Hanafi",
    arabicName: "الفقه الحنفي",
    urduName: "فقہ حنفی",
    description:
      "The Hanafi school, founded by Imam Abu Hanifa (699–767 CE), is the most widely followed madhab in the world — followed by Muslims in Turkey, South Asia, Central Asia, and the Balkans.",
    color: "#C8A96E",
    accentColor: "#E8C882",
    bgGradient: "from-amber-950 via-stone-900 to-zinc-950",
    books: [
      {
        id: "bukhari",
        name: "Sahih al-Bukhari",
        arabicName: "صحيح البخاري",
        author: "Imam Muhammad al-Bukhari",
        description:
          "The most authentic book after the Quran. Compiled by Imam Bukhari after selecting from 600,000 narrations over 16 years.",
        totalHadiths: 7563,
        apiSlug: "bukhari",
        color: "#C8A96E",
        icon: "📖",
      },
      {
        id: "muslim",
        name: "Sahih Muslim",
        arabicName: "صحيح مسلم",
        author: "Imam Muslim ibn al-Hajjaj",
        description:
          "Second most authentic hadith collection. Known for its precise methodology and thematic organization of chapters.",
        totalHadiths: 7500,
        apiSlug: "muslim",
        color: "#8BAF7C",
        icon: "📚",
      },
      {
        id: "abudawud",
        name: "Sunan Abu Dawud",
        arabicName: "سنن أبي داود",
        author: "Imam Abu Dawud al-Sijistani",
        description:
          "One of the Kutub al-Sittah. Contains 5,274 hadiths selected from 500,000, focusing heavily on Islamic law and jurisprudence.",
        totalHadiths: 5274,
        apiSlug: "abudawud",
        color: "#7BA7BC",
        icon: "⚖️",
      },
      {
        id: "tirmidhi",
        name: "Jami at-Tirmidhi",
        arabicName: "جامع الترمذي",
        author: "Imam al-Tirmidhi",
        description:
          "Notable for grading hadiths and including opinions of jurists. A key reference for Hanafi fiqh rulings.",
        totalHadiths: 3956,
        apiSlug: "tirmidhi",
        color: "#A888C4",
        icon: "🌙",
      },
      {
        id: "ibnmajah",
        name: "Sunan Ibn Majah",
        arabicName: "سنن ابن ماجه",
        author: "Imam Ibn Majah",
        description:
          "Sixth of the Kutub al-Sittah. Contains unique hadiths not found in other major collections, especially on commerce and transactions.",
        totalHadiths: 4341,
        apiSlug: "ibnmajah",
        color: "#BC7B7B",
        icon: "📜",
      },
      {
        id: "nasai",
        name: "Sunan an-Nasa'i",
        arabicName: "سنن النسائي",
        author: "Imam an-Nasa'i",
        description:
          "Known for its strict criticism of narrators. Al-Nasa'i was highly selective — considered one of the most rigorous collectors.",
        totalHadiths: 5758,
        apiSlug: "nasai",
        color: "#6B8F71",
        icon: "🕌",
      },
    ],
  },
  {
    id: "jafria",
    name: "Fiqh Jafria",
    arabicName: "الفقه الجعفري",
    urduName: "فقہ جعفریہ",
    description:
      "The Jafari school is the primary madhab of Shia Islam, derived from the teachings of Imam Ja'far al-Sadiq (702–765 CE), the sixth Imam. It is followed by the majority of Muslims in Iran, Iraq, Lebanon, and Azerbaijan.",
    color: "#6B9FBC",
    accentColor: "#88BEDD",
    bgGradient: "from-blue-950 via-slate-900 to-zinc-950",
    books: [
      {
        id: "al-kafi",
        name: "Al-Kafi",
        arabicName: "الكافي",
        author: "Sheikh Muhammad al-Kulayni",
        description:
          "The most important hadith collection in Shia Islam, compiled over 20 years. Contains 16,199 hadiths on theology, jurisprudence, and ethics.",
        totalHadiths: 16199,
        apiSlug: "al-kafi",
        color: "#6B9FBC",
        icon: "📖",
      },
      {
        id: "man-la-yahduruhu",
        name: "Man La Yahduruhu al-Faqih",
        arabicName: "من لا يحضره الفقيه",
        author: "Sheikh al-Saduq",
        description:
          "One of the four canonical Shia hadith books. Focuses exclusively on practical jurisprudence with 9,044 hadiths.",
        totalHadiths: 9044,
        apiSlug: "man-la-yahduruhu",
        color: "#7BAF88",
        icon: "⚖️",
      },
      {
        id: "tahdhib-al-ahkam",
        name: "Tahdhib al-Ahkam",
        arabicName: "تهذيب الأحكام",
        author: "Sheikh al-Tusi",
        description:
          "A comprehensive Shia fiqh hadith collection with 13,590 hadiths. One of the four books (Kutub al-Arba'a) of Shia Islam.",
        totalHadiths: 13590,
        apiSlug: "tahdhib-al-ahkam",
        color: "#BC9A6B",
        icon: "📚",
      },
      {
        id: "al-istibsar",
        name: "Al-Istibsar",
        arabicName: "الاستبصار",
        author: "Sheikh al-Tusi",
        description:
          "The fourth of the Kutub al-Arba'a. Focuses on reconciling apparently contradictory hadiths in Shia jurisprudence.",
        totalHadiths: 5511,
        apiSlug: "al-istibsar",
        color: "#A87BA8",
        icon: "🌙",
      },
      {
        id: "nahjul-balagha",
        name: "Nahj al-Balagha",
        arabicName: "نهج البلاغة",
        author: "Compiled by Sharif al-Radi",
        description:
          "A collection of sermons, letters, and sayings of Imam Ali ibn Abi Talib (AS). Considered a masterpiece of Arabic literature and Islamic wisdom.",
        totalHadiths: 489,
        apiSlug: "nahjul-balagha",
        color: "#BC7B7B",
        icon: "✨",
      },
    ],
  },
];