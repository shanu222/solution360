import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.45, ease: "easeOut" },
};

function AboutSection() {
  return (
    <section id="about" className="scroll-mt-24 py-6">
      <p className="text-xs uppercase tracking-[0.2em] text-cyan-700 transition-colors duration-300 dark:text-cyan-200">Who We Are</p>
      <h2 className="mt-2 text-2xl font-semibold text-slate-900 transition-colors duration-300 dark:text-white md:text-3xl">Mission-driven product team for sustainability outcomes.</h2>
      <motion.div {...fadeInUp} className="mt-6 grid gap-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_16px_36px_rgba(148,163,184,0.22)] transition-colors duration-300 dark:border-white/10 dark:bg-gradient-to-br dark:from-white/[0.04] dark:to-white/[0.02] dark:shadow-[0_16px_40px_rgba(2,6,23,0.35)] md:grid-cols-2 md:p-10">
        <div className="space-y-4 text-slate-600 transition-colors duration-300 dark:text-slate-300">
          <p>
            SustainableSolution360 helps governments, enterprises, and NGOs modernize sustainability and resilience operations without introducing complexity.
          </p>
          <p>
            Our mission is to turn fragmented data into trusted intelligence, and our vision is to make climate and operational decisions faster, clearer, and measurable.
          </p>
          <p>
            We build and operate AI-enabled software products that combine clean interfaces, dependable data pipelines, and decision support teams can use every day.
          </p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-gradient-to-br from-blue-50 to-cyan-50 p-6 transition-colors duration-300 dark:border-white/10 dark:from-blue-500/20 dark:to-cyan-400/10">
          <p className="text-sm uppercase tracking-[0.18em] text-cyan-700 transition-colors duration-300 dark:text-cyan-200">What we do</p>
          <ul className="mt-4 space-y-3 text-slate-700 transition-colors duration-300 dark:text-slate-200">
            {["Design-led delivery", "Data-first architecture", "AI-assisted decision support"].map((item) => (
              <li key={item} className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-cyan-300" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </motion.div>
    </section>
  );
}

export default AboutSection;
