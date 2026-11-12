import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import ContourField from "./motion/ContourField";
import { Magnetic, RevealText, easeOut } from "./motion/primitives";

const trustStats = [
  { title: "10+ projects", subtitle: "Climate and sustainability initiatives" },
  { title: "AI powered", subtitle: "Smart decision workflows" },
  { title: "Enterprise ready", subtitle: "Secure, scalable architecture" },
];

const baseIndicators = [
  {
    title: "Energy Shortfall",
    value: "4,500 MW",
    status: "Critical",
    trend: "+8%",
    source: "NTDC",
    updated: "10 min ago",
  },
  {
    title: "Renewable Energy Share",
    value: "12%",
    status: "Low",
    trend: "+1.2%",
    source: "NEPRA",
    updated: "12 min ago",
  },
  {
    title: "Air Quality Index (Lahore)",
    value: "185",
    status: "Unhealthy",
    trend: "+3%",
    source: "OpenAQ",
    updated: "8 min ago",
  },
  {
    title: "Maternal Health Index",
    value: "58/100",
    status: "Needs Improvement",
    trend: "+0.6%",
    source: "WHO",
    updated: "15 min ago",
  },
  {
    title: "Female Literacy Rate",
    value: "48%",
    status: "Low",
    trend: "+0.4%",
    source: "UNESCO",
    updated: "20 min ago",
  },
  {
    title: "Climate Risk Index",
    value: "High",
    status: "Critical",
    trend: "Increasing",
    source: "NDMA",
    updated: "6 min ago",
  },
];

const chartBase = {
  aqi: [160, 168, 172, 178, 185, 180, 176],
  demand: [22200, 22750, 23100, 23620, 24100, 23800, 23550],
  temp: [33.2, 34.1, 35.0, 36.2, 37.0, 36.5, 35.8],
};

const series = [
  { key: "aqi", label: "AQI", color: "#F2994A", min: 150, max: 205 },
  { key: "demand", label: "Energy demand", color: "#5C8BFF", min: 21800, max: 24900 },
  { key: "temp", label: "Temperature", color: "#2FC9A9", min: 32, max: 38.5 },
];

const statusTone = (status) => {
  if (status === "Critical" || status === "Unhealthy") return "bg-rose-500";
  if (status === "Low" || status === "Needs Improvement") return "bg-amber-400";
  return "bg-emerald-500";
};

/** Smooth line through points (Catmull-Rom converted to cubic Béziers). */
function smoothPath(points) {
  return points.reduce((d, [x, y], i, arr) => {
    if (i === 0) return `M${x},${y}`;
    const [x0, y0] = arr[i - 2] || arr[i - 1];
    const [x1, y1] = arr[i - 1];
    const [x3, y3] = arr[i + 1] || [x, y];
    const c1 = [x1 + (x - x0) / 6, y1 + (y - y0) / 6];
    const c2 = [x - (x3 - x1) / 6, y - (y3 - y1) / 6];
    return `${d} C${c1[0].toFixed(1)},${c1[1].toFixed(1)} ${c2[0].toFixed(1)},${c2[1].toFixed(1)} ${x.toFixed(1)},${y.toFixed(1)}`;
  }, "");
}

function TrendChart({ data }) {
  const width = 320;
  const height = 96;
  const toPoints = ({ key, min, max }) =>
    data[key].map((value, i) => [8 + (i * (width - 16)) / (data[key].length - 1), height - 8 - ((value - min) / (max - min)) * (height - 20)]);

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="h-24 w-full overflow-visible" role="img" aria-label="Seven-point trend of air quality, energy demand and temperature">
      {[0.25, 0.5, 0.75].map((f) => (
        <line key={f} x1="0" x2={width} y1={height * f} y2={height * f} stroke="currentColor" strokeOpacity="0.08" strokeDasharray="2 4" />
      ))}
      {series.map((s, i) => {
        const pts = toPoints(s);
        const last = pts[pts.length - 1];
        return (
          <g key={s.key}>
            <motion.path
              initial={{ pathLength: 0, d: smoothPath(pts) }}
              animate={{ d: smoothPath(pts), pathLength: 1 }}
              transition={{ pathLength: { duration: 1.4, ease: easeOut, delay: 1 + i * 0.15 }, d: { duration: 0.8, ease: easeOut } }}
              fill="none"
              stroke={s.color}
              strokeWidth="2"
              strokeLinecap="round"
            />
            <motion.circle initial={{ cx: last[0], cy: last[1] }} animate={{ cx: last[0], cy: last[1] }} transition={{ duration: 0.8, ease: easeOut }} r="3" fill={s.color} />
          </g>
        );
      })}
    </svg>
  );
}

