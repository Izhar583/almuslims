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
      <div className="max-w-4xl mx-auto my-8 p-6 bg-primary text-white rounded-2xl shadow-xl animate-pulse">
        <div className="flex justify-between items-center mb-6">
          <div className="h-5 bg-white/15 rounded-full w-1/3"></div>
          <div className="h-7 bg-white/10 rounded-full w-1/4"></div>
        </div>
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

  // ── Card ──────────────────────────────────────────────────
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
            <span className="relative flex h-2 w-2 shrink-0">
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

      {/* Dev mode debug badge */}
      {isDev && (
        <p className="text-[10px] text-white/20 text-center mt-4 font-mono">
          dev mode — check console for location logs
        </p>
      )}
    </div>
  );
}