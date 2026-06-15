"use client";

import React, { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { FaSearch, FaBars, FaTimes } from "react-icons/fa";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Quran", href: "/quran" },
  { label: "Duas", href: "/duas" },
  { label: "Articles", href: "/articles" },
  { label: "Seerah", href: "/seerah" },
  { label: "About", href: "/about" },
  { label: "Categories", href: "/categories"}
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSearchClick = () => {
    window.dispatchEvent(new Event("open-global-search"));
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-white shadow-sm border-b border-gray-100 transition-colors">
      <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          
          {/* Left Side: Logo */}
          <div className="shrink-0">
            <Link href="/" className="flex items-center gap-3 group transition-all">
              <Image 
                src="/logo.png" 
                alt="AlMuslims Logo" 
                width={100} 
                height={100} 
                className="h-[100px] w-[100px] sm:h-24 sm:w-24 object-contain transition-transform duration-300 group-hover:scale-105"
                priority
              />
              <div className="flex flex-col justify-center">
                <span className="font-logo text-[26px] sm:text-3xl font-bold leading-none text-primary tracking-wider">
                  AlMuslims
                </span>
                <span className="text-[9px] sm:text-[10px] tracking-[0.2em] text-primary/60 uppercase mt-1.5 font-bold">
                  Authentic Islamic Knowledge
                </span>
              </div>
            </Link>
          </div>

          {/* Center: Navigation Links (Desktop) */}
          <div className="hidden xl:flex space-x-6 font-body">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-medium transition-colors py-2 ${
                    isActive 
                      ? "text-primary font-bold border-b-2 border-secondary" 
                      : "text-zinc-500 hover:text-primary"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* Right Side: Search + Actions (Desktop) */}
          <div className="hidden xl:flex items-center gap-4 text-zinc-600">
            <button 
              onClick={handleSearchClick}
              className="p-2 hover:text-primary transition-colors cursor-pointer"
              aria-label="Search site"
            >
              <FaSearch className="text-sm" />
            </button>
          </div>
          
          {/* Mobile Actions and Menu Button (Hamburger) */}
          <div className="xl:hidden flex items-center gap-2">
            <button 
              onClick={handleSearchClick}
              className="text-zinc-600 p-2 cursor-pointer"
              aria-label="Search site"
            >
              <FaSearch size={16} />
            </button>
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-zinc-600 p-2 focus:outline-none cursor-pointer"
              aria-label="Menu"
            >
              {mobileMenuOpen ? <FaTimes size={18} /> : <FaBars size={18} />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-white border-b border-zinc-100 font-body px-4 pt-2 pb-4 space-y-2 shadow-inner transition-colors">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium text-zinc-600 hover:bg-zinc-50 hover:text-primary"
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}