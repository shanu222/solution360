import { motion } from "framer-motion";
import { ArrowRight, Pin, Sparkles } from "lucide-react";
import { getIcon } from "./iconMap";

function FolderCard({ domain, index, pinned, onOpen, onTogglePin }) {
  const Icon = getIcon(domain.icon);
  const count = domain.applications?.length || 0;
  const isEmpty = count === 0;
  const isPlanned = domain.planned;

  return (
    <motion.button
      type="button"
      layout
      initial={{ opacity: 0, y: 28, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 12, scale: 0.98 }}
      transition={{ duration: 0.45, delay: index * 0.045, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -10, scale: 1.04 }}
      whileTap={{ scale: 0.985 }}
      onClick={() => onOpen(domain)}
      className={`group relative flex w-full flex-col overflow-hidden rounded-[22px] border bg-white/75 p-6 text-left shadow-[0_8px_30px_rgba(15,23,42,0.06)] backdrop-blur-xl transition-[box-shadow,border-color] duration-400 will-change-transform dark:bg-slate-900/55 ${domain.border} hover:shadow-[0_24px_50px_rgba(15,23,42,0.14)] dark:hover:shadow-[0_24px_50px_rgba(0,0,0,0.45)]`}
      style={{ transitionDuration: "400ms" }}
    >
      {/* Gradient overlay */}
      <div
        className={`pointer-events-none absolute inset-0 bg-gradient-to-br opacity-70 transition-opacity duration-500 group-hover:opacity-100 ${domain.accent}`}
      />
      {/* Animated border glow */}
      <div
        className="pointer-events-none absolute -inset-px rounded-[22px] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          boxShadow: `0 0 0 1px ${domain.glow}, 0 20px 50px ${domain.glow}`,
        }}
      />
      {/* Soft shine sweep */}
      <div className="pointer-events-none absolute -left-1/2 top-0 h-full w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-white/25 to-transparent opacity-0 transition-all duration-700 group-hover:left-full group-hover:opacity-100 dark:via-white/10" />

      <div className="relative z-10 flex items-start justify-between gap-3">
        <motion.div
          className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/60 bg-white/80 text-slate-800 shadow-sm dark:border-white/10 dark:bg-slate-800/80 dark:text-cyan-200"
          whileHover={{ rotate: -8, y: -2 }}
          transition={{ type: "spring", stiffness: 320, damping: 18 }}
        >
          <Icon size={22} strokeWidth={1.75} />
        </motion.div>

        <div className="flex items-center gap-2">
          {pinned && (
            <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-amber-700 dark:bg-amber-400/15 dark:text-amber-200">
              Pinned
            </span>
          )}
          {isPlanned && (
            <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-slate-500 dark:bg-slate-700 dark:text-slate-300">
              Future
            </span>
          )}
          <span
            className="inline-flex items-center gap-1 rounded-full border border-slate-200/80 bg-white/90 px-2.5 py-1 text-[11px] font-semibold text-slate-600 dark:border-slate-600 dark:bg-slate-800/90 dark:text-slate-300"
            onClick={(e) => e.stopPropagation()}
          >
            {isEmpty ? "Ready" : `${count} app${count === 1 ? "" : "s"}`}
          </span>
          <button
            type="button"
            aria-label={pinned ? "Unpin folder" : "Pin folder"}
            onClick={(e) => {
              e.stopPropagation();
              onTogglePin(domain.id);
            }}
            className={`rounded-full p-1.5 transition-all duration-300 ${
              pinned
                ? "bg-amber-100 text-amber-600 dark:bg-amber-400/20 dark:text-amber-300"
                : "bg-white/70 text-slate-400 opacity-0 group-hover:opacity-100 hover:text-amber-500 dark:bg-slate-800/70"
            }`}
          >
            <Pin size={14} fill={pinned ? "currentColor" : "none"} />
          </button>
        </div>
      </div>

      <div className="relative z-10 mt-5">
        <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400 dark:text-slate-500">
          {domain.id.split("_").slice(0, 1)[0]} · Domain
        </p>
        <h3 className="mt-1.5 text-xl font-semibold tracking-tight text-slate-900 transition-colors duration-400 group-hover:text-cyan-700 dark:text-white dark:group-hover:text-cyan-300">
          {domain.name}
        </h3>
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{domain.description}</p>
      </div>

      <div className="relative z-10 mt-auto flex items-center justify-between pt-6">
        <span className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500 dark:text-slate-400">
          {domain.isPlatform ? (
            <>
              <Sparkles size={12} className="text-cyan-500" /> Shared platform
            </>
          ) : isEmpty ? (
            "Capacity folder"
          ) : (
            "Open portfolio"
          )}
        </span>
        <motion.span
          className="inline-flex items-center gap-1 text-sm font-semibold text-cyan-700 opacity-0 translate-x-[-6px] transition-all duration-400 group-hover:translate-x-0 group-hover:opacity-100 dark:text-cyan-300"
          aria-hidden
        >
          Explore <ArrowRight size={14} />
        </motion.span>
      </div>
    </motion.button>
  );
}

export default FolderCard;
