"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FaEnvelope, FaLock, FaUser, FaCheckCircle, FaSpinner } from "react-icons/fa";
import { motion } from "framer-motion";

export default function LoginPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    // Check if user is already logged in
    const user = localStorage.getItem("user");
    if (user) {
      router.push("/");
    }
  }, [router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    if (activeTab === "signin" && (!email || !password)) {
      setError("Please fill in all fields.");
      setIsLoading(false);
      return;
    }
    if (activeTab === "signup" && (!name || !email || !password)) {
      setError("Please fill in all fields.");
      setIsLoading(false);
      return;
    }

    // Simulate API delay
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
      
      const loggedUser = {
        name: activeTab === "signup" ? name : email.split("@")[0],
        email: email,
      };

      // Set user session in localStorage
      localStorage.setItem("user", JSON.stringify(loggedUser));
      
      // Dispatch custom event to notify Navbar and other components
      window.dispatchEvent(new Event("auth-change"));

      setTimeout(() => {
        router.push("/");
      }, 1500);
    }, 1500);
  };

  return (
    <main className="min-h-screen bg-background text-zinc-800 dark:text-zinc-200 flex items-center justify-center py-16 px-4">
      {/* Decorative background glows */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10 opacity-30 dark:opacity-25">
        <div className="absolute top-1/4 left-1/4 w-[350px] h-[350px] rounded-full bg-primary/10 blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[350px] h-[350px] rounded-full bg-secondary/15 blur-[100px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-white dark:bg-card border border-zinc-200/50 dark:border-zinc-800/80 shadow-2xl rounded-3xl overflow-hidden p-8 sm:p-10 relative"
      >
        {isSuccess ? (
          <div className="text-center py-10 flex flex-col items-center justify-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
              className="text-secondary mb-6"
            >
              <FaCheckCircle size={64} />
            </motion.div>
            <h2 className="text-2xl font-bold text-primary dark:text-zinc-100 mb-2">
              Assalamu Alaikum!
            </h2>
            <p className="text-zinc-500 dark:text-zinc-400">
              {activeTab === "signin"
                ? "Logged in successfully. Redirecting..."
                : "Account created successfully. Redirecting..."}
            </p>
          </div>
        ) : (
          <>
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="font-heading text-3xl font-bold text-primary dark:text-zinc-100 mb-2">
                AlMuslims Portal
              </h1>
              <p className="text-zinc-500 dark:text-zinc-400 text-sm">
                Join our spiritual path & keep records of your progress
              </p>
            </div>

            {/* Tab Swapper */}
            <div className="flex border-b border-zinc-100 dark:border-zinc-800 mb-6">
              <button
                onClick={() => {
                  setActiveTab("signin");
                  setError("");
                }}
                className={`w-1/2 pb-3 text-sm font-semibold transition-all cursor-pointer ${
                  activeTab === "signin"
                    ? "border-b-2 border-primary text-primary dark:text-secondary dark:border-secondary font-bold"
                    : "text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200"
                }`}
              >
                Sign In
              </button>
              <button
                onClick={() => {
                  setActiveTab("signup");
                  setError("");
                }}
                className={`w-1/2 pb-3 text-sm font-semibold transition-all cursor-pointer ${
                  activeTab === "signup"
                    ? "border-b-2 border-primary text-primary dark:text-secondary dark:border-secondary font-bold"
                    : "text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200"
                }`}
              >
                Sign Up
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {error && (
                <div className="p-3.5 bg-red-500/10 border border-red-500/25 rounded-xl text-xs text-red-500 font-semibold">
                  {error}
                </div>
              )}

              {activeTab === "signup" && (
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-zinc-500 dark:text-zinc-400">Full Name</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-zinc-400">
                      <FaUser size={13} />
                    </span>
                    <input
                      type="text"
                      placeholder="e.g. Abdullah Khan"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full pl-11 pr-4 py-3 bg-zinc-50 dark:bg-background border border-zinc-200/50 dark:border-zinc-800/80 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    />
                  </div>
                </div>
              )}

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-zinc-500 dark:text-zinc-400">Email Address</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-zinc-400">
                    <FaEnvelope size={13} />
                  </span>
                  <input
                    type="email"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 bg-zinc-50 dark:bg-background border border-zinc-200/50 dark:border-zinc-800/80 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-zinc-500 dark:text-zinc-400">Password</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-zinc-400">
                    <FaLock size={13} />
                  </span>
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 bg-zinc-50 dark:bg-background border border-zinc-200/50 dark:border-zinc-800/80 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 bg-primary text-white hover:bg-primaryHover disabled:bg-primary/50 font-semibold rounded-xl text-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md hover:shadow-lg mt-2"
              >
                {isLoading ? (
                  <>
                    <FaSpinner className="animate-spin" /> Formulating Session...
                  </>
                ) : activeTab === "signin" ? (
                  "Sign In"
                ) : (
                  "Create Account"
                )}
              </button>
            </form>
          </>
        )}
      </motion.div>
    </main>
  );
}
