/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      colors: {
        brand: {
          500: "#2563eb",
          600: "#1d4ed8",
        },
        accent: "#67e8f9",
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(103,232,249,0.2), 0 20px 40px rgba(29,78,216,0.2)",
      },
      backgroundImage: {
        "brand-gradient": "linear-gradient(135deg, #1d4ed8 0%, #2563eb 45%, #06b6d4 100%)",
      },
    },
  },
  plugins: [],
};
