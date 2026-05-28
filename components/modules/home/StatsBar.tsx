"use client";
import React, { useRef, useEffect, useState } from "react";
import { FaBookReader, FaCrown, FaLayerGroup, FaCertificate } from "react-icons/fa";

function AnimatedCounter({ target, suffix = "+" }: { target: number, suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        let current = 0;
        const interval = setInterval(() => {
          current += Math.ceil(target / 100);
          if (current >= target) { 
             setCount(target); 
             clearInterval(interval); 
          } else {
             setCount(current);
          }
        }, 20);
        observer.disconnect();
      }
    }, { threshold: 0.3 });

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

export default function StatsBar() {
  return (
    <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8 mt-8 z-20 relative font-body">
      <div className="bg-[#FCFBF8] rounded-3xl border border-[#F0EBE1] shadow-sm py-6 sm:py-8 px-4 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-0 divide-y md:divide-y-0 md:divide-x divide-[#F0EBE1]">
        
        {/* Stat 1 */}
        <div className="flex items-center justify-center gap-4 sm:gap-5 w-full pt-4 md:pt-0 pb-4 md:pb-0 px-2 sm:px-6">
          <div className="text-[#D48C46] text-4xl sm:text-[2.5rem] opacity-90 drop-shadow-sm">
            <FaBookReader />
          </div>
          <div className="flex flex-col items-start text-left">
            <h3 className="text-2xl sm:text-3xl font-bold font-serif text-[#1F2926] mb-0.5 tracking-tight leading-none">
              <AnimatedCounter target={10000} />
            </h3>
            <p className="text-[10px] sm:text-[11px] text-[#1F2926]/60 font-semibold tracking-wider">Active Readers</p>
          </div>
        </div>

        {/* Stat 2 */}
        <div className="flex items-center justify-center gap-4 sm:gap-5 w-full pt-4 md:pt-0 pb-4 md:pb-0 px-2 sm:px-6">
          <div className="text-[#D48C46] text-4xl sm:text-[2.5rem] opacity-90 drop-shadow-sm">
            <FaCrown />
          </div>
          <div className="flex flex-col items-start text-left">
            <h3 className="text-2xl sm:text-3xl font-bold font-serif text-[#1F2926] mb-0.5 tracking-tight leading-none">
              <AnimatedCounter target={500} />
            </h3>
            <p className="text-[10px] sm:text-[11px] text-[#1F2926]/60 font-semibold tracking-wider">Articles & Resources</p>
          </div>
        </div>

        {/* Stat 3 */}
        <div className="flex items-center justify-center gap-4 sm:gap-5 w-full pt-4 md:pt-0 pb-4 md:pb-0 px-2 sm:px-6">
          <div className="text-[#D48C46] text-4xl sm:text-[2.5rem] opacity-90 drop-shadow-sm">
            <FaLayerGroup />
          </div>
          <div className="flex flex-col items-start text-left">
            <h3 className="text-2xl sm:text-3xl font-bold font-serif text-[#1F2926] mb-0.5 tracking-tight leading-none">
              <AnimatedCounter target={50} />
            </h3>
            <p className="text-[10px] sm:text-[11px] text-[#1F2926]/60 font-semibold tracking-wider">Categories</p>
          </div>
        </div>

        {/* Stat 4 */}
        <div className="flex items-center justify-center gap-4 sm:gap-5 w-full pt-4 md:pt-0 pb-4 md:pb-0 px-2 sm:px-6">
          <div className="text-[#D48C46] text-4xl sm:text-[2.5rem] opacity-90 drop-shadow-sm">
            <FaCertificate />
          </div>
          <div className="flex flex-col items-start text-left">
            <h3 className="text-2xl sm:text-3xl font-bold font-serif text-[#1F2926] mb-0.5 tracking-tight leading-none">
              <AnimatedCounter target={100} suffix="%" />
            </h3>
            <p className="text-[10px] sm:text-[11px] text-[#1F2926]/60 font-semibold tracking-wider">Authentic Content</p>
          </div>
        </div>

      </div>
    </div>
  );
}
