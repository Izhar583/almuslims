export interface Article {
  id: string;
  slug: string;
  title: string;
  category: string;
  categoryId: string;
  excerpt: string;
  content: string;
  author: string;
  authorImg: string;
  authorRole?: string;
  isVerified?: boolean;
  date: string;
  displayDate: string;
  readTime: string;
  image: string;
  color?: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  isFeatured?: boolean;
  topics?: string[];
}

export interface CategoryInfo {
  id: string;
  name: string;
  slug: string;
  count: number;
  description: string;
  href: string;
  iconType: "all" | "quran" | "hadith" | "seerah" | "aqeedah" | "fiqh" | "duas" | "names" | "lifestyle" | "general";
}

export const categoriesMeta: CategoryInfo[] = [
  {
    id: "all",
    name: "All Categories",
    slug: "all",
    count: 296,
    description: "Browse all authentic Islamic knowledge and guides",
    href: "/categories",
    iconType: "all"
  },
  {
    id: "quran",
    name: "Quran",
    slug: "quran",
    count: 64,
    description: "Tafsir, recitation rules, and Surah insights",
    href: "/holy-quran",
    iconType: "quran"
  },
  {
    id: "hadith",
    name: "Hadith",
    slug: "hadith",
    count: 48,
    description: "Prophetic traditions, authentic narrations & explanations",
    href: "/categories?category=hadith",
    iconType: "hadith"
  },
  {
    id: "seerah",
    name: "Seerah",
    slug: "seerah",
    count: 32,
    description: "Life and times of Prophet Muhammad ﷺ",
    href: "/seerah",
    iconType: "seerah"
  },
  {
    id: "aqeedah",
    name: "Aqeedah",
    slug: "aqeedah",
    count: 21,
    description: "Foundations of Islamic creed, Tawheed & theology",
    href: "/categories?category=aqeedah",
    iconType: "aqeedah"
  },
  {
    id: "fiqh",
    name: "Fiqh",
    slug: "fiqh",
    count: 42,
    description: "Islamic jurisprudence, rulings and everyday guidance",
    href: "/categories?category=fiqh",
    iconType: "fiqh"
  },
  {
    id: "duas",
    name: "Duas",
    slug: "duas",
    count: 36,
    description: "Authentic supplications, Adhkar and morning/evening prayers",
    href: "/dua-collection",
    iconType: "duas"
  },
  {
    id: "names-of-allah",
    name: "99 Names",
    slug: "names-of-allah",
    count: 99,
    description: "Discover the Divine Names of Allah & their meanings",
    href: "/names-of-allah",
    iconType: "names"
  },
  {
    id: "lifestyle",
    name: "Lifestyle",
    slug: "lifestyle",
    count: 18,
    description: "Islamic morals, family life, work ethics and wellness",
    href: "/categories?category=lifestyle",
    iconType: "lifestyle"
  },
  {
    id: "general",
    name: "General",
    slug: "general",
    count: 15,
    description: "Articles, reflections, stories and knowledge",
    href: "/categories?category=general",
    iconType: "general"
  }
];

export const popularTopics = [
  { name: "Tawheed", count: 28, categoryId: "aqeedah" },
  { name: "Prayer", count: 24, categoryId: "fiqh" },
  { name: "Ramadan", count: 20, categoryId: "lifestyle" },
  { name: "Patience", count: 18, categoryId: "general" },
  { name: "Family", count: 16, categoryId: "lifestyle" },
  { name: "Seerah", count: 14, categoryId: "seerah" },
  { name: "99 Names", count: 99, categoryId: "names-of-allah" },
  { name: "Duas", count: 36, categoryId: "duas" }
];

