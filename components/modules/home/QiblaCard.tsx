/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { useState } from "react";

export default function QiblaCard() {
  const [qiblaAngle, setQiblaAngle] = useState(0);

  const findQibla = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        const { latitude, longitude } = pos.coords;
        // Formula calculation
        // ... (yahan aapka logic aayega)
      });
    }
  };

  return (
    <div className="h-full flex flex-col justify-between p-6 sm:p-8 bg-white border border-primary/5 rounded-[1.5rem] shadow-sm transition-all duration-300 group">
      {/* Header */}
      <div className="text-center mb-6">
        <h2 className="text-[11px] font-bold text-primary/50 tracking-widest uppercase">
          Qibla Finder
        </h2>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center text-center mb-8">
        <div className="w-28 h-28 mb-6 relative transition-transform duration-1000 ease-out" style={{ transform: `rotate(${qiblaAngle}deg)` }}>
          <div className="absolute inset-0 rounded-full border-4 border-primary/5 flex items-center justify-center bg-primary/5 shadow-inner">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10 text-secondary">
              <path fillRule="evenodd" d="M11.622 1.602a.75.75 0 01.756 0l2.25 1.313a.75.75 0 01-.756 1.295L12 3.118 10.128 4.21a.75.75 0 11-.756-1.295l2.25-1.313zM5.898 5.81a.75.75 0 01-.27 1.025l-1.14.665 1.14.665a.75.75 0 11-.756 1.295L3.75 8.806v.388a.75.75 0 01-1.5 0v-.776a.75.75 0 01.378-.65l1.5-1.5a.75.75 0 011.02.27v.002a.75.75 0 01.27 1.022.75.75 0 01-.52-.25z" clipRule="evenodd" />
              <polygon points="12,4 14,12 12,20 10,12" fill="#0A3A2F" />
              <polygon points="12,4 14,12 12,12" fill="#D48C46" />
            </svg>
          </div>
        </div>
        
        <p className="text-sm text-primary/60 leading-relaxed max-w-[200px]">
          Find the direction of Qibla anywhere in the world.
        </p>
      </div>

      {/* Footer Button */}
      <button onClick={findQibla} className="w-full py-3 border border-primary/10 text-primary/80 font-semibold text-sm rounded-full hover:bg-primary hover:text-white transition-colors duration-300">
        Find Qibla
      </button>
    </div>
  );
}