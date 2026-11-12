import Lenis from "lenis";
import { createContext, useContext, useEffect, useRef, useState } from "react";

const LenisContext = createContext(null);

export function useLenis() {
  return useContext(LenisContext);
}

/**
 * Inertial smooth scrolling. Skipped entirely for people who prefer reduced
 * motion and on touch devices, where native scrolling already feels right.
 */
export function SmoothScroll({ children }) {
  const [lenis, setLenis] = useState(null);
  const frame = useRef(0);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    if (reduce || coarse) return undefined;

    const instance = new Lenis({ duration: 1.1, easing: (t) => 1 - Math.pow(1 - t, 4), wheelMultiplier: 0.95 });
    const raf = (time) => {
      instance.raf(time);
      frame.current = requestAnimationFrame(raf);
    };
    frame.current = requestAnimationFrame(raf);
    setLenis(instance);

    return () => {
      cancelAnimationFrame(frame.current);
      instance.destroy();
      setLenis(null);
    };
  }, []);

  return <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>;
}
