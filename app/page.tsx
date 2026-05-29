import React from "react";
import HeroSection from "@/components/modules/home/HeroSection";
import StatsBar from "@/components/modules/home/StatsBar";
import IslamicCalendar from "@/components/modules/home/IslamicCalendar";
import PrayerCard from "@/components/modules/home/PrayerCard";
import DuaCard from "@/components/modules/home/DuaCard";
import WordOfTheDayCard from "@/components/modules/home/WordOfTheDay";
import VideoSection from "@/components/modules/home/VideoSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      {/* Cards Section Container */}
      <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8 mt-16 relative z-20 pb-10">
        <div className="bg-white/80 backdrop-blur-md rounded-[2rem] p-4 sm:p-6 lg:p-8 shadow-2xl border border-primary/5">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 items-stretch">
            <div className="md:col-span-2 xl:col-span-2 [&>div]:m-0 [&>div]:h-full [&>div]:max-w-none flex flex-col w-full">
              <PrayerCard />
            </div>
            <div className="col-span-1 [&>div]:m-0 [&>div]:h-full [&>div]:max-w-none flex flex-col w-full">
              <DuaCard />
            </div>
            <div className="col-span-1 [&>div]:m-0 [&>div]:h-full [&>div]:max-w-none flex flex-col w-full">
              <WordOfTheDayCard />
            </div>
          </div>
        </div>
      </div>
      <StatsBar />
      <IslamicCalendar />
      <VideoSection />
    </>
  );
}