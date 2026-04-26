import { motion } from "framer-motion";
import { ArrowRight, ChartNoAxesCombined, Layers3, ShieldCheck } from "lucide-react";

const productCards = [
  {
    title: "Energy Intelligence Platform",
    description: "Optimize renewable performance, demand planning, and reporting in one control layer.",
    icon: ChartNoAxesCombined,
    status: "Live",
  },
  {
    title: "Sustainability Reporting Suite",
    description: "Automate ESG data collection, validation, and compliance-ready outputs for leadership.",
    icon: Layers3,
    status: "Live",
  },
  {
    title: "Resilience Response Console",
    description: "Monitor high-risk operations with unified response workflows and alert intelligence.",
    icon: ShieldCheck,
    status: "Coming Soon",
  },
];

const staggerContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const staggerItem = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0 },
};

function ProductsSection({ onNavigate }) {
  return (
    <section id="products" className="scroll-mt-24 py-6">
      <p className="text-xs uppercase tracking-[0.2em] text-cyan-700 transition-colors duration-300 dark:text-cyan-200">Our Products</p>
      <h2 className="mt-2 text-2xl font-semibold text-slate-900 transition-colors duration-300 dark:text-white md:text-3xl">Our Products</h2>
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="mt-6 grid gap-5 md:grid-cols-3"
      >
        {productCards.map((card) => (
          <motion.article
            key={card.title}
            variants={staggerItem}
            whileHover={{ y: -8, scale: 1.03, rotateX: 2.2, rotateY: -2.2 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            style={{ willChange: "transform" }}
            className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-colors duration-300 hover:border-cyan-400 hover:shadow-lg dark:border-slate-700 dark:bg-slate-800 dark:hover:border-cyan-300/60 dark:hover:shadow-glow"
          >
            <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-blue-400 via-cyan-300 to-transparent opacity-0 transition duration-300 group-hover:opacity-100" />
            <div className="mb-4 inline-flex items-center gap-2">
              <span className={`rounded-full px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] ${card.status === "Live" ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-300/20 dark:text-emerald-200" : "bg-amber-100 text-amber-700 dark:bg-amber-300/20 dark:text-amber-100"}`}>
                {card.status}
              </span>
            </div>
            <card.icon className="text-cyan-300" size={20} />
            <div className="mt-4 h-16 rounded-xl border border-slate-200 bg-[linear-gradient(130deg,rgba(56,189,248,0.16),rgba(37,99,235,0.08),rgba(219,234,254,0.6))] transition-colors duration-300 dark:border-white/10 dark:bg-[linear-gradient(130deg,rgba(56,189,248,0.15),rgba(37,99,235,0.08),rgba(15,23,42,0.45))]" />
            <h3 className="mt-4 text-xl font-semibold text-slate-900 transition-colors duration-300 dark:text-white">{card.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-slate-600 transition-colors duration-300 dark:text-slate-300">{card.description}</p>
            <button
              onClick={() => onNavigate("contact")}
              className="mt-6 inline-flex items-center gap-2 text-sm text-cyan-700 transition duration-300 group-hover:gap-3 group-hover:text-cyan-600 dark:text-cyan-200 dark:group-hover:text-cyan-100"
            >
              View Details <ArrowRight size={14} />
            </button>
          </motion.article>
        ))}
      </motion.div>
    </section>
  );
}

export default ProductsSection;
