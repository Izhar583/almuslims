import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0A3A2F",         // Deep Green
        "primary-hover": "#145C47",  
        secondary: "#D48C46",       // Gold / Orange
        bg: "#FBF9F4",              // Light Background
      },
    },
  },
  plugins: [],
};
export default config;