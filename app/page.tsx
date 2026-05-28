'use client'; // Next.js ke liye zaroori hai agar hooks use kar rahe hain

import React from 'react';

const QiblaCard = () => {
  // Filhal logic nahi hai, isliye state khali hai. 
  // Jab aap logic likhein, to useState/useEffect ka sahi se use karein.
  
  return (
    <div className="p-4 border rounded-lg shadow-sm">
      <h2 className="text-xl font-bold">Qibla Direction</h2>
      <p>Yahan Qibla ki direction dikhegi.</p>
      {/* Yahan aapka baki UI code aayega */}
    </div>
  );
};

export default QiblaCard;