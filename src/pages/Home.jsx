import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, BadgeCheck } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ClosingCTA from "../components/ClosingCTA";
import Hero from "../components/Hero";
import MobileAppsShowcase from "../components/MobileAppsShowcase";
import { Marquee, Reveal, ScrollHighlight, easeOut, useSpotlight } from "../components/motion/primitives";
import { capabilities, processSteps, useCases } from "../data/company";
import { useDocumentMeta } from "../hooks/useDocumentMeta";

function UseCaseRow({ item, index, open, onOpen }) {
  const reduce = useReducedMotion();
  const Icon = item.icon;
  return (
    <motion.li
      initial={reduce ? false : { opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.7, ease: easeOut, delay: index * 0.06 }}
      className="border-b border-slate-900/10 dark:border-white/10"
    >
      <button
        type="button"
        onMouseEnter={onOpen}
        onFocus={onOpen}
        onClick={onOpen}
        aria-expanded={open}
        className="group grid w-full grid-cols-[auto_1fr_auto] items-center gap-5 py-6 text-left sm:gap-8 sm:py-7"
      >
        <span
          className={`inline-flex h-11 w-11 items-center justify-center rounded-full border transition-colors duration-500 ${
            open
              ? "border-brand-500 bg-brand-500 text-white"
              : "border-slate-900/15 text-slate-500 dark:border-white/15 dark:text-slate-400"
          }`}
        >
          <Icon size={18} strokeWidth={1.75} />
        </span>
        <span>
          <span
            className={`block text-[clamp(22px,3vw,36px)] font-medium tracking-[-0.025em] transition-colors duration-500 ${
              open ? "text-slate-900 dark:text-white" : "text-slate-400 dark:text-slate-500"
            }`}
          >
            {item.title}
          </span>
          <motion.span
            initial={false}
            animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
            transition={{ duration: 0.5, ease: easeOut }}
            className="block overflow-hidden"
          >
            <span className="block max-w-[52ch] pt-2 text-[15.5px] leading-relaxed text-slate-600 dark:text-slate-300">{item.description}</span>
          </motion.span>
        </span>
        <ArrowUpRight
          size={22}
          className={`transition-all duration-500 ${open ? "rotate-45 text-brand-500" : "text-slate-300 dark:text-slate-600"}`}
          aria-hidden="true"
        />
      </button>
    </motion.li>
  );
}

