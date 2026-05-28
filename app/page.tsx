import React from "react";
import HeroSection from "@/components/modules/home/HeroSection"; // Hero Section import kiya
import PrayerCard from "@/components/modules/home/PrayerCard";
import DuaCard from "@/components/modules/home/DuaCard";
import QiblaCard from "@/components/modules/home/QiblaCard";
import WordOfTheDayCard from "@/components/modules/home/WordOfTheDay";  

export default function Home() {
  return (
    // Body ka color background humne already layout me diya hua ha
    <>
      {/* Hero Section Live Here */}
      <HeroSection />
      <PrayerCard />
      <DuaCard />
      <QiblaCard />
      <WordOfTheDayCard />
      {/* Agle steps ke Cards aur baki sections iske neeche aayenge */}
    </>
  );
}