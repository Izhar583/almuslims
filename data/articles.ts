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
  date: string;
  displayDate: string;
  readTime: string;
  image: string;
  color?: string;
  level: "Beginner" | "Intermediate" | "Advanced";
}

export const articles: Article[] = [
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
    date: "2026-06-12",
    displayDate: "June 12, 2026",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1542810634-71277d95dcbb?q=80&w=800",
    color: "#0A3A2F",
    level: "Beginner"
  },
  {
    id: "2",
    slug: "understanding-tafsir-methodology",
    title: "Understanding Tafsir: Classical vs. Modern Methodologies",
    category: "Quran",
    categoryId: "quran",
    excerpt: "An in-depth look at how scholars interpret the Holy Quran, highlighting differences between classical schools and contemporary approaches.",
    content: `
      <p class="lead text-lg font-medium text-zinc-700 dark:text-zinc-300 mb-6">
        The Quran is the foundational text of Islam, believed by Muslims to be the literal word of God revealed to the Prophet Muhammad ﷺ. To comprehend its deep theological, jurisprudential, and moral instructions, the science of <strong>Tafsir</strong> (exegesis) was established.
      </p>

      <h2 class="text-2xl font-bold text-primary dark:text-secondary mt-8 mb-4">What is Tafsir?</h2>
      <p class="mb-6">
        Tafsir literally means "explanation" or "interpretation." In Islamic scholarship, it is the systematic study aimed at understanding the Quranic text, explaining its meanings, clarifying its legal rulings, and uncovering the wisdom behind its revelation (Asbab al-Nuzul).
      </p>

      <h2 class="text-2xl font-bold text-primary dark:text-secondary mt-8 mb-4">Classical Tafsir Methodologies</h2>
      <p class="mb-4">
        Classical Tafsir is generally divided into two main categories:
      </p>
      <ul class="list-disc pl-6 mb-6 space-y-2">
        <li>
          <strong>Tafsir bi'l-Ma'thur (Tradition-based):</strong> This is interpretation of the Quran using the Quran itself, followed by Hadith, and the explanations of the Sahaba (companions) and Tabi'un. The most famous example is <em>Tafsir al-Tabari</em> and <em>Tafsir Ibn Kathir</em>.
        </li>
        <li>
          <strong>Tafsir bi'r-Ra'y (Reason-based):</strong> This approach utilizes rational analysis, Arabic linguistics, and theological speculation alongside traditional reports. A prominent example is <em>Tafsir al-Kabir</em> by Imam Fakhr al-Din al-Razi.
        </li>
      </ul>

      <h2 class="text-2xl font-bold text-primary dark:text-secondary mt-8 mb-4">Modern Approaches to Exegesis</h2>
      <p class="mb-6">
        In the 19th and 20th centuries, modern scholars began writing Tafsirs aimed at addressing contemporary scientific, social, and political challenges. Thinkers like Muhammad Abduh, Rashid Rida, and Sayyid Qutb sought to connect Quranic teachings with modern societal reform, science, and anti-colonial movements, emphasizing the dynamic relevance of the text in the modern age.
      </p>

      <blockquote class="border-l-4 border-secondary pl-4 py-2 my-6 italic bg-primary/5 dark:bg-card text-zinc-600 dark:text-zinc-400">
        "The best of you are those who learn the Quran and teach it." — Prophet Muhammad ﷺ (Sahih al-Bukhari)
      </blockquote>

      <h2 class="text-2xl font-bold text-primary dark:text-secondary mt-8 mb-4">Conclusion</h2>
      <p class="mb-6">
        Whether studying classical exegesis to understand traditional jurisprudence or modern works to connect the scripture with contemporary lifestyle issues, the science of Tafsir remains a vital bridge for believers trying to live their lives according to divine wisdom.
      </p>
    `,
    author: "Dr. Bilal Abdul Karim",
    authorImg: "https://i.pravatar.cc/150?u=bilal",
    date: "2026-06-10",
    displayDate: "June 10, 2026",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1590076175582-459437ff7087?q=80&w=800",
    color: "#1F9E77",
    level: "Advanced"
  },
  {
    id: "3",
    slug: "preserving-the-prophetic-legacy",
    title: "Preserving the Legacy: The Compilation of Hadith",
    category: "Aqeedah",
    categoryId: "aqeedah",
    excerpt: "Discover the rigorous criteria and historic efforts made by early scholars like Imam Bukhari and Sheikh al-Kulayni to document and authenticate hadiths.",
    content: `
      <p class="lead text-lg font-medium text-zinc-700 dark:text-zinc-300 mb-6">
        After the Quran, the Sunnah (sayings and actions of the Prophet ﷺ) represents the second source of Islamic law and spirituality. But how did these traditions travel from verbal narrations in 7th-century Arabia to the structured volumes we read today?
      </p>

      <h2 class="text-2xl font-bold text-primary dark:text-secondary mt-8 mb-4">The Need for Compilation</h2>
      <p class="mb-6">
        During the lifetime of the Prophet ﷺ, the primary focus was compiling the Quran. While some companions wrote down sayings on parchments, most hadiths were memorized. By the late 1st century Hijri, as the generation of companions passed away and political factions arose, the necessity to officially document and verify sayings grew critical.
      </p>

      <h2 class="text-2xl font-bold text-primary dark:text-secondary mt-8 mb-4">The Sunni Methodology (Imam Bukhari & Muslim)</h2>
      <p class="mb-4">
        Imam Muhammad al-Bukhari (d. 256 AH) spent 16 years traveling the Islamic world to compile his <em>Sahih</em>. He set incredibly rigorous standards:
      </p>
      <ul class="list-disc pl-6 mb-6 space-y-2">
        <li>
          <strong>Linguistic and Moral Integrity:</strong> The narrator must be truthful, religious, and have a strong memory.
        </li>
        <li>
          <strong>Continuous Chain (Isnad):</strong> Every narrator in the chain must have explicitly met the person they narrated from.
        </li>
      </ul>

      <h2 class="text-2xl font-bold text-primary dark:text-secondary mt-8 mb-4">The Shia Methodology (Sheikh al-Kulayni & Saduq)</h2>
      <p class="mb-6">
        In the Shia tradition, hadith compilation centered around documenting the teachings of the Prophet ﷺ and the Twelve Imams (Ahl al-Bayt). Sheikh Muhammad al-Kulayni (d. 329 AH) compiled <em>Al-Kafi</em>, selecting over 16,000 narrations to preserve theology and law during the period of Minor Occultation. Shia scholars categorized narrations by examining the trustworthiness of the chain back to an Imam or the Prophet.
      </p>

      <h2 class="text-2xl font-bold text-primary dark:text-secondary mt-8 mb-4">Conclusion</h2>
      <p class="mb-6">
        The rigorous methodology of early Islamic collectors created a sophisticated science of biographical evaluation (Ilm al-Rijal). This intellectual heritage remains one of the most remarkable documentation efforts in human history.
      </p>
    `,
    author: "Prof. Zainab Al-Alawi",
    authorImg: "https://i.pravatar.cc/150?u=zainab",
    date: "2026-06-05",
    displayDate: "June 5, 2026",
    readTime: "7 min read",
    image: "https://images.unsplash.com/photo-1585036156171-384164a8c675?q=80&w=800",
    color: "#6B9FBC",
    level: "Intermediate"
  },
  {
    id: "4",
    slug: "spirituality-tazkiyah-heart",
    title: "Tazkiyah: The Spiritual Art of Purifying the Heart",
    category: "Aqeedah",
    categoryId: "aqeedah",
    excerpt: "Exploring the concepts of Tazkiyah (purification) and Ihsan (perfection) in daily life to achieve inner peace and connection with the Creator.",
    content: `
      <p class="lead text-lg font-medium text-zinc-700 dark:text-zinc-300 mb-6">
        In our fast-paced modern world, it is easy to become spiritually exhausted. The Islamic tradition offers a direct antidote: the science of <strong>Tazkiyah</strong>, or self-purification.
      </p>

      <h2 class="text-2xl font-bold text-primary dark:text-secondary mt-8 mb-4">What is Tazkiyah?</h2>
      <p class="mb-6">
        Tazkiyah literally means "purification" and "growth." It refers to cleansing the soul from spiritual diseases like pride, jealousy, greed, and insincerity, while cultivating virtues such as humility, gratitude, patience, and love for God.
      </p>

      <blockquote class="border-l-4 border-secondary pl-4 py-2 my-6 italic bg-primary/5 dark:bg-card text-zinc-600 dark:text-zinc-400">
        "He has succeeded who purifies it, and he has failed who instills it [with corruption]." — Surah Ash-Shams (91:9-10)
      </blockquote>

      <h2 class="text-2xl font-bold text-primary dark:text-secondary mt-8 mb-4">Practical Steps for Tazkiyah in Daily Life</h2>
      <p class="mb-4">
        To start a spiritual detox, scholars suggest focusing on three core areas:
      </p>
      <ol class="list-decimal pl-6 mb-6 space-y-2">
        <li>
          <strong>Muraqabah (Mindfulness):</strong> Becoming conscious that Allah is constantly observing your actions, thoughts, and intentions.
        </li>
        <li>
          <strong>Muhasabah (Self-Accounting):</strong> Reviewing your actions daily before going to sleep to seek forgiveness for shortcomings and express gratitude for good deeds.
        </li>
        <li>
          <strong>Dhikr (Remembrance):</strong> Daily meditation and recitation of prayers to keep the tongue and heart connected with the Creator.
        </li>
      </ol>

      <h2 class="text-2xl font-bold text-primary dark:text-secondary mt-8 mb-4">Conclusion</h2>
      <p class="mb-6">
        Tazkiyah is not about isolation from the world; it is about engaging with the world while keeping your heart detached from material desires. It is the path to achieving a sound heart (Qalb Salim).
      </p>
    `,
    author: "Sheikh Omar Farooq",
    authorImg: "https://i.pravatar.cc/150?u=omar",
    date: "2026-05-28",
    displayDate: "May 28, 2026",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=800",
    color: "#E89E54",
    level: "Intermediate"
  },
  {
    id: "5",
    slug: "migration-to-madinah-turning-point",
    title: "The Migration to Madinah: A Turning Point",
    category: "Seerah",
    categoryId: "seerah",
    excerpt: "The event that changed the course of Islamic history forever, establishing the first Islamic state.",
    content: `
      <p class="lead text-lg font-medium text-zinc-700 dark:text-zinc-300 mb-6">
        The Hijrah (Migration) of the Prophet Muhammad ﷺ and his companions from Mecca to Yathrib (later renamed Madinah) is one of the most critical events in human history. It marks the beginning of the Islamic Hijri calendar.
      </p>

      <h2 class="text-2xl font-bold text-primary dark:text-secondary mt-8 mb-4">The Context of Hijrah</h2>
      <p class="mb-6">
        For thirteen years, the Muslims in Mecca faced intense persecution, boycotts, and torture. Realizing that the Quraysh elite were planning to assassinate him, the Prophet ﷺ received divine instruction to migrate to Yathrib, whose representatives had pledged loyalty to him.
      </p>

      <h2 class="text-2xl font-bold text-primary dark:text-secondary mt-8 mb-4">The Cave of Thawr</h2>
      <p class="mb-6">
        Accompanied by his loyal companion Abu Bakr, the Prophet ﷺ hid in the Cave of Thawr for three days. When the search parties reached the mouth of the cave, Abu Bakr feared they would be caught. The Prophet ﷺ comforted him saying, "Do not grieve; indeed Allah is with us." (Quran 9:40).
      </p>

      <h2 class="text-2xl font-bold text-primary dark:text-secondary mt-8 mb-4">Establishing the New Society</h2>
      <p class="mb-6">
        Upon arriving in Madinah, the Prophet ﷺ established brotherhood between the Meccan immigrants (Muhajirun) and the local helpers (Ansar). He built the Prophetic Mosque and drafted the Covenant of Madinah, securing religious freedom and co-existence for all citizens, including the Jewish tribes.
      </p>

      <h2 class="text-2xl font-bold text-primary dark:text-secondary mt-8 mb-4">Conclusion</h2>
      <p class="mb-6">
        The Migration was not a flight from fear, but a strategic step to construct a secure and just community. It stands as an eternal symbol of sacrifice, reliance on Allah, planning, and brotherhood.
      </p>
    `,
    author: "Shaykh Farhan Malik",
    authorImg: "https://i.pravatar.cc/150?u=farhan",
    date: "2026-05-17",
    displayDate: "May 17, 2026",
    readTime: "9 min read",
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=800",
    color: "#0A3A2F",
    level: "Intermediate"
  },
  {
    id: "6",
    slug: "islamic-rulings-modern-financial-issues",
    title: "Islamic Rulings on Modern Financial Issues",
    category: "Fiqh",
    categoryId: "fiqh",
    excerpt: "Learn how Islam guides our financial transactions and business contracts today, including banking and investments.",
    content: `
      <p class="lead text-lg font-medium text-zinc-700 dark:text-zinc-300 mb-6">
        Islamic commercial law (Fiqh al-Mu'amalat) governs financial transactions. As modern finance grows more complex, Islamic scholars utilize principles from Quran and Sunnah to determine the permissibility of new financial instruments.
      </p>

      <h2 class="text-2xl font-bold text-primary dark:text-secondary mt-8 mb-4">Core Principles of Islamic Finance</h2>
      <p class="mb-4">
        Islamic finance differs fundamentally from conventional finance by enforcing three major prohibitions:
      </p>
      <ul class="list-disc pl-6 mb-6 space-y-2">
        <li>
          <strong>Riba (Interest):</strong> Any guaranteed premium charged on loans is strictly prohibited. Money is considered a medium of exchange, not an asset that generates wealth on its own.
        </li>
        <li>
          <strong>Gharar (Uncertainty):</strong> Contracts that involve excessive ambiguity or speculation are void. Both parties must have clear knowledge of terms and outcomes.
        </li>
        <li>
          <strong>Maysir (Gambling):</strong> Profit must be earned through real value creation, not games of chance.
        </li>
      </ul>

      <h2 class="text-2xl font-bold text-primary dark:text-secondary mt-8 mb-4">Halal Alternatives</h2>
      <p class="mb-6">
        Instead of interest-bearing loans, Islamic finance relies on profit-and-loss sharing structures (Mudarabah and Musharakah) and cost-plus sales (Murabaha). Modern Islamic banks use these tools to offer home financing, auto financing, and investment funds.
      </p>

      <h2 class="text-2xl font-bold text-primary dark:text-secondary mt-8 mb-4">Conclusion</h2>
      <p class="mb-6">
        The ultimate goal of Islamic economics is justice, shared risk, and societal welfare. Exploring modern halal investment avenues helps Muslims keep their earnings pure while contributing to ethical economic growth.
      </p>
    `,
    author: "Shaykh Assim Al-Hakeem",
    authorImg: "https://i.pravatar.cc/150?u=assim",
    date: "2026-05-16",
    displayDate: "May 16, 2026",
    readTime: "8 min read",
    image: "https://images.unsplash.com/photo-1585036156171-384164a8c675?q=80&w=800",
    color: "#0A3A2F",
    level: "Advanced"
  },
  {
    id: "7",
    slug: "powerful-duas-for-every-situation",
    title: "Powerful Duas for Every Situation",
    category: "Duas",
    categoryId: "duas",
    excerpt: "A collection of authentic, powerful duas from the Quran and Sunnah for everyday challenges and peace of mind.",
    content: `
      <p class="lead text-lg font-medium text-zinc-700 dark:text-zinc-300 mb-6">
        Supplication (Dua) is described by the Prophet Muhammad ﷺ as the "brain of worship." It is a direct channel of communication between the servant and the Creator, offering comfort in times of joy and distress.
      </p>

      <h2 class="text-2xl font-bold text-primary dark:text-secondary mt-8 mb-4">1. Dua for Worry and Grief</h2>
      <p class="mb-4">
        The Prophet ﷺ used to make this supplication for relief from distress:
      </p>
      <div class="bg-[#FFFCF6] border-l-4 border-secondary p-6 rounded-2xl mb-6">
        <p class="font-arabic text-2xl text-gray-900 text-center mb-3" dir="rtl">
          اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْهَمِّ وَالْحُزْنِ، وَالْعَجْزِ وَالْكَسَلِ، وَالْبُخْلِ وَالْجُبْنِ، وَضَلَعِ الدَّيْنِ وَغَلَبَةِ الرِّجَالِ
        </p>
        <p class="text-sm italic text-gray-700 text-center">
          "O Allah, I seek refuge in You from anxiety and sorrow, weakness and laziness, miserliness and cowardice, the burden of debts and from being overpowered by men." (Sahih al-Bukhari)
        </p>
      </div>

      <h2 class="text-2xl font-bold text-primary dark:text-secondary mt-8 mb-4">2. Dua for Protection</h2>
      <p class="mb-4">
        To seek protection from harm, the Prophet ﷺ recommended reciting this three times every morning and evening:
      </p>
      <div class="bg-[#FFFCF6] border-l-4 border-secondary p-6 rounded-2xl mb-6">
        <p class="font-arabic text-2xl text-gray-900 text-center mb-3" dir="rtl">
          بِسْمِ اللَّهِ الَّذِي لَا يَضُرُّ مَعَ اسْمِهِ شَيْءٌ فِي الْأَرْضِ وَلَا فِي السَّمَاءِ وَهُوَ السَّمِيعُ الْعَلِيمُ
        </p>
        <p class="text-sm italic text-gray-700 text-center">
          "In the name of Allah, with whose name nothing can cause harm on Earth or in the heaven, and He is the All-Hearing, the All-Knowing." (Sunan Abi Dawud)
        </p>
      </div>

      <h2 class="text-2xl font-bold text-primary dark:text-secondary mt-8 mb-4">Conclusion</h2>
      <p class="mb-6">
        Consistently making dua keeps our hearts humble and connected to Allah. By memorizing these authentic supplications and reciting them with deep conviction, we can find true peace and divine protection.
      </p>
    `,
    author: "Ustadhah Aisha Khalid",
    authorImg: "https://i.pravatar.cc/150?u=aisha",
    date: "2026-05-15",
    displayDate: "May 15, 2026",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?q=80&w=800",
    color: "#0A3A2F",
    level: "Beginner"
  },
  {
    id: "8",
    slug: "understanding-tawheed-right-way",
    title: "Understanding Tawheed the Right Way",
    category: "Aqeedah",
    categoryId: "aqeedah",
    excerpt: "Strengthen your belief in the Oneness of Allah with absolute clarity, avoiding common misconceptions.",
    content: `
      <p class="lead text-lg font-medium text-zinc-700 dark:text-zinc-300 mb-6">
        Tawheed is the core foundation of the Islamic creed. It is the belief in the absolute Oneness, uniqueness, and supremacy of Allah, the Creator of the universe.
      </p>

      <h2 class="text-2xl font-bold text-primary dark:text-secondary mt-8 mb-4">The Three Divisions of Tawheed</h2>
      <p class="mb-4">
        To understand Tawheed completely, scholars explain it through three main categories:
      </p>
      <ul class="list-disc pl-6 mb-6 space-y-4">
        <li>
          <strong>Tawheed ar-Rububiyyah (Oneness of Lordship):</strong> Believing that Allah is the sole Creator, Provider, Maintainer, and Master of everything in existence. None shares in His acts of creation or control.
        </li>
        <li>
          <strong>Tawheed al-Uluhiyyah (Oneness of Worship):</strong> Directing all acts of worship — such as prayer, fasting, sacrifice, fear, and hope — exclusively to Allah alone, without assigning any partners, intercessors, or rivals.
        </li>
        <li>
          <strong>Tawheed al-Asma was-Sifat (Oneness of Names and Attributes):</strong> Affirming the names and attributes that Allah and His Messenger ﷺ have established for Him, without distortion, negation, comparison, or asking "how".
        </li>
      </ul>

      <h2 class="text-2xl font-bold text-primary dark:text-secondary mt-8 mb-4">Why Tawheed Matters</h2>
      <p class="mb-6">
        Tawheed is the message with which all prophets were sent. It frees the human mind from superstition and submission to created beings, guiding the heart to find peace and purpose in serving the only One worthy of worship.
      </p>
    `,
    author: "Shaykh Abu Bakr Zoud",
    authorImg: "https://i.pravatar.cc/150?u=abubakr",
    date: "2026-05-14",
    displayDate: "May 14, 2026",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=800",
    color: "#E89E54",
    level: "Intermediate"
  }
];
