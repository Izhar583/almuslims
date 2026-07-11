import React from "react";
import Link from "next/link";

export const metadata = {
  title: "Privacy Policy — AlMuslims",
  description:
    "Read AlMuslims' Privacy Policy to understand how we handle and protect your personal information.",
};

export default function PrivacyPage() {
  return (
    <main className="bg-white min-h-screen font-body">
      <div className="max-w-3xl mx-auto px-5 sm:px-8 py-12">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-gray-400 mb-8">
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          <span>›</span>
          <span className="text-gray-600">Privacy Policy</span>
        </nav>

        {/* Title */}
        <h1 className="font-heading text-4xl font-bold text-primary mb-2">Privacy Policy</h1>
        <p className="text-gray-500 text-sm mb-8">Last updated: June 2025</p>
        <p className="text-gray-600 leading-relaxed mb-10">
          We recognise and acknowledge the importance of your personal data and are committed to
          respecting your privacy and protecting your personal information.
        </p>

        <hr className="border-gray-100 mb-10" />

        {/* Sections */}
        <div className="space-y-10">

          <section>
            <h2 className="font-heading text-xl font-bold text-primary mb-3">1. Information We Collect</h2>
            <p className="text-gray-600 leading-relaxed">
              AlMuslims respects your privacy and collects only minimal information required to
              deliver the best possible experience. This may include basic usage data such as pages
              visited, search queries, and general interaction patterns — all used exclusively to
              improve our services. We do not collect sensitive personal information unless you
              explicitly provide it (e.g., through a contact form).
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-bold text-primary mb-3">2. How We Use Your Data</h2>
            <p className="text-gray-600 leading-relaxed">
              Any information collected is used solely for improving the platform, analysing traffic
              trends, and ensuring our content remains relevant and accessible to the Muslim
              community worldwide. We do not sell, trade, or rent your personal data to any third
              parties. Your trust is paramount to us.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-bold text-primary mb-3">3. Third-Party Services</h2>
            <p className="text-gray-600 leading-relaxed">
              We may use third-party APIs — such as AlQuran.cloud or AlAdhan — to provide authentic
              Islamic content like Quranic verses and prayer times. These services have their own
              privacy policies. We are not responsible for the data collection practices of these
              external providers and encourage you to review their policies independently.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-bold text-primary mb-3">4. Data Security</h2>
            <p className="text-gray-600 leading-relaxed">
              We implement appropriate technical and organisational measures to protect any
              information from unauthorised access, loss, or misuse. Our platform uses secure HTTPS
              connections and follows industry-standard security practices. However, no method of
              transmission over the internet is 100% secure, and we encourage you to use our
              platform responsibly.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-bold text-primary mb-3">5. Cookies &amp; Local Storage</h2>
            <p className="text-gray-600 leading-relaxed">
              AlMuslims may use cookies or browser local storage to remember your preferences such
              as selected themes, saved duas, or Quran reading progress. These are strictly
              functional and never used for tracking or advertising purposes. You may clear these at
              any time through your browser settings.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-bold text-primary mb-3">6. Your Rights</h2>
            <p className="text-gray-600 leading-relaxed">
              You have the right to request deletion of any personal data we may hold. You may also
              opt out of any communications at any time. If you have concerns about how your data is
              handled, please contact us and we will respond promptly and transparently.
            </p>
          </section>

        </div>

        <hr className="border-gray-100 mt-12 mb-8" />

        <p className="text-gray-500 text-sm">
          Questions? Reach us at{" "}
          <a href="mailto:officialalmuslims@gmail.com" className="text-primary hover:underline">
            officialalmuslims@gmail.com
          </a>{" "}
          or visit our{" "}
          <Link href="/contact" className="text-primary hover:underline">
            Contact page
          </Link>.
        </p>

      </div>
    </main>
  );
}
