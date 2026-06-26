"use client";

import { motion } from "framer-motion";
import { HiOutlineBookOpen, HiOutlineHeart, HiOutlineSun, HiOutlineShieldCheck, HiOutlineUsers, HiOutlineGlobeAlt } from "react-icons/hi2";
import Link from "next/link";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

const features = [
  {
    icon: <HiOutlineBookOpen className="w-8 h-8" />,
    title: "The Holy Quran",
    description: "Access the complete Quran with beautiful Uthmani script and authentic translations from renowned scholars."
  },
  {
    icon: <HiOutlineHeart className="w-8 h-8" />,
    title: "Verified Hadith",
    description: "Authentic collections from Kutub al-Sittah, ensuring you connect with the genuine teachings of Prophet Muhammad (PBUH)."
  },
  {
    icon: <HiOutlineSun className="w-8 h-8" />,
    title: "Prayer Times",
    description: "Precise calculation of daily Salah times based on your location, helping you maintain your spiritual discipline."
  },
  {
    icon: <HiOutlineShieldCheck className="w-8 h-8" />,
    title: "Authentic Resources",
    description: "Every piece of content is cross-referenced with reliable Islamic sources to ensure accuracy and integrity."
  },
  {
    icon: <HiOutlineUsers className="w-8 h-8" />,
    title: "Growing Community",
    description: "A platform designed for Muslims worldwide to explore, learn, and grow together in their faith."
  },
  {
    icon: <HiOutlineGlobeAlt className="w-8 h-8" />,
    title: "Global Access",
    description: "Mobile-responsive and lightning fast, bringing Islamic knowledge to your fingertips, wherever you are."
  }
];

export default function AboutContent() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden bg-primary text-white">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,var(--color-secondary)_0%,transparent_50%)] opacity-30" />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="font-heading text-5xl sm:text-7xl font-bold mb-6">
              Empowering Your <span className="text-secondary">Faith</span>
            </h1>
            <p className="text-xl text-white/80 max-w-2xl mx-auto leading-relaxed">
              AlMuslims is your modern digital gateway to the timeless wisdom of Islam. 
              We blend technology with tradition to bring authentic knowledge to your daily life.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            <motion.div 
              className="p-8 bg-white rounded-3xl border border-primary/5 shadow-xl shadow-primary/5"
              {...fadeInUp}
            >
              <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center mb-6">
                <HiOutlineShieldCheck className="w-6 h-6" />
              </div>
              <h2 className="font-heading text-2xl font-bold text-primary mb-4">Our Mission</h2>
              <p className="text-gray-600 leading-relaxed">
                To provide a clean, ad-free, and authentic digital ecosystem where Muslims can access the Quran, Hadith, 
                and essential Islamic resources with ease and confidence. We strive for excellence in every pixel and every verse.
              </p>
            </motion.div>

            <motion.div 
              className="p-8 bg-white rounded-3xl border border-primary/5 shadow-xl shadow-primary/5"
              {...fadeInUp}
              transition={{ delay: 0.2 }}
            >
              <div className="w-12 h-12 bg-secondary/10 text-secondary rounded-xl flex items-center justify-center mb-6">
                <HiOutlineGlobeAlt className="w-6 h-6" />
              </div>
              <h2 className="font-heading text-2xl font-bold text-primary mb-4">Our Vision</h2>
              <p className="text-gray-600 leading-relaxed">
                To become the most trusted digital companion for Muslims globally, evolving with modern needs while 
                remaining rooted in the original teachings of the Quran and Sunnah.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-primary mb-4">Why AlMuslims?</h2>
            <div className="w-20 h-1 bg-secondary mx-auto rounded-full" />
          </div>

          <motion.div 
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {features.map((feature, idx) => (
              <motion.div 
                key={idx}
                variants={fadeInUp}
                className="group p-8 rounded-2xl border border-gray-100 hover:border-secondary/20 hover:bg-primary/5 transition-all duration-300"
              >
                <div className="mb-6 text-secondary group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="font-heading text-xl font-bold text-primary mb-3">{feature.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div 
            className="p-12 rounded-[32px] bg-linear-to-br from-primary to-primaryHover text-white shadow-2xl relative overflow-hidden"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="relative z-10">
              <h2 className="font-heading text-3xl sm:text-4xl font-bold mb-6">Start Your Spiritual Journey</h2>
              <p className="text-white/80 mb-10 text-lg">
                Explore the Quran, learn authentic Hadiths, and connect with your faith today.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link 
                  href="/quran" 
                  className="px-8 py-4 bg-secondary hover:bg-secondary/90 text-white font-bold rounded-xl transition-all"
                >
                  Read Quran
                </Link>
                <Link 
                  href="/blog" 
                  className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl transition-all border border-white/20"
                >
                  Explore Blog
                </Link>
              </div>
            </div>
            
            {/* Decorative circles */}
            <div className="absolute -bottom-12 -right-12 w-64 h-64 bg-secondary/10 rounded-full blur-3xl" />
            <div className="absolute -top-12 -left-12 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
          </motion.div>
        </div>
      </section>
    </div>
  );
}
