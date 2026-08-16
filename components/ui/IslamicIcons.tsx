import React from "react";

interface IconProps {
  className?: string;
  size?: number;
  primaryColor?: string;
  secondaryColor?: string;
}

// 1. Holy Quran on Wooden Rehal (Folding Stand)
export function QuranIcon({
  className = "w-6 h-6",
  primaryColor = "currentColor",
  secondaryColor = "#D48C46"
}: IconProps) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Quran Pages (Left & Right curves) */}
      <path
        d="M24 32C24 32 18 29.5 9 29.5V11C18 11 24 14.5 24 14.5"
        stroke={primaryColor}
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M24 32C24 32 30 29.5 39 29.5V11C30 11 24 14.5 24 14.5"
        stroke={primaryColor}
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M24 14.5V32"
        stroke={primaryColor}
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Decorative Golden Quran Script Lines */}
      <path d="M12 16.5C15.5 16.5 19.5 17.5 22 19" stroke={secondaryColor} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M36 16.5C32.5 16.5 28.5 17.5 26 19" stroke={secondaryColor} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M12 21C15.5 21 19.5 22 22 23.5" stroke={secondaryColor} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M36 21C32.5 21 28.5 22 26 23.5" stroke={secondaryColor} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M12 25.5C15.5 25.5 19.5 26.5 22 28" stroke={secondaryColor} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M36 25.5C32.5 25.5 28.5 26.5 26 28" stroke={secondaryColor} strokeWidth="1.5" strokeLinecap="round" />
      {/* Wooden Rehal Stand */}
      <path d="M10 38L19 32L15 42" stroke={primaryColor} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M38 38L29 32L33 42" stroke={primaryColor} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M17 40H31" stroke={secondaryColor} strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="24" cy="7" r="1.5" fill={secondaryColor} />
    </svg>
  );
}

// 2. Hadith Collections (Prophetic Scroll & Seal / Manuscript)
export function HadithIcon({
  className = "w-6 h-6",
  primaryColor = "currentColor",
  secondaryColor = "#D48C46"
}: IconProps) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Main Parchment Scroll */}
      <rect x="13" y="9" width="22" height="30" rx="3" stroke={primaryColor} strokeWidth="2.2" strokeLinejoin="round" />
      {/* Rolled Tops & Bottoms */}
      <path d="M10 12C10 10.3431 11.3431 9 13 9H35C36.6569 9 38 10.3431 38 12C38 13.6569 36.6569 15 35 15H13C11.3431 15 10 13.6569 10 12Z" stroke={primaryColor} strokeWidth="1.8" fill="currentColor" fillOpacity="0.1" />
      <path d="M10 36C10 34.3431 11.3431 33 13 33H35C36.6569 33 38 34.3431 38 36C38 37.6569 36.6569 39 35 39H13C11.3431 39 10 37.6569 10 36Z" stroke={primaryColor} strokeWidth="1.8" fill="currentColor" fillOpacity="0.1" />
      {/* Text Lines */}
      <path d="M18 19H30" stroke={secondaryColor} strokeWidth="1.8" strokeLinecap="round" />
      <path d="M18 24H30" stroke={secondaryColor} strokeWidth="1.8" strokeLinecap="round" />
      <path d="M18 29H25" stroke={secondaryColor} strokeWidth="1.8" strokeLinecap="round" />
      {/* Prophetic Wax Seal Ribbon */}
      <circle cx="31" cy="29" r="3.5" fill={secondaryColor} stroke={primaryColor} strokeWidth="1.5" />
      <path d="M31 32.5L33 36L31 35L29 36L31 32.5Z" fill={secondaryColor} />
    </svg>
  );
}

// 3. Duas & Azkar (Cupped Praying Hands with Divine Radiance)
export function DuasIcon({
  className = "w-6 h-6",
  primaryColor = "currentColor",
  secondaryColor = "#D48C46"
}: IconProps) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Left Hand */}
      <path
        d="M17 36C17 36 11 30 11 23C11 17 14 14 17 14C20 14 22 18 23.5 22V33"
        stroke={primaryColor}
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Right Hand */}
      <path
        d="M31 36C31 36 37 30 37 23C37 17 34 14 31 14C28 14 26 18 24.5 22V33"
        stroke={primaryColor}
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Inner Fingers Separation */}
      <path d="M19 19V11C19 9.5 21 8 22.5 8C23.5 8 24 9 24 10.5V20" stroke={secondaryColor} strokeWidth="1.8" strokeLinecap="round" />
      <path d="M29 19V11C29 9.5 27 8 25.5 8C24.5 8 24 9 24 10.5" stroke={secondaryColor} strokeWidth="1.8" strokeLinecap="round" />
      {/* Base of Hands */}
      <path d="M16 39H32" stroke={primaryColor} strokeWidth="2.2" strokeLinecap="round" />
      {/* Divine Light Sparkles */}
      <circle cx="24" cy="4" r="1.5" fill={secondaryColor} />
      <circle cx="16" cy="6" r="1.2" fill={secondaryColor} />
      <circle cx="32" cy="6" r="1.2" fill={secondaryColor} />
    </svg>
  );
}

