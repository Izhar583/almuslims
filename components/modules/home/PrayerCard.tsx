"use client";

import React, { useState, useEffect } from "react";

interface PrayerTimings {
  Fajr: string;
  Dhuhr: string;
  Asr: string;
  Maghrib: string;
  Isha: string;
}

interface LocationInfo {
  display: string;
  isLive: boolean;
}

const resolveLocationName = (address: Record<string, string>): string => {
  const subCity =
    address.village || address.suburb || address.neighbourhood ||
    address.hamlet || address.quarter || address.residential || "";
  const city =
    address.city || address.town || address.municipality ||
    address.city_district || address.district || address.county ||
    address.state_district || "";
  const country = address.country || "";
  if (subCity && city && country) return `${subCity}, ${city}, ${country}`;
  if (subCity && country) return `${subCity}, ${country}`;
  if (city && country) return `${city}, ${country}`;
  return country || "Your Location";
};

function timeToMinutes(t: string): number {
  const [h, m] = t.replace(/\s.+/, "").split(":").map(Number);
  return h * 60 + m;
}

function minutesToDisplay(mins: number): string {
  const h = Math.floor(mins / 60) % 24;
  const m = mins % 60;
  const ampm = h >= 12 ? "PM" : "AM";
  const hh = h % 12 === 0 ? 12 : h % 12;
  return `${String(hh).padStart(2, "0")}:${String(m).padStart(2, "0")} ${ampm}`;
}

function getCurrentPrayer(prayers: { name: string; time: string }[], nowMins: number) {
  const withMins = prayers.map((p) => ({ ...p, mins: timeToMinutes(p.time) }));
  let current = withMins[withMins.length - 1];
  for (let i = withMins.length - 1; i >= 0; i--) {
    if (nowMins >= withMins[i].mins) { current = withMins[i]; break; }
  }
  return current;
}

