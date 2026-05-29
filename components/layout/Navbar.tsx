"use client"; // Kyunki Navbar me hum hooks aur links active track karenge

import React, { useState } from "react";
import { usePathname } from "next/navigation"; // Active link ko highlight karne ke liye
import Link from "next/link";
import { FaSearch, FaMoon, FaBars, FaTimes } from "react-icons/fa";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Quran", href: "/quran" },
  { label: "Hadith", href: "/hadith" },
]; // Tutorial ke mutabiq default links

export default function Navbar() {
  const pathname = usePathname(); // Pata chalega user kis page par ha
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false); // Mobile menu handle karne ke liye

  return (
    <nav className="sticky top-0 z-50 w-full bg-white shadow-sm border-b border-gray-100 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          
          {/* Left Side: Logo */}
          <div className="shrink-0">
            <Link href="/" className="font-heading text-2xl font-bold text-primary tracking-wide">
              AlMuslims
            </Link>
          </div>

          {/* Center: Navigation Links (Desktop) */}
          <div className="hidden md:flex space-x-8 font-body">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-medium transition-colors py-2 ${
                    isActive 
                      ? "text-primary font-bold border-b-2 border-secondary" 
                      : "text-gray-500 hover:text-primary"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* Right Side: Search + Actions */}
          <div className="hidden md:flex items-center gap-4 text-gray-600">
            <button className="p-2 hover:text-primary transition-colors">
              <FaSearch className="text-sm" />
            </button>
            <button className="p-2 hover:text-primary transition-colors">
              <FaMoon className="text-sm" />
            </button>
            <Link 
              href="/login" 
              className="ml-2 bg-primary text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primaryHover transition-colors"
            >
              Login
            </Link>
          </div>

          {/* Mobile Menu Button (Hamburger) */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-600 p-2 focus:outline-none"
            >
              {mobileMenuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-100 font-body px-4 pt-2 pb-4 space-y-2 shadow-inner">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:bg-background hover:text-primary"
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-4 border-t border-gray-100 flex items-center justify-between px-3">
            <div className="flex gap-4 text-gray-600">
              <FaSearch />
              <FaMoon />
            </div>
            <Link 
              href="/login" 
              className="bg-primary text-white px-4 py-1.5 rounded-md text-sm font-medium"
            >
              Login
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}