// 4. Seerah (Prophetic Mosque Minaret & Green Dome Silhouette)
export function SeerahIcon({
  className = "w-6 h-6",
  primaryColor = "currentColor",
  secondaryColor = "#D48C46"
}: IconProps) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Dome Arch */}
      <path
        d="M14 38V25C14 18 20 12 26 12C32 12 38 18 38 25V38"
        stroke={primaryColor}
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Dome Top Spire & Crescent */}
      <path d="M26 12V5" stroke={secondaryColor} strokeWidth="2" strokeLinecap="round" />
      <path d="M26 5C24.5 5 23.5 3.8 24 2.5C24.8 2.3 26 2.5 26.5 3.5C27 2.5 28.2 2.3 29 2.5C29.5 3.8 28.5 5 27 5H26" stroke={secondaryColor} strokeWidth="1.5" strokeLinejoin="round" />
      {/* Tall Minaret */}
      <path d="M8 38V15L11 11L14 15V38" stroke={primaryColor} strokeWidth="2" strokeLinejoin="round" />
      <path d="M11 11V7" stroke={secondaryColor} strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="11" cy="6" r="1" fill={secondaryColor} />
      {/* Arched Doorway */}
      <path d="M22 38V30C22 27.5 26 27.5 26 30V38" stroke={secondaryColor} strokeWidth="2" strokeLinejoin="round" />
      <path d="M30 38V32C30 30 33 30 33 32V38" stroke={primaryColor} strokeWidth="1.5" strokeLinejoin="round" />
      {/* Base Line */}
      <path d="M6 38H42" stroke={primaryColor} strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  );
}

// 5. 99 Names of Allah (Ornate Islamic 8-Pointed Star Rosette with 99)
export function NamesOfAllahIcon({
  className = "w-6 h-6",
  primaryColor = "currentColor",
  secondaryColor = "#D48C46"
}: IconProps) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* 8-Pointed Islamic Geometric Star Outer */}
      <rect x="10" y="10" width="28" height="28" rx="4" transform="rotate(45 24 24)" stroke={primaryColor} strokeWidth="1.8" />
      <rect x="10" y="10" width="28" height="28" rx="4" stroke={secondaryColor} strokeWidth="1.8" />
      {/* Inner Rosette Ring */}
      <circle cx="24" cy="24" r="12" stroke={primaryColor} strokeWidth="1.5" strokeDasharray="3 2" />
      {/* 99 Symbol / Numerals */}
      <text
        x="24"
        y="29"
        fontSize="15"
        fontWeight="800"
        fill={primaryColor}
        textAnchor="middle"
        fontFamily="serif"
      >
        99
      </text>
    </svg>
  );
}

// 6. Fiqh & Jurisprudence (Pillared Scales of Justice)
export function FiqhIcon({
  className = "w-6 h-6",
  primaryColor = "currentColor",
  secondaryColor = "#D48C46"
}: IconProps) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Center Pillar */}
      <path d="M24 8V38" stroke={primaryColor} strokeWidth="2.2" strokeLinecap="round" />
      <path d="M16 38H32" stroke={primaryColor} strokeWidth="2.5" strokeLinecap="round" />
      <path d="M20 41H28" stroke={secondaryColor} strokeWidth="2" strokeLinecap="round" />
      {/* Top Beam */}
      <path d="M10 14H38" stroke={primaryColor} strokeWidth="2.2" strokeLinecap="round" />
      <circle cx="24" cy="8" r="2.5" fill={secondaryColor} />
      {/* Left Pan */}
      <path d="M10 14L6 24M10 14L14 24" stroke={secondaryColor} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M5 24C5 27.5 15 27.5 15 24H5Z" stroke={primaryColor} strokeWidth="1.8" fill="currentColor" fillOpacity="0.1" />
      {/* Right Pan */}
      <path d="M38 14L34 24M38 14L42 24" stroke={secondaryColor} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M33 24C33 27.5 43 27.5 43 24H33Z" stroke={primaryColor} strokeWidth="1.8" fill="currentColor" fillOpacity="0.1" />
    </svg>
  );
}

// 7. Aqeedah & Creed (Radiant 8-Point Star of Tawheed)
export function AqeedahIcon({
  className = "w-6 h-6",
  primaryColor = "currentColor",
  secondaryColor = "#D48C46"
}: IconProps) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Center Star Motif */}
      <path
        d="M24 6L28 17L39 13L35 24L42 31L31 32L30 43L24 34L18 43L17 32L6 31L13 24L9 13L20 17L24 6Z"
        stroke={primaryColor}
        strokeWidth="2"
        strokeLinejoin="round"
        fill="currentColor"
        fillOpacity="0.06"
      />
      <circle cx="24" cy="24" r="5" stroke={secondaryColor} strokeWidth="1.8" />
      <circle cx="24" cy="24" r="2" fill={secondaryColor} />
      {/* Radiance ticks */}
      <path d="M24 2V4M24 44V46M2 24H4M44 24H46" stroke={secondaryColor} strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

