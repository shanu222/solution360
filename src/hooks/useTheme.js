import { useEffect, useState } from "react";

// Only an explicit choice from the theme toggle is stored. The previous key
// ("theme") was written on every visit, so it cannot tell a real preference
// from the old dark default and is ignored.
export const THEME_STORAGE_KEY = "rtl-theme";
const DEFAULT_THEME = "light";
const THEME_COLORS = { light: "#f4f7fa", dark: "#0c1e36" };

function getInitialTheme() {
  if (typeof window === "undefined") return DEFAULT_THEME;
  try {
    const savedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);
    if (savedTheme === "dark" || savedTheme === "light") {
      return savedTheme;
    }
  } catch {
    /* ignore storage access errors */
  }
  return DEFAULT_THEME;
}

function useTheme() {
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", theme === "dark");
    root.style.colorScheme = theme;
    document.querySelector('meta[name="theme-color"]')?.setAttribute("content", THEME_COLORS[theme]);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => {
      const next = prevTheme === "dark" ? "light" : "dark";
      try {
        window.localStorage.setItem(THEME_STORAGE_KEY, next);
      } catch {
        /* ignore storage access errors */
      }
      return next;
    });
  };

  return { theme, toggleTheme };
}

export default useTheme;
