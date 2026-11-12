import { motion } from "framer-motion";
import { ArrowRight, Pin } from "lucide-react";
import { useSpotlight } from "../motion/primitives";
import { getIcon } from "./iconMap";

function FolderCard({
  folder,
  index,
  pinned,
  onOpen,
  onTogglePin,
  countLabel,
  kindLabel = "Domain",
  footerHint = "Open portfolio",
}) {
  const Icon = getIcon(folder.icon);
  const spotlight = useSpotlight();
  const count =
    typeof folder.count === "number"
      ? folder.count
      : folder.applications?.length || folder.domains?.length || 0;
  const isEmpty = count === 0;
  const isPlanned = folder.planned;

  // A div with button semantics, so the pin toggle inside is not a button nested in a button.
  const onKeyDown = (event) => {
    if (event.target !== event.currentTarget) return;
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onOpen(folder);
    }
  };

  return (
    <motion.div
      role="button"
      tabIndex={0}
      aria-label={`${folder.name}, ${kindLabel.toLowerCase()}`}
      layout
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 12 }}
      transition={{ duration: 0.6, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.99 }}
      onClick={() => onOpen(folder)}
      onKeyDown={onKeyDown}
      onPointerMove={spotlight}
      className="spotlight group relative flex w-full cursor-pointer flex-col rounded-[22px] border border-slate-900/10 bg-white p-7 text-left transition-[border-color,box-shadow] duration-500 ease-out hover:border-slate-900/20 hover:shadow-lift dark:border-white/10 dark:bg-[#0f2440] dark:hover:border-white/20 dark:hover:shadow-[0_24px_48px_-24px_rgba(0,0,0,0.7)]"
    >
      <div className="relative z-10 flex items-start justify-between gap-3">
        <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-slate-900/10 bg-slate-50 text-slate-800 transition-all duration-500 group-hover:-rotate-6 group-hover:border-brand-500 group-hover:bg-brand-500 group-hover:text-white dark:border-white/10 dark:bg-white/5 dark:text-slate-100">
          <Icon size={22} strokeWidth={1.6} />
        </span>

        <div className="flex items-center gap-2">
          {pinned && <span className="text-xs font-medium text-amber-600 dark:text-amber-300">Pinned</span>}
          {isPlanned && <span className="text-xs text-slate-500 dark:text-slate-400">Future</span>}
          <span className="tabular rounded-full border border-slate-900/10 px-2.5 py-1 text-xs font-medium text-slate-600 dark:border-white/10 dark:text-slate-300">
            {isEmpty ? "Ready" : countLabel || `${count} app${count === 1 ? "" : "s"}`}
          </span>
          <button
            type="button"
            aria-label={pinned ? "Unpin folder" : "Pin folder"}
            aria-pressed={pinned}
            onClick={(e) => {
              e.stopPropagation();
              onTogglePin(folder.id);
            }}
            className={`rounded-full p-1.5 transition-all duration-300 active:scale-90 ${
              pinned
                ? "text-amber-500 dark:text-amber-300"
                : "text-slate-400 opacity-0 hover:text-amber-500 focus-visible:opacity-100 group-hover:opacity-100"
            }`}
          >
            <Pin size={14} fill={pinned ? "currentColor" : "none"} />
          </button>
        </div>
      </div>

      <div className="relative z-10 mt-8">
        <p className="text-[13px] text-slate-500 dark:text-slate-400">{kindLabel}</p>
        <h3 className="mt-1 text-[22px] font-semibold tracking-[-0.02em] text-slate-900 dark:text-white">{folder.name}</h3>
        <p className="mt-2 line-clamp-2 text-[14.5px] leading-relaxed text-slate-600 dark:text-slate-300">{folder.description}</p>
      </div>

      <div className="relative z-10 mt-auto flex items-center justify-between pt-7">
        <span className="text-[13px] text-slate-500 dark:text-slate-400">
          {folder.isPlatform ? "Shared platform" : isEmpty ? "Capacity folder" : footerHint}
        </span>
        <span
          className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-900/10 text-slate-500 transition-all duration-500 group-hover:translate-x-1 group-hover:border-brand-500 group-hover:text-brand-600 dark:border-white/10 dark:text-slate-400 dark:group-hover:text-brand-300"
          aria-hidden
        >
          <ArrowRight size={16} />
        </span>
      </div>
    </motion.div>
  );
}

export default FolderCard;
