import React from "react";

export const metadata = {
  title: "Terms & Conditions — AlMuslims",
  description: "Terms and conditions for using AlMuslims.",
};

export default function TermsPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-12">
        <h1 className="font-heading text-4xl sm:text-5xl font-bold text-primary mb-4">
          Terms & Conditions
        </h1>
        <p className="text-gray-500 leading-relaxed">
          Please read these terms carefully before using our platform.
        </p>
      </div>

      <div className="space-y-8 text-gray-600 leading-relaxed">
        <section className="p-6 bg-white rounded-2xl border border-primary/5 shadow-sm">
          <h2 className="font-heading text-xl font-bold text-primary mb-3">1. Acceptance of Terms</h2>
          <p>
            By accessing and using AlMuslims, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by these terms, please do not use this service.
          </p>
        </section>

        <section className="p-6 bg-white rounded-2xl border border-primary/5 shadow-sm">
          <h2 className="font-heading text-xl font-bold text-primary mb-3">2. Accuracy of Information</h2>
          <p>
            While we strive to ensure that all Islamic content, including Quranic texts, Hadiths, and Prayer times, is authentic and accurate, we rely on third-party APIs. We encourage cross-referencing for critical matters.
          </p>
        </section>

        <section className="p-6 bg-white rounded-2xl border border-primary/5 shadow-sm">
          <h2 className="font-heading text-xl font-bold text-primary mb-3">3. Copyright & Usage</h2>
          <p>
            The content provided on AlMuslims is for educational and personal use. You may not scrape, reproduce, or commercially distribute the proprietary designs or curated structure of this platform without prior consent.
          </p>
        </section>
      </div>
    </div>
  );
}
