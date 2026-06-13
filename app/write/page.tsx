import React from "react";
import Link from "next/link";

export const metadata = {
  title: "Write for Us — AlMuslims",
  description: "Contribute to AlMuslims and share authentic Islamic knowledge.",
};

export default function WritePage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-12">
        <h1 className="font-heading text-4xl sm:text-5xl font-bold text-primary mb-4">
          Write for Us
        </h1>
        <p className="text-gray-500 leading-relaxed">
          Join our community of writers and scholars. Share authentic Islamic knowledge with the world.
        </p>
      </div>

      <div className="space-y-8 text-gray-600 leading-relaxed">
        <section className="p-6 bg-white rounded-2xl border border-primary/5 shadow-sm">
          <h2 className="font-heading text-xl font-bold text-primary mb-3">Why Contribute?</h2>
          <p>
            Writing for AlMuslims is a form of Sadaqah Jariyah (continuous charity). By sharing well-researched, authentic Islamic content, you help educate the Ummah and earn rewards from Allah (SWT).
          </p>
        </section>

        <section className="p-6 bg-white rounded-2xl border border-primary/5 shadow-sm">
          <h2 className="font-heading text-xl font-bold text-primary mb-3">Submission Guidelines</h2>
          <ul className="list-disc pl-5 space-y-2 text-sm">
            <li>Content must be authentic and backed by references from the Quran and authentic Sunnah.</li>
            <li>Articles should be free of sectarian bias.</li>
            <li>We prefer practical, inspirational, and educational topics.</li>
            <li>Articles should be between 800 and 1500 words.</li>
            <li>All submissions must be original and not published elsewhere.</li>
          </ul>
        </section>

        <section className="p-6 bg-white rounded-2xl border border-primary/5 shadow-sm text-center">
          <h2 className="font-heading text-xl font-bold text-primary mb-3">Ready to Submit?</h2>
          <p className="mb-6">
            If you have an article ready or an idea you want to pitch, please contact our editorial team.
          </p>
          <Link href="/contact" className="inline-block bg-secondary text-white font-semibold py-2.5 px-6 rounded-lg hover:opacity-90 transition-opacity">
            Pitch an Idea
          </Link>
        </section>
      </div>
    </div>
  );
}
