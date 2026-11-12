import { motion, useMotionValueEvent, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { useRef, useState } from "react";
import { processSteps, useCases } from "../data/company";
import ClosingCTA from "./ClosingCTA";
import { Reveal, easeOut, useSpotlight } from "./motion/primitives";
import PageHeader from "./PageHeader";

/** Four nodes on a line with a data packet travelling between them. */
function FlowLine() {
  const reduce = useReducedMotion();
  return (
    <div className="mt-12 max-w-3xl">
      <div className="relative">
        <div className="absolute left-[12.5%] right-[12.5%] top-5 h-px bg-slate-900/15 dark:bg-white/15" />
        {!reduce && (
          <motion.span
            aria-hidden="true"
            className="absolute top-[17px] h-[7px] w-10 rounded-full bg-gradient-to-r from-transparent to-signal-400"
            initial={{ left: "12.5%", opacity: 0 }}
            animate={{ left: ["12.5%", "84%"], opacity: [0, 1, 1, 0] }}
            transition={{ duration: 3.2, ease: "easeInOut", repeat: Infinity, repeatDelay: 0.6, delay: 1 }}
          />
        )}
        <ol className="relative grid grid-cols-4">
          {processSteps.map((step, index) => (
            <li key={step.title} className="flex flex-col items-center text-center">
              <motion.span
                initial={reduce ? false : { scale: 0.6, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6, ease: easeOut, delay: 0.7 + index * 0.12 }}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-900/15 bg-[var(--page)] text-slate-700 dark:border-white/20 dark:text-slate-200"
              >
                <step.icon size={17} strokeWidth={1.75} />
              </motion.span>
              <span className="mt-3 text-sm font-medium text-slate-700 dark:text-slate-200">{step.short}</span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

function StepPanel({ step, index }) {
  return (
    <article className="relative py-10 pl-12 sm:pl-16 lg:min-h-[60vh] lg:py-24">
      <span className="tabular absolute left-0 top-10 flex h-8 w-8 items-center justify-center rounded-full border border-slate-900/15 bg-[var(--page)] text-sm text-slate-600 dark:border-white/20 dark:text-slate-300 lg:top-24">
        {index + 1}
      </span>
      <h3 className="text-[clamp(26px,3.2vw,40px)] font-semibold leading-[1.05] tracking-[-0.03em] text-slate-900 dark:text-white">{step.title}</h3>
      <p className="mt-4 max-w-[46ch] text-[17px] leading-relaxed text-slate-600 dark:text-slate-300">{step.description}</p>
      <ul className="mt-6 flex flex-wrap gap-2">
        {step.points.map((point) => (
          <li key={point} className="rounded-full border border-slate-900/10 px-3.5 py-1.5 text-sm text-slate-700 dark:border-white/15 dark:text-slate-200">
            {point}
          </li>
        ))}
      </ul>
    </article>
  );
}

function HowItWorks() {
  const listRef = useRef(null);
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({ target: listRef, offset: ["start 55%", "end 55%"] });
  const fill = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  useMotionValueEvent(scrollYProgress, "change", (value) => {
    setActive(Math.min(processSteps.length - 1, Math.max(0, Math.floor(value * processSteps.length))));
  });
  const spotlight = useSpotlight();
  const ActiveIcon = processSteps[active].icon;

  return (
    <div className="space-y-24 sm:space-y-32">
      <PageHeader
        kicker="How it works"
        title="How Resilience Technologies Labs works"
        intro="A unified platform that turns raw data into actionable intelligence for climate, infrastructure and sustainability, in four stages."
      >
        <FlowLine />
      </PageHeader>

      {/* Scroll-driven walkthrough of the four stages */}
      <section id="how-it-works" className="scroll-mt-24 px-5 sm:px-6">
        <div className="mx-auto grid w-full max-w-7xl gap-6 lg:grid-cols-12 lg:gap-10">
          <div className="hidden lg:col-span-5 lg:block">
            <div className="sticky top-32">
              <p className="text-sm text-slate-500 dark:text-slate-400">Stage {active + 1} of {processSteps.length}</p>
              <div className="relative mt-6 flex aspect-square max-w-[380px] items-center justify-center overflow-hidden rounded-[28px] border border-slate-900/10 bg-white dark:border-white/10 dark:bg-[#0f2440]">
                {/* concentric rings, one per stage, lit up as the reader progresses */}
                {processSteps.map((step, index) => (
                  <motion.span
                    key={step.title}
                    aria-hidden="true"
                    className="absolute rounded-full border"
                    style={{ width: `${34 + index * 20}%`, height: `${34 + index * 20}%` }}
                    animate={{
                      borderColor: index <= active ? "rgba(47,107,255,0.55)" : "rgba(138,157,179,0.18)",
                      scale: index === active ? 1.04 : 1,
                    }}
                    transition={{ duration: 0.6, ease: easeOut }}
                  />
                ))}
                <motion.span
                  key={active}
                  initial={{ scale: 0.6, opacity: 0, rotate: -20 }}
                  animate={{ scale: 1, opacity: 1, rotate: 0 }}
                  transition={{ duration: 0.6, ease: easeOut }}
                  className="relative flex h-16 w-16 items-center justify-center rounded-full bg-brand-500 text-white shadow-glow"
                >
                  <ActiveIcon size={26} strokeWidth={1.75} />
                </motion.span>
              </div>
              <ul className="mt-6 space-y-2">
                {processSteps.map((step, index) => (
                  <li
                    key={step.title}
                    className={`text-[15px] transition-colors duration-500 ${index === active ? "text-slate-900 dark:text-white" : "text-slate-400 dark:text-slate-500"}`}
                  >
                    {step.title}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div ref={listRef} className="relative lg:col-span-7">
            <div className="absolute bottom-10 left-4 top-10 w-px bg-slate-900/10 dark:bg-white/10 lg:bottom-24 lg:top-24" />
            <motion.div
              style={{ scaleY: fill }}
              className="absolute bottom-10 left-4 top-10 w-px origin-top bg-brand-500 lg:bottom-24 lg:top-24"
            />
            {processSteps.map((step, index) => (
              <StepPanel key={step.title} step={step} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Value */}
      <section className="px-5 sm:px-6">
        <div className="mx-auto w-full max-w-7xl">
          <Reveal>
            <h2 className="max-w-[22ch] text-[clamp(28px,3.6vw,46px)] font-semibold leading-[1.05] tracking-[-0.03em] text-slate-900 dark:text-white">
              How it delivers value
            </h2>
          </Reveal>
          <div className="mt-10 grid gap-px overflow-hidden rounded-[22px] border border-slate-900/10 bg-slate-900/10 dark:border-white/10 dark:bg-white/10 sm:grid-cols-2">
            {useCases.map((item, index) => (
              <motion.article
                key={item.title}
                onPointerMove={spotlight}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="spotlight group bg-white p-7 dark:bg-[#0f2440] sm:p-9"
              >
                <item.icon size={22} strokeWidth={1.6} className="text-brand-500 transition-transform duration-500 group-hover:-translate-y-0.5 dark:text-brand-300" />
                <h3 className="mt-8 text-xl font-semibold tracking-[-0.01em] text-slate-900 dark:text-white">{item.title}</h3>
                <p className="mt-2 max-w-[42ch] text-[15.5px] leading-relaxed text-slate-600 dark:text-slate-300">{item.description}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <ClosingCTA
        title="Ready to transform your operations?"
        body="Deploy a unified intelligence layer for climate resilience, infrastructure monitoring and sustainability outcomes."
        secondary={{ to: "/products", label: "View products" }}
      />
    </div>
  );
}

export default HowItWorks;
