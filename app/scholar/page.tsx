"use client";

import React, { useState, useRef, useEffect } from "react";
import { FaUserGraduate, FaPaperPlane, FaCompass, FaQuestionCircle, FaChevronDown, FaChevronUp, FaSpinner, FaRobot } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

interface ChatMessage {
  sender: "user" | "scholar";
  text: string;
}

interface FAQItem {
  question: string;
  answer: string;
  fiqh: string;
}

const faqs: FAQItem[] = [
  {
    question: "Is verbal intention (Niyyah) necessary for daily prayers?",
    answer: "According to all major schools of thought, the seat of intention (Niyyah) is the heart. Having the conscious awareness of which prayer you are performing is sufficient. While some scholars suggest pronouncing it verbally (e.g. 'I intend to pray four units of Dhuhr...') to aid focus, it is not a mandatory condition for the validity of the prayer.",
    fiqh: "Hanafi & Jafria consensus"
  },
  {
    question: "How does Fiqh Jafria define the conditions for valid congregational (Jama'at) prayer?",
    answer: "In Jafari jurisprudence, one of the key conditions for congregational prayer is that the leader (Imam of Jama'at) must be 'Adil' (just/upright). The followers must have confidence in the Imam's character, integrity, and correct pronunciation of the Quranic chapters. Additionally, there must be no physical barrier (like a high wall) between the Imam and the followers, or between the rows of followers.",
    fiqh: "Fiqh Jafria"
  },
  {
    question: "What is the ruling on paying Zakat to immediate family members?",
    answer: "Zakat cannot be given to individuals whom you are already legally obligated to support, such as your parents, grandparents, children, grandchildren, or wife. However, it is permissible and highly encouraged to give Zakat to other relatives who are in need, such as siblings, aunts, uncles, or cousins, as it combines charity with upholding family ties.",
    fiqh: "Fiqh Hanafi"
  },
  {
    question: "How can I improve concentration (Khushu) in my prayers?",
    answer: "To gain Khushu: 1) Understand the meanings of the Arabic phrases you recite. 2) Eliminate immediate worldly distractions before standing up (e.g. put away your phone). 3) Walk slowly and perform wudu mindfully. 4) Pray as if it is your farewell prayer. 5) Look at the place of prostration (Sajdah).",
    fiqh: "Consensus"
  }
];

// Mock database of AI Scholar answers
const prebuiltAnswers: Record<string, string> = {
  prayer: "Prayer (Salat) is the second pillar of Islam and the link between a servant and their Creator. Allah says: 'Establish prayer, for indeed prayer prohibits immorality and wrongdoing' (Surah Al-Ankabut 29:45). To improve prayer, perform Wudu mindfully, understand the words recited, and stand with absolute humility (Khushu), realizing you are standing before the Lord of the worlds.",
  fasting: "Fasting in Ramadan is a means to attain Taqwa (God-consciousness). In both Hanafi and Jafari fiqh, fasting requires abstaining from food, drink, and other invalidating acts from dawn (Fajr) until dusk (Maghrib). Remember that fasting of the tongue (abstaining from lying and backbiting) and the heart is as critical as fasting of the stomach.",
  zakat: "Zakat is a compulsory charity representing 2.5% of your surplus wealth above the Nisab threshold held for a lunar year. Giving Zakat purifies your wealth and aids the vulnerable. Allah says: 'Take from their wealth a charity by which you purify them and cause them increase' (Surah At-Tawbah 9:103). Prefer needy relatives who are not under your direct financial custody.",
  hadith: "The Hadith collections serve as the secondary source of guidance. Fiqh Hanafi draws rulings from collections like Sahih al-Bukhari and Sahih Muslim using jurisprudential analogy (Qiyas) developed by Imam Abu Hanifa. Fiqh Jafria draws from the teachings of the Ahl al-Bayt compiled in books like Al-Kafi, assessing chains of narrators with rigorous critical analysis.",
  family: "Islam places paramount importance on family relations (Silat al-Rahm). The Prophet ﷺ said: 'The best of you are those who are best to their families' (Tirmidhi). Always treat parents with utmost respect (Uff is prohibited), show kindness to spouses, and nurture children with ethical Islamic education.",
};

