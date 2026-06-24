"use client";
import React, { useEffect, useState } from "react";
import { format, isAfter, differenceInDays, isSameDay, startOfDay } from "date-fns";
import { TbMoon, TbBuildingMosque, TbChevronLeft, TbChevronRight } from "react-icons/tb";
import eventsData from "@/data/islamic-events.json";

export default function IslamicCalendar() {
  const [hijriDate, setHijriDate] = useState<{ day: string, month: string, year: string } | null>(null);
  const [today, setToday] = useState<Date | null>(null);
  const [currentDate, setCurrentDate] = useState<Date | null>(null);

  // Initialize dates only on client to avoid SSR/hydration mismatch
  useEffect(() => {
    const now = startOfDay(new Date());
    setToday(now);
    setCurrentDate(new Date());
  }, []);

  useEffect(() => {
    if (!today) return;
    const fetchHijri = async () => {
      try {
        const day = String(today.getDate()).padStart(2, '0');
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const year = today.getFullYear();
        const formatted = `${day}-${month}-${year}`;

        const res = await fetch(`https://api.aladhan.com/v1/gToH?date=${formatted}`);
        const data = await res.json();

        if (data && data.data && data.data.hijri) {
          setHijriDate({
            day: data.data.hijri.day,
            month: data.data.hijri.month.en,
            year: data.data.hijri.year
          });
        }
      } catch (err) {
        console.error("Failed to fetch Hijri date:", err);
      }
    };
    fetchHijri();
  }, [today]);

  // --- Col 1: Build Calendar Grid ---
  // Show skeleton while client date is not yet available
  if (!currentDate || !today) {
    return (
      <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8 mt-12 mb-20 z-20 relative font-body">
        <div className="bg-[#FCFBF8] border border-[#F0EBE1] rounded-[2rem] p-6 sm:p-10 shadow-sm animate-pulse">
          <div className="h-64 bg-[#F0EBE1] rounded-2xl" />
        </div>
      </div>
    );
  }

  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1; // 1-12

  const firstDay = new Date(currentYear, currentMonth - 1, 1).getDay(); // 0=Sun, 6=Sat
  const daysInMonth = new Date(currentYear, currentMonth, 0).getDate();

  const prefixEmptySlots = Array.from({ length: firstDay }).map((_, i) => null);
  const monthDays = Array.from({ length: daysInMonth }).map((_, i) => i + 1);
  const calendarGrid = [...prefixEmptySlots, ...monthDays];

  const handlePrevMonth = () => setCurrentDate(new Date(currentYear, currentMonth - 2, 1));
  const handleNextMonth = () => setCurrentDate(new Date(currentYear, currentMonth, 1));

  // --- Col 2: Upcoming Events Filtering ---
  const upcomingEvents = eventsData
    .map(e => ({
      ...e,
      parsedDate: startOfDay(new Date(e.date))
    }))
    .filter(e => isAfter(e.parsedDate, today) || isSameDay(e.parsedDate, today))
    .sort((a, b) => a.parsedDate.getTime() - b.parsedDate.getTime())
    .slice(0, 2);

  // --- Col 3: Countdown Calculation ---
  const nextEvent = upcomingEvents.length > 0 ? upcomingEvents[0] : null;
  const daysLeft = nextEvent ? differenceInDays(nextEvent.parsedDate, today) : 0;

  return (
    <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8 mt-12 mb-20 z-20 relative font-body">
      {/* Main Large Container */}
      <div className="bg-[#FCFBF8] border border-[#F0EBE1] rounded-[2rem] p-6 sm:p-10 flex flex-col lg:flex-row gap-8 lg:gap-12 shadow-sm items-stretch">

        {/* Left Column: Title + Calendar Card */}
        <div className="flex-1 lg:w-1/3 flex flex-col">
          <div className="bg-white rounded-[2rem] p-6 sm:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-[#F0EBE1] flex flex-col flex-1">
            <h2 className="text-[11px] font-bold text-[#1F2926]/70 tracking-[0.15em] uppercase mb-5">
              Islamic Calendar
            </h2>

            <div className="flex items-center justify-between mb-4">
              <button onClick={handlePrevMonth} className="p-2 text-[#1F2926] hover:bg-[#F0EBE1] rounded-full transition-colors"><TbChevronLeft size={16} /></button>
              <div className="text-center">
                 <h3 className="text-lg sm:text-xl font-bold font-serif text-[#1F2926]">
                   {hijriDate ? `${hijriDate.month} ${hijriDate.year} AH` : 'Loading...'}
                 </h3>
                 <p className="text-[13px] text-[#1F2926]/70 font-semibold tracking-wide mt-1">
                   {format(currentDate, "MMMM / yyyy")}
                 </p>
              </div>
              <button onClick={handleNextMonth} className="p-2 text-[#1F2926] hover:bg-[#F0EBE1] rounded-full transition-colors"><TbChevronRight size={16} /></button>
            </div>

            <div className="grid grid-cols-7 gap-1 sm:gap-2 mb-3 mt-4">
              {['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map(day => (
                <div key={day} className="text-center text-[12px] font-bold text-[#1F2926]/80 tracking-widest">
                  {day}
                </div>
              ))}
            </div>
            
            <div className="grid grid-cols-7 gap-1 sm:gap-2 flex-1 content-start mb-6">
              {calendarGrid.map((dayNum, idx) => {
                if (!dayNum) return <div key={`empty-${idx}`} className="h-9 sm:h-10"></div>;
                
                const isToday = dayNum === today.getDate() && currentMonth === (today.getMonth() + 1) && currentYear === today.getFullYear();
                return (
                  <div key={idx} className={`h-9 sm:h-10 flex items-center justify-center text-xs sm:text-sm font-semibold transition-all cursor-default ${isToday ? 'bg-[#0A3A2F] text-white rounded-full shadow-md scale-105' : 'text-[#1F2926]/80 hover:bg-[#F0EBE1] rounded-xl'}`}>
                    {dayNum}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Middle Column: Title + Events Card */}
        <div className="flex-1 lg:w-1/3 flex flex-col">
          <div className="bg-white rounded-[2rem] p-6 sm:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-[#F0EBE1] flex flex-col flex-1">
            <h2 className="text-[11px] font-bold text-[#1F2926]/70 tracking-[0.15em] uppercase mb-5">
              Today & Upcoming Events
            </h2>
            
            <div className="flex flex-col flex-1 justify-center space-y-6">
              {/* Today Item */}
              <div className="flex gap-4 items-start group">
                <div className="w-12 h-12 rounded-full bg-[#0A3A2F] flex items-center justify-center text-white text-xl shrink-0 shadow-md group-hover:scale-105 transition-transform">
                  <TbMoon />
                </div>
                <div className="flex-1 pt-0.5">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-[11px] text-[#D48C46] font-bold uppercase tracking-widest">Today</p>
                    <p className="text-[11px] text-[#1F2926]/50 font-medium">{format(today, "MMM d, yyyy")}</p>
                  </div>
                  <h4 className="font-bold text-[#1F2926] text-sm mb-1">{hijriDate ? `${hijriDate.day} ${hijriDate.month} ${hijriDate.year} AH` : 'Loading...'}</h4>
                  <p className="text-[12px] text-[#1F2926]/70 leading-relaxed">
                    The blessed month of {hijriDate?.month || ''}. Increase in good deeds.
                  </p>
                </div>
              </div>
              
              {upcomingEvents.length > 0 && (
                <div className="w-full h-px bg-[#F0EBE1]" />
              )}

              {/* Upcoming Items */}
              {upcomingEvents.map((event, idx) => (
                <React.Fragment key={idx}>
                  {idx > 0 && <div className="w-full h-px bg-[#F0EBE1]" />}
                  <div className="flex gap-4 items-start group">
                    <div className="w-12 h-12 rounded-full bg-[#0A3A2F]/5 flex items-center justify-center text-[#0A3A2F] text-xl shrink-0 group-hover:bg-[#0A3A2F] group-hover:text-white transition-colors duration-300 shadow-sm">
                      {event.icon === 'mosque' ? <TbBuildingMosque /> : <TbMoon />}
                    </div>
                    <div className="flex-1 pt-0.5">
                      <div className="flex items-center justify-between mb-1">
                        <p className="text-[11px] text-[#D48C46] font-bold uppercase tracking-widest">Upcoming</p>
                        <p className="text-[11px] text-[#1F2926]/50 font-medium">
                          {format(event.parsedDate, "MMM d, yyyy")}
                        </p>
                      </div>
                      <h4 className="font-bold text-[#1F2926] text-sm mb-1">{event.name} ({event.hijriDate})</h4>
                      <p className="text-[12px] text-[#1F2926]/70 leading-relaxed">
                        {event.description}
                      </p>
                    </div>
                  </div>
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Countdown Card (Arch Shape CSS) */}
        <div className="flex-1 lg:w-1/3 flex flex-col">
          <div
            className="bg-[#FAF7F2] p-6 sm:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-[#EBE3D5] flex flex-col items-center justify-center relative overflow-hidden text-center flex-1 group"
            style={{ borderRadius: "50% 50% 2rem 2rem / 60px 60px 2rem 2rem" }}
          >
            <h2 className="text-[11px] font-bold text-[#1F2926]/70 tracking-[0.15em] uppercase mt-5 mb-5 z-10">
              Event Countdown
            </h2>

            {/* Subtle grain/texture overlay */}
            <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] mix-blend-overlay"></div>

            {/* Decorative Arch lines inside */}
            <div className="absolute inset-x-6 top-6 bottom-6 border border-[#D48C46]/30 pointer-events-none" style={{ borderRadius: "50% 50% 1.5rem 1.5rem / 50px 50px 1.5rem 1.5rem" }}></div>
            <div className="absolute inset-x-8 top-8 bottom-8 border border-[#D48C46]/10 pointer-events-none" style={{ borderRadius: "50% 50% 1.2rem 1.2rem / 40px 40px 1.2rem 1.2rem" }}></div>

            {/* Top Crescent Icon */}
            <div className="absolute top-16 left-1/2 -translate-x-1/2 text-[#D48C46] opacity-80">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                <path fillRule="evenodd" d="M10.5 3.75a8.25 8.25 0 106.965 12.632 8.25 8.25 0 11-6.965-12.632z" clipRule="evenodd" />
              </svg>
            </div>

            {/* Side Lanterns */}
            <div className="absolute left-6 top-1/3 w-8 h-20 opacity-50 hidden sm:block">
              <div className="w-0.5 h-6 bg-[#D48C46] mx-auto"></div>
              <div className="w-3 h-2 bg-[#D48C46] mx-auto rounded-t-sm"></div>
              <div className="w-5 h-10 border border-[#D48C46] rounded-sm mx-auto flex items-center justify-center relative">
                <div className="w-1 h-3 bg-[#D48C46]/50 rounded-full animate-pulse"></div>
                <div className="absolute inset-0 border-t border-[#D48C46]/20 mt-1"></div>
                <div className="absolute inset-0 border-b border-[#D48C46]/20 mb-1"></div>
              </div>
              <div className="w-2 h-2 bg-[#D48C46] mx-auto rounded-b-sm"></div>
            </div>
            <div className="absolute right-6 top-1/3 w-8 h-20 opacity-50 hidden sm:block">
              <div className="w-0.5 h-6 bg-[#D48C46] mx-auto"></div>
              <div className="w-3 h-2 bg-[#D48C46] mx-auto rounded-t-sm"></div>
              <div className="w-5 h-10 border border-[#D48C46] rounded-sm mx-auto flex items-center justify-center relative">
                <div className="w-1 h-3 bg-[#D48C46]/50 rounded-full animate-pulse"></div>
                <div className="absolute inset-0 border-t border-[#D48C46]/20 mt-1"></div>
                <div className="absolute inset-0 border-b border-[#D48C46]/20 mb-1"></div>
              </div>
              <div className="w-2 h-2 bg-[#D48C46] mx-auto rounded-b-sm"></div>
            </div>

            {nextEvent ? (
              <div className="z-10 w-full flex flex-col items-center justify-center flex-1 py-6 mt-12">
                <p className="text-[11px] text-[#1F2926]/70 font-bold tracking-[0.2em] uppercase mb-2">Days Until</p>
                <h3 className="text-sm font-bold text-[#1F2926] tracking-[0.15em] uppercase mb-6">{nextEvent.name}</h3>

                <div className="text-7xl sm:text-8xl leading-none font-serif text-[#0A3A2F] mb-3 drop-shadow-sm group-hover:scale-105 transition-transform duration-500">
                  {daysLeft}
                </div>
                <p className="text-[10px] font-bold text-[#D48C46] tracking-[0.2em] uppercase">
                  {daysLeft === 1 ? "Day Left" : "Days Left"}
                </p>
              </div>
            ) : (
              <div className="z-10 w-full flex flex-col items-center mt-12 text-[#1F2926]/50 italic">
                Searching for upcoming events...
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