// 8. All Categories (Stacked Islamic Manuscript Volumes)
export function AllCategoriesIcon({
  className = "w-6 h-6",
  primaryColor = "currentColor",
  secondaryColor = "#D48C46"
}: IconProps) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Bottom Layer */}
      <path
        d="M10 28L24 34L38 28L24 22L10 28Z"
        stroke={primaryColor}
        strokeWidth="2.2"
        strokeLinejoin="round"
        fill="currentColor"
        fillOpacity="0.08"
      />
      <path d="M10 32L24 38L38 32" stroke={primaryColor} strokeWidth="2.2" strokeLinejoin="round" strokeLinecap="round" />
      <path d="M10 36L24 42L38 36" stroke={primaryColor} strokeWidth="2.2" strokeLinejoin="round" strokeLinecap="round" />
      {/* Top Open Book / Crest */}
      <path d="M14 18L24 22L34 18L24 14L14 18Z" stroke={secondaryColor} strokeWidth="2" strokeLinejoin="round" fill={secondaryColor} fillOpacity="0.15" />
      <path d="M24 6V14" stroke={secondaryColor} strokeWidth="2" strokeLinecap="round" />
      <circle cx="24" cy="5" r="1.5" fill={secondaryColor} />
    </svg>
  );
}

// 9. Lifestyle & Ethics (Crescent Moon with Islamic Leaf / Hearth)
export function LifestyleIcon({
  className = "w-6 h-6",
  primaryColor = "currentColor",
  secondaryColor = "#D48C46"
}: IconProps) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Crescent Moon */}
      <path
        d="M27 9C17.6112 9 10 16.6112 10 26C10 35.3888 17.6112 43 27 43C31.7587 43 36.0687 41.0427 39.1557 37.8936C33.4568 37.1954 29.0769 32.3274 29.0769 26.3846C29.0769 20.4418 33.4568 15.5738 39.1557 14.8756C36.0687 11.7265 31.7587 9 27 9Z"
        stroke={primaryColor}
        strokeWidth="2.2"
        strokeLinejoin="round"
      />
      {/* Olive / Date Leaf of Barakah */}
      <path d="M22 28C22 22 29 19 33 18C33 24 28 29 22 28Z" stroke={secondaryColor} strokeWidth="1.8" fill={secondaryColor} fillOpacity="0.2" />
      <circle cx="34" cy="13" r="1.5" fill={secondaryColor} />
    </svg>
  );
}

// 10. General Knowledge (Parchment with Feather Quill)
export function GeneralIcon({
  className = "w-6 h-6",
  primaryColor = "currentColor",
  secondaryColor = "#D48C46"
}: IconProps) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Document Sheet */}
      <rect x="11" y="8" width="22" height="32" rx="3" stroke={primaryColor} strokeWidth="2.2" />
      <path d="M17 16H27M17 22H27M17 28H23" stroke={secondaryColor} strokeWidth="1.8" strokeLinecap="round" />
      {/* Classical Feather Quill */}
      <path d="M37 10C35 15 31 24 27 34L25 38L29 36C34 30 38 23 40 13C40 10 38 9 37 10Z" stroke={primaryColor} strokeWidth="1.8" fill="currentColor" fillOpacity="0.1" />
      <path d="M34 16L30 22" stroke={secondaryColor} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

// Master Icon Resolver
export function PremiumIslamicIcon({
  type,
  className = "w-6 h-6",
  primaryColor = "currentColor",
  secondaryColor = "#D48C46"
}: {
  type: string;
  className?: string;
  primaryColor?: string;
  secondaryColor?: string;
}) {
  switch (type) {
    case "quran":
    case "holy-quran":
      return <QuranIcon className={className} primaryColor={primaryColor} secondaryColor={secondaryColor} />;
    case "hadith":
      return <HadithIcon className={className} primaryColor={primaryColor} secondaryColor={secondaryColor} />;
    case "seerah":
      return <SeerahIcon className={className} primaryColor={primaryColor} secondaryColor={secondaryColor} />;
    case "duas":
    case "dua-collection":
      return <DuasIcon className={className} primaryColor={primaryColor} secondaryColor={secondaryColor} />;
    case "names":
    case "names-of-allah":
      return <NamesOfAllahIcon className={className} primaryColor={primaryColor} secondaryColor={secondaryColor} />;
    case "fiqh":
      return <FiqhIcon className={className} primaryColor={primaryColor} secondaryColor={secondaryColor} />;
    case "aqeedah":
      return <AqeedahIcon className={className} primaryColor={primaryColor} secondaryColor={secondaryColor} />;
    case "lifestyle":
      return <LifestyleIcon className={className} primaryColor={primaryColor} secondaryColor={secondaryColor} />;
    case "general":
      return <GeneralIcon className={className} primaryColor={primaryColor} secondaryColor={secondaryColor} />;
    case "all":
    default:
      return <AllCategoriesIcon className={className} primaryColor={primaryColor} secondaryColor={secondaryColor} />;
  }
}
