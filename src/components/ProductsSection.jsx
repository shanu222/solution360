import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { useMemo, useState } from "react";

const liveProducts = [
  {
    name: "She360",
    href: "https://ai-platform-for-women-empowerment.vercel.app/",
    sdg: "SDG 3, SDG 5, SDG 8, SDG 10",
    isFeatured: true,
    isFlagship: true,
    badge: "FLAGSHIP PRODUCT",
    icon: Sparkles,
    description:
      "AI-powered women empowerment platform for Pakistan, providing health guidance, safety support, financial inclusion, and legal awareness through intelligent systems.",
  },
  {
    name: "CSS360",
    href: "https://css360.onrender.com/",
    sdg: "SDGs 4, 8",
    description:
      "AI-powered preparation platform for civil service aspirants, improving access to quality education and career opportunities.",
  },
  {
    name: "Resilience360",
    href: "https://resilience360-production.up.railway.app/",
    sdg: "SDGs 9, 11, 13",
    isFeatured: true,
    description: "Infrastructure resilience platform for retrofit planning, cost estimation, and climate risk reduction.",
  },
  {
    name: "Green Building Portal",
    href: "https://iapd.online/",
    sdg: "SDGs 11, 12",
    isFeatured: true,
    description: "Platform for green building standards, compliance, and sustainable construction practices.",
  },
  {
    name: "Structural Health Monitoring",
    href: "https://shm-7701wacs7-shanu1998end-afks-projects.vercel.app/",
    sdg: "SDGs 9, 11",
    isFeatured: true,
    description: "Real-time monitoring of infrastructure health to ensure safety and long-term resilience.",
  },
  {
    name: "NDMA Dashboard",
    href: "https://ndma-geo-resilience-bashboard-production.up.railway.app/",
    sdg: "SDGs 11, 13",
    description: "Real-time disaster monitoring and geospatial intelligence system for climate risk management.",
  },
  {
    name: "Carpool App",
    href: "https://carpool-app-frontend-production.up.railway.app/",
    sdg: "SDGs 11, 13",
    description: "Intercity ride-sharing platform reducing emissions and promoting sustainable transportation.",
  },
  {
    name: "Stakeholder Inventory Portal",
    href: "https://stakeholder-inventory-portal.vercel.app/",
    sdg: "SDGs 9, 16",
    description: "Centralized system for managing stakeholders and resources to improve coordination and transparency.",
  },
  {
    name: "NET360 Preparation",
    href: "https://www.net360preparation.com/",
    sdg: "SDG 4",
    description: "Smart learning platform for NUST entry test preparation with structured content and performance tracking.",
  },
  {
    name: "Virtual Hairstyle Try-On",
    href: "https://virtual-hairstyle-try-on-app.onrender.com/",
    sdg: "SDGs 8, 9",
    description: "AI-powered visual tool enhancing digital services and user experience in consumer applications.",
  },
];

const comingSoonProducts = [
  {
    name: "Smart Agriculture & Food Security Platform",
    sdg: "SDGs 2, 12",
    description: "AI-powered crop monitoring, yield prediction, and supply chain optimization.",
  },
  {
    name: "Digital Health Access System",
    sdg: "SDG 3",
    description: "Remote health monitoring and accessible digital healthcare solutions.",
  },
  {
    name: "AI-Powered Education Platform",
    sdg: "SDG 4",
    description: "Personalized AI learning systems for accessible and adaptive education.",
  },
  {
    name: "Water Resource Intelligence System",
    sdg: "SDG 6",
    description: "Real-time monitoring and optimization of water resources.",
  },
  {
    name: "Clean Energy Optimization Platform",
    sdg: "SDGs 7, 13",
    description: "Optimize renewable energy usage and reduce emissions.",
  },
  {
    name: "Smart Infrastructure & Urban Resilience Platform",
    sdg: "SDGs 9, 11",
    description: "Infrastructure monitoring and resilient city planning tools.",
  },
  {
    name: "Climate Risk & Disaster Intelligence System",
    sdg: "SDG 13",
    description: "AI-driven forecasting and disaster preparedness systems.",
  },
  {
    name: "Green Building Compliance Platform",
    sdg: "SDGs 11, 12",
    description: "Sustainability scoring and compliance tracking for buildings.",
  },
  {
    name: "Environmental Monitoring & Biodiversity Tracker",
    sdg: "SDGs 14, 15",
    description: "Ecosystem monitoring and biodiversity analytics.",
  },
  {
    name: "Governance & Transparency Dashboard",
    sdg: "SDG 16",
    description: "Data-driven governance, transparency, and reporting tools.",
  },
];

