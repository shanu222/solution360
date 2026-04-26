import { motion, useScroll, useTransform } from "framer-motion";
import { Sparkles } from "lucide-react";
import { useState } from "react";
import heroImage from "../../images/hero-illustration.svg";

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

function Hero({ onNavigate }) {
  const [heroMouse, setHeroMouse] = useState({ x: 0, y: 0 });
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 400], [0, -30]);
  const heroParallaxX = useTransform(scrollY, [0, 600], [0, 8]);
  const heroWords = "360 degree technology for climate, energy, and resilience outcomes.".split(" ");

  const handleHeroMouseMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    setHeroMouse({ x, y });
  };

  return (
    <section id="top" className="relative grid w-full items-center gap-5 overflow-hidden rounded-[28px] border border-slate-200 bg-gradient-to-br from-blue-50/95 via-white to-sky-50 px-6 py-12 shadow-[0_10px_30px_rgba(148,163,184,0.18)] transition-colors duration-300 dark:border-white/10 dark:bg-gradient-to-br dark:from-slate-900 dark:via-slate-900 dark:to-slate-800 dark:shadow-none md:gap-8 lg:grid-cols-2 lg:gap-10 lg:py-16">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_12%,rgba(59,130,246,0.22),transparent_38%),linear-gradient(110deg,rgba(37,99,235,0.1),rgba(255,255,255,0))] transition-colors duration-300 dark:bg-[radial-gradient(circle_at_20%_12%,rgba(56,189,248,0.2),transparent_35%),linear-gradient(110deg,rgba(59,130,246,0.11),rgba(15,23,42,0))]" />
      {[0, 1, 2, 3].map((particle) => (
        <motion.span
          key={particle}
          className="pointer-events-none absolute h-1.5 w-1.5 rounded-full bg-cyan-300/70"
          style={{ left: `${18 + particle * 20}%`, top: `${20 + (particle % 2) * 30}%`, willChange: "transform, opacity" }}
          animate={{ y: [0, -14, 0], opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 3.8 + particle, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        />
      ))}
      <motion.div {...fadeInUp}>
        <p className="inline-flex items-center gap-2 rounded-full border border-cyan-300/60 bg-cyan-100/70 px-4 py-1 text-sm text-cyan-700 transition-colors duration-300 dark:border-cyan-300/30 dark:bg-cyan-300/10 dark:text-cyan-200">
          <Sparkles size={14} />
          AI-Powered Sustainability Intelligence
        </p>
        <motion.h1 className="mt-5 text-[clamp(28px,5vw,48px)] font-bold leading-[1.08] tracking-tight text-slate-900 transition-colors duration-300 dark:text-white">
          {heroWords.map((word, index) => (
            <motion.span
              key={`${word}-${index}`}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: "easeOut", delay: index * 0.03 }}
              className="mr-2 inline-block"
            >
              {word}
            </motion.span>
          ))}
        </motion.h1>
        <p className="mt-5 max-w-2xl text-[clamp(14px,2vw,18px)] leading-7 text-slate-600 transition-colors duration-300 dark:text-slate-300">
          We design premium enterprise software products that turn operations into measurable impact with clear reporting, modern UX, and intelligent automation.
        </p>
        <div className="mt-8 grid gap-3 sm:flex sm:flex-wrap">
          <button
            onClick={() => onNavigate("/products")}
            className="btn-premium w-full rounded-xl bg-brand-gradient px-6 py-3 font-medium text-white shadow-glow transition duration-200 hover:scale-[1.03] sm:w-auto"
          >
            Explore Products
          </button>
          <button
            onClick={() => onNavigate("/contact")}
            className="btn-premium w-full rounded-xl border border-slate-300 bg-white px-6 py-3 font-medium text-slate-700 transition duration-300 hover:border-cyan-400 hover:bg-cyan-50 dark:border-white/20 dark:bg-white/5 dark:text-slate-100 dark:backdrop-blur dark:hover:border-cyan-300/60 dark:hover:bg-cyan-300/10 sm:w-auto"
          >
            Contact Team
          </button>
        </div>
        <motion.div variants={staggerContainer} initial="hidden" animate="show" className="mt-8 grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-5">
          {trustStats.map((item) => (
            <motion.div key={item.title} variants={staggerItem} className="rounded-2xl border border-slate-200 bg-white/90 p-4 shadow-sm transition-colors duration-300 dark:border-white/10 dark:bg-white/[0.04] dark:backdrop-blur">
              <p className="text-sm font-semibold text-cyan-700 transition-colors duration-300 dark:text-cyan-200">{item.title}</p>
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
          className="rounded-3xl border border-cyan-200/70 bg-white/85 p-3 shadow-[0_20px_50px_rgba(148,163,184,0.25)] transition-colors duration-300 dark:border-cyan-300/20 dark:bg-white/5 dark:shadow-glow dark:backdrop-blur-xl"
        >
          <img src={heroImage} alt="Dashboard preview of SustainableSolution360 platform" className="w-full rounded-2xl object-cover" loading="eager" />
        </motion.div>
      </motion.div>
    </section>
  );
}

export default Hero;
