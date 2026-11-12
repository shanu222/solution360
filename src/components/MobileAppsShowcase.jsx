import {
  AnimatePresence,
  motion,
  useAnimationFrame,
  useInView,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "framer-motion";
import { ArrowUpRight, ShieldCheck } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { FaApple, FaGooglePlay } from "react-icons/fa";
import { Link } from "react-router-dom";
import { RELEASE, appsByRelease, mobileApps } from "../data/mobileApps";
import { Reveal, easeOut } from "./motion/primitives";

const CYCLE_MS = 6500;

function AppIcon({ app, size = 40 }) {
  if (app.icon) {
    return (
      <img
        src={app.icon}
        alt=""
        width={size}
        height={size}
        loading="lazy"
        decoding="async"
        className="shrink-0 rounded-[22%] shadow-[0_0_0_1px_rgba(12,30,54,0.08)] dark:shadow-[0_0_0_1px_rgba(255,255,255,0.1)]"
        style={{ width: size, height: size }}
      />
    );
  }
  return (
    <span
      className="inline-flex shrink-0 items-center justify-center rounded-[22%] text-white"
      style={{ width: size, height: size, background: `linear-gradient(160deg, ${app.tint}, #0c1e36)` }}
      aria-hidden="true"
    >
      <ShieldCheck size={size * 0.5} strokeWidth={1.8} />
    </span>
  );
}

/* Three phones fanned out; the stage tilts slightly toward the pointer. */
function PhoneStage({ app }) {
  const reduce = useReducedMotion();
  const rx = useSpring(0, { stiffness: 90, damping: 16 });
  const ry = useSpring(0, { stiffness: 90, damping: 16 });

  const onMove = (event) => {
    if (reduce || event.pointerType !== "mouse") return;
    const rect = event.currentTarget.getBoundingClientRect();
    ry.set(((event.clientX - rect.left) / rect.width - 0.5) * 10);
    rx.set(((event.clientY - rect.top) / rect.height - 0.5) * -8);
  };
  const onLeave = () => {
    rx.set(0);
    ry.set(0);
  };

  const [front, left, right] = [app.screens[0], app.screens[1], app.screens[2] ?? app.screens[1]];
  const phones = [
    { src: left, pos: "left", x: "-58%", rotate: -9, scale: 0.84, z: 10, delay: 0.08 },
    { src: right, pos: "right", x: "58%", rotate: 9, scale: 0.84, z: 10, delay: 0.14 },
    { src: front, pos: "front", x: "0%", rotate: 0, scale: 1, z: 20, delay: 0 },
  ];

  return (
    <div onPointerMove={onMove} onPointerLeave={onLeave} className="relative flex h-[440px] items-center justify-center [perspective:1400px] sm:h-[520px]">
      {/* tint wash that follows the selected app's brand colour */}
      <motion.div
        aria-hidden="true"
        className="absolute left-1/2 top-1/2 h-[78%] w-[78%] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-40 blur-3xl dark:opacity-30"
        animate={{ backgroundColor: app.tint }}
        transition={{ duration: 0.9, ease: easeOut }}
      />
      <motion.div style={{ rotateX: rx, rotateY: ry }} className="relative h-full w-full [transform-style:preserve-3d]">
        <AnimatePresence mode="popLayout" initial={false}>
          {phones.map((phone) => (
            <motion.img
              key={`${app.id}-${phone.pos}`}
              src={phone.src}
              alt={phone.pos === "front" ? `${app.name} app screen` : ""}
              width="227"
              height="457"
              decoding="async"
              draggable="false"
              className="absolute inset-0 m-auto h-auto w-[188px] select-none drop-shadow-[0_30px_40px_rgba(12,30,54,0.35)] sm:w-[226px]"
              style={{ zIndex: phone.z }}
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: 90, x: phone.x, rotate: phone.rotate * 1.6, scale: phone.scale * 0.9 }}
              animate={{ opacity: 1, y: 0, x: phone.x, rotate: phone.rotate, scale: phone.scale }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, y: -50, scale: phone.scale * 0.94, transition: { duration: 0.35, ease: [0.4, 0, 1, 1] } }}
              transition={{ type: "spring", stiffness: 120, damping: 18, mass: 0.9, delay: phone.delay }}
            />
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

function wrap(min, max, value) {
  const range = max - min;
  return ((((value - min) % range) + range) % range) + min;
}

/* Continuous strip of every screen in the tab. Scrolling the page speeds it up and leans it. */
function ScreenStrip({ apps, onPick }) {
  const reduce = useReducedMotion();
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const velocity = useSpring(useVelocity(scrollY), { damping: 50, stiffness: 400 });
  const boost = useTransform(velocity, [-1500, 0, 1500], [-4, 0, 4], { clamp: false });
  const skew = useTransform(velocity, [-2000, 0, 2000], [4, 0, -4]);
  const x = useTransform(baseX, (v) => `${wrap(-50, 0, v)}%`);
  const direction = useRef(1);
  const hovering = useRef(false);

  useAnimationFrame((_, delta) => {
    if (reduce) return;
    const b = boost.get();
    if (b < 0) direction.current = -1;
    else if (b > 0) direction.current = 1;
    const speed = hovering.current ? 0.15 : 1;
    baseX.set(baseX.get() - direction.current * speed * (1 + Math.abs(b)) * 0.012 * (delta / 16));
  });

  const items = useMemo(() => apps.flatMap((app) => app.screens.map((src, i) => ({ app, src, key: `${app.id}-${i}` }))), [apps]);

  return (
    <div
      className="fade-x overflow-hidden py-6"
      onPointerEnter={() => (hovering.current = true)}
      onPointerLeave={() => (hovering.current = false)}
    >
      <motion.div style={{ x, skewX: skew }} className={`flex w-max ${reduce ? "flex-wrap justify-center" : ""}`}>
        {[0, 1].map((copy) => (
          <div key={copy} className="flex shrink-0 gap-5 pr-5" aria-hidden={copy === 1 || undefined}>
            {items.map((item) => (
              <button
                key={`${copy}-${item.key}`}
                type="button"
                tabIndex={copy === 1 ? -1 : 0}
                onClick={() => onPick(item.app.id)}
                className="group/screen relative shrink-0"
                aria-label={`Show ${item.app.name}`}
              >
                <img
                  src={item.src}
                  alt=""
                  width="227"
                  height="457"
                  loading="lazy"
                  decoding="async"
                  draggable="false"
                  className="w-[112px] select-none transition-transform duration-500 ease-out group-hover/screen:-translate-y-2 sm:w-[128px]"
                />
              </button>
            ))}
          </div>
        ))}
      </motion.div>
    </div>
  );
}

function StoreLinks({ app }) {
  if (app.release === "testing") {
    return (
      <Link to="/contact" className="inline-flex items-center gap-1.5 text-[14.5px] font-medium text-slate-900 dark:text-white">
        <span className="link-slide">Request early access</span>
        <ArrowUpRight size={15} className="text-brand-500 dark:text-brand-300" />
      </Link>
    );
  }
  return (
    <div className="flex flex-wrap gap-2">
      {app.links.android && (
        <a
          href={app.links.android}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-4 py-2 text-[13.5px] font-medium text-white transition-transform active:scale-[0.97] dark:bg-white dark:text-slate-900"
        >
          <FaGooglePlay size={13} />
          Google Play
        </a>
      )}
      {app.links.ios && (
        <a
          href={app.links.ios}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-slate-900/15 px-4 py-2 text-[13.5px] font-medium text-slate-900 transition-colors hover:border-slate-900/40 dark:border-white/20 dark:text-white dark:hover:border-white/50"
        >
          <FaApple size={14} />
          App Store
        </a>
      )}
      {app.links.web && (
        <a
          href={app.links.web}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 rounded-full border border-slate-900/15 px-4 py-2 text-[13.5px] font-medium text-slate-900 transition-colors hover:border-slate-900/40 dark:border-white/20 dark:text-white dark:hover:border-white/50"
        >
          Web app
          <ArrowUpRight size={14} />
        </a>
      )}
    </div>
  );
}

function MobileAppsShowcase({ heading = true }) {
  const reduce = useReducedMotion();
  const [release, setRelease] = useState("published");
  const apps = useMemo(() => appsByRelease(release), [release]);
  const [activeId, setActiveId] = useState(apps[0].id);
  const [paused, setPaused] = useState(false);
  const stageRef = useRef(null);
  const inView = useInView(stageRef, { amount: 0.35 });
  const active = apps.find((app) => app.id === activeId) ?? apps[0];

  const switchRelease = (next) => {
    if (next === release) return;
    setRelease(next);
    setActiveId(appsByRelease(next)[0].id);
  };

  const pick = useCallback((id) => {
    const app = mobileApps.find((a) => a.id === id);
    if (!app) return;
    setRelease(app.release);
    setActiveId(id);
  }, []);

  const advance = () => {
    const index = apps.findIndex((app) => app.id === active.id);
    setActiveId(apps[(index + 1) % apps.length].id);
  };

  // Preload the next app's screens so the swap never shows a blank phone.
  useEffect(() => {
    const index = apps.findIndex((app) => app.id === active.id);
    apps[(index + 1) % apps.length].screens.slice(0, 3).forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, [apps, active.id]);

  const running = !reduce && !paused && inView;

  return (
    <section id="mobile-apps" className="scroll-mt-24">
      <div className="px-5 sm:px-6">
        <div className="mx-auto w-full max-w-7xl">
          {heading && (
            <Reveal className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <div>
                <h2 className="text-sm text-slate-500 dark:text-slate-400">Mobile apps</h2>
                <p className="mt-3 max-w-[18ch] text-[clamp(30px,4vw,52px)] font-semibold leading-[1.02] tracking-[-0.03em] text-slate-900 dark:text-white">
                  Shipped to Google Play, and what comes next
                </p>
              </div>
              <div className="max-w-[44ch]">
                <p className="text-[15.5px] leading-relaxed text-slate-600 dark:text-slate-300">
                  Every app here is designed, built and released by our own team. Published apps are live in production; the rest are with testers on Google Play.
                </p>
                <Link to="/products#mobile-apps" className="link-slide mt-3 inline-block text-[15px] font-medium text-brand-600 dark:text-brand-300">
                  See every screen
                </Link>
              </div>
            </Reveal>
          )}

          <div role="tablist" aria-label="Release stage" className="mt-10 inline-flex rounded-full border border-slate-900/10 bg-white p-1 dark:border-white/10 dark:bg-[#0f2440]">
            {Object.values(RELEASE).map((stage) => {
              const selected = stage.id === release;
              return (
                <button
                  key={stage.id}
                  role="tab"
                  type="button"
                  aria-selected={selected}
                  aria-controls="mobile-apps-panel"
                  onClick={() => switchRelease(stage.id)}
                  className={`relative isolate inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-colors duration-300 ${
                    selected ? "text-white dark:text-slate-900" : "text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                  }`}
                >
                  {selected && (
                    <motion.span layoutId="release-pill" className="absolute inset-0 -z-10 rounded-full bg-slate-900 dark:bg-white" transition={{ type: "spring", stiffness: 400, damping: 34 }} />
                  )}
                  <span className={`h-1.5 w-1.5 rounded-full ${stage.id === "published" ? "bg-emerald-500" : "bg-amber-400"}`} />
                  {stage.label}
                  <span className="tabular opacity-60">{appsByRelease(stage.id).length}</span>
                </button>
              );
            })}
          </div>

          <div id="mobile-apps-panel" role="tabpanel" className="mt-8 grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-8">
            {/* App list */}
            <ul
              className="border-t border-slate-900/10 dark:border-white/10 lg:col-span-5"
              onPointerEnter={() => setPaused(true)}
              onPointerLeave={() => setPaused(false)}
              onFocus={() => setPaused(true)}
              onBlur={() => setPaused(false)}
            >
              <AnimatePresence mode="popLayout" initial={false}>
                {apps.map((app, index) => {
                  const open = app.id === active.id;
                  return (
                    <motion.li
                      key={app.id}
                      layout
                      initial={{ opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8, transition: { duration: 0.2 } }}
                      transition={{ duration: 0.5, ease: easeOut, delay: index * 0.04 }}
                      className="relative border-b border-slate-900/10 dark:border-white/10"
                    >
                      <button
                        type="button"
                        onClick={() => setActiveId(app.id)}
                        aria-expanded={open}
                        className="flex w-full items-center gap-4 py-4 text-left"
                      >
                        <AppIcon app={app} size={40} />
                        <span className="min-w-0 flex-1">
                          <span className={`block text-[17px] font-semibold tracking-[-0.01em] transition-colors duration-300 ${open ? "text-slate-900 dark:text-white" : "text-slate-500 dark:text-slate-400"}`}>
                            {app.name}
                          </span>
                          <span className="block text-[13px] text-slate-500 dark:text-slate-400">{app.category}</span>
                        </span>
                        <span className="text-xs text-slate-400 dark:text-slate-500">{RELEASE[app.release].note}</span>
                      </button>

                      <motion.div
                        initial={false}
                        animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
                        transition={{ duration: 0.45, ease: easeOut }}
                        className="overflow-hidden"
                      >
                        <div className="pb-5 pl-14">
                          <p className="max-w-[46ch] text-[15px] leading-relaxed text-slate-600 dark:text-slate-300">{app.summary}</p>
                          <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-[13.5px] text-slate-700 dark:text-slate-200">
                            {app.highlights.map((item) => (
                              <li key={item} className="inline-flex items-center gap-1.5">
                                <span className="h-1 w-1 rounded-full" style={{ background: app.tint }} />
                                {item}
                              </li>
                            ))}
                          </ul>
                          <div className="mt-4">
                            <StoreLinks app={app} />
                          </div>
                        </div>
                      </motion.div>

                      {/* Auto-advance timer */}
                      {open && apps.length > 1 && (
                        <span
                          key={`${app.id}-${release}`}
                          aria-hidden="true"
                          onAnimationEnd={advance}
                          className="absolute bottom-[-1px] left-0 h-px w-full origin-left bg-slate-900 dark:bg-white"
                          style={{
                            animation: reduce ? "none" : `showcase-progress ${CYCLE_MS}ms linear forwards`,
                            animationPlayState: running ? "running" : "paused",
                            transform: reduce ? "scaleX(0)" : undefined,
                          }}
                        />
                      )}
                    </motion.li>
                  );
                })}
              </AnimatePresence>
            </ul>

            <div ref={stageRef} className="lg:col-span-7">
              <PhoneStage app={active} />
            </div>
          </div>
        </div>
      </div>

      <ScreenStrip apps={apps} onPick={pick} />
    </section>
  );
}

export default MobileAppsShowcase;
