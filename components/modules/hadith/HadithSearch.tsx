// components/hadith/HadithSearch.tsx
"use client";

import { useState, useTransition } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

interface HadithSearchProps {
  accentColor: string;
  defaultValue?: string;
}

// Extend CSSProperties to allow CSS custom properties (--variables)
interface CSSWithVars extends React.CSSProperties {
  [key: `--${string}`]: string;
}

export default function HadithSearch({ accentColor, defaultValue = "" }: HadithSearchProps) {
  const [value, setValue] = useState(defaultValue);
  const [, startTransition] = useTransition();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleSearch = (term: string) => {
    setValue(term);
    const params = new URLSearchParams(searchParams.toString());
    if (term) {
      params.set("search", term);
      params.set("page", "1");
    } else {
      params.delete("search");
    }
    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`);
    });
  };

  const inputStyle: CSSWithVars = {
    "--tw-ring-color": `${accentColor}40`,
  };

  return (
    <div className="relative">
      {/* Search icon */}
      <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
        <svg
          className="w-4 h-4 text-zinc-500"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
          />
        </svg>
      </div>

      <input
        type="text"
        value={value}
        onChange={(e) => handleSearch(e.target.value)}
        placeholder="Search hadiths by keyword…"
        className="w-full pl-11 pr-4 py-3 rounded-xl bg-zinc-900 border border-zinc-700 text-white text-sm placeholder:text-zinc-500 transition-all duration-200 outline-none focus:ring-2"
        style={inputStyle}
        onFocus={(e) => {
          e.currentTarget.style.borderColor = `${accentColor}60`;
        }}
        onBlur={(e) => {
          e.currentTarget.style.borderColor = "#3f3f46";
        }}
      />

      {/* Clear button */}
      {value && (
        <button
          onClick={() => handleSearch("")}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  );
}
