import React from "react";
import Link from "next/link";

export const metadata = {
  title: "Terms & Conditions — AlMuslims",
  description:
    "Read the Terms and Conditions for using the AlMuslims platform and all its services.",
};

export default function TermsPage() {
  return (
    <main className="bg-white min-h-screen font-body">
      <div className="max-w-3xl mx-auto px-5 sm:px-8 py-12">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-gray-400 mb-8">
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          <span>›</span>
          <span className="text-gray-600">Terms &amp; Conditions</span>
        </nav>

        {/* Title */}
        <h1 className="font-heading text-4xl font-bold text-primary mb-2">Terms &amp; Conditions</h1>
        <p className="text-gray-500 text-sm mb-8">Effective: June 2025</p>
        <p className="text-gray-600 leading-relaxed mb-10">
          By accessing and using AlMuslims.com, you confirm that you have read, understood, and
          agree to be bound by these Terms and Conditions. Please read them carefully before using
          our platform.
        </p>

        <hr className="border-gray-100 mb-10" />

        {/* Sections */}
        <div className="space-y-10">

          <section>
            <h2 className="font-heading text-xl font-bold text-primary mb-3">1. Acceptance of Terms</h2>
            <p className="text-gray-600 leading-relaxed">
              By using AlMuslims.com, you agree to comply with these Terms and Conditions. If you do
              not agree with any part of these terms, you must not use our website or services. We
              reserve the right to update these terms at any time, and your continued use of the
              platform constitutes acceptance of the revised terms.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-bold text-primary mb-3">2. Use of the Website</h2>
            <p className="text-gray-600 leading-relaxed">
              You agree to use AlMuslims.com for lawful purposes only. You must not use the website
              in any way that may damage, disable, overburden, or impair the site, or interfere with
              any other party&apos;s use. You are responsible for ensuring that any information you
              submit is accurate, lawful, and does not violate the rights of any third party.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-bold text-primary mb-3">3. Content Disclaimer</h2>
            <p className="text-gray-600 leading-relaxed">
              The content provided on AlMuslims.com — including Quranic translations, Hadith,
              articles, and scholarly opinions — is for general informational and educational
              purposes only. While we strive to ensure accuracy, we do not guarantee that all
              information is complete, reliable, or up to date. Always consult qualified scholars
              for specific Islamic rulings and personal matters of faith.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-bold text-primary mb-3">4. Intellectual Property</h2>
            <p className="text-gray-600 leading-relaxed">
              All content on this website — including articles, text, graphics, logos, UI designs,
              and images — is the property of AlMuslims.com unless stated otherwise. You may not
              copy, reproduce, republish, or distribute any content without our prior written
              permission. Quranic texts and Hadiths are from public Islamic sources and attributed
              accordingly.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-bold text-primary mb-3">5. External Links</h2>
            <p className="text-gray-600 leading-relaxed">
              Our website may contain links to third-party websites for convenience and
              informational purposes. These links do not constitute our endorsement of the content
              on those sites. We are not responsible for the content, policies, or practices of any
              third-party websites. We encourage you to review the terms and privacy policies of any
              external site you visit.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-bold text-primary mb-3">6. Limitation of Liability</h2>
            <p className="text-gray-600 leading-relaxed">
              AlMuslims.com shall not be held liable for any loss or damage — direct, indirect,
              incidental, or consequential — arising from the use or inability to use our website or
              any information provided on it. This includes, but is not limited to, errors in
              content, service interruptions, or unauthorised access to user data.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-bold text-primary mb-3">7. Changes to These Terms</h2>
            <p className="text-gray-600 leading-relaxed">
              We reserve the right to update or modify these Terms and Conditions at any time
              without prior notice. Changes will be effective immediately upon posting to this page.
              We recommend reviewing this page periodically so you remain aware of any updates.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-bold text-primary mb-3">8. Contact Us</h2>
            <p className="text-gray-600 leading-relaxed">
              If you have any questions or concerns about these Terms and Conditions, please reach
              out via our{" "}
              <Link href="/contact" className="text-primary hover:underline">
                Contact page
              </Link>{" "}
              or email us at{" "}
              <a href="mailto:officialalmuslims@gmail.com" className="text-primary hover:underline">
                officialalmuslims@gmail.com
              </a>.
            </p>
          </section>

        </div>

        <hr className="border-gray-100 mt-12 mb-8" />

        <p className="text-gray-500 text-sm">
          Also read our{" "}
          <Link href="/privacy" className="text-primary hover:underline">
            Privacy Policy
          </Link>.
        </p>

      </div>
    </main>
  );
}