function Home() {
  const navigate = useNavigate();
  const [openCase, setOpenCase] = useState(0);
  const spotlight = useSpotlight();

  useDocumentMeta(
    "RESILIENCE TECHNOLOGIES LABS | AI for Climate & Infrastructure",
    "RESILIENCE TECHNOLOGIES LABS develops AI-powered platforms for climate resilience, infrastructure intelligence, sustainability, education, and digital transformation."
  );

  return (
    <div className="space-y-24 sm:space-y-32">
      <Hero onNavigate={(path) => navigate(path)} />

      {/* Capabilities ticker */}
      <section aria-label="Capabilities" className="-mt-8 sm:-mt-16">
        <Marquee className="py-2">
          {capabilities.map((item) => (
            <span key={item} className="flex items-center whitespace-nowrap px-6 text-[clamp(18px,2vw,24px)] font-medium tracking-[-0.01em] text-slate-400 dark:text-slate-500">
              {item}
              <svg width="10" height="10" viewBox="0 0 10 10" className="ml-12 text-signal-500" aria-hidden="true">
                <circle cx="5" cy="5" r="4" fill="none" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </span>
          ))}
        </Marquee>
      </section>

      {/* Overview */}
      <section className="px-5 sm:px-6">
        <div className="mx-auto grid w-full max-w-7xl gap-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <h2 className="text-sm text-slate-500 dark:text-slate-400">What we do</h2>
            <p className="mt-3 text-2xl font-semibold leading-snug tracking-[-0.02em] text-slate-900 dark:text-white">
              Enterprise sustainability software for measurable decisions.
            </p>
          </Reveal>
          <div className="lg:col-span-8">
            <ScrollHighlight
              text="Resilience Technologies Labs is an AI and technology company specialising in disaster resilience, infrastructure intelligence, geospatial analytics, sustainability platforms, digital transformation, enterprise software and advanced decision-support systems."
              className="text-[clamp(24px,3.1vw,40px)] font-medium leading-[1.22] tracking-[-0.025em] text-slate-900 dark:text-white"
            />
          </div>
        </div>
      </section>

      <MobileAppsShowcase />

      {/* Use cases */}
      <section className="px-5 sm:px-6">
        <div className="mx-auto grid w-full max-w-7xl gap-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <h2 className="text-sm text-slate-500 dark:text-slate-400">Where it is used</h2>
            <p className="mt-3 max-w-[34ch] text-[15.5px] leading-relaxed text-slate-600 dark:text-slate-300">
              The same intelligence layer serves four kinds of work, from a single bridge to a national energy picture.
            </p>
          </Reveal>
          <ul className="border-t border-slate-900/10 dark:border-white/10 lg:col-span-8">
            {useCases.map((item, index) => (
              <UseCaseRow key={item.title} item={item} index={index} open={openCase === index} onOpen={() => setOpenCase(index)} />
            ))}
          </ul>
        </div>
      </section>

      {/* Process teaser */}
      <section className="px-5 sm:px-6">
        <div className="mx-auto w-full max-w-7xl">
          <Reveal className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <h2 className="max-w-[20ch] text-[clamp(28px,3.6vw,46px)] font-semibold leading-[1.05] tracking-[-0.03em] text-slate-900 dark:text-white">
              From raw signal to a decision someone can act on
            </h2>
            <Link to="/how-it-works" className="link-slide self-start text-[15px] font-medium text-brand-600 dark:text-brand-300 sm:self-auto">
              See how it works
            </Link>
          </Reveal>
          <ol className="mt-10 grid gap-px overflow-hidden rounded-[22px] border border-slate-900/10 bg-slate-900/10 dark:border-white/10 dark:bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((step, index) => (
              <motion.li
                key={step.title}
                onPointerMove={spotlight}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8, delay: index * 0.12 }}
                className="spotlight bg-white p-6 dark:bg-[#0f2440] sm:p-7"
              >
                <div className="flex items-center justify-between">
                  <step.icon size={20} strokeWidth={1.6} className="text-brand-500 dark:text-brand-300" />
                  <span className="tabular text-sm text-slate-400 dark:text-slate-500">{index + 1}/4</span>
                </div>
                <h3 className="mt-10 text-lg font-semibold tracking-[-0.01em] text-slate-900 dark:text-white">{step.title}</h3>
                <p className="mt-2 text-[14.5px] leading-relaxed text-slate-600 dark:text-slate-300">{step.description}</p>
              </motion.li>
            ))}
          </ol>
        </div>
      </section>

      {/* Credentials */}
      <section className="px-5 sm:px-6">
        <Reveal className="mx-auto flex w-full max-w-7xl flex-col gap-6 border-y border-slate-900/10 py-8 dark:border-white/10 md:flex-row md:items-center md:justify-between">
          <p className="inline-flex items-center gap-3 text-[15px] text-slate-700 dark:text-slate-200">
            <BadgeCheck size={20} className="shrink-0 text-signal-600 dark:text-signal-400" />
            Incorporated under the Companies Act, 2017 and registered with the SECP.
          </p>
          <dl className="flex flex-wrap gap-x-10 gap-y-3 text-sm">
            <div>
              <dt className="text-slate-500 dark:text-slate-400">Corporate ID</dt>
              <dd className="tabular font-medium text-slate-900 dark:text-white">0343147</dd>
            </div>
            <div>
              <dt className="text-slate-500 dark:text-slate-400">Company type</dt>
              <dd className="font-medium text-slate-900 dark:text-white">SMC-Private Limited</dd>
            </div>
            <div>
              <dt className="text-slate-500 dark:text-slate-400">Office</dt>
              <dd className="font-medium text-slate-900 dark:text-white">NSTP, Islamabad</dd>
            </div>
          </dl>
        </Reveal>
      </section>

      <ClosingCTA />
    </div>
  );
}

export default Home;
