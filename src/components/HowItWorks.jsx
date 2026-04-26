import { motion } from "framer-motion";
import { ArrowRight, Bot, CloudSun, DatabaseZap, Lightbulb, Radar, Satellite, ShieldAlert, Workflow, Wrench } from "lucide-react";
import { Link } from "react-router-dom";

const steps = [
  {
    title: "Data Collection",
    icon: DatabaseZap,
    description: "Collect trusted multi-source data streams from field systems and public agencies.",
    points: ["IoT sensors", "Government datasets", "Satellite/weather APIs"],
  },
  {
    title: "AI Processing",
    icon: Bot,
    description: "Run machine-learning pipelines that structure, classify, and prioritize risk signals.",
    points: ["Machine learning models", "Risk classification", "Pattern detection"],
  },
  {
    title: "Insights Generation",
    icon: Lightbulb,
    description: "Convert complex datasets into strategic intelligence for leadership and operations teams.",
    points: ["KPI dashboards", "Risk alerts", "Predictive analytics"],
  },
  {
    title: "Decision Support",
    icon: Workflow,
    description: "Activate guided response workflows with recommendations, alerts, and execution visibility.",
    points: ["Real-time alerts", "Recommendations", "Operational workflows"],
  },
];

const useCases = [
  { title: "Infrastructure Monitoring", description: "Track structural risk and maintenance priorities across critical assets.", icon: Wrench },
  { title: "Climate Risk Analysis", description: "Identify location-level climate threats and early warning requirements.", icon: ShieldAlert },
  { title: "Energy Optimization", description: "Surface demand and generation insights to improve energy efficiency outcomes.", icon: CloudSun },
  { title: "Sustainability Reporting", description: "Generate investor-ready sustainability metrics with auditable data trails.", icon: Radar },
];

function HowItWorks() {
  return (
    <section id="how-it-works" className="scroll-mt-24 w-full py-20">
      <div className="rounded-3xl border border-slate-200 bg-white/80 p-6 shadow-sm transition-colors duration-300 dark:border-slate-700 dark:bg-slate-800/70 md:p-10">
        <p className="text-xs uppercase tracking-[0.2em] text-cyan-700 transition-colors duration-300 dark:text-cyan-200">How It Works</p>
        <h2 className="mt-2 text-[clamp(30px,5vw,50px)] font-semibold leading-[1.14] text-slate-900 transition-colors duration-300 dark:text-white">How SustainableSolution360 Works</h2>
        <p className="mt-4 max-w-4xl text-[clamp(15px,2vw,19px)] text-slate-600 transition-colors duration-300 dark:text-slate-300">
          A unified platform that transforms raw data into actionable intelligence for climate, infrastructure, and sustainability.
        </p>

        <div className="mt-8 grid items-center gap-5 rounded-2xl border border-slate-200 bg-slate-50/70 p-5 transition-colors duration-300 dark:border-slate-700 dark:bg-slate-900/50 md:grid-cols-[1.2fr_1fr]">
          <div className="flex flex-wrap items-center gap-3 text-sm font-medium text-slate-700 dark:text-slate-200">
            <span className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 dark:bg-slate-800"><DatabaseZap size={14} /> Data</span>
            <ArrowRight size={14} className="text-cyan-500" />
            <span className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 dark:bg-slate-800"><Bot size={14} /> AI</span>
            <ArrowRight size={14} className="text-cyan-500" />
            <span className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 dark:bg-slate-800"><Lightbulb size={14} /> Insights</span>
            <ArrowRight size={14} className="text-cyan-500" />
            <span className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 dark:bg-slate-800"><Workflow size={14} /> Actions</span>
          </div>
          <div className="rounded-xl bg-white px-4 py-3 text-xs text-slate-600 shadow-sm dark:bg-slate-800 dark:text-slate-300">
            Unified data flow across climate monitoring, infrastructure resilience, and sustainability operations.
          </div>
        </div>
      </div>

      <div className="relative mt-10">
        <div className="pointer-events-none absolute left-5 top-0 h-full w-px bg-slate-200 dark:bg-slate-700 md:left-0 md:top-12 md:h-px md:w-full" />
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {steps.map((step, index) => (
            <motion.article
              key={step.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.35, delay: index * 0.06 }}
              className="relative rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md dark:border-slate-700 dark:bg-slate-800"
            >
              <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-full bg-cyan-50 text-cyan-600 dark:bg-cyan-500/10 dark:text-cyan-300">
                <step.icon size={18} />
              </div>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-cyan-700 dark:text-cyan-200">Step {index + 1}</p>
              <h3 className="mt-2 text-lg font-semibold text-slate-900 dark:text-white">{step.title}</h3>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{step.description}</p>
              <ul className="mt-3 space-y-1.5 text-sm text-slate-700 dark:text-slate-200">
                {step.points.map((point) => (
                  <li key={point} className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-cyan-500" />
                    {point}
                  </li>
                ))}
              </ul>
            </motion.article>
          ))}
        </div>
      </div>

      <div className="mt-12">
        <h3 className="text-2xl font-semibold text-slate-900 transition-colors duration-300 dark:text-white">How It Delivers Value</h3>
        <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
          {useCases.map((item, index) => (
            <motion.article
              key={item.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.35, delay: index * 0.06 }}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md dark:border-slate-700 dark:bg-slate-800"
            >
              <item.icon size={18} className="text-cyan-600 dark:text-cyan-300" />
              <h4 className="mt-3 text-lg font-semibold text-slate-900 dark:text-white">{item.title}</h4>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{item.description}</p>
            </motion.article>
          ))}
        </div>
      </div>

      <div className="mt-12 rounded-3xl border border-slate-200 bg-gradient-to-r from-blue-50 to-cyan-50 p-8 shadow-sm transition-colors duration-300 dark:border-slate-700 dark:from-slate-900 dark:to-slate-800">
        <h3 className="text-2xl font-semibold text-slate-900 dark:text-white">Ready to transform your operations?</h3>
        <p className="mt-2 max-w-2xl text-sm text-slate-600 dark:text-slate-300">
          Deploy a unified intelligence layer for climate resilience, infrastructure monitoring, and sustainability outcomes.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link to="/contact" className="btn-premium inline-flex h-11 items-center justify-center rounded-xl bg-brand-gradient px-6 text-sm font-medium text-white transition hover:scale-105">
            Request Demo
          </Link>
          <Link to="/products" className="inline-flex h-11 items-center justify-center rounded-xl border border-slate-300 bg-white px-6 text-sm font-medium text-slate-700 transition hover:scale-105 hover:border-cyan-400 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100">
            View Products
          </Link>
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;
