import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import {
  ArrowLeft,
  ChevronRight,
  Clock3,
  FolderOpen,
  LayoutGrid,
  Pin,
  Search,
  SlidersHorizontal,
  Star,
  X,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { allDomains, comingSoonProducts, getAllApplications, STATUS } from "../../data/portfolio";
import usePortfolioPrefs from "../../hooks/usePortfolioPrefs";
import ApplicationCard from "./ApplicationCard";
import FolderCard from "./FolderCard";
import { getIcon } from "./iconMap";

const SORT_OPTIONS = [
  { id: "name-asc", label: "Name A–Z" },
  { id: "name-desc", label: "Name Z–A" },
  { id: "count-desc", label: "Most products" },
  { id: "count-asc", label: "Fewest products" },
];

const STATUS_FILTERS = ["All", STATUS.LIVE, STATUS.INTERNAL, STATUS.PLANNED];

function SkeletonCard() {
  return (
    <div className="animate-pulse overflow-hidden rounded-[22px] border border-slate-200/70 bg-white/60 p-6 dark:border-slate-700/60 dark:bg-slate-900/40">
      <div className="flex items-center justify-between">
        <div className="h-12 w-12 rounded-2xl bg-slate-200/80 dark:bg-slate-700/80" />
        <div className="h-6 w-16 rounded-full bg-slate-200/80 dark:bg-slate-700/80" />
      </div>
      <div className="mt-6 h-3 w-20 rounded bg-slate-200/80 dark:bg-slate-700/80" />
      <div className="mt-3 h-6 w-3/4 rounded bg-slate-200/80 dark:bg-slate-700/80" />
      <div className="mt-3 h-4 w-full rounded bg-slate-200/70 dark:bg-slate-700/70" />
      <div className="mt-2 h-4 w-5/6 rounded bg-slate-200/60 dark:bg-slate-700/60" />
    </div>
  );
}

function EmptyState({ title, subtitle }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      className="col-span-full flex flex-col items-center justify-center rounded-[24px] border border-dashed border-slate-300/80 bg-white/50 px-6 py-16 text-center backdrop-blur-md dark:border-slate-600 dark:bg-slate-900/40"
    >
      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400/20 to-blue-500/20 text-cyan-600 dark:text-cyan-300"
      >
        <FolderOpen size={26} />
      </motion.div>
      <h3 className="text-lg font-semibold text-slate-800 dark:text-white">{title}</h3>
      <p className="mt-2 max-w-md text-sm text-slate-500 dark:text-slate-400">{subtitle}</p>
    </motion.div>
  );
}

