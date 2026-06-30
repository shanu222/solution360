import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";

const fadeInUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.45, ease: "easeOut", delay },
});

const buildItems = [
  "Artificial Intelligence",
  "GIS & Geospatial Intelligence",
  "Digital Twins",
  "Infrastructure Analytics",
  "Climate Intelligence",
  "Remote Monitoring",
  "SaaS Platforms",
  "Data Engineering",
  "Enterprise Software",
];

const impactTags = [
  "SDG 7 - Clean Energy",
  "SDG 9 - Infrastructure",
  "SDG 11 - Sustainable Cities",
  "SDG 13 - Climate Action",
];

const tractionItems = [
  "8+ live applications",
  "Multi-domain platforms (climate, energy, infrastructure, mobility)",
  "Real-world use-case deployments",
  "Scalable architecture ready for institutional adoption",
];

function AboutSection() {
  return (
    <section id="about" className="scroll-mt-24 w-full space-y-6 py-2">
      <motion.article
        {...fadeInUp()}
        className="rounded-3xl border border-slate-200 bg-white/85 p-6 shadow-sm transition-colors duration-300 dark:border-slate-700 dark:bg-slate-800/75 md:p-10"
      >
        <p className="text-xs uppercase tracking-[0.2em] text-cyan-700 transition-colors duration-300 dark:text-cyan-200">
          Company Overview
        </p>
        <h2 className="mt-2 max-w-5xl text-[clamp(30px,5vw,50px)] font-semibold leading-[1.14] text-slate-900 transition-colors duration-300 dark:text-white">
          Building Intelligent Systems for Climate, Infrastructure, and National Resilience
        </h2>
        <p className="mt-4 max-w-4xl text-[clamp(15px,2vw,19px)] text-slate-600 transition-colors duration-300 dark:text-slate-300">
          RESILIENCE TECHNOLOGIES LABS is a Pakistan-based technology company building intelligent digital platforms for disaster resilience, infrastructure management, artificial intelligence, sustainability, education, healthcare, and enterprise transformation.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            to="/products"
            className="inline-flex h-11 items-center justify-center rounded-xl bg-brand-gradient px-6 text-sm font-medium text-white transition hover:scale-105"
          >
            Explore Products
          </Link>
          <Link
            to="/contact"
            title="Request a Demo with RESILIENCE TECHNOLOGIES LABS"
            className="inline-flex h-11 items-center justify-center rounded-xl border border-slate-300 bg-white px-6 text-sm font-medium text-slate-700 transition hover:scale-105 hover:border-cyan-400 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100"
          >
            Request a Demo
          </Link>
        </div>
      </motion.article>

      <div className="grid gap-5 md:grid-cols-2">
        <motion.article
          {...fadeInUp(0.05)}
          className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-colors duration-300 dark:border-slate-700 dark:bg-slate-800 md:p-8"
        >
          <h3 className="text-2xl font-semibold text-slate-900 transition-colors duration-300 dark:text-white">
            Our Mission
          </h3>
          <p className="mt-3 max-w-2xl text-slate-600 transition-colors duration-300 dark:text-slate-300">
            Build intelligent technologies that create safer, smarter, and more resilient communities.
          </p>
        </motion.article>

        <motion.article
          {...fadeInUp(0.1)}
          className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-colors duration-300 dark:border-slate-700 dark:bg-slate-800 md:p-8"
        >
          <h3 className="text-2xl font-semibold text-slate-900 transition-colors duration-300 dark:text-white">
            Our Vision
          </h3>
          <p className="mt-3 max-w-2xl text-slate-600 transition-colors duration-300 dark:text-slate-300">
            Become a global leader in AI-powered resilience technologies and digital infrastructure innovation.
          </p>
        </motion.article>
      </div>

      <motion.article
        {...fadeInUp(0.12)}
        className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-colors duration-300 dark:border-slate-700 dark:bg-slate-800 md:p-8"
      >
        <h3 className="text-2xl font-semibold text-slate-900 transition-colors duration-300 dark:text-white">
          Our solutions combine
        </h3>
        <ul className="mt-4 grid gap-3 md:grid-cols-2">
          {buildItems.map((item) => (
            <li key={item} className="flex items-start gap-2 rounded-xl border border-slate-200 bg-slate-50/70 p-4 text-sm text-slate-700 transition-colors duration-300 dark:border-slate-700 dark:bg-slate-900/45 dark:text-slate-200">
              <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-cyan-600 dark:text-cyan-300" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </motion.article>

      <motion.article
        {...fadeInUp(0.14)}
        className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-colors duration-300 dark:border-slate-700 dark:bg-slate-800 md:p-8"
      >
        <h3 className="text-2xl font-semibold text-slate-900 transition-colors duration-300 dark:text-white">
          Why It Matters
        </h3>
        <p className="mt-3 max-w-4xl text-slate-600 transition-colors duration-300 dark:text-slate-300">
          Climate change, infrastructure failures, and inefficient energy systems are among the biggest challenges of our time. Yet, decision-makers lack integrated, real-time intelligence.
        </p>
        <p className="mt-3 max-w-4xl text-slate-600 transition-colors duration-300 dark:text-slate-300">
          RESILIENCE TECHNOLOGIES LABS bridges this gap by delivering{" "}
          <strong className="text-slate-900 dark:text-white">scalable, data-driven platforms</strong> that turn complex data into clear, actionable insights.
        </p>
      </motion.article>

      <div className="grid gap-5 lg:grid-cols-2">
        <motion.article
          {...fadeInUp(0.16)}
          className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-colors duration-300 dark:border-slate-700 dark:bg-slate-800 md:p-8"
        >
          <h3 className="text-2xl font-semibold text-slate-900 transition-colors duration-300 dark:text-white">
            Global Impact Alignment
          </h3>
          <div className="mt-4 flex flex-wrap gap-2">
            {impactTags.map((tag) => (
              <span key={tag} className="rounded-full border border-cyan-200 bg-cyan-50 px-3 py-1 text-xs font-medium text-cyan-800 transition-colors duration-300 dark:border-cyan-400/40 dark:bg-cyan-500/10 dark:text-cyan-200">
                {tag}
              </span>
            ))}
          </div>
          <p className="mt-4 max-w-2xl text-slate-600 transition-colors duration-300 dark:text-slate-300">
            Our solutions are aligned with global sustainability frameworks and designed to deliver measurable impact across climate, infrastructure, and society.
          </p>
        </motion.article>

        <motion.article
          {...fadeInUp(0.2)}
          className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-colors duration-300 dark:border-slate-700 dark:bg-slate-800 md:p-8"
        >
          <h3 className="text-2xl font-semibold text-slate-900 transition-colors duration-300 dark:text-white">
            What We've Built So Far
          </h3>
          <ul className="mt-4 space-y-2 text-sm text-slate-700 transition-colors duration-300 dark:text-slate-200">
            {tractionItems.map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-500" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </motion.article>
      </div>

      <motion.article
        {...fadeInUp(0.22)}
        className="rounded-3xl border border-slate-200 bg-gradient-to-r from-blue-50 to-cyan-50 p-7 shadow-sm transition-colors duration-300 dark:border-slate-700 dark:from-slate-900 dark:to-slate-800 md:p-9"
      >
        <h3 className="text-2xl font-semibold text-slate-900 transition-colors duration-300 dark:text-white">
          Partner With RESILIENCE TECHNOLOGIES LABS
        </h3>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link
            to="/contact"
            title="Request a Demo with RESILIENCE TECHNOLOGIES LABS"
            className="inline-flex h-11 items-center justify-center rounded-xl bg-brand-gradient px-6 text-sm font-medium text-white transition hover:scale-105"
          >
            Request a Demo
          </Link>
          <Link
            to="/contact"
            className="inline-flex h-11 items-center justify-center rounded-xl border border-slate-300 bg-white px-6 text-sm font-medium text-slate-700 transition hover:scale-105 hover:border-cyan-400 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100"
          >
            Contact Founder
            <ArrowRight size={16} className="ml-2" />
          </Link>
        </div>
      </motion.article>
    </section>
  );
}

export default AboutSection;
