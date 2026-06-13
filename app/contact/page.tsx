import React from "react";
import { FaEnvelope, FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";

export const metadata = {
  title: "Contact Us — AlMuslims",
  description: "Get in touch with the AlMuslims team.",
};

export default function ContactPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-12">
        <h1 className="font-heading text-4xl sm:text-5xl font-bold text-primary mb-4">
          Contact Us
        </h1>
        <p className="text-gray-500 leading-relaxed">
          We would love to hear from you. Whether you have a question, feedback, or a suggestion, feel free to reach out.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <section className="p-8 bg-white rounded-2xl border border-primary/5 shadow-sm space-y-6">
          <h2 className="font-heading text-2xl font-bold text-primary">Get in Touch</h2>
          
          <div className="flex items-center gap-4 text-gray-600">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
              <FaEnvelope />
            </div>
            <div>
              <p className="text-sm text-gray-400 font-medium">Email</p>
              <p className="font-semibold">info@almuslims.com</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4 text-gray-600">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
              <FaPhoneAlt />
            </div>
            <div>
              <p className="text-sm text-gray-400 font-medium">Phone</p>
              <p className="font-semibold">+92 300 1234567</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4 text-gray-600">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
              <FaMapMarkerAlt />
            </div>
            <div>
              <p className="text-sm text-gray-400 font-medium">Location</p>
              <p className="font-semibold">Lahore, Pakistan</p>
            </div>
          </div>
        </section>

        <section className="p-8 bg-white rounded-2xl border border-primary/5 shadow-sm">
          <h2 className="font-heading text-2xl font-bold text-primary mb-6">Send a Message</h2>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <input type="text" className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" placeholder="Your name" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input type="email" className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" placeholder="Your email" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
              <textarea rows={4} className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" placeholder="How can we help you?"></textarea>
            </div>
            <button type="button" className="w-full bg-primary text-white font-semibold py-2.5 rounded-lg hover:bg-primaryHover transition-colors">
              Send Message
            </button>
          </form>
        </section>
      </div>
    </div>
  );
}
