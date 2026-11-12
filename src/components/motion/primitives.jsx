import { animate, motion, useInView, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";

export const easeOut = [0.22, 1, 0.36, 1];

/**
 * Headline that rises word by word out of a mask. Words wrap naturally,
 * so the effect holds at every viewport width.
 */
export function RevealText({ text, as: Tag = "h1", className = "", delay = 0, stagger = 0.045, inView = false }) {
  const reduce = useReducedMotion();
  const ref = useRef(null);
  const seen = useInView(ref, { once: true, amount: 0.4 });
  const play = inView ? seen : true;
  const words = text.split(" ");

  return (
    <Tag ref={ref} className={className} aria-label={text}>
      {words.map((word, index) => (
        <span key={`${word}-${index}`} aria-hidden="true" className="inline-block overflow-hidden pb-[0.08em] align-top -mb-[0.08em]">
          <motion.span
            className="inline-block will-change-transform"
            initial={reduce ? false : { y: "105%" }}
            animate={play ? { y: "0%" } : undefined}
            transition={{ duration: 0.9, ease: easeOut, delay: delay + index * stagger }}
          >
            {word}
          </motion.span>
          {index < words.length - 1 && " "}
        </span>
      ))}
    </Tag>
  );
}

/** Fades content up once as it scrolls into view. Used for section openings only. */
export function Reveal({ children, delay = 0, y = 24, className = "", as = "div" }) {
  const reduce = useReducedMotion();
  const Component = motion[as];
  return (
    <Component
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.8, ease: easeOut, delay }}
    >
      {children}
    </Component>
  );
}

/** Pulls its child a few pixels toward the pointer. Mouse only. */
export function Magnetic({ children, strength = 0.28, className = "" }) {
  const reduce = useReducedMotion();
  const ref = useRef(null);
  const x = useSpring(0, { stiffness: 220, damping: 16, mass: 0.4 });
  const y = useSpring(0, { stiffness: 220, damping: 16, mass: 0.4 });

  const onMove = (event) => {
    if (reduce || event.pointerType !== "mouse" || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((event.clientX - rect.left - rect.width / 2) * strength);
    y.set((event.clientY - rect.top - rect.height / 2) * strength);
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.span ref={ref} onPointerMove={onMove} onPointerLeave={reset} style={{ x, y }} className={`inline-flex ${className}`}>
      {children}
    </motion.span>
  );
}

/** Counts up to `value` the first time it is seen. */
export function CountUp({ value, suffix = "", duration = 1.6, className = "" }) {
  const reduce = useReducedMotion();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const [display, setDisplay] = useState(reduce ? value : 0);

  useEffect(() => {
    if (!inView || reduce) return undefined;
    const controls = animate(0, value, {
      duration,
      ease: easeOut,
      onUpdate: (latest) => setDisplay(Math.round(latest)),
    });
    return () => controls.stop();
  }, [inView, reduce, value, duration]);

  return (
    <span ref={ref} className={`tabular ${className}`}>
      {display}
      {suffix}
    </span>
  );
}

/** Endless horizontal ticker. Pauses on hover; static for reduced motion. */
export function Marquee({ children, className = "" }) {
  return (
    <div className={`fade-x group overflow-hidden ${className}`}>
      <div className="flex w-max animate-marquee group-hover:[animation-play-state:paused] motion-reduce:animate-none">
        <div className="flex shrink-0 items-center">{children}</div>
        <div className="flex shrink-0 items-center" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
}

/** Pointer position as CSS variables for the `.spotlight` hover light. */
export function useSpotlight() {
  return useCallback((event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty("--mx", `${event.clientX - rect.left}px`);
    event.currentTarget.style.setProperty("--my", `${event.clientY - rect.top}px`);
  }, []);
}

/**
 * Paragraph whose words brighten one after another as it scrolls through
 * the viewport, so the reader's eye is pulled along the sentence.
 */
export function ScrollHighlight({ text, className = "" }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "end 45%"] });
  const words = text.split(" ");

  if (reduce) return <p className={className}>{text}</p>;

  return (
    <p ref={ref} className={`relative ${className}`} aria-label={text}>
      {words.map((word, index) => (
        <HighlightWord key={`${word}-${index}`} progress={scrollYProgress} range={[index / words.length, (index + 1) / words.length]}>
          {word}
        </HighlightWord>
      ))}
    </p>
  );
}

function HighlightWord({ children, progress, range }) {
  const opacity = useTransform(progress, range, [0.18, 1]);
  return (
    <motion.span aria-hidden="true" style={{ opacity }} className="inline">
      {children}{" "}
    </motion.span>
  );
}
