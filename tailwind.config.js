/** @type {import('tailwindcss').Config} */

// Palette is taken from the RTL logo: survey-map navy, the logo's royal blue,
// and the teal at the end of its ring. `slate` and `cyan` are remapped so every
// component (including ones not rewritten) picks up the same system.
const ink = {
  50: "#F4F7FA",
  100: "#E9EEF4",
  200: "#D6DFE9",
  300: "#B5C3D3",
  400: "#8A9DB3",
  500: "#64788F",
  600: "#4A5D74",
  700: "#2A3F5C",
  800: "#142B49",
  900: "#0F2440",
  950: "#0A1A2F",
};

const signal = {
  50: "#E8FBF7",
  100: "#C9F4EA",
  200: "#9BE9D7",
  300: "#5FD9BF",
  400: "#2FC9A9",
  500: "#19B394",
  600: "#0F9479",
  700: "#0D7764",
  800: "#0F5E50",
  900: "#0E4D43",
  950: "#062E28",
};

export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Schibsted Grotesk Variable"', "ui-sans-serif", "system-ui", "sans-serif"],
      },
      colors: {
        slate: ink,
        cyan: signal,
        ink: { DEFAULT: "#0C1E36", ...ink },
        signal,
        brand: {
          300: "#8FB0FF",
          400: "#5C8BFF",
          500: "#2F6BFF",
          600: "#2457E0",
          700: "#1D46B5",
        },
        accent: signal[300],
      },
      boxShadow: {
        glow: "0 1px 0 rgba(255,255,255,0.18) inset, 0 8px 24px -10px rgba(47,107,255,0.65)",
        soft: "0 1px 2px rgba(12,30,54,0.06), 0 8px 24px -12px rgba(12,30,54,0.12)",
        lift: "0 2px 4px rgba(12,30,54,0.06), 0 24px 48px -20px rgba(12,30,54,0.28)",
      },
      transitionDuration: {
        400: "400ms",
      },
      transitionTimingFunction: {
        out: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
      backgroundImage: {
        "brand-gradient": "linear-gradient(180deg, #3B74FF 0%, #2457E0 100%)",
      },
      borderRadius: {
        "2.5xl": "1.25rem",
        "3xl": "1.5rem",
      },
      keyframes: {
        marquee: {
          from: { transform: "translate3d(0,0,0)" },
          to: { transform: "translate3d(-50%,0,0)" },
        },
        ping2: {
          "0%": { transform: "scale(1)", opacity: "0.55" },
          "80%, 100%": { transform: "scale(3.2)", opacity: "0" },
        },
      },
      animation: {
        marquee: "marquee 48s linear infinite",
        station: "ping2 2.8s cubic-bezier(0,0,0.2,1) infinite",
      },
    },
  },
  plugins: [],
};