function Hero({ onNavigate }) {
  const [indicators, setIndicators] = useState(baseIndicators);
  const [chartData, setChartData] = useState(chartBase);
  const sectionRef = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const panelY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -60]);
  const mapScale = useTransform(scrollYProgress, [0, 1], [1, reduce ? 1 : 1.12]);
  const mapOpacity = useTransform(scrollYProgress, [0, 0.9], [1, 0.25]);
  const heroTitle = "Engineering AI for climate, infrastructure and national resilience";

  useEffect(() => {
    const interval = window.setInterval(() => {
      setIndicators((prev) =>
        prev.map((item) => {
          if (item.title === "Energy Shortfall") {
            const next = 4300 + Math.floor(Math.random() * 500);
            return { ...item, value: `${next.toLocaleString()} MW`, trend: `${next > 4500 ? "+" : "-"}${Math.abs(((next - 4500) / 4500) * 100).toFixed(1)}%`, updated: "Just now" };
          }
          if (item.title === "Renewable Energy Share") {
            const next = 11 + Math.random() * 2.4;
            return { ...item, value: `${next.toFixed(1)}%`, trend: `+${(Math.random() * 1.4).toFixed(1)}%`, updated: "Just now" };
          }
          if (item.title === "Air Quality Index (Lahore)") {
            const next = 170 + Math.floor(Math.random() * 30);
            return { ...item, value: `${next}`, trend: `${next > 185 ? "+" : "-"}${Math.abs(next - 185)}`, updated: "Just now" };
          }
          return item;
        })
      );

      setChartData((prev) => {
        const nAqi = [...prev.aqi.slice(1), 170 + Math.floor(Math.random() * 25)];
        const nDemand = [...prev.demand.slice(1), 23000 + Math.floor(Math.random() * 1700)];
        const nTemp = [...prev.temp.slice(1), Number((34.5 + Math.random() * 3.2).toFixed(1))];
        return { aqi: nAqi, demand: nDemand, temp: nTemp };
      });
    }, 5000);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <section ref={sectionRef} id="top" className="relative isolate -mt-20 overflow-hidden pt-28 sm:pt-32">
      <motion.div style={{ scale: mapScale, opacity: mapOpacity }} className="absolute inset-0 -z-10">
        <ContourField draw interactive />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-[var(--page)]" />
      </motion.div>

      <div className="mx-auto grid w-full max-w-[83rem] gap-14 px-5 pb-16 sm:px-6 lg:grid-cols-12 lg:items-center lg:gap-10 lg:pb-24">
        <div className="lg:col-span-7">
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: easeOut, delay: 0.1 }}
            className="inline-flex items-center gap-2.5 text-sm text-slate-600 dark:text-slate-300"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-signal-400 opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-signal-500" />
            </span>
            AI-powered sustainability intelligence, built at NSTP Islamabad
          </motion.p>

          <RevealText
            text={heroTitle}
            delay={0.2}
            className="mt-6 max-w-[15ch] text-[clamp(40px,6.4vw,84px)] font-semibold leading-[0.98] tracking-[-0.035em] text-slate-900 dark:text-white"
          />

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: easeOut, delay: 0.75 }}
            className="mt-7 max-w-[54ch] text-[clamp(16px,1.5vw,19px)] leading-relaxed text-slate-600 dark:text-slate-300"
          >
            We build platforms that help governments, enterprises, humanitarian organisations and communities see risk earlier and act on it: disaster resilience,
            infrastructure intelligence, sustainability, education and digital transformation.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: easeOut, delay: 0.9 }}
            className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <Magnetic>
              <button
                type="button"
                onClick={() => onNavigate("/products")}
                className="btn-premium inline-flex h-12 w-full items-center justify-center rounded-full bg-brand-gradient px-7 font-medium text-white shadow-glow transition-transform active:scale-[0.97] sm:w-auto"
              >
                Explore products
              </button>
            </Magnetic>
            <button
              type="button"
              onClick={() => onNavigate("/contact")}
              className="inline-flex h-12 items-center justify-center rounded-full border border-slate-900/15 px-7 font-medium text-slate-800 transition-colors duration-300 hover:border-slate-900/40 hover:bg-slate-900/[0.03] dark:border-white/20 dark:text-white dark:hover:border-white/50 dark:hover:bg-white/[0.04]"
            >
              Talk to the team
            </button>
          </motion.div>
        </div>

        {/* Instrument panel */}
        <motion.div style={{ y: panelY }} className="[perspective:1200px] lg:col-span-5">
          <motion.div
            initial={{ opacity: 0, y: 40, rotateX: 8 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ duration: 1.1, ease: easeOut, delay: 0.55 }}
            className="rounded-[22px] border border-slate-900/10 bg-white/85 p-1.5 shadow-lift backdrop-blur-xl dark:border-white/10 dark:bg-[#0f2440]/80 dark:shadow-[0_30px_80px_-30px_rgba(0,0,0,0.7)]">
            <div className="rounded-[17px] border border-slate-900/[0.06] bg-white p-5 dark:border-white/[0.06] dark:bg-[#11294a]">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-[15px] font-semibold text-slate-900 dark:text-white">National indicators, Pakistan</h2>
                  <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">Climate and infrastructure intelligence dashboard</p>
                </div>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-signal-500/10 px-2.5 py-1 text-[11px] font-medium text-signal-700 dark:text-signal-300">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-signal-500" />
                  Live
                </span>
              </div>

              <div className="mt-4 rounded-xl bg-slate-50 px-3 pb-2 pt-3 text-slate-900 dark:bg-white/[0.03] dark:text-white">
                <TrendChart data={chartData} />
                <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-slate-500 dark:text-slate-400">
                  {series.map((s) => (
                    <span key={s.key} className="inline-flex items-center gap-1.5">
                      <span className="h-0.5 w-3 rounded-full" style={{ background: s.color }} />
                      {s.label}
                    </span>
                  ))}
                </div>
              </div>

              <dl className="mt-3 grid grid-cols-2 gap-px overflow-hidden rounded-xl bg-slate-900/[0.07] dark:bg-white/[0.07]">
                {indicators.map((item, index) => {
                  const isPositiveTrend = item.trend?.startsWith("+");
                  return (
                    <motion.div
                      key={item.title}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5, delay: 1.1 + index * 0.06 }}
                      className="bg-white p-3 dark:bg-[#11294a]"
                    >
                      <dt className="flex items-center gap-1.5 text-[11.5px] leading-tight text-slate-500 dark:text-slate-400">
                        <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${statusTone(item.status)}`} title={item.status} />
                        <span className="truncate">{item.title}</span>
                      </dt>
                      <dd className="mt-1.5 flex flex-wrap items-baseline gap-x-2">
                        <span className="relative inline-block h-6 overflow-hidden whitespace-nowrap">
                          <AnimatePresence mode="popLayout" initial={false}>
                            <motion.span
                              key={item.value}
                              initial={{ y: "100%", opacity: 0 }}
                              animate={{ y: "0%", opacity: 1 }}
                              exit={{ y: "-100%", opacity: 0 }}
                              transition={{ duration: 0.45, ease: easeOut }}
                              className="tabular block whitespace-nowrap text-[17px] font-semibold leading-6 text-slate-900 dark:text-white"
                            >
                              {item.value}
                            </motion.span>
                          </AnimatePresence>
                        </span>
                        {item.trend && (
                          <span className={`tabular text-[11px] font-medium ${isPositiveTrend ? "text-emerald-600 dark:text-emerald-400" : "text-amber-600 dark:text-amber-300"}`}>
                            {isPositiveTrend ? "↑" : "↓"} {item.trend}
                          </span>
                        )}
                      </dd>
                      <dd className="mt-1 text-[10.5px] text-slate-400 dark:text-slate-500">
                        {item.status}, {item.source}, {item.updated.toLowerCase()}
                      </dd>
                    </motion.div>
                  );
                })}
              </dl>
              <p className="mt-3 text-[11px] text-slate-400 dark:text-slate-500">Data aggregated from public sources. Updated periodically.</p>
            </div>
          </motion.div>
        </motion.div>
      </div>

      <div className="mx-auto w-full max-w-[83rem] px-5 sm:px-6">
        <motion.ul
          initial="hidden"
          animate="show"
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08, delayChildren: 1.1 } } }}
          className="grid grid-cols-1 border-t border-slate-900/10 dark:border-white/10 sm:grid-cols-3"
        >
          {trustStats.map((item) => (
            <motion.li
              key={item.title}
              variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easeOut } } }}
              className="border-b border-slate-900/10 py-5 dark:border-white/10 sm:border-b-0 sm:border-r sm:px-6 sm:first:pl-0 sm:last:border-r-0"
            >
              <p className="font-medium text-slate-900 dark:text-white">{item.title}</p>
              <p className="mt-0.5 text-sm text-slate-500 dark:text-slate-400">{item.subtitle}</p>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}

export default Hero;
