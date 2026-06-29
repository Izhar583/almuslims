
"use client";

import React, { useState, useEffect, useRef } from "react";
import AnnouncementBar from "./AnnouncementBar";
import Navbar from "./Navbar";

export default function StickyHeader() {
  const [visible, setVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      const diff = lastScrollY.current - currentY;

      if (currentY < 80 || diff > 10) {
        setVisible(true);
      } 
      else if (diff < -10 && currentY > 80) {
        setVisible(false);
      }
      
      lastScrollY.current = currentY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 w-full z-[100] transition-transform duration-500 ease-in-out ${
        visible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <AnnouncementBar />
      <Navbar />
    </header>
  );
}
