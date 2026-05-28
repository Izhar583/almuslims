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

// ✅ Environment detect karta hai
const isDev = process.env.NODE_ENV === "development";

const log = (...args: unknown[]) => {
  if (isDev) console.log("[PrayerCard]", ...args);
};

const resolveLocationName = (address: Record<string, string>): string => {
  const subCity =
    address.village ||
    address.suburb ||
    address.neighbourhood ||
    address.hamlet ||
    address.quarter ||
    address.residential ||
    "";
  const city =
    address.city ||
    address.town ||
    address.municipality ||
    address.city_district ||
    address.district ||
    address.county ||
    address.state_district ||
    "";
  const country = address.country || "";

  log("Address fields:", { subCity, city, country });

  if (subCity && city && country) return `${subCity}, ${city}, ${country}`;
  if (subCity && country) return `${subCity}, ${country}`;
  if (city && country) return `${city}, ${country}`;
  if (country) return country;
  return "Your Location";
};

export default function PrayerCard() {
  const [timings, setTimings] = useState<PrayerTimings | null>(null);
  const [loading, setLoading] = useState(true);
  const [location, setLocation] = useState<LocationInfo>({
    display: "Locating...",
    isLive: false,
  });

  useEffect(() => {
    // ── Fallback: Lahore ──────────────────────────────────────
    const fetchFallbackTimes = async () => {
      log("⚠️ Using fallback location: Lahore");
      try {
        const res = await fetch(
          "https://api.aladhan.com/v1/timings?latitude=31.5204&longitude=74.3587&method=1"
        );
        const data = await res.json();
        if (data?.data?.timings) {
          setTimings(data.data.timings);
          setLocation({ display: "Lahore, Pakistan (Default)", isLive: false });
        }
      } catch (err) {
        log("❌ Fallback fetch failed:", err);
      } finally {
        setLoading(false);
      }
    };

    // ── Nominatim reverse geocode ─────────────────────────────
    const fetchLocationName = async (lat: number, lon: number) => {
      try {
        log("📡 Fetching location name for:", lat, lon);
        const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&zoom=18&addressdetails=1`;
        const res = await fetch(url, {
          headers: { "Accept-Language": "en" },
        });
        const data = await res.json();
        log("🗺️ Raw address object:", data.address);

        if (data?.address) {
          const display = resolveLocationName(data.address);
          log("✅ Resolved location:", display);
          setLocation({ display, isLive: true });
        }
      } catch (err) {
        log("❌ Geocode failed:", err);
        setLocation({ display: "Your Location", isLive: true });
      }
    };

    // ── Prayer times fetch ────────────────────────────────────
    const fetchPrayerTimes = async (lat: number, lon: number) => {
      try {
        const res = await fetch(
          `https://api.aladhan.com/v1/timings?latitude=${lat}&longitude=${lon}&method=1`
        );
        const data = await res.json();
        if (data?.data?.timings) {
          setTimings(data.data.timings);
          log("🕌 Prayer times loaded");
        }
      } catch (err) {
        log("❌ Prayer times failed:", err);
        await fetchFallbackTimes();
      } finally {
        setLoading(false);
      }
    };

    // ── Main: Geolocation ─────────────────────────────────────
    if (typeof window === "undefined" || !navigator.geolocation) {
      log("❌ Geolocation not available");
      fetchFallbackTimes();
      return;
    }

    // ✅ isSecureContext check — localhost + HTTPS dono pass karta hai
    if (!window.isSecureContext) {
      log("❌ Not a secure context (needs HTTPS or localhost)");
      fetchFallbackTimes();
      return;
    }

    log("🔍 Requesting geolocation...");

    navigator.geolocation.getCurrentPosition(
      async ({ coords }) => {
        const { latitude: lat, longitude: lon, accuracy } = coords;
        log(`📍 GPS: ${lat}, ${lon} (±${Math.round(accuracy)}m)`);

        // ✅ Parallel fetch — faster load
        await Promise.all([
          fetchLocationName(lat, lon),
          fetchPrayerTimes(lat, lon),
        ]);
      },
      (err) => {
        const reasons: Record<number, string> = {
          1: "Permission denied by user",
          2: "Position unavailable",
          3: "Timeout",
        };
        log(`❌ Geolocation error: ${reasons[err.code] ?? "Unknown"}`);
        fetchFallbackTimes();
      },
      {
        enableHighAccuracy: true,
        timeout: 10_000,
        maximumAge: 0, // ✅ Always fresh — VPN ya cached location issue fix
      }
    );
  }, []);

  const prayersList = timings
    ? [
        { name: "Fajr", time: timings.Fajr },
        { name: "Dhuhr", time: timings.Dhuhr },
        { name: "Asr", time: timings.Asr },
        { name: "Maghrib", time: timings.Maghrib },
        { name: "Isha", time: timings.Isha },
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

  // ── Card ──────────────────────────────────────────────────
  return (
    <div className="h-full flex flex-col justify-between p-6 sm:p-8 bg-primary text-white rounded-[1.5rem] shadow-lg font-body relative overflow-hidden group">
      
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none"></div>

      {/* Header */}
      <div className="mb-4 flex justify-between items-start">
        <div>
          <h2 className="text-[11px] font-bold text-white/60 tracking-widest uppercase flex items-center gap-1.5 mb-1.5">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5 text-secondary">
              <path fillRule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
            </svg>
            Prayer Times
          </h2>
          <p className="text-[10px] text-white/40 flex items-center gap-1">
            {location.isLive && (
              <span className="relative flex h-1.5 w-1.5 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-60"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-secondary"></span>
              </span>
            )}
            {location.display}
          </p>
        </div>
        
        {/* Next Prayer Highlight (Optional, just icon/badge for now) */}
        <div className="bg-white/10 px-2 py-1 rounded text-[9px] font-medium tracking-wide uppercase">
          Live
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col justify-center mb-6 z-10">
        <div className="mb-6">
          <h3 className="text-4xl sm:text-5xl font-serif font-bold text-white mb-2 tracking-wide">Maghrib</h3>
          <div className="flex items-end gap-3">
            <p className="text-2xl text-secondary font-semibold tracking-wide">06:47 PM</p>
          </div>
        </div>

        <div className="grid grid-cols-5 gap-1.5 sm:gap-2 w-full">
          {prayersList.map((prayer) => (
            <div
              key={prayer.name}
              className={`flex flex-col items-center justify-center py-2.5 px-1 rounded-xl border transition-all duration-200 ${
                prayer.name === "Maghrib" 
                  ? "bg-secondary/20 border-secondary/50 shadow-inner" 
                  : "bg-white/5 border-white/5 hover:bg-white/10"
              }`}
            >
              <p className={`text-[8px] sm:text-[9px] font-semibold tracking-wider uppercase mb-1 ${prayer.name === "Maghrib" ? "text-secondary" : "text-white/50"}`}>
                {prayer.name}
              </p>
              <p className="text-xs sm:text-sm font-bold text-white tracking-tight leading-none mb-0.5">{prayer.time.split(' ')[0]}</p>
              <p className="text-[7px] text-white/40 uppercase">{prayer.time.split(' ')[1] || "AM"}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Buttons */}
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

      {/* Dev mode debug badge */}
      {isDev && (
        <p className="text-[9px] text-white/20 text-center mt-2 font-mono absolute bottom-2 left-0 right-0">
          dev mode
        </p>
      )}
    </div>
  );
}