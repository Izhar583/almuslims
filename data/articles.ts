export interface Article {
  id: string;
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  readTime: string;
  image: string;
  color: string;
}

export const articles: Article[] = [
  {
    id: "1",
    slug: "understanding-tafsir-methodology",
    title: "Understanding Tafsir: Classical vs. Modern Methodologies",
    category: "Quranic Studies",
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
    date: "June 10, 2026",
    readTime: "5 min read",
    image: "linear-gradient(135deg, #1f4037 0%, #99f2c8 100%)",
    color: "#1F9E77"
  },
  {
    id: "2",
    slug: "preserving-the-prophetic-legacy",
    title: "Preserving the Legacy: The Compilation of Hadith",
    category: "Hadith Studies",
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
    date: "June 05, 2026",
    readTime: "7 min read",
    image: "linear-gradient(135deg, #135058 0%, #f107a3 100%)",
    color: "#6B9FBC"
  },
  {
    id: "3",
    slug: "spirituality-tazkiyah-heart",
    title: "Tazkiyah: The Spiritual Art of Purifying the Heart",
    category: "Spirituality",
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
    date: "May 28, 2026",
    readTime: "6 min read",
    image: "linear-gradient(135deg, #e65c00 0%, #F9D423 100%)",
    color: "#E89E54"
  }
];
