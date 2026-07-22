import { motion } from "framer-motion";
import { ArrowRight, ExternalLink, Star } from "lucide-react";
import { STATUS } from "../../data/portfolio";
import { getIcon } from "./iconMap";

const statusStyles = {
  [STATUS.LIVE]: "bg-emerald-100 text-emerald-700 dark:bg-emerald-400/15 dark:text-emerald-200",
  [STATUS.DEVELOPMENT]: "bg-blue-100 text-blue-700 dark:bg-blue-400/15 dark:text-blue-200",
  [STATUS.INTERNAL]: "bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300",
  [STATUS.ARCHIVED]: "bg-zinc-100 text-zinc-500 dark:bg-zinc-700 dark:text-zinc-400",
  [STATUS.PLANNED]: "bg-amber-100 text-amber-700 dark:bg-amber-400/15 dark:text-amber-200",
};

function ApplicationCard({ app, index, favorite, onToggleFavorite, onOpen }) {
  const Icon = getIcon(app.icon);
  const isLive = app.status === STATUS.LIVE && app.href;
  const isFlagship = app.flagship;

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 24, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 10, scale: 0.98 }}
      transition={{ duration: 0.4, delay: index * 0.055, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -8, scale: 1.02 }}
      className={`group relative flex h-full flex-col overflow-hidden rounded-[20px] border bg-white/80 p-5 shadow-[0_8px_28px_rgba(15,23,42,0.06)] backdrop-blur-xl transition-[box-shadow,border-color] duration-400 will-change-transform dark:bg-slate-900/60 ${
        isFlagship
          ? "border-emerald-300/70 shadow-[0_18px_45px_rgba(16,185,129,0.22)] dark:border-emerald-400/40"
          : app.featured
            ? "border-cyan-300/60 dark:border-cyan-400/35"
            : "border-slate-200/80 dark:border-slate-700/70"
      } hover:shadow-[0_22px_48px_rgba(15,23,42,0.12)] dark:hover:shadow-[0_22px_48px_rgba(0,0,0,0.4)]`}
    >
      {isFlagship && (
        <>
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-emerald-100/70 via-cyan-50/50 to-teal-100/60 opacity-80 dark:from-emerald-500/10 dark:via-cyan-400/8 dark:to-teal-400/10" />
          <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-emerald-300/25 blur-3xl transition duration-500 group-hover:bg-emerald-300/40" />
        </>
      )}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent opacity-0 transition-opacity duration-400 group-hover:opacity-100" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-cyan-400/0 via-transparent to-blue-500/0 opacity-0 transition-opacity duration-500 group-hover:from-cyan-400/10 group-hover:to-blue-500/10 group-hover:opacity-100" />

      <div className="relative z-10 flex flex-wrap items-center gap-2">
        <span className={`rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] ${statusStyles[app.status] || statusStyles[STATUS.INTERNAL]}`}>
          {app.status}
        </span>
        {isFlagship && (
          <span className="rounded-full border border-emerald-300 bg-emerald-100 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-emerald-700 dark:border-emerald-300/40 dark:bg-emerald-400/10 dark:text-emerald-200">
            {app.badge || "Flagship"}
          </span>
        )}
        {app.featured && !isFlagship && (
          <span className="rounded-full border border-blue-200 bg-blue-50 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-blue-700 dark:border-blue-300/30 dark:bg-blue-400/10 dark:text-blue-200">
            Featured
          </span>
        )}
        <button
          type="button"
          aria-label={favorite ? "Remove favorite" : "Add favorite"}
          onClick={() => onToggleFavorite(app.id)}
          className={`ml-auto rounded-full p-1.5 transition-all duration-300 ${
            favorite
              ? "bg-amber-100 text-amber-500 dark:bg-amber-400/20 dark:text-amber-300"
              : "bg-white/70 text-slate-400 opacity-70 hover:text-amber-500 group-hover:opacity-100 dark:bg-slate-800/70"
          }`}
        >
          <Star size={14} fill={favorite ? "currentColor" : "none"} />
        </button>
      </div>

      <div className="relative z-10 mt-4 flex items-start gap-3">
        <motion.div
          className={`inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${
            isFlagship
              ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-400/15 dark:text-emerald-200"
              : "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-cyan-200"
          }`}
          whileHover={{ rotate: 6, y: -2 }}
          transition={{ type: "spring", stiffness: 300, damping: 16 }}
        >
          <Icon size={18} />
          {isFlagship && <span className="absolute -right-0.5 -top-0.5 h-2 w-2 animate-pulse rounded-full bg-emerald-400" />}
        </motion.div>
        <div className="min-w-0">
          <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-400 dark:text-slate-500">{app.category}</p>
          <h3 className="mt-0.5 text-lg font-semibold tracking-tight text-slate-900 dark:text-white">{app.name}</h3>
        </div>
      </div>

      <p className="relative z-10 mt-3 flex-1 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{app.description}</p>

      {app.tech?.length > 0 && (
        <div className="relative z-10 mt-4 flex flex-wrap gap-1.5">
          {app.tech.map((t) => (
            <span
              key={t}
              className="rounded-md border border-slate-200/80 bg-slate-50/80 px-2 py-0.5 text-[10px] font-medium text-slate-500 dark:border-slate-600 dark:bg-slate-800/80 dark:text-slate-400"
            >
              {t}
            </span>
          ))}
        </div>
      )}

      {app.sdgs?.length > 0 && (
        <div className="relative z-10 mt-3 flex flex-wrap gap-1.5">
          {app.sdgs.map((sdg) => (
            <span
              key={sdg}
              className="rounded-full border border-cyan-200 bg-cyan-50 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.1em] text-cyan-700 dark:border-cyan-300/30 dark:bg-cyan-300/10 dark:text-cyan-200"
            >
              {sdg}
            </span>
          ))}
        </div>
      )}

      <div className="relative z-10 mt-5">
        {isLive ? (
          <a
            href={app.href}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => onOpen?.(app)}
            className={`inline-flex w-full items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium text-white transition-all duration-300 ${
              isFlagship
                ? "bg-gradient-to-r from-emerald-600 to-cyan-500 shadow-[0_12px_28px_rgba(16,185,129,0.3)] group-hover:brightness-110"
                : "bg-slate-900 group-hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:group-hover:bg-slate-100"
            }`}
          >
            Visit Platform
            <ExternalLink size={14} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        ) : (
          <button
            type="button"
            disabled
            className="inline-flex w-full cursor-not-allowed items-center justify-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm font-medium text-slate-500 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-400"
          >
            {app.status === STATUS.INTERNAL ? "Internal resource" : "Coming soon"}
            <ArrowRight size={14} />
          </button>
        )}
      </div>
    </motion.article>
  );
}

export default ApplicationCard;