function ProductsSection() {
  const [activeTab, setActiveTab] = useState("live");
  const products = useMemo(() => (activeTab === "live" ? liveProducts : comingSoonProducts), [activeTab]);

  return (
    <section id="products" className="scroll-mt-24 w-full py-2">
      <p className="text-xs uppercase tracking-[0.2em] text-cyan-700 transition-colors duration-300 dark:text-cyan-200">Our Products</p>
      <h2 className="mt-2 text-[clamp(28px,5vw,48px)] font-semibold text-slate-900 transition-colors duration-300 dark:text-white">Our Products</h2>

      <div className="mt-7 flex justify-center sm:justify-start">
        <div className="inline-flex rounded-full border border-slate-200 bg-white/90 p-1 shadow-sm transition-colors duration-300 dark:border-slate-700 dark:bg-slate-800">
          {[
            { id: "live", label: "Live" },
            { id: "coming", label: "Coming Soon" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`relative rounded-full px-5 py-2 text-sm font-medium transition-all duration-300 ${
                activeTab === tab.id
                  ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow"
                  : "text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="mt-6"
        >
          {activeTab === "coming" && (
            <p className="mb-5 text-sm font-medium text-slate-600 transition-colors duration-300 dark:text-slate-300">
              Upcoming products aligned with UN Sustainable Development Goals (SDGs)
            </p>
          )}
          {activeTab === "live" && (
            <p className="mb-5 text-sm font-medium text-slate-600 transition-colors duration-300 dark:text-slate-300">
              Live platforms contributing to UN Sustainable Development Goals
            </p>
          )}

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <motion.article
                key={product.name}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                whileHover={{ y: -8, scale: product.isFlagship ? 1.05 : 1.01 }}
                className={`group relative overflow-hidden rounded-2xl border bg-white p-6 transition-all duration-300 dark:bg-slate-800 ${
                  product.isFlagship && activeTab === "live"
                    ? "md:col-span-2 lg:col-span-2 border-emerald-300 shadow-[0_18px_45px_rgba(16,185,129,0.28)] dark:border-emerald-300/70"
                    : product.isFeatured && activeTab === "live"
                      ? "border-cyan-300 shadow-[0_14px_35px_rgba(6,182,212,0.18)] dark:border-cyan-300/60 dark:shadow-glow"
                    : "border-slate-200 shadow-sm hover:border-cyan-400 hover:shadow-[0_14px_35px_rgba(6,182,212,0.16)] dark:border-slate-700 dark:hover:border-cyan-300/60 dark:hover:shadow-glow"
                }`}
              >
                {product.isFlagship && activeTab === "live" && (
                  <>
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-emerald-100/70 via-cyan-50/60 to-teal-100/70 opacity-70 dark:from-emerald-500/10 dark:via-cyan-400/10 dark:to-teal-400/10" />
                    <div className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full bg-emerald-300/30 blur-2xl transition duration-300 group-hover:bg-emerald-300/50 dark:bg-emerald-400/20 dark:group-hover:bg-emerald-300/35" />
                  </>
                )}
                <div
                  className={`absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r opacity-0 transition duration-300 group-hover:opacity-100 ${
                    product.isFlagship && activeTab === "live"
                      ? "from-emerald-400 via-cyan-300 to-teal-400"
                      : "from-blue-400 via-cyan-300 to-transparent"
                  }`}
                />
                <div className="flex flex-wrap items-center gap-2">
                  <span
                    className={`rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] ${
                      activeTab === "live"
                        ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-300/20 dark:text-emerald-200"
                        : "bg-amber-100 text-amber-700 dark:bg-amber-300/20 dark:text-amber-100"
                    }`}
                  >
                    {activeTab === "live" ? "LIVE" : "COMING SOON"}
                  </span>
                  {product.isFlagship && activeTab === "live" && (
                    <span className="rounded-full border border-emerald-300 bg-emerald-100 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-emerald-700 dark:border-emerald-300/40 dark:bg-emerald-400/10 dark:text-emerald-200">
                      {product.badge || "FLAGSHIP PRODUCT"}
                    </span>
                  )}
                  {product.isFeatured && activeTab === "live" && (
                    <span className="rounded-full border border-blue-200 bg-blue-50 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-blue-700 dark:border-blue-300/30 dark:bg-blue-400/10 dark:text-blue-200">
                      Featured
                    </span>
                  )}
                </div>

                <div className="relative mt-4 flex items-center gap-3">
                  {product.icon && activeTab === "live" && (
                    <div className="relative inline-flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700 dark:bg-emerald-400/15 dark:text-emerald-200">
                      <product.icon size={18} />
                      {product.isFlagship && (
                        <span className="absolute -right-1 -top-1 h-2.5 w-2.5 animate-pulse rounded-full bg-emerald-400" />
                      )}
                    </div>
                  )}
                  <h3 className="text-xl font-semibold text-slate-900 transition-colors duration-300 dark:text-white">
                    {product.name}
                  </h3>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-slate-600 transition-colors duration-300 dark:text-slate-300">
                  {product.description}
                </p>
                {product.sdg && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    <span className="rounded-full border border-cyan-200 bg-cyan-50 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-cyan-700 dark:border-cyan-300/30 dark:bg-cyan-300/10 dark:text-cyan-200">
                      {product.sdg}
                    </span>
                  </div>
                )}

                {activeTab === "live" ? (
                  <a
                    href={product.href}
                    target="_blank"
                    rel="noreferrer"
                    className={`mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium text-white transition ${
                      product.isFlagship && activeTab === "live"
                        ? "bg-gradient-to-r from-emerald-600 to-cyan-500 shadow-[0_12px_28px_rgba(16,185,129,0.35)] group-hover:brightness-110"
                        : "bg-slate-900 hover:bg-slate-700 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200"
                    }`}
                  >
                    Visit Platform <ArrowRight size={14} />
                  </a>
                ) : (
                  <button
                    disabled
                    className="mt-6 inline-flex w-full cursor-not-allowed items-center justify-center rounded-xl border border-slate-300 bg-slate-100 px-4 py-2.5 text-sm font-medium text-slate-500 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-400"
                  >
                    Coming Soon
                  </button>
                )}
              </motion.article>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </section>
  );
}

export default ProductsSection;