export default function ScholarPage() {
  // Form States
  const [formName, setFormName] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formFiqh, setFormFiqh] = useState("Hanafi");
  const [formCat, setFormCat] = useState("Fiqh");
  const [formTitle, setFormTitle] = useState("");
  const [formDetail, setFormDetail] = useState("");
  const [formLoading, setFormLoading] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);

  // Chat States
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      sender: "scholar",
      text: "Assalamu Alaikum. I am Sheikh Al-Muslims AI, trained on classical Islamic jurisprudence from the Quran, Sunnah, and major schools of thought. How can I assist you with your questions today?"
    }
  ]);
  const [chatLoading, setChatLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Accordion state
  const [openFAQIndex, setOpenFAQIndex] = useState<number | null>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages, chatLoading]);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName || !formEmail || !formTitle || !formDetail) return;

    setFormLoading(true);
    setTimeout(() => {
      setFormLoading(false);
      setFormSuccess(true);
      // reset form
      setFormTitle("");
      setFormDetail("");
      setTimeout(() => setFormSuccess(false), 4000);
    }, 2000);
  };

  const handleChatSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim() || chatLoading) return;

    const userText = chatInput.trim();
    setChatMessages((prev) => [...prev, { sender: "user", text: userText }]);
    setChatInput("");
    setChatLoading(true);

    setTimeout(() => {
      let responseText = "Thank you for asking. Seeking knowledge is highly encouraged in Islam. Regarding your question, I advise you to consult classical reference texts or consult local scholars. For specific rulings, please clarify your exact circumstances.";
      
      const lowercaseQuery = userText.toLowerCase();
      // Match keywords in query
      for (const [key, val] of Object.entries(prebuiltAnswers)) {
        if (lowercaseQuery.includes(key)) {
          responseText = val;
          break;
        }
      }

      setChatMessages((prev) => [...prev, { sender: "scholar", text: responseText }]);
      setChatLoading(false);
    }, 2000);
  };

  return (
    <main className="min-h-screen bg-background text-zinc-800 dark:text-zinc-200 py-12 transition-colors">
      {/* Decorative glows */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10 opacity-30 dark:opacity-20">
        <div className="absolute top-10 right-1/4 w-[400px] h-[400px] rounded-full bg-primary/10 blur-[120px]" />
        <div className="absolute bottom-10 left-1/4 w-[400px] h-[400px] rounded-full bg-secondary/10 blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-secondary text-sm font-mono tracking-[0.2em] uppercase mb-3 flex items-center justify-center gap-1.5">
            <FaUserGraduate /> Scholarly Inquiry Portal
          </p>
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-primary dark:text-zinc-100 mb-6">
            Ask a Scholar
          </h1>
          <p className="text-zinc-500 dark:text-zinc-400 max-w-2xl mx-auto text-base font-body">
            Submit your queries directly to certified scholars of Fiqh Hanafi and Fiqh Jafria, or chat instantly with our AI assistant trained on classical reference manuals.
          </p>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch mb-20">
          
          {/* Left Column: Form Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white dark:bg-card border border-zinc-200/50 dark:border-zinc-800/80 rounded-3xl p-8 shadow-xl flex flex-col justify-between"
          >
            <div>
              <h2 className="text-2xl font-bold font-heading text-primary dark:text-zinc-100 mb-2 flex items-center gap-2">
                <FaQuestionCircle className="text-secondary" /> Submit a New Question
              </h2>
              <p className="text-zinc-500 dark:text-zinc-400 text-xs mb-6 font-body">
                Your question will be forwarded to a verified scholar. You will receive an email response and the option to publish it anonymously.
              </p>

              {formSuccess ? (
                <div className="p-6 bg-green-500/10 border border-green-500/25 rounded-2xl text-center">
                  <h3 className="text-lg font-bold text-green-600 dark:text-green-400 mb-2">Question Submitted!</h3>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400 font-body">
                    We have successfully queued your query. Our panel of scholars will review and respond within 24-48 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-zinc-500 dark:text-zinc-400">Name</label>
                      <input
                        type="text"
                        required
                        value={formName}
                        onChange={(e) => setFormName(e.target.value)}
                        placeholder="e.g. Muhammad"
                        className="w-full px-4 py-3 bg-zinc-50 dark:bg-background border border-zinc-200/50 dark:border-zinc-800/80 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-zinc-500 dark:text-zinc-400">Email</label>
                      <input
                        type="email"
                        required
                        value={formEmail}
                        onChange={(e) => setFormEmail(e.target.value)}
                        placeholder="email@example.com"
                        className="w-full px-4 py-3 bg-zinc-50 dark:bg-background border border-zinc-200/50 dark:border-zinc-800/80 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-zinc-500 dark:text-zinc-400">School of Thought (Fiqh)</label>
                      <select
                        value={formFiqh}
                        onChange={(e) => setFormFiqh(e.target.value)}
                        className="w-full px-4 py-3 bg-zinc-50 dark:bg-background border border-zinc-200/50 dark:border-zinc-800/80 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                      >
                        <option value="Hanafi">Hanafi School</option>
                        <option value="Jafria">Jafari School</option>
                        <option value="Shafii">Shafi'i School</option>
                        <option value="Maliki">Maliki School</option>
                        <option value="Hanbali">Hanbali School</option>
                      </select>
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-zinc-500 dark:text-zinc-400">Category</label>
                      <select
                        value={formCat}
                        onChange={(e) => setFormCat(e.target.value)}
                        className="w-full px-4 py-3 bg-zinc-50 dark:bg-background border border-zinc-200/50 dark:border-zinc-800/80 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                      >
                        <option value="Fiqh">Fiqh (Jurisprudence)</option>
                        <option value="Creed">Aqeedah (Creed)</option>
                        <option value="Hadith">Hadith Studies</option>
                        <option value="Family">Family / Marriage</option>
                        <option value="Spirituality">Spirituality (Tazkiyah)</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-zinc-500 dark:text-zinc-400">Brief Title</label>
                    <input
                      type="text"
                      required
                      value={formTitle}
                      onChange={(e) => setFormTitle(e.target.value)}
                      placeholder="e.g. Ruling on delayed prayer"
                      className="w-full px-4 py-3 bg-zinc-50 dark:bg-background border border-zinc-200/50 dark:border-zinc-800/80 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-zinc-500 dark:text-zinc-400">Detailed Description</label>
                    <textarea
                      required
                      rows={5}
                      value={formDetail}
                      onChange={(e) => setFormDetail(e.target.value)}
                      placeholder="Write your question details here. Please provide necessary context for a precise ruling..."
                      className="w-full px-4 py-3 bg-zinc-50 dark:bg-background border border-zinc-200/50 dark:border-zinc-800/80 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent font-body"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={formLoading}
                    className="w-full py-3.5 bg-primary text-white hover:bg-primaryHover disabled:bg-primary/50 font-semibold rounded-xl text-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
                  >
                    {formLoading ? (
                      <>
                        <FaSpinner className="animate-spin" /> Transmitting Question...
                      </>
                    ) : (
                      "Submit Question to Panel"
                    )}
                  </button>
                </form>
              )}
            </div>
          </motion.div>

          {/* Right Column: Chat Assistant Widget */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white dark:bg-card border border-zinc-200/50 dark:border-zinc-800/80 rounded-3xl p-6 shadow-xl flex flex-col justify-between min-h-[500px]"
          >
            {/* Widget Header */}
            <div className="flex items-center justify-between pb-4 border-b border-zinc-100 dark:border-zinc-800/60 mb-4">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-primary/10 rounded-2xl text-primary dark:text-secondary">
                  <FaRobot size={20} />
                </div>
                <div>
                  <h3 className="text-base font-bold font-heading text-primary dark:text-zinc-100">
                    Sheikh Al-Muslims AI
                  </h3>
                  <span className="text-[10px] text-green-500 font-bold tracking-wider uppercase flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" /> Active Scholar Assistant
                  </span>
                </div>
              </div>
            </div>

            {/* Messages Display */}
            <div className="flex-1 overflow-y-auto max-h-[300px] mb-4 space-y-4 px-2 font-body text-xs sm:text-sm">
              {chatMessages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${
                    msg.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[85%] p-3.5 rounded-2xl leading-relaxed shadow-sm ${
                      msg.sender === "user"
                        ? "bg-primary text-white rounded-tr-none"
                        : "bg-zinc-50 dark:bg-background border border-zinc-100 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 rounded-tl-none"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}

              {chatLoading && (
                <div className="flex justify-start">
                  <div className="bg-zinc-50 dark:bg-background border border-zinc-100 dark:border-zinc-800 p-3.5 rounded-2xl rounded-tl-none text-zinc-400 flex items-center gap-2">
                    <FaSpinner className="animate-spin text-secondary" />
                    <span className="text-[11px] font-medium italic">
                      Sheikh AI is formulating response...
                    </span>
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Quick Prompts */}
            <div className="flex flex-wrap gap-1.5 mb-4">
              {["Prayer", "Fasting", "Zakat", "Hadith", "Family"].map((topic) => (
                <button
                  key={topic}
                  onClick={() => setChatInput(`Ask about ${topic.toLowerCase()}`)}
                  className="px-3 py-1 bg-zinc-50 dark:bg-background border border-zinc-200/50 dark:border-zinc-800/80 rounded-full text-[10px] font-semibold text-zinc-500 hover:text-primary dark:hover:text-secondary cursor-pointer transition-colors"
                >
                  {topic}
                </button>
              ))}
            </div>

            {/* Chat Form */}
            <form onSubmit={handleChatSubmit} className="flex gap-2">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Ask e.g. How to get focus in prayer?"
                className="flex-1 px-4 py-3.5 bg-zinc-50 dark:bg-background border border-zinc-200/50 dark:border-zinc-800/80 rounded-2xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent font-body"
              />
              <button
                type="submit"
                className="p-4 bg-primary text-white hover:bg-primaryHover rounded-2xl cursor-pointer transition-all shadow-md"
                aria-label="Send message"
              >
                <FaPaperPlane size={14} />
              </button>
            </form>
          </motion.div>

        </div>

        {/* Resolved FAQs Section */}
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold font-heading text-primary dark:text-zinc-100 mb-8 text-center flex items-center justify-center gap-2">
            <FaCompass className="text-secondary" /> Resolved Public Questions
          </h2>

          <div className="space-y-4 font-body">
            {faqs.map((faq, idx) => {
              const isOpen = openFAQIndex === idx;
              return (
                <div
                  key={idx}
                  className="bg-white dark:bg-card border border-zinc-200/50 dark:border-zinc-800/80 rounded-2xl overflow-hidden shadow-sm"
                >
                  {/* Header Button */}
                  <button
                    onClick={() => setOpenFAQIndex(isOpen ? null : idx)}
                    className="w-full px-6 py-5 flex items-center justify-between text-left cursor-pointer hover:bg-zinc-50/50 dark:hover:bg-zinc-800/50 transition-colors"
                  >
                    <span className="font-bold text-sm sm:text-base text-primary dark:text-zinc-100 pr-4">
                      {faq.question}
                    </span>
                    <span className="flex items-center gap-3 shrink-0">
                      <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-500">
                        {faq.fiqh}
                      </span>
                      {isOpen ? <FaChevronUp className="text-zinc-400" /> : <FaChevronDown className="text-zinc-400" />}
                    </span>
                  </button>

                  {/* Body Panel */}
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden bg-zinc-50/30 dark:bg-background/20 border-t border-zinc-100 dark:border-zinc-800/60"
                      >
                        <p className="px-6 py-5 text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed">
                          {faq.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </main>
  );
}
