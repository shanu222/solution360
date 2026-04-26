import { motion } from "framer-motion";
import {
  BookOpenCheck,
  Building2,
  Car,
  DatabaseZap,
  ExternalLink,
  GraduationCap,
  HardHat,
  Layers3,
  Radar,
  School,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";

const categories = [
  {
    title: "Education Platforms",
    theme: "from-cyan-400/15 to-blue-500/10",
    apps: [
      {
        name: "CSS360",
        href: "https://css360.onrender.com/",
        description: "Interactive learning platform for curated exam prep and guided student progress.",
        icon: School,
      },
      {
        name: "NET360 Preparation",
        href: "https://www.net360preparation.com/",
        description: "Focused preparation suite with structured pathways and smart revision support.",
        icon: BookOpenCheck,
      },
    ],
  },
  {
    title: "Infrastructure & Engineering",
    theme: "from-blue-400/15 to-indigo-500/10",
    apps: [
      {
        name: "Resilience360",
        href: "https://resilience360-production.up.railway.app/",
        description: "Operational resilience platform for risk awareness, response planning, and continuity.",
        icon: ShieldCheck,
      },
      {
        name: "Structural Health Monitoring",
        href: "https://shm-7701wacs7-shanu1998end-afks-projects.vercel.app/",
        description: "Engineering analytics dashboard for monitoring structural safety signals in real time.",
        icon: Radar,
      },
      {
        name: "Green Building Portal",
        href: "https://iapd.online/",
        description: "Sustainability workflow hub supporting efficient planning for green infrastructure.",
        icon: Building2,
      },
    ],
  },
  {
    title: "Data & Climate Systems",
    theme: "from-emerald-400/15 to-cyan-500/10",
    apps: [
      {
        name: "NDMA Geo Resilience Dashboard",
        href: "https://ndma-geo-resilience-bashboard-production.up.railway.app/",
        description: "Geo-enabled intelligence dashboard for resilience mapping and domain-level coordination.",
        icon: DatabaseZap,
      },
    ],
  },
  {
    title: "Mobility & Services",
    theme: "from-violet-400/15 to-blue-500/10",
    apps: [
      {
        name: "Carpool App",
        href: "https://carpool-app-frontend-production.up.railway.app/",
        description: "Mobility coordination app that improves ride sharing, routes, and service efficiency.",
        icon: Car,
      },
      {
        name: "Stakeholder Inventory Portal",
        href: "https://stakeholder-inventory-portal.vercel.app/",
        description: "Inventory and stakeholder operations portal for structured collaboration and visibility.",
        icon: Users,
      },
    ],
  },
  {
    title: "AI & Interactive Applications",
    subtitle: "AI-powered tools for real-time visualization and user interaction",
    theme: "from-fuchsia-400/18 via-purple-500/12 to-cyan-500/12",
    delay: 0.08,
    experimental: true,
    apps: [
      {
        name: "Virtual Hairstyle Try-On",
        href: "https://virtual-hairstyle-try-on-app.onrender.com/",
        description:
          "An AI-powered tool that allows users to try different hairstyles virtually in real-time using image processing and computer vision.",
        icon: Sparkles,
        status: "AI Powered",
        ctaLabel: "Try Now",
      },
    ],
  },
];

const sectionFade = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.45, ease: "easeOut" },
};

const categoryStagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const cardStagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const itemFade = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0 },
};

function ApplicationsSection() {
  return (
    <section id="applications" className="py-10">
      <motion.div {...sectionFade} className="mb-6">
        <p className="text-xs uppercase tracking-[0.2em] text-cyan-700 transition-colors duration-300 dark:text-cyan-200">Our Applications</p>
        <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 transition-colors duration-300 dark:text-white md:text-3xl">Our Applications</h2>
        <p className="mt-2 max-w-2xl text-sm text-slate-600 transition-colors duration-300 dark:text-slate-300 md:text-base">
          Explore our growing ecosystem of AI-powered platforms.
        </p>
        <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-cyan-300/60 bg-cyan-100/80 px-4 py-1.5 text-xs font-semibold tracking-[0.14em] text-cyan-700 transition-colors duration-300 dark:border-cyan-300/35 dark:bg-cyan-300/10 dark:text-cyan-100">
          <Layers3 size={14} />
          8+ Live Platforms | Serving Multiple Domains
        </div>
      </motion.div>

      <motion.div
        variants={categoryStagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.15 }}
        className="space-y-5"
      >
        {categories.map((category) => (
          <motion.div
            key={category.title}
            variants={itemFade}
            transition={{ duration: 0.45, delay: category.delay ?? 0 }}
            className={`rounded-3xl border border-slate-200 bg-gradient-to-br p-4 shadow-sm transition-colors duration-300 dark:border-white/10 dark:backdrop-blur-sm md:p-6 ${category.theme}`}
          >
            <div className="mb-4 flex items-center gap-2">
              <HardHat size={16} className="text-cyan-700 transition-colors duration-300 dark:text-cyan-200" />
              <h3 className="text-lg font-semibold text-slate-900 transition-colors duration-300 dark:text-white md:text-xl">{category.title}</h3>
            </div>
            {category.subtitle && <p className="mb-4 text-sm text-slate-600 transition-colors duration-300 dark:text-slate-200/90">{category.subtitle}</p>}

            <motion.div variants={cardStagger} className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
              {category.apps.map((app) => (
                <motion.article
                  key={app.name}
                  variants={itemFade}
                  whileHover={{ y: -8, scale: 1.03 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className={`group relative overflow-hidden rounded-2xl border border-slate-200 p-5 shadow-sm transition-colors duration-300 hover:border-cyan-400 hover:shadow-lg dark:border-slate-700 dark:shadow-[0_10px_30px_rgba(2,6,23,0.25)] dark:hover:border-cyan-300/50 dark:hover:shadow-glow ${
                    category.experimental ? "bg-gradient-to-br from-white to-fuchsia-50 dark:from-slate-900/70 dark:to-purple-950/35" : "bg-white dark:bg-slate-950/45"
                  }`}
                >
                  <motion.div
                    aria-hidden="true"
                    className="pointer-events-none absolute -left-1/3 top-0 h-full w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    animate={{ x: ["-140%", "320%"] }}
                    transition={{ duration: 3.6, repeat: Number.POSITIVE_INFINITY, repeatDelay: 2.4, ease: "easeInOut" }}
                  />
                  <app.icon size={18} className="text-cyan-300" />
                  {(app.status || category.experimental) && (
                    <span className="mt-3 inline-flex rounded-full border border-fuchsia-300/60 bg-fuchsia-100 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-fuchsia-700 transition-colors duration-300 dark:border-fuchsia-300/40 dark:bg-fuchsia-300/15 dark:text-fuchsia-100">
                      {app.status || "AI Powered"}
                    </span>
                  )}
                  <h4 className="mt-4 text-base font-semibold text-slate-900 transition-colors duration-300 dark:text-white">{app.name}</h4>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600 transition-colors duration-300 dark:text-slate-300">{app.description}</p>
                  <a
                    href={app.href}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-5 inline-flex items-center gap-2 text-sm text-cyan-700 transition duration-300 hover:text-cyan-600 dark:text-cyan-200 dark:hover:text-cyan-100"
                  >
                    <span className="link-slide">{app.ctaLabel || "Visit App"}</span>
                    <motion.span
                      className="inline-flex"
                      initial={{ x: 0 }}
                      whileHover={{ x: 3 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ExternalLink size={14} />
                    </motion.span>
                  </a>
                </motion.article>
              ))}
            </motion.div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

export default ApplicationsSection;
