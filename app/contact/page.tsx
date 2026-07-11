"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaTelegram } from "react-icons/fa";
import {
  HiOutlineQuestionMarkCircle,
  HiOutlineDocumentText,
  HiOutlineExclamationCircle,
  HiOutlineLightBulb,
  HiOutlineUserGroup,
  HiOutlineDotsHorizontal,
} from "react-icons/hi";

const subjects = [
  "General Question",
  "Content Support",
  "Technical Issue",
  "Suggestion",
  "Partnership",
  "Other",
];

const helpTopics = [
  {
    icon: HiOutlineQuestionMarkCircle,
    title: "General Inquiry",
    desc: "General questions about AlMuslims",
  },
  {
    icon: HiOutlineDocumentText,
    title: "Content Support",
    desc: "Questions about articles, resources or features",
  },
  {
    icon: HiOutlineExclamationCircle,
    title: "Technical Issue",
    desc: "Report a bug or technical problem",
  },
  {
    icon: HiOutlineLightBulb,
    title: "Suggestions",
    desc: "Share your ideas and suggestions",
  },
  {
    icon: HiOutlineUserGroup,
    title: "Partnership",
    desc: "Collaboration or partnership inquiries",
  },
  {
    icon: HiOutlineDotsHorizontal,
    title: "Other",
    desc: "Anything else",
  },
];

export default function ContactUsPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    if (name === "name") {
      // Only allow letters and spaces
      setForm((prev) => ({ ...prev, [name]: value.replace(/[^a-zA-Z\s]/g, "") }));
    } else if (name === "phone") {
      // Only allow digits
      setForm((prev) => ({ ...prev, [name]: value.replace(/[^0-9]/g, "") }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Failed to send");
      setStatus("success");
      setForm({ name: "", email: "", phone: "", subject: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  return (
    <main className="bg-bg">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 text-sm text-gray-500">
        <Link href="/" className="hover:text-primary">
          Home
        </Link>
        <span className="mx-2">›</span>
        <span className="text-gray-700">Contact Us</span>
      </div>

      {/* Hero */}
      <section className="relative max-w-7xl mx-4 sm:mx-6 lg:mx-auto h-64 sm:h-96 px-4 sm:px-6 lg:px-8 overflow-hidden rounded-2xl mt-4 mb-6">
        <div className="absolute inset-0 -z-10">
          <Image
            src="/assets/contact-hero.jpg"
            alt="Masjid"
            fill
            className="object-cover object-bottom opacity-50"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-bg via-bg/80 to-transparent" />
        </div>

        <div className="relative max-w-xl h-full flex flex-col justify-center">
          <h1 className="font-heading text-4xl sm:text-5xl font-bold text-gray-900">
            Contact Us
          </h1>
          <p className="mt-3 text-gray-600">
            We would love to hear from you! Whether you have a question,
            feedback, suggestion, or need support, our team is here to help.
          </p>
        </div>
      </section>

      {/* Form + Sidebar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-3 gap-8 pb-16">
        {/* Send Us a Message */}
        <div className="lg:col-span-2 bg-bg-card border border-gray-100 rounded-2xl p-6 sm:p-8 shadow-sm">
          <h2 className="font-heading text-2xl font-bold text-gray-900 mb-6">
            Send Us a Message
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Your Name <span className="text-secondary">*</span>
              </label>
              <input
                type="text"
                name="name"
                required
                value={form.name}
                onChange={handleChange}
                placeholder="Enter your full name (letters only)"
                className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address <span className="text-secondary">*</span>
              </label>
              <input
                type="email"
                name="email"
                required
                value={form.email}
                onChange={handleChange}
                placeholder="Enter your email address"
                className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Mobile Phone <span className="text-secondary">*</span>
              </label>
              <input
                type="text"
                name="phone"
                required
                value={form.phone}
                onChange={handleChange}
                placeholder="Enter your phone number (digits only)"
                maxLength={15}
                className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
              />
            </div>

            {/* Subject */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Subject <span className="text-secondary">*</span>
              </label>
              <select
                name="subject"
                required
                value={form.subject}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
              >
                <option value="">Select a subject</option>
                {subjects.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>

            {/* Message */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Message <span className="text-secondary">*</span>
              </label>
              <textarea
                name="message"
                required
                rows={5}
                value={form.message}
                onChange={handleChange}
                placeholder="Type your message here..."
                className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
              />
            </div>

            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full bg-primary hover:bg-primary-hover text-white font-medium rounded-lg py-3 flex items-center justify-center gap-2 transition-colors disabled:opacity-60"
            >
              <FaTelegram className="text-base" />
              {status === "loading" ? "Sending..." : "Send Message"}
            </button>

            {status === "success" && (
              <p className="text-sm text-green-600 text-center">
                JazakAllahu Khayran! Your message has been sent.
              </p>
            )}
            {status === "error" && (
              <p className="text-sm text-red-600 text-center">
                Something went wrong. Please try again.
              </p>
            )}

            <p className="text-center text-xs text-gray-400">
              We usually respond within 24–48 hours.
            </p>
          </form>
        </div>

        {/* Sidebar */}
        <div className="space-y-6 h-fit lg:sticky lg:top-24">

          {/* Daily Reminder */}
          <div className="relative rounded-3xl overflow-hidden aspect-video bg-[#0A3A2F] flex items-center justify-center p-8 text-center">
            <div
              className="absolute inset-0 bg-cover bg-center opacity-20"
              style={{ backgroundImage: "url('https://images.unsplash.com/photo-1542810634-71277d95dcbb?q=80&w=800')" }}
            />
            <div className="relative z-10 text-white font-body">
              <p className="text-[10px] font-bold text-white/60 tracking-widest uppercase mb-4">Daily Reminder</p>
              <p className="font-arabic text-xl mb-4" dir="rtl">فَاذْكُرُونِي أَذْكُرْكُمْ</p>
              <p className="text-sm font-medium italic mb-2">&quot;So remember Me; I will remember you.&quot;</p>
              <p className="text-[10px] text-white/40 uppercase tracking-widest">— Quran 2:152</p>
            </div>
          </div>

          {/* Contact Info */}
          <div className="bg-white rounded-3xl border border-gray-100 p-8 shadow-sm">
            <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-6">Get in Touch</h4>
            <p className="text-sm text-gray-600 mb-4">
              Reach out to us directly via email and we&apos;ll get back to you as soon as possible.
            </p>
            <a
              href="mailto:officialalmuslims@gmail.com"
              className="text-sm font-semibold text-primary hover:underline break-all"
            >
              officialalmuslims@gmail.com
            </a>
          </div>

        </div>
      </section>

      {/* What Can We Help You With */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <h2 className="font-heading text-2xl font-bold text-gray-900">
          What Can We Help You With?
        </h2>
        <p className="text-sm text-gray-500 mt-1 mb-6">
          Choose a topic that best describes your inquiry.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {helpTopics.map((topic) => {
            const Icon = topic.icon;
            return (
              <div
                key={topic.title}
                className="bg-bg-card border border-gray-100 rounded-xl p-4 sm:p-5 text-center hover:shadow-md transition-shadow cursor-pointer"
              >
                <div className="w-10 h-10 mx-auto mb-3 rounded-full bg-secondary/10 text-secondary flex items-center justify-center text-xl">
                  <Icon />
                </div>
                <h3 className="font-semibold text-sm text-gray-900">
                  {topic.title}
                </h3>
                <p className="text-xs text-gray-500 mt-1">{topic.desc}</p>
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}