export const articles: Article[] = [
  {
    id: "featured-1",
    slug: "the-purpose-of-life-in-the-light-of-the-quran",
    title: "The Purpose of Life in the Light of the Quran",
    category: "Quran",
    categoryId: "quran",
    excerpt: "Understanding why we are here and how to live a meaningful life according to the Quran.",
    content: `
      <p class="lead text-lg font-medium text-zinc-700 dark:text-zinc-300 mb-6">
        Human beings have continually pondered the fundamental question of existence: Why are we here? The Holy Quran answers this with profound clarity and timeless wisdom.
      </p>

      <h2 class="text-2xl font-bold text-primary dark:text-secondary mt-8 mb-4">1. Created for Divine Worship (Ibadah)</h2>
      <p class="mb-6">
        Allah states clearly in Surah Adh-Dhariyat (51:56): <em>"And I did not create the jinn and mankind except to worship Me."</em> In Islam, worship is not restricted to rituals alone; every righteous deed done with sincere intention is an act of worship.
      </p>

      <h2 class="text-2xl font-bold text-primary dark:text-secondary mt-8 mb-4">2. The Concept of Stewardship (Khilafah)</h2>
      <p class="mb-6">
        Man is placed on earth as a trustee (Khalifah) to cultivate justice, promote good, forbid evil, and maintain harmony in society and nature.
      </p>

      <h2 class="text-2xl font-bold text-primary dark:text-secondary mt-8 mb-4">3. Life as a Trial and Preparation for the Hereafter</h2>
      <p class="mb-6">
        The Quran constantly reminds us that this worldly life is a temporary testing ground: <em>"[He] who created death and life to test you as to which of you is best in deed."</em> (Surah Al-Mulk 67:2).
      </p>

      <blockquote class="border-l-4 border-secondary pl-4 py-2 my-6 italic bg-primary/5 dark:bg-card text-zinc-600 dark:text-zinc-400">
        "Know that the life of this world is but amusement and diversion and adornment and boasting to one another..." — Surah Al-Hadid (57:20)
      </blockquote>

      <h2 class="text-2xl font-bold text-primary dark:text-secondary mt-8 mb-4">Conclusion</h2>
      <p class="mb-6">
        Aligning our daily actions with the purpose for which we were created brings true peace (Sakina), moral clarity, and eternal success in both worlds.
      </p>
    `,
    author: "Shaykh Muhammad Ali",
    authorImg: "https://i.pravatar.cc/150?u=muhammadali",
    authorRole: "Senior Islamic Scholar",
    isVerified: true,
    date: "2025-05-20",
    displayDate: "May 20, 2025",
    readTime: "8 min read",
    image: "https://images.unsplash.com/photo-1542810634-71277d95dcbb?q=80&w=1200",
    color: "#0A3A2F",
    level: "Beginner",
    isFeatured: true,
    topics: ["Tawheed", "Quran", "Patience"]
  },
  {
    id: "1",
    slug: "lessons-from-surah-al-kahf",
    title: "Lessons from Surah Al-Kahf for Our Daily Lives",
    category: "Quran",
    categoryId: "quran",
    excerpt: "Discover timeless lessons from the Quran that guide our daily decisions and protect us from the trials of life.",
    content: `
      <p class="lead text-lg font-medium text-zinc-700 dark:text-zinc-300 mb-6">
        Surah Al-Kahf is the 18th chapter of the Holy Quran, which the Prophet Muhammad ﷺ recommended Muslims to recite every Friday. It contains four powerful stories that offer eternal lessons for navigating the tests of modern life.
      </p>

      <h2 class="text-2xl font-bold text-primary dark:text-secondary mt-8 mb-4">1. The People of the Cave (The Trial of Faith)</h2>
      <p class="mb-6">
        The story of the young believers who fled their pagan kingdom to preserve their faith. Allah granted them refuge in a cave and put them to sleep for over 300 years. This story teaches us the value of companionship in faith and that Allah is the ultimate protector of those who stand firm in their belief.
      </p>

      <h2 class="text-2xl font-bold text-primary dark:text-secondary mt-8 mb-4">2. The Owner of the Two Gardens (The Trial of Wealth)</h2>
      <p class="mb-6">
        A tale of two men: one blessed with immense wealth and beautiful gardens who became proud and ungrateful, and another who possessed very little but remained grateful. Eventually, the gardens were destroyed, leaving the wealthy man in deep regret. This lesson reminds us that wealth is a temporary blessing and a test of gratitude.
      </p>

      <h2 class="text-2xl font-bold text-primary dark:text-secondary mt-8 mb-4">3. Moses and Al-Khidr (The Trial of Knowledge)</h2>
      <p class="mb-6">
        Prophet Moses believed he was the most knowledgeable person on Earth. Allah directed him to meet Al-Khidr, who performed actions that seemed baffling at first but revealed divine wisdom in the end. This teaches us humility in seeking knowledge and patience with Allah's divine decree, which we might not always understand immediately.
      </p>

      <blockquote class="border-l-4 border-secondary pl-4 py-2 my-6 italic bg-primary/5 dark:bg-card text-zinc-600 dark:text-zinc-400">
        "Whoever recites Surah Al-Kahf on the day of Friday, there will be a light shining for him between the two Fridays." — Prophet Muhammad ﷺ (Sunan al-Kubra)
      </blockquote>

      <h2 class="text-2xl font-bold text-primary dark:text-secondary mt-8 mb-4">Conclusion</h2>
      <p class="mb-6">
        Reciting Surah Al-Kahf is not just a weekly ritual, but a source of light and guidance. It offers practical reminders to protect our faith, recognize that wealth is a test, keep seeking knowledge with humility, and use power justly for the sake of Allah.
      </p>
    `,
    author: "Shaykh Ahmed Saeed",
    authorImg: "https://i.pravatar.cc/150?u=ahmed",
    authorRole: "Quranic Researcher",
    isVerified: true,
    date: "2025-05-19",
    displayDate: "May 19, 2025",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1609599006353-e629aaabfeae?q=80&w=800",
    color: "#0A3A2F",
    level: "Beginner",
    topics: ["Quran", "Patience", "Faith"]
  },
  {
    id: "2",
    slug: "the-importance-of-sunnah-in-our-life",
    title: "The Importance of Sunnah in Our Life",
    category: "Hadith",
    categoryId: "hadith",
    excerpt: "How following the Sunnah brings blessings, inner peace, and divine protection in daily routines.",
    content: `
      <p class="lead text-lg font-medium text-zinc-700 dark:text-zinc-300 mb-6">
        The Sunnah of Prophet Muhammad ﷺ is the practical manifestation of the Holy Quran. It provides an authentic blueprint for every aspect of human life.
      </p>

      <h2 class="text-2xl font-bold text-primary dark:text-secondary mt-8 mb-4">The Sunnah as Divine Guidance</h2>
      <p class="mb-6">
        Allah commands the believers in Surah Al-Ahzab (33:21): <em>"There has certainly been for you in the Messenger of Allah an excellent pattern for anyone whose hope is in Allah and the Last Day."</em>
      </p>

      <h2 class="text-2xl font-bold text-primary dark:text-secondary mt-8 mb-4">Reviving Sunnahs in the Modern World</h2>
      <p class="mb-6">
        Whether it is smiling at others, eating with the right hand, practicing moderate speech, or keeping regular Adhkar, reviving these practices infuses barakah (blessings) into our busy days.
      </p>

      <blockquote class="border-l-4 border-secondary pl-4 py-2 my-6 italic bg-primary/5 dark:bg-card text-zinc-600 dark:text-zinc-400">
        "He who follows my Sunnah has loved me, and he who loves me will be with me in Paradise." — Prophet Muhammad ﷺ (Jami' at-Tirmidhi)
      </blockquote>
    `,
    author: "Shaykh Yasir Qadhi",
    authorImg: "https://i.pravatar.cc/150?u=yasir",
    authorRole: "Dean of Islamic Studies",
    isVerified: true,
    date: "2025-05-18",
    displayDate: "May 18, 2025",
    readTime: "7 min read",
    image: "https://images.unsplash.com/photo-1590076175582-459437ff7087?q=80&w=800",
    color: "#D48C46",
    level: "Intermediate",
    topics: ["Sunnah", "Hadith", "Patience"]
  },
  {
    id: "3",
    slug: "migration-to-madinah-turning-point",
    title: "The Migration to Madinah: A Turning Point",
    category: "Seerah",
    categoryId: "seerah",
    excerpt: "The event that changed the course of Islamic history forever, establishing the first Islamic society.",
    content: `
      <p class="lead text-lg font-medium text-zinc-700 dark:text-zinc-300 mb-6">
        The Hijrah (Migration) of the Prophet Muhammad ﷺ from Mecca to Madinah marks the establishment of the first Islamic state and the starting point of the Hijri calendar.
      </p>

      <h2 class="text-2xl font-bold text-primary dark:text-secondary mt-8 mb-4">The Strategic Preparation</h2>
      <p class="mb-6">
        The Hijrah was a masterclass in relying upon Allah (Tawakkul) combined with meticulous human planning. From securing provisions to navigating through the Cave of Thawr, every detail was carefully executed.
      </p>

      <h2 class="text-2xl font-bold text-primary dark:text-secondary mt-8 mb-4">Brotherhood of Muhajirun and Ansar</h2>
      <p class="mb-6">
        Upon arriving in Madinah, the Prophet ﷺ paired the immigrants with local helpers in a bond of solidarity unprecedented in history.
      </p>
    `,
    author: "Shaykh Farhan Malik",
    authorImg: "https://i.pravatar.cc/150?u=farhan",
    authorRole: "Historian & Lecturer",
    isVerified: true,
    date: "2025-05-17",
    displayDate: "May 17, 2025",
    readTime: "9 min read",
    image: "https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?q=80&w=800",
    color: "#0A3A2F",
    level: "Intermediate",
    topics: ["Seerah", "Family", "Patience"]
  },
  {
    id: "4",
    slug: "islamic-rulings-modern-financial-issues",
    title: "Islamic Rulings on Modern Financial Issues",
    category: "Fiqh",
    categoryId: "fiqh",
    excerpt: "Learn how Islam guides our financial transactions today, including banking, contracts, and investments.",
    content: `
      <p class="lead text-lg font-medium text-zinc-700 dark:text-zinc-300 mb-6">
        Islamic commercial law (Fiqh al-Mu'amalat) governs contracts and transactions, providing moral and legal parameters for the economy.
      </p>

      <h2 class="text-2xl font-bold text-primary dark:text-secondary mt-8 mb-4">Core Prohibitions in Islamic Finance</h2>
      <p class="mb-4">
        Islamic finance enforces three major principles:
      </p>
      <ul class="list-disc pl-6 mb-6 space-y-2">
        <li><strong>Riba (Interest):</strong> Prohibiting unwarranted surplus on debt.</li>
        <li><strong>Gharar (Excessive Uncertainty):</strong> Ensuring absolute transparency.</li>
        <li><strong>Maysir (Gambling):</strong> Wealth must be generated through real value.</li>
      </ul>
    `,
    author: "Shaykh Assim Al-Hakeem",
    authorImg: "https://i.pravatar.cc/150?u=assim",
    authorRole: "Islamic Jurist",
    isVerified: true,
    date: "2025-05-16",
    displayDate: "May 16, 2025",
    readTime: "8 min read",
    image: "https://images.unsplash.com/photo-1585036156171-384164a8c675?q=80&w=800",
    color: "#0A3A2F",
    level: "Advanced",
    topics: ["Fiqh", "Family"]
  },
  {
    id: "5",
    slug: "powerful-duas-for-every-situation",
    title: "Powerful Duas for Every Situation",
    category: "Duas",
    categoryId: "duas",
    excerpt: "Collection of authentic duas from the Quran and Sunnah for everyday challenges, distress, and gratitude.",
    content: `
      <p class="lead text-lg font-medium text-zinc-700 dark:text-zinc-300 mb-6">
        Supplication (Dua) is the essence of worship. It is the weapon of the believer and an intimate conversation with the Creator of the heavens and the earth.
      </p>

      <h2 class="text-2xl font-bold text-primary dark:text-secondary mt-8 mb-4">1. Dua for Distress and Anxiety</h2>
      <div class="bg-[#FAF7F2] dark:bg-card border-l-4 border-secondary p-6 rounded-2xl mb-6">
        <p class="font-arabic text-2xl text-gray-900 dark:text-white text-center mb-3" dir="rtl">
          اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْهَمِّ وَالْحُزْنِ، وَالْعَجْزِ وَالْكَسَلِ، وَالْبُخْلِ وَالْجُبْنِ، وَضَلَعِ الدَّيْنِ وَغَلَبَةِ الرِّجَالِ
        </p>
        <p class="text-sm italic text-gray-700 dark:text-gray-300 text-center">
          "O Allah, I seek refuge in You from anxiety and sorrow, weakness and laziness, miserliness and cowardice, the burden of debts and from being overpowered by men." (Sahih al-Bukhari)
        </p>
      </div>
    `,
    author: "Ustadhah Aisha Khalid",
    authorImg: "https://i.pravatar.cc/150?u=aisha",
    authorRole: "Islamic Educator",
    isVerified: true,
    date: "2025-05-15",
    displayDate: "May 15, 2025",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?q=80&w=800",
    color: "#0A3A2F",
    level: "Beginner",
    topics: ["Duas", "Prayer", "Patience"]
  },
  {
    id: "6",
    slug: "understanding-tawheed-the-right-way",
    title: "Understanding Tawheed the Right Way",
    category: "Aqeedah",
    categoryId: "aqeedah",
    excerpt: "Strengthen your belief in the Oneness of Allah with clarity and protect your faith from misconceptions.",
    content: `
      <p class="lead text-lg font-medium text-zinc-700 dark:text-zinc-300 mb-6">
        Tawheed (the Oneness of Allah) is the fundamental bedrock of Islam. It is the key to Paradise and the purpose behind all revelations.
      </p>

      <h2 class="text-2xl font-bold text-primary dark:text-secondary mt-8 mb-4">The Three Pillars of Tawheed</h2>
      <ul class="list-disc pl-6 mb-6 space-y-4">
        <li><strong>Tawheed ar-Rububiyyah:</strong> Absolute belief in Allah as the sole Creator and Sustainer.</li>
        <li><strong>Tawheed al-Uluhiyyah:</strong> Directing all acts of worship exclusively to Allah.</li>
        <li><strong>Tawheed al-Asma was-Sifat:</strong> Affirming Allah's beautiful Names and sublime Attributes.</li>
      </ul>
    `,
    author: "Shaykh Abu Bakr Zoud",
    authorImg: "https://i.pravatar.cc/150?u=abubakr",
    authorRole: "Aqeedah Specialist",
    isVerified: true,
    date: "2025-05-14",
    displayDate: "May 14, 2025",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=800",
    color: "#E89E54",
    level: "Intermediate",
    topics: ["Tawheed", "Aqeedah"]
  },
  {
    id: "7",
    slug: "the-99-beautiful-names-of-allah-and-their-spiritual-secrets",
    title: "The 99 Beautiful Names of Allah and Their Spiritual Secrets",
    category: "99 Names",
    categoryId: "names-of-allah",
    excerpt: "Discover the transformative power of knowing Asma-ul-Husna and calling upon Allah through His Divine Attributes.",
    content: `
      <p class="lead text-lg font-medium text-zinc-700 dark:text-zinc-300 mb-6">
        Prophet Muhammad ﷺ said: <em>"Allah has ninety-nine names, one hundred less one. Whoever memorizes and acts upon them will enter Paradise."</em> (Sahih al-Bukhari).
      </p>

      <h2 class="text-2xl font-bold text-primary dark:text-secondary mt-8 mb-4">Living by the Divine Names</h2>
      <p class="mb-6">
        When we know Al-Rahman (The Most Merciful), our hearts fill with hope. When we know Al-Sami' (The All-Hearing), we find comfort that no whisper goes unheard.
      </p>
    `,
    author: "Shaykh Omar Suleiman",
    authorImg: "https://i.pravatar.cc/150?u=omarsuleiman",
    authorRole: "President of Yaqeen Institute",
    isVerified: true,
    date: "2025-05-12",
    displayDate: "May 12, 2025",
    readTime: "10 min read",
    image: "https://images.unsplash.com/photo-1519817650390-64a93db51149?q=80&w=800",
    color: "#1F9E77",
    level: "Beginner",
    topics: ["99 Names", "Tawheed", "Duas"]
  },
  {
    id: "8",
    slug: "a-guide-to-ramadan-and-fasting-with-sincerity",
    title: "A Guide to Ramadan & Fasting with Sincerity",
    category: "Lifestyle",
    categoryId: "lifestyle",
    excerpt: "Maximizing the spiritual blessings of the Holy Month through Quran recitation, charity, and inner purification.",
    content: `
      <p class="lead text-lg font-medium text-zinc-700 dark:text-zinc-300 mb-6">
        Fasting in Ramadan is far more than abstaining from food and drink; it is an annual spiritual rebirth designed to cultivate Taqwa (God-consciousness).
      </p>
    `,
    author: "Dr. Bilal Philips",
    authorImg: "https://i.pravatar.cc/150?u=bilalphilips",
    authorRole: "Chancellor of IOU",
    isVerified: true,
    date: "2025-05-10",
    displayDate: "May 10, 2025",
    readTime: "7 min read",
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=800",
    color: "#D48C46",
    level: "Beginner",
    topics: ["Ramadan", "Prayer", "Patience"]
  },
  {
    id: "9",
    slug: "understanding-tafsir-methodology",
    title: "Understanding Tafsir: Classical vs. Modern Methodologies",
    category: "Quran",
    categoryId: "quran",
    excerpt: "An in-depth look at how scholars interpret the Holy Quran, highlighting classical and contemporary approaches.",
    content: `
      <p class="lead text-lg font-medium text-zinc-700 dark:text-zinc-300 mb-6">
        Tafsir is the science through which the Quran is understood, its meanings explained, and its wisdom extracted for practical application.
      </p>
    `,
    author: "Dr. Bilal Abdul Karim",
    authorImg: "https://i.pravatar.cc/150?u=bilal",
    authorRole: "Professor of Islamic Sciences",
    isVerified: true,
    date: "2025-05-08",
    displayDate: "May 8, 2025",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1542810634-71277d95dcbb?q=80&w=800",
    color: "#1F9E77",
    level: "Advanced",
    topics: ["Quran", "Tawheed"]
  },
  {
    id: "10",
    slug: "preserving-the-prophetic-legacy",
    title: "Preserving the Prophetic Legacy: The Compilation of Hadith",
    category: "Hadith",
    categoryId: "hadith",
    excerpt: "Discover the historic efforts and stringent criteria established to preserve and authenticate the Sunnah.",
    content: `
      <p class="lead text-lg font-medium text-zinc-700 dark:text-zinc-300 mb-6">
        The science of Hadith verification and biographical analysis is an unprecedented feat of preservation in human history.
      </p>
    `,
    author: "Prof. Zainab Al-Alawi",
    authorImg: "https://i.pravatar.cc/150?u=zainab",
    authorRole: "Hadith Researcher",
    isVerified: true,
    date: "2025-05-05",
    displayDate: "May 5, 2025",
    readTime: "7 min read",
    image: "https://images.unsplash.com/photo-1585036156171-384164a8c675?q=80&w=800",
    color: "#6B9FBC",
    level: "Intermediate",
    topics: ["Hadith", "Sunnah"]
  },
  {
    id: "11",
    slug: "spirituality-tazkiyah-heart",
    title: "Tazkiyah: The Spiritual Art of Purifying the Heart",
    category: "Aqeedah",
    categoryId: "aqeedah",
    excerpt: "Exploring the concepts of self-purification and inner serenity to achieve closeness with Allah.",
    content: `
      <p class="lead text-lg font-medium text-zinc-700 dark:text-zinc-300 mb-6">
        Tazkiyah cleanses the spiritual heart of envy, arrogance, and greed while cultivating sincerity, love, and gratitude.
      </p>
    `,
    author: "Sheikh Omar Farooq",
    authorImg: "https://i.pravatar.cc/150?u=omar",
    authorRole: "Spiritual Counselor",
    isVerified: true,
    date: "2025-04-28",
    displayDate: "Apr 28, 2025",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=800",
    color: "#E89E54",
    level: "Intermediate",
    topics: ["Patience", "Aqeedah", "Tawheed"]
  },
  {
    id: "12",
    slug: "patience-sabr-and-gratitude-shukr",
    title: "Patience (Sabr) and Gratitude (Shukr) in Everyday Trials",
    category: "General",
    categoryId: "general",
    excerpt: "How the two wings of faith — Sabr and Shukr — allow a believer to navigate every high and low of life with tranquility.",
    content: `
      <p class="lead text-lg font-medium text-zinc-700 dark:text-zinc-300 mb-6">
        Prophet Muhammad ﷺ remarked: <em>"How wonderful is the affair of the believer, for his affair is all good... If prosperity comes to him, he expresses gratitude to God and that is a good for him; and if adversity befalls him, he endures it patiently and that is a good for him."</em> (Sahih Muslim).
      </p>
    `,
    author: "Mufti Ismail Menk",
    authorImg: "https://i.pravatar.cc/150?u=menk",
    authorRole: "Global Islamic Speaker",
    isVerified: true,
    date: "2025-04-22",
    displayDate: "Apr 22, 2025",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1519817650390-64a93db51149?q=80&w=800",
    color: "#0A3A2F",
    level: "Beginner",
    topics: ["Patience", "Faith", "Family"]
  }
];
