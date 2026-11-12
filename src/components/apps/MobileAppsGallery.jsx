import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useState } from "react";
import { RELEASE, appsByRelease } from "../../data/mobileApps";
import { Reveal, easeOut, useSpotlight } from "../motion/primitives";
import PhoneShot from "./PhoneShot";

/** Card whose stacked phones spread into a fan on hover or focus. */
function AppCard({ app, index }) {
  const reduce = useReducedMotion();
  const spotlight = useSpotlight();
  const [open, setOpen] = useState(false);
  const spread = open && !reduce;
  const fan = [
    { closed: { x: -18, rotate: -4, scale: 0.9 }, open: { x: -112, rotate: -10, scale: 0.9 } },
    { closed: { x: 18, rotate: 4, scale: 0.9 }, open: { x: 112, rotate: 10, scale: 0.9 } },
    { closed: { x: 0, rotate: 0, scale: 1 }, open: { x: 0, rotate: 0, scale: 1.04 } },
  ];
  const order = [app.screens[1], app.screens[2], app.screens[0]];

  return (
    <motion.article
      initial={reduce ? false : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.7, ease: easeOut, delay: (index % 3) * 0.08 }}
      onPointerMove={spotlight}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={() => setOpen(false)}
      className="spotlight group relative flex flex-col overflow-hidden rounded-[24px] border border-slate-900/10 bg-white dark:border-white/10 dark:bg-[#0f2440]"
    >
      <div className="relative h-[300px] overflow-hidden bg-slate-50 dark:bg-white/[0.02]">
        <motion.div
          aria-hidden="true"
          className="absolute left-1/2 top-[55%] h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full blur-[60px]"
          style={{ backgroundColor: app.tint }}
          animate={{ opacity: spread ? 0.35 : 0.18 }}
          transition={{ duration: 0.6 }}
        />
        {order.map((src, i) => (
          <motion.div
            key={src}
            className="absolute left-1/2 top-7 w-[132px] -ml-[66px]"
            style={{ zIndex: i === 2 ? 2 : 1 }}
            animate={spread ? fan[i].open : fan[i].closed}
            transition={{ type: "spring", stiffness: 170, damping: 20 }}
          >
            <PhoneShot src={src} alt={i === 2 ? `${app.name} home screen` : ""} className="w-full" />
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 flex flex-1 flex-col border-t border-slate-900/[0.07] p-6 dark:border-white/[0.07]">
        <p className="flex items-center justify-between gap-3 text-[13px] text-slate-500 dark:text-slate-400">
          <span className="inline-flex items-center gap-1.5">
            <span className={`h-1.5 w-1.5 rounded-full ${app.release === "published" ? "bg-emerald-500" : "bg-amber-400"}`} />
            {RELEASE[app.release].note}
          </span>
          {app.updated && <span className="tabular">Updated {app.updated}</span>}
        </p>
        <h3 className="mt-2 text-xl font-semibold tracking-[-0.015em] text-slate-900 dark:text-white">{app.fullName ?? app.name}</h3>
        <p className="mt-0.5 text-[13px] text-slate-400 dark:text-slate-500">{app.packageName}</p>
        <p className="mt-3 flex-1 text-[14.5px] leading-relaxed text-slate-600 dark:text-slate-300">{app.summary}</p>
        <div className="mt-5 border-t border-slate-900/[0.07] pt-4 dark:border-white/[0.07]">
          {app.links.android ? (
            <a href={app.links.android} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-[15px] font-medium text-slate-900 dark:text-white">
              <span className="link-slide">View on Google Play</span>
              <ArrowUpRight size={16} className="text-brand-500 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 dark:text-brand-300" />
            </a>
          ) : (
            <span className="text-[15px] text-slate-500 dark:text-slate-400">Closed testing, public release coming</span>
          )}
        </div>
      </div>
    </motion.article>
  );
}

function Group({ title, intro, apps }) {
  return (
    <div>
      <Reveal className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
        <h3 className="text-2xl font-semibold tracking-[-0.02em] text-slate-900 dark:text-white">
          {title} <span className="tabular font-normal text-slate-400 dark:text-slate-500">{apps.length}</span>
        </h3>
        <p className="max-w-[52ch] text-[15px] text-slate-500 dark:text-slate-400">{intro}</p>
      </Reveal>
      <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {apps.map((app, index) => (
          <AppCard key={app.id} app={app} index={index} />
        ))}
      </div>
    </div>
  );
}

function MobileAppsGallery() {
  return (
    <section id="mobile-apps" aria-labelledby="mobile-apps-heading" className="scroll-mt-28">
      <Reveal>
        <h2 id="mobile-apps-heading" className="text-[clamp(30px,4vw,52px)] font-semibold leading-[1.02] tracking-[-0.03em] text-slate-900 dark:text-white">
          Mobile apps
        </h2>
        <p className="mt-4 max-w-[58ch] text-[16.5px] leading-relaxed text-slate-600 dark:text-slate-300">
          Screens from the apps we ship on Google Play and the App Store. Hover over or focus a card to spread its screens.
        </p>
      </Reveal>
      <div className="mt-12 space-y-16">
        <Group title="Published" intro="Live in production and available to download." apps={appsByRelease("published")} />
        <Group title="In closed testing" intro="Running with testers on Google Play ahead of public release." apps={appsByRelease("testing")} />
      </div>
    </section>
  );
}

export default MobileAppsGallery;
