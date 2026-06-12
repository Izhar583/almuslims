import Link from "next/link";

export const metadata = {
  title: "About — AlMuslims",
  description: "Learn about AlMuslims — your authentic Islamic knowledge portal.",
};

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-12">
        <h1 className="font-heading text-4xl sm:text-5xl font-bold text-primary mb-4">
          About AlMuslims
        </h1>
        <p className="text-gray-500 leading-relaxed">
          Your trusted digital companion for authentic Islamic knowledge.
        </p>
      </div>

      <div className="space-y-8 text-gray-600 leading-relaxed">
        <section className="p-6 bg-white rounded-2xl border border-primary/5 shadow-sm">
          <h2 className="font-heading text-xl font-bold text-primary mb-3">Our Mission</h2>
          <p>
            AlMuslims is built to provide Muslims worldwide with verified Quranic text,
            authentic Hadith collections, daily duas, prayer times, and Islamic resources —
            all in one modern, accessible platform.
          </p>
        </section>

        <section className="p-6 bg-white rounded-2xl border border-primary/5 shadow-sm">
          <h2 className="font-heading text-xl font-bold text-primary mb-3">Authentic Sources</h2>
          <ul className="space-y-2 text-sm">
            <li>
              <strong className="text-primary">Quran:</strong>{" "}
              <a href="https://alquran.cloud" className="text-secondary underline" target="_blank" rel="noopener noreferrer">
                AlQuran.cloud
              </a>{" "}
              — Uthmani script with scholarly translations
            </li>
            <li>
              <strong className="text-primary">Hadith:</strong>{" "}
              Kutub al-Sittah via sunnah.com data (
              <a href="https://github.com/fawazahmed0/hadith-api" className="text-secondary underline" target="_blank" rel="noopener noreferrer">
                fawazahmed0/hadith-api
              </a>
              )
            </li>
            <li>
              <strong className="text-primary">Prayer Times:</strong>{" "}
              <a href="https://aladhan.com" className="text-secondary underline" target="_blank" rel="noopener noreferrer">
                AlAdhan API
              </a>{" "}
              — ISNA calculation method
            </li>
            <li>
              <strong className="text-primary">99 Names:</strong> AlAdhan Asma ul Husna endpoint
            </li>
          </ul>
        </section>

        <section className="p-6 bg-white rounded-2xl border border-primary/5 shadow-sm">
          <h2 className="font-heading text-xl font-bold text-primary mb-3">Explore</h2>
          <div className="grid grid-cols-2 gap-3">
            <Link href="/quran" className="p-4 rounded-xl bg-primary/5 text-primary text-sm font-semibold hover:bg-primary hover:text-white transition-colors text-center">
              Read Quran
            </Link>
            <Link href="/hadith" className="p-4 rounded-xl bg-primary/5 text-primary text-sm font-semibold hover:bg-primary hover:text-white transition-colors text-center">
              Hadith Books
            </Link>
            <Link href="/duas" className="p-4 rounded-xl bg-primary/5 text-primary text-sm font-semibold hover:bg-primary hover:text-white transition-colors text-center">
              Duas & Azkar
            </Link>
            <Link href="/prayer-times" className="p-4 rounded-xl bg-primary/5 text-primary text-sm font-semibold hover:bg-primary hover:text-white transition-colors text-center">
              Prayer Times
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
