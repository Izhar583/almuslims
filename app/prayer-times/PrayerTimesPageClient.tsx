"use client";

import { useState, useEffect } from "react";

interface Timings {
  Fajr: string;
  Sunrise: string;
  Dhuhr: string;
  Asr: string;
  Maghrib: string;
  Isha: string;
}

interface CalendarDay {
  date: { gregorian: { date: string; weekday: { en: string } } };
  timings: Timings;
}

const DEFAULT_LAT = 31.5204;
const DEFAULT_LON = 74.3587;
const DEFAULT_CITY = "Lahore, Pakistan";

function formatTime(t: string): string {
  const [h, m] = t.replace(/\s.*/, "").split(":").map(Number);
  const ampm = h >= 12 ? "PM" : "AM";
  const hh = h % 12 === 0 ? 12 : h % 12;
  return `${String(hh).padStart(2, "0")}:${String(m).padStart(2, "0")} ${ampm}`;
}

export default function PrayerTimesPageClient() {
  const [calendar, setCalendar] = useState<CalendarDay[]>([]);
  const [location, setLocation] = useState(DEFAULT_CITY);
  const [loading, setLoading] = useState(true);
  const [coords, setCoords] = useState({ lat: DEFAULT_LAT, lon: DEFAULT_LON });

  const fetchCalendar = async (lat: number, lon: number) => {
    setLoading(true);
    try {
      const month = new Date().getMonth() + 1;
      const year = new Date().getFullYear();
      const res = await fetch(
        `https://api.aladhan.com/v1/calendar?latitude=${lat}&longitude=${lon}&method=1&month=${month}&year=${year}`
      );
      const data = await res.json();
      if (data?.data) setCalendar(data.data);
    } catch {
      /* keep empty */
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const init = async (lat: number, lon: number) => {
      setCoords({ lat, lon });
      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&zoom=10&addressdetails=1`,
          { headers: { "Accept-Language": "en" } }
        );
        const data = await res.json();
        if (data?.address) {
          const city =
            data.address.city ||
            data.address.town ||
            data.address.state ||
            "";
          const country = data.address.country || "";
          setLocation(city && country ? `${city}, ${country}` : country || DEFAULT_CITY);
        }
      } catch {
        setLocation(DEFAULT_CITY);
      }
      await fetchCalendar(lat, lon);
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        ({ coords: c }) => init(c.latitude, c.longitude),
        () => init(DEFAULT_LAT, DEFAULT_LON)
      );
    } else {
      init(DEFAULT_LAT, DEFAULT_LON);
    }
  }, []);

  const todayStr = new Date().toLocaleDateString("en-GB").split("/").reverse().join("-");
  const todayEntry = calendar.find((d) => {
    const parts = d.date.gregorian.date.split("-");
    const formatted = `${parts[2]}-${parts[1]}-${parts[0]}`;
    return formatted === todayStr || d.date.gregorian.date === todayStr;
  });

  const prayerRows = todayEntry
    ? [
        { name: "Fajr", time: todayEntry.timings.Fajr },
        { name: "Sunrise", time: todayEntry.timings.Sunrise },
        { name: "Dhuhr", time: todayEntry.timings.Dhuhr },
        { name: "Asr", time: todayEntry.timings.Asr },
        { name: "Maghrib", time: todayEntry.timings.Maghrib },
        { name: "Isha", time: todayEntry.timings.Isha },
      ]
    : [];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-10">
        <p className="text-secondary text-xs font-bold tracking-[0.25em] uppercase mb-3">
          Salah Times
        </p>
        <h1 className="font-heading text-4xl sm:text-5xl font-bold text-primary mb-3">
          Prayer Timetable
        </h1>
        <p className="text-gray-500 text-sm">
          Accurate prayer times via{" "}
          <a href="https://aladhan.com" className="text-primary underline" target="_blank" rel="noopener noreferrer">
            AlAdhan API
          </a>{" "}
          — {location}
        </p>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        <>
          {/* Today highlight */}
          {todayEntry && (
            <div className="mb-10 p-6 sm:p-8 rounded-2xl bg-primary text-white">
              <h2 className="text-sm font-bold tracking-widest uppercase text-white/60 mb-6">
                Today&apos;s Prayers
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {prayerRows.map((p) => (
                  <div key={p.name} className="bg-white/10 rounded-xl p-4 text-center">
                    <p className="text-xs text-white/50 uppercase tracking-wider mb-1">{p.name}</p>
                    <p className="text-xl font-bold text-secondary">{formatTime(p.time)}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Monthly table */}
          <div className="overflow-x-auto rounded-2xl border border-primary/10 bg-white shadow-sm">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-primary/10 bg-primary/5">
                  <th className="text-left p-3 font-semibold text-primary">Date</th>
                  <th className="p-3 font-semibold text-primary">Fajr</th>
                  <th className="p-3 font-semibold text-primary">Dhuhr</th>
                  <th className="p-3 font-semibold text-primary">Asr</th>
                  <th className="p-3 font-semibold text-primary">Maghrib</th>
                  <th className="p-3 font-semibold text-primary">Isha</th>
                </tr>
              </thead>
              <tbody>
                {calendar.map((day, i) => {
                  const isToday =
                    day.date.gregorian.date.split("-").reverse().join("-") === todayStr ||
                    day.date.gregorian.date === todayStr;
                  return (
                    <tr
                      key={i}
                      className={`border-b border-primary/5 ${isToday ? "bg-secondary/10 font-semibold" : ""}`}
                    >
                      <td className="p-3 text-primary whitespace-nowrap">
                        {day.date.gregorian.date}{" "}
                        <span className="text-gray-400 text-xs">{day.date.gregorian.weekday.en.slice(0, 3)}</span>
                      </td>
                      <td className="p-3 text-center text-gray-600">{formatTime(day.timings.Fajr)}</td>
                      <td className="p-3 text-center text-gray-600">{formatTime(day.timings.Dhuhr)}</td>
                      <td className="p-3 text-center text-gray-600">{formatTime(day.timings.Asr)}</td>
                      <td className="p-3 text-center text-gray-600">{formatTime(day.timings.Maghrib)}</td>
                      <td className="p-3 text-center text-gray-600">{formatTime(day.timings.Isha)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}
