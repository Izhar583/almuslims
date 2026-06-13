"use client";

import React, { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { FaSearch, FaMoon, FaSun, FaBars, FaTimes, FaUserCircle } from "react-icons/fa";
import { useTheme } from "@/components/layout/ThemeProvider";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Quran", href: "/quran" },
  { label: "Hadith", href: "/hadith" },
  { label: "Duas", href: "/duas" },
  { label: "Articles", href: "/articles" },
  { label: "Seerah", href: "/seerah" },
  { label: "Ask Scholar", href: "/scholar" },
  { label: "About", href: "/about" },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { theme, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);

  useEffect(() => {
    // Read session on load
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch {
        setUser(null);
      }
    }

    // Add listener for custom event
    const handleAuthChange = () => {
      const updatedUser = localStorage.getItem("user");
      if (updatedUser) {
        try {
          setUser(JSON.parse(updatedUser));
        } catch {
          setUser(null);
        }
      } else {
        setUser(null);
      }
    };

    window.addEventListener("auth-change", handleAuthChange);
    return () => window.removeEventListener("auth-change", handleAuthChange);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.dispatchEvent(new Event("auth-change"));
    router.push("/");
    setMobileMenuOpen(false);
  };

  const handleSearchClick = () => {
    window.dispatchEvent(new Event("open-global-search"));
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-white dark:bg-card shadow-sm border-b border-gray-100 dark:border-zinc-800/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
                <span className="font-logo text-[26px] sm:text-3xl font-bold leading-none text-primary dark:text-secondary tracking-wider">
                  AlMuslims
                </span>
                <span className="text-[9px] sm:text-[10px] tracking-[0.2em] text-primary/60 dark:text-secondary/60 uppercase mt-1.5 font-bold">
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
                      ? "text-primary dark:text-secondary font-bold border-b-2 border-secondary" 
                      : "text-zinc-500 dark:text-zinc-400 hover:text-primary dark:hover:text-secondary"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* Right Side: Search + Actions */}
          <div className="hidden xl:flex items-center gap-4 text-zinc-600 dark:text-zinc-300">
            <button 
              onClick={handleSearchClick}
              className="p-2 hover:text-primary dark:hover:text-secondary transition-colors cursor-pointer"
              aria-label="Search site"
            >
              <FaSearch className="text-sm" />
            </button>
            <button 
              onClick={toggleTheme}
              className="p-2 hover:text-primary dark:hover:text-secondary transition-colors cursor-pointer"
              aria-label="Toggle dark mode"
            >
              {theme === "light" ? <FaMoon className="text-sm" /> : <FaSun className="text-sm" />}
            </button>
            
            {user ? (
              <div className="flex items-center gap-3 ml-2 border-l border-zinc-200 dark:border-zinc-800 pl-4">
                <span className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 flex items-center gap-1.5">
                  <FaUserCircle className="text-primary dark:text-secondary text-sm" />
                  {user.name}
                </span>
                <button
                  onClick={handleLogout}
                  className="bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 px-3.5 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link 
                href="/login" 
                className="ml-2 bg-primary dark:bg-secondary text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primaryHover dark:hover:opacity-90 transition-all shadow-sm"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile Actions and Menu Button (Hamburger) */}
          <div className="xl:hidden flex items-center gap-2">
            <button 
              onClick={handleSearchClick}
              className="text-zinc-600 dark:text-zinc-300 p-2 cursor-pointer"
              aria-label="Search site"
            >
              <FaSearch size={16} />
            </button>
            <button 
              onClick={toggleTheme}
              className="text-zinc-600 dark:text-zinc-300 p-2 cursor-pointer"
              aria-label="Toggle dark mode"
            >
              {theme === "light" ? <FaMoon size={16} /> : <FaSun size={16} />}
            </button>
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-zinc-600 dark:text-zinc-300 p-2 focus:outline-none cursor-pointer"
              aria-label="Menu"
            >
              {mobileMenuOpen ? <FaTimes size={18} /> : <FaBars size={18} />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-white dark:bg-card border-b border-zinc-100 dark:border-zinc-800/80 font-body px-4 pt-2 pb-4 space-y-2 shadow-inner transition-colors">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium text-zinc-600 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 hover:text-primary dark:hover:text-secondary"
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800/80 px-3">
            {user ? (
              <div className="flex flex-col gap-2">
                <span className="text-xs font-semibold text-zinc-500 dark:text-zinc-400">
                  Logged in as: {user.name}
                </span>
                <button
                  onClick={handleLogout}
                  className="w-full text-center bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 py-2.5 rounded-lg text-sm font-semibold cursor-pointer transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link 
                href="/login" 
                onClick={() => setMobileMenuOpen(false)}
                className="block text-center bg-primary dark:bg-secondary text-white py-2.5 rounded-lg text-sm font-semibold shadow-sm"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}