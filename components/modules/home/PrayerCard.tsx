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
    // ✅ Sab functions useEffect ke ANDAR — koi unused-vars warning nahi
    const fetchFallbackTimes = async () => {
      try {
        const res = await fetch(
          `https://api.aladhan.com/v1/timings?latitude=31.5204&longitude=74.3587&method=1`
        );
        const data = await res.json();
        if (data?.data?.timings) {
          setTimings(data.data.timings);
          setLocation({ display: "Lahore, Pakistan (Default)", isLive: false });
        }
      } catch {
        // silent
      } finally {
        setLoading(false);
      }
    };

    const fetchLocationName = async (lat: number, lon: number) => {
      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&zoom=14&addressdetails=1`,
          { headers: { "Accept-Language": "en" } }
        );
        const data = await res.json();
        if (data?.address) {
          setLocation({
            display: resolveLocationName(data.address),
            isLive: true,
          });
        }
      } catch {
        setLocation({ display: "Your Location", isLive: true });
      }
    };

    const fetchPrayerTimes = async (lat: number, lon: number) => {
      try {
        const res = await fetch(
          `https://api.aladhan.com/v1/timings?latitude=${lat}&longitude=${lon}&method=1`
        );
        const data = await res.json();
        if (data?.data?.timings) setTimings(data.data.timings);
      } catch {
        await fetchFallbackTimes();
      } finally {
        setLoading(false);
      }
    };

    // ✅ Main logic
    if (!navigator.geolocation) {
      fetchFallbackTimes();
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async ({ coords }) => {
        await Promise.all([
          fetchLocationName(coords.latitude, coords.longitude),
          fetchPrayerTimes(coords.latitude, coords.longitude),
        ]);
      },
      () => fetchFallbackTimes(),
      { timeout: 8000, maximumAge: 300_000 }
    );
  }, []); // ✅ Empty array — koi warning nahi

  const prayersList = timings
    ? [
        { name: "Fajr", time: timings.Fajr },
        { name: "Dhuhr", time: timings.Dhuhr },
        { name: "Asr", time: timings.Asr },
        { name: "Maghrib", time: timings.Maghrib },
        { name: "Isha", time: timings.Isha },
      ]
    : [];

  if (loading || !timings) {
    return (
      <div className="max-w-4xl mx-auto my-8 p-6 bg-primary text-white rounded-2xl shadow-xl animate-pulse">
        <div className="h-5 bg-white/15 rounded-full w-1/3 mb-6"></div>
        <div className="grid grid-cols-5 gap-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="bg-white/10 p-5 rounded-xl space-y-3">
              <div className="h-2.5 bg-white/15 rounded-full w-1/2 mx-auto"></div>
              <div className="h-6 bg-white/15 rounded-full w-3/4 mx-auto"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto my-10 p-7 bg-primary text-white rounded-2xl shadow-2xl border border-white/10 font-body">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-7 pb-5 border-b border-white/10 gap-3">
        <div>
          <h2 className="text-xl font-bold font-heading text-secondary">
            Today&apos;s Prayer Timings
          </h2>
          <p className="text-xs text-white/40 mt-1 tracking-wide uppercase">
            Precise calculations for your location
          </p>
        </div>
        <div className="flex items-center gap-2 bg-white/8 border border-white/15 rounded-full px-4 py-1.5">
          {location.isLive && (
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-60"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-secondary"></span>
            </span>
          )}
          <span className="text-xs font-medium text-secondary tracking-wide">
            {location.display}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        {prayersList.map((prayer) => (
          <div
            key={prayer.name}
            className="bg-white/4 hover:bg-white/8 border border-white/8 hover:border-white/15 p-4 rounded-xl text-center transition-all duration-200"
          >
            <p className="text-[10px] font-semibold tracking-[0.12em] text-secondary/80 uppercase mb-2">
              {prayer.name}
            </p>
            <p className="text-xl font-bold font-heading tracking-tight">
              {prayer.time}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}