export default function PrayerCard() {
  const [timings, setTimings] = useState<PrayerTimings | null>(null);
  const [loading, setLoading] = useState(true);
  const [location, setLocation] = useState<LocationInfo>({ display: "Locating...", isLive: false });
  const [nowMins, setNowMins] = useState<number>(0);

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setNowMins(now.getHours() * 60 + now.getMinutes());
    };
    update();
    const timer = setInterval(update, 60_000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const fetchFallbackTimes = async () => {
      try {
        const res = await fetch("https://api.aladhan.com/v1/timings?latitude=31.5204&longitude=74.3587&method=1");
        const data = await res.json();
        if (data?.data?.timings) {
          setTimings(data.data.timings);
          setLocation({ display: "Lahore, Pakistan (Default)", isLive: false });
        }
      } catch {} finally { setLoading(false); }
    };

    const fetchLocationName = async (lat: number, lon: number) => {
      try {
        const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&zoom=18&addressdetails=1`, { headers: { "Accept-Language": "en" } });
        const data = await res.json();
        if (data?.address) setLocation({ display: resolveLocationName(data.address), isLive: true });
      } catch {
        setLocation({ display: "Your Location", isLive: true });
      }
    };

    const fetchPrayerTimes = async (lat: number, lon: number) => {
      try {
        const res = await fetch(`https://api.aladhan.com/v1/timings?latitude=${lat}&longitude=${lon}&method=1`);
        const data = await res.json();
        if (data?.data?.timings) setTimings(data.data.timings);
      } catch { await fetchFallbackTimes(); } finally { setLoading(false); }
    };

    if (typeof window === "undefined" || !navigator.geolocation || !window.isSecureContext) {
      fetchFallbackTimes(); return;
    }

    navigator.geolocation.getCurrentPosition(
      async ({ coords }) => {
        await Promise.all([
          fetchLocationName(coords.latitude, coords.longitude),
          fetchPrayerTimes(coords.latitude, coords.longitude),
        ]);
      },
      () => fetchFallbackTimes(),
      { enableHighAccuracy: true, timeout: 10_000, maximumAge: 0 }
    );
  }, []);

  const prayersList = timings
    ? [
        { name: "Fajr",    time: timings.Fajr },
        { name: "Dhuhr",   time: timings.Dhuhr },
        { name: "Asr",     time: timings.Asr },
        { name: "Maghrib", time: timings.Maghrib },
        { name: "Isha",    time: timings.Isha },
      ]
    : [];

  // ── Skeleton ──────────────────────────────────────────────
  if (loading || !timings) {
    return (
      <div className="h-full flex flex-col justify-between p-6 sm:p-8 bg-primary text-white rounded-[1.5rem] shadow-lg animate-pulse">
        <div className="mb-4">
          <div className="h-4 bg-white/15 rounded-full w-1/3 mb-2"></div>
          <div className="h-3 bg-white/10 rounded-full w-1/2"></div>
        </div>
        <div className="flex-1 flex flex-col justify-center mb-6">
           <div className="h-10 bg-white/15 rounded-full w-1/2 mb-2"></div>
           <div className="h-5 bg-white/10 rounded-full w-1/3 mb-6"></div>
           <div className="grid grid-cols-5 gap-2 w-full">
             {[...Array(5)].map((_, i) => (
               <div key={i} className="h-14 bg-white/10 rounded-xl"></div>
             ))}
           </div>
        </div>
        <div className="h-12 bg-white/15 rounded-full w-full"></div>
      </div>
    );
  }

  // ── Determine active prayer dynamically ───────────────────
  const currentPrayer = getCurrentPrayer(prayersList, nowMins);
  const currentDisplayTime = minutesToDisplay(timeToMinutes(currentPrayer.time));

  return (
    <div className="h-full flex flex-col justify-between p-6 sm:p-8 bg-primary text-white rounded-[1.5rem] shadow-lg font-body relative overflow-hidden group">
      
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none"></div>

      <div className="mb-4 flex justify-between items-start">
        <div>
          <h2 className="text-[20px] font-bold text-white/60 tracking-widest uppercase flex items-center gap-1.5 mb-1.5">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"  className="w-3.5 h-3.5 text-secondary">
              <path fillRule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
            </svg>
            Prayer Times
          </h2>
          <p className="text-[12px] text-white/40 flex items-center gap-1.5 ">
            {location.isLive && (
              <span className="relative flex h-1.5 w-1.5 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-60"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-secondary"></span>
              </span>
            )}
            {location.display}
          </p>
        </div>
        <div className="bg-white/10 px-2 py-1 rounded text-[9px] font-medium tracking-wide uppercase">
          Live
        </div>
      </div>

      {/* Current Prayer Display */}
      <div className="flex-1 flex flex-col justify-center mb-6 z-10">
        <div className="mb-6">
          <h3 className="text-4xl sm:text-5xl font-serif font-bold text-white mb-2 tracking-wide transition-all duration-500">
            {currentPrayer.name}
          </h3>
          <div className="flex items-end gap-3">
            <p className="text-2xl text-secondary font-semibold tracking-wide">
              {currentDisplayTime}
            </p>
          </div>
        </div>

        {/* Prayer Pills */}
        <div className="grid grid-cols-5 gap-1.5 sm:gap-2 w-full">
          {prayersList.map((prayer) => {
            const isActive = prayer.name === currentPrayer.name;
            const display = minutesToDisplay(timeToMinutes(prayer.time));
            const [hhmm, ampm] = display.split(" ");
            return (
              <div
                key={prayer.name}
                className={`flex flex-col items-center justify-center py-2.5 px-1 rounded-xl border transition-all duration-300 ${
                  isActive
                    ? "bg-secondary/20 border-secondary/50 shadow-inner scale-105"
                    : "bg-white/5 border-white/5 hover:bg-white/10"
                }`}
              >
                <p className={`text-[8px] sm:text-[9px] font-semibold tracking-wider uppercase mb-1 ${isActive ? "text-secondary" : "text-white/50"}`}>
                  {prayer.name}
                </p>
                <p className="text-xs sm:text-sm font-bold text-white tracking-tight leading-none mb-0.5">
                  {hhmm}
                </p>
                <p className={`text-[7px] uppercase ${isActive ? "text-secondary/70" : "text-white/40"}`}>
                  {ampm}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex flex-col gap-3 z-10">
        <a href="/prayer-times" className="w-full py-3 border border-white/20 text-white font-semibold text-sm rounded-full hover:bg-white hover:text-primary transition-all duration-300 text-center block">
          View Full Timetable
        </a>
        <button className="text-[10px] text-white/40 hover:text-white/80 transition-colors flex items-center justify-center gap-1 mt-1">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3 h-3">
             <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
             <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
          </svg>
          Change Location
        </button>
      </div>
    </div>
  );
}