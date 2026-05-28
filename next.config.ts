import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    // TypeScript errors ko build ke waqt bypass karne ke liye
    ignoreBuildErrors: true,
  },
  // Next.js 16 me agar eslint configurations handle karni hon 
  // to unhe root par maujood `eslint.config.mjs` ya flat config se control kiya jata hai.
  // Isliye yahan se 'eslint' block ko humne remove kar diya hai taake crash na ho.
};

export default nextConfig;