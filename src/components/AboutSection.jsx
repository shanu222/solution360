import { motion } from "framer-motion";
import { BadgeCheck, Download, FileText } from "lucide-react";
import { Link } from "react-router-dom";
import { capabilities, corporateFacts } from "../data/company";
import ClosingCTA from "./ClosingCTA";
import { CountUp, Magnetic, Reveal, ScrollHighlight, easeOut } from "./motion/primitives";
import PageHeader from "./PageHeader";

const impactTags = ["SDG 7, Clean energy", "SDG 9, Infrastructure", "SDG 11, Sustainable cities", "SDG 13, Climate action"];

const tractionItems = [
  "Multi-domain platforms across climate, energy, infrastructure and mobility",
  "Real-world use-case deployments",
  "Scalable architecture ready for institutional adoption",
];

const corporateTrustBadges = ["SECP registered", "Incorporated in Pakistan", "Limited by shares", "AI and infrastructure technology company"];

const sectionLabel = "text-sm text-slate-500 dark:text-slate-400";

function AboutSection() {
  return (
    <section id="about" className="scroll-mt-24 space-y-24 sm:space-y-32">
      <PageHeader
        kicker="Who we are"
        title="Building intelligent systems for climate, infrastructure and national resilience"
        intro="Resilience Technologies Labs is a Pakistan-based technology company building intelligent digital platforms for disaster resilience, infrastructure management, artificial intelligence, sustainability, education, healthcare and enterprise transformation."
      >
        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <Magnetic>
            <Link
              to="/products"
              className="btn-premium inline-flex h-12 w-full items-center justify-center rounded-full bg-brand-gradient px-7 font-medium text-white shadow-glow sm:w-auto"
            >
              Explore products
            </Link>
          </Magnetic>
          <Link
            to="/contact"
            title="Request a Demo with RESILIENCE TECHNOLOGIES LABS"
            className="inline-flex h-12 items-center justify-center rounded-full border border-slate-900/15 px-7 font-medium text-slate-800 transition-colors hover:border-slate-900/40 dark:border-white/20 dark:text-white dark:hover:border-white/50"
          >
            Request a demo
          </Link>
        </div>
      </PageHeader>

      {/* Mission and vision */}
      <div className="px-5 sm:px-6">
        <div className="mx-auto grid w-full max-w-7xl gap-12 md:grid-cols-2 md:gap-0">
          {[
            { label: "Our mission", text: "Build intelligent technologies that create safer, smarter, and more resilient communities." },
            { label: "Our vision", text: "Become a global leader in AI-powered resilience technologies and digital infrastructure innovation." },
          ].map((item, index) => (
            <Reveal key={item.label} delay={index * 0.1} className={index === 1 ? "md:border-l md:border-slate-900/10 md:pl-12 dark:md:border-white/10" : "md:pr-12"}>
              <h2 className={sectionLabel}>{item.label}</h2>
              <p className="mt-4 text-[clamp(24px,2.6vw,34px)] font-medium leading-[1.2] tracking-[-0.02em] text-slate-900 dark:text-white">{item.text}</p>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Why it matters */}
      <div className="px-5 sm:px-6">
        <div className="mx-auto grid w-full max-w-7xl gap-8 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <h2 className={sectionLabel}>Why it matters</h2>
          </Reveal>
          <div className="lg:col-span-8">
            <ScrollHighlight
              text="Climate change, infrastructure failures and inefficient energy systems are among the biggest challenges of our time. Yet decision-makers lack integrated, real-time intelligence."
              className="text-[clamp(24px,3.1vw,40px)] font-medium leading-[1.22] tracking-[-0.025em] text-slate-900 dark:text-white"
            />
            <Reveal>
              <p className="mt-8 max-w-[56ch] text-[17px] leading-relaxed text-slate-600 dark:text-slate-300">
                We bridge this gap by delivering <strong className="font-semibold text-slate-900 dark:text-white">scalable, data-driven platforms</strong> that turn
                complex data into clear, actionable insights.
              </p>
            </Reveal>
          </div>
        </div>
      </div>

      {/* Capabilities */}
      <div className="px-5 sm:px-6">
        <div className="mx-auto w-full max-w-7xl">
          <Reveal>
            <h2 className="text-[clamp(28px,3.6vw,46px)] font-semibold leading-[1.05] tracking-[-0.03em] text-slate-900 dark:text-white">Our solutions combine</h2>
          </Reveal>
          <ul className="mt-10 grid border-t border-slate-900/10 dark:border-white/10 sm:grid-cols-2 lg:grid-cols-3">
            {capabilities.map((item, index) => (
              <motion.li
                key={item}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.6, ease: easeOut, delay: (index % 3) * 0.08 }}
                className="group flex items-center justify-between border-b border-slate-900/10 py-5 pr-6 dark:border-white/10"
              >
                <span className="text-lg font-medium text-slate-800 transition-transform duration-500 ease-out group-hover:translate-x-1.5 dark:text-slate-100">{item}</span>
                <span className="h-1.5 w-1.5 rounded-full bg-slate-300 transition-colors duration-500 group-hover:bg-signal-500 dark:bg-slate-600" />
              </motion.li>
            ))}
          </ul>
        </div>
      </div>

      {/* Traction and impact */}
      <div className="px-5 sm:px-6">
        <div className="mx-auto grid w-full max-w-7xl gap-12 lg:grid-cols-2">
          <Reveal>
            <h2 className={sectionLabel}>What we have built so far</h2>
            <p className="mt-4 text-[clamp(64px,9vw,120px)] font-semibold leading-none tracking-[-0.05em] text-slate-900 dark:text-white">
              <CountUp value={8} suffix="+" />
            </p>
            <p className="mt-2 text-lg text-slate-600 dark:text-slate-300">live applications</p>
            <ul className="mt-8 space-y-3 border-t border-slate-900/10 pt-6 text-[15.5px] text-slate-700 dark:border-white/10 dark:text-slate-200">
              {tractionItems.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-2.5 h-1 w-3 shrink-0 rounded-full bg-brand-500" />
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className={sectionLabel}>Global impact alignment</h2>
            <p className="mt-4 text-[clamp(64px,9vw,120px)] font-semibold leading-none tracking-[-0.05em] text-slate-900 dark:text-white">
              <CountUp value={impactTags.length} />
            </p>
            <p className="mt-2 text-lg text-slate-600 dark:text-slate-300">UN Sustainable Development Goals</p>
            <div className="mt-8 flex flex-wrap gap-2 border-t border-slate-900/10 pt-6 dark:border-white/10">
              {impactTags.map((tag) => (
                <span key={tag} className="rounded-full border border-signal-600/25 bg-signal-500/[0.06] px-3.5 py-1.5 text-sm text-signal-800 dark:border-signal-300/25 dark:text-signal-200">
                  {tag}
                </span>
              ))}
            </div>
            <p className="mt-5 max-w-[48ch] text-[15.5px] leading-relaxed text-slate-600 dark:text-slate-300">
              Our solutions are aligned with global sustainability frameworks and designed to deliver measurable impact across climate, infrastructure and society.
            </p>
          </Reveal>
        </div>
      </div>

      {/* Corporate identity */}
      <div id="corporate-information" className="scroll-mt-28 px-5 sm:px-6">
        <div className="mx-auto grid w-full max-w-7xl gap-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <h2 className="text-[clamp(28px,3.2vw,40px)] font-semibold leading-[1.05] tracking-[-0.03em] text-slate-900 dark:text-white">Official corporate information</h2>
            <p className="mt-4 max-w-[40ch] text-[15.5px] leading-relaxed text-slate-600 dark:text-slate-300">
              A legally incorporated technology company established under the Companies Act, 2017 and registered with the Securities and Exchange Commission of Pakistan.
            </p>
            <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2">
              {corporateTrustBadges.map((badge) => (
                <li key={badge} className="inline-flex items-center gap-1.5 text-sm text-slate-700 dark:text-slate-200">
                  <BadgeCheck size={15} className="text-signal-600 dark:text-signal-400" />
                  {badge}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-8">
            <dl className="border-t border-slate-900/10 dark:border-white/10">
              {corporateFacts.map((item) => (
                <div key={item.label} className="grid gap-1 border-b border-slate-900/10 py-4 dark:border-white/10 sm:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] sm:gap-6">
                  <dt className="text-sm text-slate-500 dark:text-slate-400">{item.label}</dt>
                  <dd className="text-[15.5px] font-medium text-slate-900 dark:text-white">{item.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>

      {/* Company profile */}
      <div className="px-5 sm:px-6">
        <Reveal className="mx-auto w-full max-w-7xl">
          <div className="group flex flex-col gap-6 rounded-[22px] border border-slate-900/10 bg-white p-6 transition-colors duration-500 hover:border-brand-500/40 dark:border-white/10 dark:bg-[#0f2440] dark:hover:border-brand-400/40 sm:flex-row sm:items-center sm:justify-between sm:p-8">
            <div className="flex items-start gap-5">
              <span className="relative inline-flex h-14 w-12 shrink-0 items-center justify-center rounded-md border border-slate-900/15 bg-slate-50 text-brand-600 transition-transform duration-500 group-hover:-rotate-6 dark:border-white/15 dark:bg-white/5 dark:text-brand-300">
                <FileText size={22} strokeWidth={1.6} aria-hidden="true" />
              </span>
              <div>
                <h2 className="text-xl font-semibold tracking-[-0.01em] text-slate-900 dark:text-white">RTL company profile</h2>
                <p className="mt-1.5 max-w-[58ch] text-[15px] leading-relaxed text-slate-600 dark:text-slate-300">
                  The official Resilience Technologies Labs (SMC-Private) Limited company profile: our products, expertise, services and technology portfolio.
                </p>
                <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">PowerPoint, 2.1 MB</p>
              </div>
            </div>
            <a
              href="/downloads/RTL_Company_Profile.pptx"
              download="RTL_Company_Profile.pptx"
              className="btn-premium inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-full bg-brand-gradient px-6 font-medium text-white shadow-glow"
              aria-label="Download RTL Company Profile PowerPoint presentation"
            >
              <Download size={17} aria-hidden="true" className="transition-transform duration-500 group-hover:translate-y-0.5" />
              Download profile
            </a>
          </div>
        </Reveal>
      </div>

      <ClosingCTA secondary={{ to: "/contact", label: "Contact the founder" }} />
    </section>
  );
}

export default AboutSection;
