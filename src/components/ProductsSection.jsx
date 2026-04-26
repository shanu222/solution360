import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useMemo, useState } from "react";

const liveProducts = [
  {
    name: "CSS360",
    href: "https://css360.onrender.com/",
    sdg: "SDGs 4, 8",
    description:
      "AI-powered preparation platform for civil service aspirants, improving access to quality education and career opportunities.",
  },
  {
    name: "NET360 Preparation",
    href: "https://www.net360preparation.com/",
    sdg: "SDG 4",
    description: "Smart learning platform for NUST entry test preparation with structured content and performance tracking.",
  },
  {
    name: "Resilience360",
    href: "https://resilience360-production.up.railway.app/",
    sdg: "SDGs 9, 11, 13",
    description: "Infrastructure resilience platform for retrofit planning, cost estimation, and climate risk reduction.",
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
    name: "Structural Health Monitoring",
    href: "https://shm-7701wacs7-shanu1998end-afks-projects.vercel.app/",
    sdg: "SDGs 9, 11",
    description: "Real-time monitoring of infrastructure health to ensure safety and long-term resilience.",
  },
  {
    name: "Stakeholder Inventory Portal",
    href: "https://stakeholder-inventory-portal.vercel.app/",
    sdg: "SDGs 9, 16",
    description: "Centralized system for managing stakeholders and resources to improve coordination and transparency.",
  },
  {
    name: "Green Building Portal",
    href: "https://iapd.online/",
    sdg: "SDGs 11, 12",
    description: "Platform for green building standards, compliance, and sustainable construction practices.",
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
                whileHover={{ y: -6, scale: 1.01 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-colors duration-300 hover:border-cyan-400 hover:shadow-[0_14px_35px_rgba(6,182,212,0.16)] dark:border-slate-700 dark:bg-slate-800 dark:hover:border-cyan-300/60 dark:hover:shadow-glow"
              >
                <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-blue-400 via-cyan-300 to-transparent opacity-0 transition duration-300 group-hover:opacity-100" />
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
                </div>

                <h3 className="mt-4 text-xl font-semibold text-slate-900 transition-colors duration-300 dark:text-white">
                  {product.name}
                </h3>
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
                    className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-slate-700 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200"
                  >
                    Visit App <ArrowRight size={14} />
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
