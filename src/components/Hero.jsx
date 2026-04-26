import { motion, useScroll, useTransform } from "framer-motion";
import { Sparkles } from "lucide-react";
import { useEffect, useState } from "react";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.45, ease: "easeOut" },
};

const staggerContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const staggerItem = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0 },
};

const trustStats = [
  { title: "10+ Projects", subtitle: "Climate & sustainability initiatives" },
  { title: "AI Powered", subtitle: "Smart decision workflows" },
  { title: "Enterprise Ready", subtitle: "Secure and scalable architecture" },
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

function Hero({ onNavigate }) {
  const [heroMouse, setHeroMouse] = useState({ x: 0, y: 0 });
  const [indicators, setIndicators] = useState(baseIndicators);
  const [chartData, setChartData] = useState(chartBase);
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 400], [0, -30]);
  const heroParallaxX = useTransform(scrollY, [0, 600], [0, 8]);
  const heroTitle = "360° Technology for Climate, Energy & Resilience";

  const handleHeroMouseMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    setHeroMouse({ x, y });
  };

  useEffect(() => {
    const interval = window.setInterval(() => {
      setIndicators((prev) =>
        prev.map((item) => {
          if (item.title === "Energy Shortfall") {
            const next = 4300 + Math.floor(Math.random() * 500);
            return { ...item, value: `${next.toLocaleString()} MW`, trend: `${next > 4500 ? "+" : "-"}${Math.abs(((next - 4500) / 4500 * 100)).toFixed(1)}%`, updated: "Just now" };
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
    <section id="top" className="relative grid w-full items-center gap-12 overflow-hidden rounded-[28px] border border-slate-200 bg-gradient-to-br from-blue-50/90 via-white to-cyan-50/70 px-6 py-12 shadow-[0_10px_24px_rgba(148,163,184,0.16)] transition-colors duration-300 dark:border-white/10 dark:bg-gradient-to-br dark:from-slate-900 dark:via-slate-900 dark:to-slate-800 dark:shadow-none lg:grid-cols-2 lg:gap-16 lg:py-16">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(120deg,rgba(37,99,235,0.08),rgba(255,255,255,0))] transition-colors duration-300 dark:bg-[linear-gradient(120deg,rgba(59,130,246,0.12),rgba(15,23,42,0))]" />
      <motion.div {...fadeInUp} className="mx-auto max-w-2xl text-center lg:mx-0 lg:text-left">
        <p className="inline-flex items-center gap-2 rounded-full border border-cyan-300/50 bg-cyan-100/60 px-4 py-1 text-sm text-cyan-700 transition-colors duration-300 dark:border-cyan-300/30 dark:bg-cyan-300/10 dark:text-cyan-200">
          <Sparkles size={14} />
          AI-Powered Sustainability Intelligence
        </p>
        <h1 className="mt-5 text-[clamp(30px,5vw,50px)] font-bold leading-[1.16] tracking-tight text-slate-900 transition-colors duration-300 dark:text-white">
          {heroTitle}
        </h1>
        <p className="mt-4 max-w-xl text-[clamp(15px,1.8vw,18px)] leading-7 text-slate-600 transition-colors duration-300 dark:text-slate-300 lg:max-w-2xl">
          We build AI-powered platforms that transform climate and infrastructure data into actionable insights.
        </p>
        <div className="mt-8 grid grid-cols-1 gap-3 sm:inline-flex sm:flex-wrap">
          <button
            onClick={() => onNavigate("/products")}
            className="btn-premium inline-flex h-11 items-center justify-center rounded-xl bg-brand-gradient px-6 py-3 font-medium text-white shadow-sm transition-all duration-200 hover:scale-105"
          >
            Explore Products
          </button>
          <button
            onClick={() => onNavigate("/contact")}
            className="btn-premium inline-flex h-11 items-center justify-center rounded-xl border border-cyan-200 bg-white px-6 py-3 font-medium text-slate-700 transition-all duration-200 hover:scale-105 hover:border-cyan-400 hover:bg-cyan-50 dark:border-cyan-300/30 dark:bg-white/5 dark:text-slate-100 dark:hover:border-cyan-300/60 dark:hover:bg-cyan-300/10"
          >
            Contact Us
          </button>
        </div>
        <motion.div variants={staggerContainer} initial="hidden" animate="show" className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3">
          {trustStats.map((item) => (
            <motion.div key={item.title} variants={staggerItem} className="rounded-xl bg-white/70 p-3 text-left shadow-sm transition-colors duration-300 dark:bg-slate-800/60">
              <p className="text-sm font-semibold text-slate-800 transition-colors duration-300 dark:text-slate-100">{item.title}</p>
              <p className="mt-1 text-xs text-slate-600 transition-colors duration-300 dark:text-slate-300">{item.subtitle}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      <motion.div onMouseMove={handleHeroMouseMove} onMouseLeave={() => setHeroMouse({ x: 0, y: 0 })} style={{ y: heroY }} className="relative">
        <motion.div
          animate={{ y: [-8, 8, -8] }}
          transition={{ duration: 6, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          style={{ x: heroParallaxX, rotateY: heroMouse.x * 8, rotateX: heroMouse.y * -8, willChange: "transform" }}
          className="rounded-3xl border border-slate-200/80 bg-white/80 p-4 shadow-[0_14px_30px_rgba(148,163,184,0.2)] transition-colors duration-300 dark:border-slate-700 dark:bg-slate-900/50 dark:shadow-[0_14px_30px_rgba(2,6,23,0.35)]"
        >
          <div className="rounded-2xl border border-white/40 bg-gradient-to-br from-white/85 via-blue-50/80 to-cyan-100/70 p-4 shadow-[0_10px_35px_rgba(56,189,248,0.18)] transition-colors duration-300 dark:border-white/10 dark:from-slate-900/80 dark:via-slate-900/70 dark:to-cyan-950/30">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-100">Climate & Infrastructure Intelligence Dashboard</h3>
              <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-emerald-700 dark:bg-emerald-300/15 dark:text-emerald-200">
                Live
              </span>
            </div>
            <p className="mb-3 text-xs text-slate-500 dark:text-slate-400">Live National Indicators - Pakistan</p>

            <div className="grid grid-cols-2 gap-4">
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: "easeOut", delay: 0.08 }}
                className="col-span-2 rounded-xl border border-slate-200/70 bg-white/80 p-3 shadow-sm dark:border-slate-700/70 dark:bg-slate-800/70"
              >
                <p className="text-xs font-medium text-slate-600 dark:text-slate-300">Pakistan Climate & Energy Trend</p>
                <svg viewBox="0 0 300 100" className="mt-2 h-24 w-full">
                  <defs>
                    <linearGradient id="aqiStroke" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#ef4444" />
                      <stop offset="100%" stopColor="#f97316" />
                    </linearGradient>
                    <linearGradient id="demandStroke" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#2563eb" />
                      <stop offset="100%" stopColor="#06b6d4" />
                    </linearGradient>
                    <linearGradient id="tempStroke" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#22c55e" />
                      <stop offset="100%" stopColor="#14b8a6" />
                    </linearGradient>
                  </defs>
                  <polyline fill="none" stroke="rgba(148,163,184,0.35)" strokeWidth="1" points="0,90 300,90" />
                  <motion.polyline
                    fill="none"
                    stroke="url(#aqiStroke)"
                    strokeWidth="2.6"
                    strokeLinecap="round"
                    points={chartData.aqi.map((v, i) => `${10 + i * 46},${95 - (v - 150)}`).join(" ")}
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.9, ease: "easeInOut" }}
                  />
                  <motion.polyline
                    fill="none"
                    stroke="url(#demandStroke)"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                    points={chartData.demand.map((v, i) => `${10 + i * 46},${95 - ((v - 22000) / 80)}`).join(" ")}
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.95, ease: "easeInOut" }}
                  />
                  <motion.polyline
                    fill="none"
                    stroke="url(#tempStroke)"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    points={chartData.temp.map((v, i) => `${10 + i * 46},${95 - ((v - 32) * 11)}`).join(" ")}
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1, ease: "easeInOut" }}
                  />
                </svg>
                <div className="mt-2 flex flex-wrap gap-3 text-[10px] font-medium text-slate-500 dark:text-slate-400">
                  <span>AQI</span>
                  <span>Energy Demand</span>
                  <span>Temperature</span>
                </div>
              </motion.div>

              {indicators.map((item, index) => {
                const statusTone =
                  item.status === "Critical" || item.status === "Unhealthy"
                    ? "bg-rose-100 text-rose-700 dark:bg-rose-300/15 dark:text-rose-200"
                    : item.status === "Low" || item.status === "Needs Improvement"
                      ? "bg-amber-100 text-amber-700 dark:bg-amber-300/15 dark:text-amber-200"
                      : "bg-emerald-100 text-emerald-700 dark:bg-emerald-300/15 dark:text-emerald-200";

                const isPositiveTrend = item.trend?.startsWith("+");

                return (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, delay: 0.15 + index * 0.04 }}
                    className="rounded-xl border border-slate-200/70 bg-white/75 p-3 shadow-sm dark:border-slate-700/70 dark:bg-slate-800/70"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-xs text-slate-500 dark:text-slate-400">{item.title}</p>
                      <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${statusTone}`}>{item.status}</span>
                    </div>

                    <motion.p key={item.value} initial={{ opacity: 0.4 }} animate={{ opacity: 1 }} transition={{ duration: 0.25 }} className="mt-2 text-lg font-semibold text-slate-900 dark:text-slate-100">
                      {item.value}
                    </motion.p>

                    {item.trend && (
                      <p className={`mt-1 text-xs font-medium ${isPositiveTrend ? "text-emerald-600 dark:text-emerald-300" : "text-amber-600 dark:text-amber-300"}`}>
                        {isPositiveTrend ? "↑" : "↓"} {item.trend}
                      </p>
                    )}

                    <p className="mt-2 text-[11px] text-slate-500 dark:text-slate-400">
                      Source: {item.source} • {item.updated}
                    </p>
                  </motion.div>
                );
              })}
            </div>
            <p className="mt-4 text-[11px] text-slate-500 dark:text-slate-400">Data aggregated from public sources. Updated periodically.</p>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

export default Hero;
