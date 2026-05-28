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
    <div className="p-6 bg-white border rounded-2xl shadow-xl">
      <h3 className="text-xl font-bold mb-4">Find Qibla</h3>
      <div className="w-24 h-24 mx-auto" style={{ transform: `rotate(${qiblaAngle}deg)` }}>
        {/* Yahan aapka Compass SVG aayega */}
      </div>
      <button onClick={findQibla} className="...">Find Qibla</button>
    </div>
  );
}