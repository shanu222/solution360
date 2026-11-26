import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Lock } from "lucide-react";
import { webPlatforms } from "../data/webPlatforms";
import { Reveal, easeOut, useSpotlight } from "./motion/primitives";

/** A platform's homepage inside a browser window, with its real address in the bar. */
function PlatformCard({ platform, index }) {
  const reduce = useReducedMotion();
  const spotlight = useSpotlight();

  return (
    <motion.article
      initial={reduce ? false : { opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.75, ease: easeOut, delay: (index % 2) * 0.1 }}
      onPointerMove={spotlight}
      className="spotlight group relative flex flex-col overflow-hidden rounded-[26px] border border-slate-900/10 bg-white transition-[border-color,box-shadow] duration-500 hover:border-slate-900/20 hover:shadow-lift dark:border-white/10 dark:bg-[#0f2440] dark:hover:border-white/20"
    >
      <a
        href={platform.url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Open ${platform.name} (${platform.domain})`}
        className="relative block overflow-hidden px-5 pt-5 sm:px-7 sm:pt-7"
      >
        {/* soft wash in the product's own colour */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-10 -bottom-10 top-10 rounded-full opacity-25 blur-[70px] transition-opacity duration-700 group-hover:opacity-40 dark:opacity-20"
          style={{ backgroundColor: platform.tint }}
        />

        <div className="relative overflow-hidden rounded-t-[14px] border border-b-0 border-slate-900/10 bg-white shadow-[0_24px_50px_-28px_rgba(12,30,54,0.45)] transition-transform duration-700 ease-out group-hover:-translate-y-1.5 dark:border-white/10 dark:bg-[#0b1a2f]">
          {/* browser chrome */}
          <div className="flex items-center gap-3 border-b border-slate-900/[0.07] bg-slate-50 px-4 py-2.5 dark:border-white/[0.07] dark:bg-white/[0.04]">
            <span className="flex gap-1.5" aria-hidden="true">
              <span className="h-2.5 w-2.5 rounded-full bg-slate-300 dark:bg-white/20" />
              <span className="h-2.5 w-2.5 rounded-full bg-slate-300 dark:bg-white/20" />
              <span className="h-2.5 w-2.5 rounded-full bg-slate-300 dark:bg-white/20" />
            </span>
            <span className="mx-auto flex min-w-0 max-w-[75%] items-center gap-1.5 rounded-full bg-white px-3 py-1 text-[12px] text-slate-500 shadow-[inset_0_0_0_1px_rgba(12,30,54,0.08)] dark:bg-white/[0.06] dark:text-slate-400 dark:shadow-none">
              <Lock size={11} className="shrink-0" aria-hidden="true" />
              <span className="truncate">{platform.domain}</span>
            </span>
            <span className="w-[42px]" aria-hidden="true" />
          </div>
          <div className="aspect-[16/10] overflow-hidden">
            <img
              src={platform.image}
              alt={`${platform.name} homepage`}
              width="1280"
              height="800"
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover object-top transition-transform duration-[1.2s] ease-out group-hover:scale-[1.025]"
            />
          </div>
        </div>
      </a>

      <div className="relative z-10 flex flex-1 flex-col border-t border-slate-900/[0.07] p-6 sm:p-7 dark:border-white/[0.07]">
        <p className="inline-flex items-center gap-2 text-[13px] text-slate-500 dark:text-slate-400">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
          Live on the web
          <span className="text-slate-300 dark:text-slate-600">/</span>
          {platform.category}
        </p>
        <h3 className="mt-2 text-[22px] font-semibold tracking-[-0.02em] text-slate-900 dark:text-white">{platform.name}</h3>
        <p className="mt-2 flex-1 text-[15px] leading-relaxed text-slate-600 dark:text-slate-300">{platform.summary}</p>
        <a
          href={platform.url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 inline-flex items-center gap-1.5 self-start text-[15px] font-medium text-slate-900 dark:text-white"
        >
          <span className="link-slide">Visit {platform.domain}</span>
          <ArrowUpRight size={16} className="text-brand-500 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 dark:text-brand-300" />
        </a>
      </div>
    </motion.article>
  );
}

function WebPlatformsGallery() {
  return (
    <section id="web-platforms" aria-labelledby="web-platforms-heading" className="scroll-mt-28">
      <Reveal className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <h2 id="web-platforms-heading" className="text-[clamp(30px,4vw,52px)] font-semibold leading-[1.02] tracking-[-0.03em] text-slate-900 dark:text-white">
            Web platforms
          </h2>
          <p className="mt-4 max-w-[58ch] text-[16.5px] leading-relaxed text-slate-600 dark:text-slate-300">
            Products running live in the browser, each on its own site. This is the first thing you see when you open them.
          </p>
        </div>
        <p className="tabular text-[15px] text-slate-500 dark:text-slate-400">{webPlatforms.length} platforms live</p>
      </Reveal>
      <div className="mt-12 grid gap-6 lg:grid-cols-2">
        {webPlatforms.map((platform, index) => (
          <PlatformCard key={platform.id} platform={platform} index={index} />
        ))}
      </div>
    </section>
  );
}

export default WebPlatformsGallery;