function PortfolioExplorer() {
  const { prefs, toggleFavorite, togglePin, pushRecent } = usePortfolioPrefs();
  const [booting, setBooting] = useState(true);
  const [activeDomainId, setActiveDomainId] = useState(null);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("name-asc");
  const [statusFilter, setStatusFilter] = useState("All");
  const [showFuture, setShowFuture] = useState(true);
  const [viewMode, setViewMode] = useState("folders"); // folders | favorites | recent | coming
  const [filtersOpen, setFiltersOpen] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setBooting(false), 480);
    return () => clearTimeout(t);
  }, []);

  const activeDomain = useMemo(() => allDomains.find((d) => d.id === activeDomainId) || null, [activeDomainId]);

  const openDomain = (domain) => {
    setActiveDomainId(domain.id);
    setViewMode("folders");
    pushRecent({ id: domain.id, type: "folder", name: domain.name, slug: domain.slug });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const goBack = () => {
    setActiveDomainId(null);
    setSearch("");
    setStatusFilter("All");
  };

  const filteredFolders = useMemo(() => {
    let list = showFuture ? allDomains : allDomains.filter((d) => !d.planned);

    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (d) =>
          d.name.toLowerCase().includes(q) ||
          d.description.toLowerCase().includes(q) ||
          d.applications?.some((a) => a.name.toLowerCase().includes(q))
      );
    }

    list = [...list].sort((a, b) => {
      const aPinned = prefs.pinned.includes(a.id) ? 1 : 0;
      const bPinned = prefs.pinned.includes(b.id) ? 1 : 0;
      if (aPinned !== bPinned) return bPinned - aPinned;

      const aCount = a.applications?.length || 0;
      const bCount = b.applications?.length || 0;
      if (sortBy === "name-asc") return a.name.localeCompare(b.name);
      if (sortBy === "name-desc") return b.name.localeCompare(a.name);
      if (sortBy === "count-desc") return bCount - aCount;
      if (sortBy === "count-asc") return aCount - bCount;
      return 0;
    });

    return list;
  }, [search, sortBy, showFuture, prefs.pinned]);

  const domainApps = useMemo(() => {
    if (!activeDomain) return [];
    let apps = [...(activeDomain.applications || [])];

    if (search.trim()) {
      const q = search.toLowerCase();
      apps = apps.filter(
        (a) =>
          a.name.toLowerCase().includes(q) ||
          a.description.toLowerCase().includes(q) ||
          a.category?.toLowerCase().includes(q) ||
          a.tech?.some((t) => t.toLowerCase().includes(q))
      );
    }

    if (statusFilter !== "All") {
      apps = apps.filter((a) => a.status === statusFilter);
    }

    apps.sort((a, b) => {
      if (a.flagship && !b.flagship) return -1;
      if (!a.flagship && b.flagship) return 1;
      if (sortBy === "name-desc") return b.name.localeCompare(a.name);
      return a.name.localeCompare(b.name);
    });

    return apps;
  }, [activeDomain, search, statusFilter, sortBy]);

  const favoriteApps = useMemo(() => {
    const all = getAllApplications();
    return all.filter((a) => prefs.favorites.includes(a.id));
  }, [prefs.favorites]);

  const totalProducts = useMemo(() => getAllApplications().filter((a) => a.status === STATUS.LIVE).length, []);

  return (
    <section id="products" className="scroll-mt-24 w-full py-2">
      <LayoutGroup>
        {/* Header */}
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-xs uppercase tracking-[0.2em] text-cyan-700 dark:text-cyan-200"
            >
              RTL Product Portfolio
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 }}
              className="mt-2 text-[clamp(28px,5vw,48px)] font-semibold tracking-tight text-slate-900 dark:text-white"
            >
              Our Products
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="mt-2 max-w-2xl text-sm text-slate-600 dark:text-slate-300"
            >
              Enterprise portfolio explorer — {totalProducts} live platforms across {allDomains.filter((d) => !d.planned).length} business domains.
            </motion.p>
          </div>

          {/* View mode pills */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12 }}
            className="inline-flex flex-wrap gap-1 rounded-2xl border border-slate-200/80 bg-white/80 p-1 shadow-sm backdrop-blur-md dark:border-slate-700 dark:bg-slate-900/60"
          >
            {[
              { id: "folders", label: "Domains", icon: LayoutGrid },
              { id: "favorites", label: "Favorites", icon: Star },
              { id: "recent", label: "Recent", icon: Clock3 },
              { id: "coming", label: "Coming Soon", icon: SlidersHorizontal },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => {
                  setViewMode(tab.id);
                  if (tab.id !== "folders") setActiveDomainId(null);
                }}
                className={`relative inline-flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-sm font-medium transition-all duration-300 ${
                  viewMode === tab.id && !activeDomain
                    ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow"
                    : "text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200"
                }`}
              >
                <tab.icon size={14} />
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            ))}
          </motion.div>
        </div>

        {/* Breadcrumbs */}
        <AnimatePresence mode="wait">
          {activeDomain && (
            <motion.nav
              key="crumbs"
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              className="mt-6 flex flex-wrap items-center gap-2 text-sm"
              aria-label="Breadcrumb"
            >
              <button
                type="button"
                onClick={goBack}
                className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200/80 bg-white/80 px-3 py-1.5 font-medium text-slate-700 shadow-sm backdrop-blur transition-all duration-300 hover:-translate-x-0.5 hover:border-cyan-300 dark:border-slate-700 dark:bg-slate-900/60 dark:text-slate-200"
              >
                <ArrowLeft size={14} />
                Back
              </button>
              <ChevronRight size={14} className="text-slate-400" />
              <button type="button" onClick={goBack} className="text-slate-500 transition hover:text-cyan-600 dark:text-slate-400 dark:hover:text-cyan-300">
                RTL-Product-Portfolio
              </button>
              <ChevronRight size={14} className="text-slate-400" />
              <span className="font-semibold text-slate-800 dark:text-white">{activeDomain.name}</span>
            </motion.nav>
          )}
        </AnimatePresence>

        {/* Toolbar */}
        <motion.div
          layout
          className="mt-6 flex flex-col gap-3 rounded-[20px] border border-slate-200/70 bg-white/70 p-3 shadow-sm backdrop-blur-xl dark:border-slate-700/70 dark:bg-slate-900/50 sm:flex-row sm:items-center"
        >
          <div className="relative flex-1">
            <Search size={16} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={activeDomain ? "Search applications…" : "Search domains or products…"}
              className="w-full rounded-xl border border-transparent bg-slate-50/90 py-2.5 pl-10 pr-10 text-sm text-slate-800 outline-none transition-all duration-300 placeholder:text-slate-400 focus:border-cyan-300 focus:bg-white focus:shadow-[0_0_0_3px_rgba(34,211,238,0.15)] dark:bg-slate-800/80 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:border-cyan-500/40 dark:focus:bg-slate-800"
            />
            {search && (
              <button
                type="button"
                aria-label="Clear search"
                onClick={() => setSearch("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-slate-400 transition hover:bg-slate-200 hover:text-slate-700 dark:hover:bg-slate-700 dark:hover:text-slate-200"
              >
                <X size={14} />
              </button>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => setFiltersOpen((v) => !v)}
              className={`inline-flex items-center gap-1.5 rounded-xl border px-3 py-2 text-sm font-medium transition-all duration-300 ${
                filtersOpen
                  ? "border-cyan-300 bg-cyan-50 text-cyan-700 dark:border-cyan-500/40 dark:bg-cyan-400/10 dark:text-cyan-200"
                  : "border-slate-200 bg-white text-slate-600 hover:border-cyan-200 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-300"
              }`}
            >
              <SlidersHorizontal size={14} />
              Filters
            </button>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-600 outline-none transition focus:border-cyan-300 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-300"
              aria-label="Sort"
            >
              {SORT_OPTIONS.map((o) => (
                <option key={o.id} value={o.id}>
                  {o.label}
                </option>
              ))}
            </select>
          </div>
        </motion.div>

        <AnimatePresence>
          {filtersOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <div className="mt-3 flex flex-wrap items-center gap-2 rounded-2xl border border-slate-200/70 bg-white/60 p-3 backdrop-blur dark:border-slate-700 dark:bg-slate-900/40">
                {STATUS_FILTERS.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setStatusFilter(s)}
                    className={`rounded-full px-3 py-1.5 text-xs font-semibold transition-all duration-300 ${
                      statusFilter === s
                        ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300"
                    }`}
                  >
                    {s}
                  </button>
                ))}
                {!activeDomain && (
                  <label className="ml-auto inline-flex cursor-pointer items-center gap-2 text-xs font-medium text-slate-600 dark:text-slate-300">
                    <input
                      type="checkbox"
                      checked={showFuture}
                      onChange={(e) => setShowFuture(e.target.checked)}
                      className="accent-cyan-500"
                    />
                    Show future domains
                  </label>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Content */}
        <div className="mt-7">
          {booting ? (
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          ) : (
            <AnimatePresence mode="wait">
              {/* Domain detail */}
              {activeDomain ? (
                <motion.div
                  key={`domain-${activeDomain.id}`}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="mb-6 flex flex-wrap items-start justify-between gap-4 rounded-[22px] border border-slate-200/70 bg-gradient-to-br from-white/80 via-white/60 to-cyan-50/40 p-5 backdrop-blur-xl dark:border-slate-700 dark:from-slate-900/70 dark:via-slate-900/50 dark:to-cyan-950/20">
                    <div className="flex items-start gap-4">
                      {(() => {
                        const Icon = getIcon(activeDomain.icon);
                        return (
                          <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/70 bg-white/90 text-slate-800 shadow-sm dark:border-white/10 dark:bg-slate-800 dark:text-cyan-200">
                            <Icon size={26} />
                          </div>
                        );
                      })()}
                      <div>
                        <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">{activeDomain.id}</p>
                        <h3 className="mt-1 text-2xl font-semibold text-slate-900 dark:text-white">{activeDomain.name}</h3>
                        <p className="mt-1 max-w-2xl text-sm text-slate-600 dark:text-slate-300">{activeDomain.description}</p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => togglePin(activeDomain.id)}
                      className={`inline-flex items-center gap-1.5 rounded-xl border px-3 py-2 text-sm font-medium transition-all duration-300 ${
                        prefs.pinned.includes(activeDomain.id)
                          ? "border-amber-300 bg-amber-50 text-amber-700 dark:border-amber-400/40 dark:bg-amber-400/10 dark:text-amber-200"
                          : "border-slate-200 bg-white text-slate-600 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-300"
                      }`}
                    >
                      <Pin size={14} fill={prefs.pinned.includes(activeDomain.id) ? "currentColor" : "none"} />
                      {prefs.pinned.includes(activeDomain.id) ? "Pinned" : "Pin folder"}
                    </button>
                  </div>

                  <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
                    {domainApps.length === 0 ? (
                      <EmptyState
                        title={activeDomain.planned ? "Capacity reserved" : "No matching applications"}
                        subtitle={
                          activeDomain.planned
                            ? "This domain is reserved for future RTL products at enterprise scale."
                            : "Try adjusting search or status filters."
                        }
                      />
                    ) : (
                      domainApps.map((app, i) => (
                        <ApplicationCard
                          key={app.id}
                          app={app}
                          index={i}
                          favorite={prefs.favorites.includes(app.id)}
                          onToggleFavorite={toggleFavorite}
                          onOpen={(a) => pushRecent({ id: a.id, type: "app", name: a.name, href: a.href })}
                        />
                      ))
                    )}
                  </div>
                </motion.div>
              ) : viewMode === "favorites" ? (
                <motion.div
                  key="favorites"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3"
                >
                  {favoriteApps.length === 0 ? (
                    <EmptyState title="No favorites yet" subtitle="Star any application to pin it here for quick access." />
                  ) : (
                    favoriteApps.map((app, i) => (
                      <ApplicationCard
                        key={app.id}
                        app={app}
                        index={i}
                        favorite
                        onToggleFavorite={toggleFavorite}
                        onOpen={(a) => pushRecent({ id: a.id, type: "app", name: a.name, href: a.href })}
                      />
                    ))
                  )}
                </motion.div>
              ) : viewMode === "recent" ? (
                <motion.div
                  key="recent"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  className="grid grid-cols-1 gap-3 md:grid-cols-2"
                >
                  {prefs.recent.length === 0 ? (
                    <EmptyState title="Nothing recent" subtitle="Open a domain or visit a platform to build your recent history." />
                  ) : (
                    prefs.recent.map((item, i) => (
                      <motion.button
                        key={`${item.id}-${item.at}`}
                        type="button"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.04 }}
                        onClick={() => {
                          if (item.type === "folder") {
                            const d = allDomains.find((x) => x.id === item.id);
                            if (d) openDomain(d);
                          } else if (item.href) {
                            window.open(item.href, "_blank", "noopener,noreferrer");
                          }
                        }}
                        className="flex items-center justify-between rounded-2xl border border-slate-200/80 bg-white/80 px-4 py-3 text-left shadow-sm backdrop-blur transition-all duration-300 hover:-translate-y-0.5 hover:border-cyan-300 hover:shadow-md dark:border-slate-700 dark:bg-slate-900/60"
                      >
                        <div>
                          <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">{item.type}</p>
                          <p className="font-semibold text-slate-800 dark:text-white">{item.name}</p>
                        </div>
                        <Clock3 size={16} className="text-slate-400" />
                      </motion.button>
                    ))
                  )}
                </motion.div>
              ) : viewMode === "coming" ? (
                <motion.div
                  key="coming"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3"
                >
                  <p className="col-span-full mb-1 text-sm font-medium text-slate-600 dark:text-slate-300">
                    Upcoming products aligned with UN Sustainable Development Goals
                  </p>
                  {comingSoonProducts.map((product, i) => (
                    <ApplicationCard
                      key={product.id}
                      app={{
                        ...product,
                        category: "Roadmap",
                        icon: "Rocket",
                        tech: ["Planned"],
                      }}
                      index={i}
                      favorite={false}
                      onToggleFavorite={() => {}}
                    />
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  key="folders"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.35 }}
                  className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3"
                >
                  {filteredFolders.length === 0 ? (
                    <EmptyState title="No domains found" subtitle="Try a different search term or clear filters." />
                  ) : (
                    filteredFolders.map((domain, i) => (
                      <FolderCard
                        key={domain.id}
                        domain={domain}
                        index={i}
                        pinned={prefs.pinned.includes(domain.id)}
                        onOpen={openDomain}
                        onTogglePin={togglePin}
                      />
                    ))
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          )}
        </div>
      </LayoutGroup>
    </section>
  );
}

export default PortfolioExplorer;
