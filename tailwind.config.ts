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
        primary: "#0A3A2F",
        primaryHover: "#145047",
        secondary: "#D48C46",
        background: "#FBF9F4",
        card: "#FFFFFF",
      },
      fontFamily: {
        heading: ["Playfair Display", "serif"],
        body: ["Plus Jakarta Sans", "sans-serif"],
        arabic: ["Noto Naskh Arabic", "serif"],
        urdu: ["Noto Nastaliq Urdu", "serif"],
      },
    },
  },
  plugins: [],
};
export default config;