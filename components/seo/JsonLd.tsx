import React from "react";

// Organization & WebSite JSON-LD (AEO & Entity Search)
export function OrganizationAndWebsiteJsonLd() {
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "AlMuslims",
    "alternateName": "AlMuslims Authentic Islamic Knowledge",
    "url": "https://almuslims.com",
    "description": "Your trusted portal for authentic Islamic knowledge, Holy Quran, Hadith, Duas, Seerah, and 99 Names of Allah.",
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://almuslims.com/categories?search={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    },
    "inLanguage": ["en", "ar", "ur"]
  };

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "AlMuslims",
    "url": "https://almuslims.com",
    "logo": "https://almuslims.com/logo.png",
    "description": "Authentic Islamic Knowledge platform dedicated to Quran, Sunnah, Seerah, and scholarly research.",
    "sameAs": [
      "https://facebook.com/officialalmuslims",
      "https://twitter.com/officialalmuslims",
      "https://instagram.com/officialalmuslims"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "Customer Support & Inquiries",
      "email": "officialalmuslims@gmail.com",
      "availableLanguage": ["English", "Arabic", "Urdu"]
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
    </>
  );
}

// Categories ItemList JSON-LD (AEO for Categories Directory)
export function CategoriesItemListJsonLd({
  categories
}: {
  categories: Array<{ name: string; description: string; href: string }>
}) {
  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Islamic Knowledge Disciplines & Categories",
    "description": "Comprehensive directory of Islamic studies and knowledge streams available on AlMuslims.",
    "numberOfItems": categories.length,
    "itemListElement": categories.map((cat, idx) => ({
      "@type": "ListItem",
      "position": idx + 1,
      "name": cat.name,
      "description": cat.description,
      "url": `https://almuslims.com${cat.href}`
    }))
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
    />
  );
}

// BreadcrumbList JSON-LD
export function BreadcrumbJsonLd({
  items
}: {
  items: Array<{ name: string; url: string }>
}) {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, idx) => ({
      "@type": "ListItem",
      "position": idx + 1,
      "name": item.name,
      "item": item.url
    }))
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
    />
  );
}

// Article JSON-LD (GEO & AEO for rich answers & knowledge graphs)
export function ArticleJsonLd({
  title,
  excerpt,
  image,
  datePublished,
  author,
  url,
  category
}: {
  title: string;
  excerpt: string;
  image: string;
  datePublished: string;
  author: string;
  url: string;
  category: string;
}) {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": title,
    "description": excerpt,
    "image": image,
    "datePublished": datePublished,
    "dateModified": datePublished,
    "author": {
      "@type": "Person",
      "name": author
    },
    "publisher": {
      "@type": "Organization",
      "name": "AlMuslims",
      "logo": {
        "@type": "ImageObject",
        "url": "https://almuslims.com/logo.png"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": url
    },
    "articleSection": category,
    "inLanguage": "en"
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
    />
  );
}
