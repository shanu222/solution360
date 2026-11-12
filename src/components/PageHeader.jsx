import { motion } from "framer-motion";
import ContourField from "./motion/ContourField";
import { RevealText, easeOut } from "./motion/primitives";

/** Opening block for inner pages: a contour strip, a large title and a short intro. */
function PageHeader({ kicker, title, intro, children }) {
  return (
    <header className="relative isolate -mt-20 overflow-hidden pt-32 sm:pt-40">
      <ContourField draw className="-z-10 opacity-80 [mask-image:linear-gradient(180deg,#000_30%,transparent)]" />
      <div className="mx-auto w-full max-w-[83rem] px-5 pb-12 sm:px-6 sm:pb-16">
        {kicker && (
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: easeOut }}
            className="text-sm text-slate-500 dark:text-slate-400"
          >
            {kicker}
          </motion.p>
        )}
        <RevealText
          text={title}
          delay={0.1}
          className="mt-4 max-w-[20ch] text-[clamp(38px,6vw,76px)] font-semibold leading-[1] tracking-[-0.035em] text-slate-900 dark:text-white"
        />
        {intro && (
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: easeOut, delay: 0.5 }}
            className="mt-6 max-w-[60ch] text-[clamp(16px,1.5vw,19px)] leading-relaxed text-slate-600 dark:text-slate-300"
          >
            {intro}
          </motion.p>
        )}
        {children && (
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: easeOut, delay: 0.65 }}>
            {children}
          </motion.div>
        )}
      </div>
    </header>
  );
}

export default PageHeader;
