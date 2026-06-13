import React from "react";

export const metadata = {
  title: "Privacy Policy — AlMuslims",
  description: "Privacy Policy for AlMuslims platform.",
};

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-12">
        <h1 className="font-heading text-4xl sm:text-5xl font-bold text-primary mb-4">
          Privacy Policy
        </h1>
        <p className="text-gray-500 leading-relaxed">
          Last updated: {new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" })}
        </p>
      </div>

      <div className="space-y-8 text-gray-600 leading-relaxed">
        <section className="p-6 bg-white rounded-2xl border border-primary/5 shadow-sm">
          <h2 className="font-heading text-xl font-bold text-primary mb-3">1. Information We Collect</h2>
          <p>
            AlMuslims respects your privacy. We collect minimal information required to provide you with the best possible experience. This may include basic usage data to improve our services.
          </p>
        </section>

        <section className="p-6 bg-white rounded-2xl border border-primary/5 shadow-sm">
          <h2 className="font-heading text-xl font-bold text-primary mb-3">2. How We Use Your Data</h2>
          <p>
            Any information collected is used solely for improving the platform, analyzing traffic trends, and ensuring that our content remains relevant and accessible. We do not sell your personal data.
          </p>
        </section>
        
        <section className="p-6 bg-white rounded-2xl border border-primary/5 shadow-sm">
          <h2 className="font-heading text-xl font-bold text-primary mb-3">3. Third-Party Services</h2>
          <p>
            We may use third-party APIs (such as AlQuran.cloud or AlAdhan) to provide content. These services have their own privacy policies. We are not responsible for the data collection practices of these external providers.
          </p>
        </section>
      </div>
    </div>
  );
}
