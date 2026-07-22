import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "rtl-portfolio-prefs-v1";

const defaultPrefs = {
  favorites: [],
  pinned: [],
  recent: [],
};

function readPrefs() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { ...defaultPrefs };
    return { ...defaultPrefs, ...JSON.parse(raw) };
  } catch {
    return { ...defaultPrefs };
  }
}

export default function usePortfolioPrefs() {
  const [prefs, setPrefs] = useState(defaultPrefs);

  useEffect(() => {
    setPrefs(readPrefs());
  }, []);

  const persist = useCallback((next) => {
    setPrefs(next);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      /* ignore quota */
    }
  }, []);

  const toggleFavorite = useCallback(
    (id) => {
      persist({
        ...prefs,
        favorites: prefs.favorites.includes(id) ? prefs.favorites.filter((x) => x !== id) : [...prefs.favorites, id],
      });
    },
    [prefs, persist]
  );

  const togglePin = useCallback(
    (id) => {
      persist({
        ...prefs,
        pinned: prefs.pinned.includes(id) ? prefs.pinned.filter((x) => x !== id) : [...prefs.pinned, id],
      });
    },
    [prefs, persist]
  );

  const pushRecent = useCallback(
    (entry) => {
      const filtered = prefs.recent.filter((r) => r.id !== entry.id);
      persist({
        ...prefs,
        recent: [{ ...entry, at: Date.now() }, ...filtered].slice(0, 8),
      });
    },
    [prefs, persist]
  );

  return { prefs, toggleFavorite, togglePin, pushRecent };
}
