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
        soft: "0 8px 30px rgba(15,23,42,0.06)",
        lift: "0 24px 50px rgba(15,23,42,0.14)",
      },
      transitionDuration: {
        400: "400ms",
      },
      backgroundImage: {
        "brand-gradient": "linear-gradient(135deg, #1d4ed8 0%, #2563eb 45%, #06b6d4 100%)",
      },
      borderRadius: {
        "2.5xl": "1.25rem",
        "3xl": "1.5rem",
      },
    },
  },
  plugins: [],
};
