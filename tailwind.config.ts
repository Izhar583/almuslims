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
        logo: ["Cinzel", "Cormorant Garamond", "Playfair Display SC", "serif"],
        arabic: ["Amiri", "Traditional Arabic", "serif"],
        urdu: ["Jameel Noori Nastaleeq", "Jameel Noori Nastaleeq Regular", "Noto Nastaliq Urdu", "serif"],
      },
    },
  },
  plugins: [],
};
export default config;