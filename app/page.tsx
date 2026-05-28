import React from "react";
import HeroSection from "@/components/modules/home/HeroSection"; // Hero Section import kiya
import PrayerCard from "@/components/modules/home/PrayerCard";

export default function Home() {
  return (
    // Body ka color background humne already layout me diya hua ha
    <>
      {/* Hero Section Live Here */}
      <HeroSection />
      <PrayerCard />
      {/* Agle steps ke Cards aur baki sections iske neeche aayenge */}
    </>
  );
}