
"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  FaEnvelope,
  FaHeadset,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaFacebook,
  FaInstagram,
  FaYoutube,
  FaTelegram,
  FaTwitter,
} from "react-icons/fa";
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
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
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
      setForm({ name: "", email: "", subject: "", message: "" });
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
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-10 overflow-hidden rounded-2xl mt-4">
        <div className="absolute inset-0 -z-10">
          <Image
            src="/assets/contact-hero.png"
            alt="Masjid"
            fill
            className="object-cover object-right opacity-25"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-bg via-bg/80 to-transparent" />
        </div>

        <div className="relative max-w-xl py-8">
          <h1 className="font-heading text-4xl sm:text-5xl font-bold text-gray-900">
            Contact Us
          </h1>
          <p className="mt-3 text-gray-600">
            We would love to hear from you! Whether you have a question,
            feedback, suggestion, or need support, our team is here to help.
          </p>
        </div>
      </section>

      {/* Form + Get in Touch */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-3 gap-8 pb-16">
        {/* Send Us a Message */}
        <div className="lg:col-span-2 bg-bg-card border border-gray-100 rounded-2xl p-6 sm:p-8 shadow-sm">
          <h2 className="font-heading text-2xl font-bold text-gray-900 mb-6">
            Send Us a Message
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">
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
                placeholder="Enter your full name"
                className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
              />
            </div>

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

        {/* Get in Touch */}
        <div className="space-y-6">
          <div className="bg-bg-card border border-gray-100 rounded-2xl p-6 shadow-sm">
            <h3 className="font-heading text-xl font-bold text-gray-900 mb-1">
              Get in Touch
            </h3>
            <p className="text-sm text-gray-500 mb-6">
              Reach out to us through any of the following channels.
            </p>

            <ul className="space-y-5">
              <li className="flex items-start gap-3">
                <span className="flex items-center justify-center w-9 h-9 rounded-lg bg-primary/10 text-primary shrink-0">
                  <FaEnvelope />
                </span>
                <div>
                  <p className="font-semibold text-gray-900 text-sm">Email Us</p>
                  <p className="text-sm text-gray-500">info@almuslims.com</p>
                </div>
              </li>

              <li className="flex items-start gap-3">
                <span className="flex items-center justify-center w-9 h-9 rounded-lg bg-primary/10 text-primary shrink-0">
                  <FaHeadset />
                </span>
                <div>
                  <p className="font-semibold text-gray-900 text-sm">Support</p>
                  <p className="text-sm text-gray-500">support@almuslims.com</p>
                </div>
              </li>

              <li className="flex items-start gap-3">
                <span className="flex items-center justify-center w-9 h-9 rounded-lg bg-primary/10 text-primary shrink-0">
                  <FaPhoneAlt />
                </span>
                <div>
                  <p className="font-semibold text-gray-900 text-sm">Call Us</p>
                  <p className="text-sm text-gray-500">+92 300 1234567</p>
                  <p className="text-xs text-gray-400">
                    Mon – Fri, 9:00 AM – 6:00 PM (PKT)
                  </p>
                </div>
              </li>

              <li className="flex items-start gap-3">
                <span className="flex items-center justify-center w-9 h-9 rounded-lg bg-primary/10 text-primary shrink-0">
                  <FaMapMarkerAlt />
                </span>
                <div>
                  <p className="font-semibold text-gray-900 text-sm">Our Office</p>
                  <p className="text-sm text-gray-500">
                    123 Islamic Knowledge Road, Johar Town, Lahore, Punjab,
                    Pakistan
                  </p>
                </div>
              </li>
            </ul>
          </div>

          {/* Connect With Us */}
          <div className="bg-bg-card border border-gray-100 rounded-2xl p-6 shadow-sm">
            <h3 className="font-heading text-lg font-bold text-gray-900 mb-1">
              Connect With Us
            </h3>
            <p className="text-sm text-gray-500 mb-4">
              Follow us on social media for the latest updates and reminders.
            </p>
            <div className="flex gap-3">
              {[FaFacebook, FaInstagram, FaYoutube, FaTelegram, FaTwitter].map(
                (Icon, i) => (
                  <a
                    key={i}
                    href="#"
                    className="flex items-center justify-center w-10 h-10 rounded-full bg-primary text-white hover:bg-primary-hover transition-colors"
                  >
                    <Icon className="text-base" />
                  </a>
                )
              )}
            </div>
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
                className="bg-bg-card border border-gray-100 rounded-xl p-5 text-center hover:shadow-md transition-shadow cursor-pointer"
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

      {/* Location + Feedback */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Our Location */}
        <div className="lg:col-span-2">
          <h2 className="font-heading text-2xl font-bold text-gray-900 mb-1">
            Our Location
          </h2>
          <p className="text-sm text-gray-500 mb-4">
            We are based in Lahore, Pakistan.
          </p>

          <div className="relative w-full h-64 rounded-2xl overflow-hidden border border-gray-100">
            <iframe
              title="AlMuslims Office Location"
              src="https://www.google.com/maps?q=Johar+Town,+Lahore,+Punjab,+Pakistan&output=embed"
              className="w-full h-full"
              loading="lazy"
            />
            <div className="absolute bottom-4 left-4 bg-white rounded-lg shadow-md px-4 py-2 flex items-center gap-2">
              <FaMapMarkerAlt className="text-primary" />
              <div>
                <p className="text-sm font-semibold text-gray-900">
                  AlMuslims Office
                </p>
                <p className="text-xs text-gray-500">
                  Johar Town, Lahore, Punjab, Pakistan
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Feedback CTA */}

      </section>
    </main>
  );
}
