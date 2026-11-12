import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Star } from "lucide-react";
import { deploymentPlatforms, getPlatformAvailability, STATUS } from "../../data/portfolio";
import { useSpotlight } from "../motion/primitives";
import { getIcon } from "./iconMap";

const statusDot = {
  [STATUS.LIVE]: "bg-emerald-500",
  [STATUS.DEVELOPMENT]: "bg-brand-500",
  [STATUS.INTERNAL]: "bg-slate-400",
  [STATUS.ARCHIVED]: "bg-slate-300",
  [STATUS.PLANNED]: "bg-amber-400",
};

const chip = "rounded-full border px-2.5 py-0.5 text-[11.5px]";

function ApplicationCard({ app, index, favorite, onToggleFavorite, onOpen, activePlatformId }) {
  const Icon = getIcon(app.icon);
  const isLive = app.status === STATUS.LIVE && app.href;
  const isFlagship = app.flagship;
  const availability = app.platformAvailability || getPlatformAvailability(app);
  const ctaLabel = app.ctaLabel || "Visit Platform";
  const spotlight = useSpotlight();

  return (
    <motion.article
      layout
      onPointerMove={spotlight}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.55, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
      className={`spotlight group relative flex h-full flex-col rounded-[20px] border bg-white p-6 transition-[border-color,box-shadow] duration-500 ease-out hover:shadow-lift dark:bg-[#0f2440] dark:hover:shadow-[0_24px_48px_-24px_rgba(0,0,0,0.7)] ${
        isFlagship
          ? "border-signal-500/50 dark:border-signal-400/40"
          : app.featured
            ? "border-brand-500/30 dark:border-brand-400/30"
            : "border-slate-900/10 hover:border-slate-900/20 dark:border-white/10 dark:hover:border-white/20"
      }`}
    >
      <div className="relative z-10 flex items-start justify-between gap-3">
        <span
          className={`inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border transition-transform duration-500 group-hover:-rotate-6 ${
            isFlagship
              ? "border-signal-500/30 bg-signal-500/10 text-signal-700 dark:text-signal-300"
              : "border-slate-900/10 bg-slate-50 text-slate-700 dark:border-white/10 dark:bg-white/5 dark:text-slate-200"
          }`}
        >
          <Icon size={19} strokeWidth={1.75} />
        </span>
        <button
          type="button"
          aria-label={favorite ? "Remove favorite" : "Add favorite"}
          aria-pressed={favorite}
          onClick={() => onToggleFavorite(app.id)}
          className={`rounded-full p-2 transition-all duration-300 active:scale-90 ${
            favorite ? "text-amber-500 dark:text-amber-300" : "text-slate-300 opacity-60 hover:text-amber-500 group-hover:opacity-100 dark:text-slate-500"
          }`}
        >
          <Star size={16} fill={favorite ? "currentColor" : "none"} />
        </button>
      </div>

      <div className="relative z-10 mt-5">
        <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[13px] text-slate-500 dark:text-slate-400">
          <span className="inline-flex items-center gap-1.5">
            <span className={`h-1.5 w-1.5 rounded-full ${statusDot[app.status] || statusDot[STATUS.INTERNAL]}`} />
            {app.status}
          </span>
          {isFlagship && <span className="font-medium text-signal-700 dark:text-signal-300">{app.badge || "Flagship"}</span>}
          {app.featured && !isFlagship && <span className="font-medium text-brand-600 dark:text-brand-300">Featured</span>}
          {app.category && <span>{app.category}</span>}
        </p>
        <h3 className="mt-1.5 text-xl font-semibold tracking-[-0.015em] text-slate-900 dark:text-white">{app.name}</h3>
      </div>

      <p className="relative z-10 mt-2 flex-1 text-[14.5px] leading-relaxed text-slate-600 dark:text-slate-300">{app.description}</p>

      {(availability.length > 0 || app.tech?.length > 0 || app.sdgs?.length > 0) && (
        <div className="relative z-10 mt-5 flex flex-wrap gap-1.5">
          {deploymentPlatforms
            .filter((p) => availability.includes(p.id))
            .map((p) => {
              const isActive = activePlatformId ? activePlatformId === p.id : p.id === "web";
              return (
                <span
                  key={p.id}
                  className={`${chip} ${
                    isActive
                      ? "border-brand-500/30 bg-brand-500/[0.06] text-brand-700 dark:border-brand-400/30 dark:text-brand-300"
                      : "border-slate-900/10 text-slate-500 dark:border-white/10 dark:text-slate-400"
                  }`}
                >
                  {p.badgeLabel}
                </span>
              );
            })}
          {app.tech?.map((t) => (
            <span key={t} className={`${chip} border-slate-900/10 text-slate-500 dark:border-white/10 dark:text-slate-400`}>
              {t}
            </span>
          ))}
          {app.sdgs?.map((sdg) => (
            <span key={sdg} className={`${chip} border-signal-600/25 text-signal-700 dark:border-signal-300/25 dark:text-signal-300`}>
              {sdg}
            </span>
          ))}
        </div>
      )}

      <div className="relative z-10 mt-6 border-t border-slate-900/[0.07] pt-4 dark:border-white/[0.07]">
        {isLive ? (
          <a
            href={app.href}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => onOpen?.(app)}
            className="inline-flex items-center gap-1.5 text-[15px] font-medium text-slate-900 dark:text-white"
          >
            <span className="link-slide">{ctaLabel}</span>
            <ArrowUpRight size={16} className="text-brand-500 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 dark:text-brand-300" />
          </a>
        ) : (
          <span className="inline-flex items-center gap-1.5 text-[15px] text-slate-400 dark:text-slate-500" aria-disabled="true">
            {app.status === STATUS.INTERNAL ? "Internal resource" : "Coming soon"}
            <ArrowRight size={15} />
          </span>
        )}
      </div>
    </motion.article>
  );
}

export default ApplicationCard;
