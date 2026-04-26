import { motion } from "framer-motion";
import { Bot, DatabaseZap, Lightbulb, Workflow } from "lucide-react";

const steps = [
  { title: "Data Collection", icon: DatabaseZap, desc: "Connect operational, sustainability, and reporting data from your core systems." },
  { title: "AI Processing", icon: Bot, desc: "Apply ML-assisted models to classify, enrich, and prioritize what matters most." },
  { title: "Insights Generation", icon: Lightbulb, desc: "Transform processed data into clear KPIs, risk signals, and executive-ready views." },
  { title: "Decision Support", icon: Workflow, desc: "Enable teams to act with guided workflows, alerts, and measurable outcomes." },
];

const staggerContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const staggerItem = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0 },
};

function HowItWorks() {
  return (
    <section id="how-it-works" className="scroll-mt-24 py-6">
      <p className="text-xs uppercase tracking-[0.2em] text-cyan-700 transition-colors duration-300 dark:text-cyan-200">How It Works</p>
      <h2 className="mt-2 text-2xl font-semibold text-slate-900 transition-colors duration-300 dark:text-white md:text-3xl">A clear four-step delivery process.</h2>
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-4"
      >
        {steps.map((step, index) => (
          <motion.div key={step.title} variants={staggerItem} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-colors duration-300 dark:border-slate-700 dark:bg-slate-800">
            <step.icon size={20} className="text-cyan-300" />
            <p className="mt-3 text-xs uppercase tracking-[0.18em] text-cyan-700 transition-colors duration-300 dark:text-cyan-100">Step {index + 1}</p>
            <h3 className="mt-2 text-xl font-semibold text-slate-900 transition-colors duration-300 dark:text-white">{step.title}</h3>
            <p className="mt-2 text-sm text-slate-600 transition-colors duration-300 dark:text-slate-300">{step.desc}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

export default HowItWorks;
