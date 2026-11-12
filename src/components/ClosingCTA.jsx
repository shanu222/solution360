import { Link } from "react-router-dom";
import ContourField from "./motion/ContourField";
import { Magnetic, RevealText } from "./motion/primitives";

/** Closing call to action, set on a quiet contour map. */
function ClosingCTA({
  title = "Partner with Resilience Technologies Labs",
  body = "Pilots, partnerships and institutional deployments. Tell us what you need to see earlier, and we will show you how the platform gets you there.",
  primary = { to: "/contact", label: "Request a demo" },
  secondary = { to: "/products", label: "Explore products" },
}) {
  return (
    <section className="px-5 sm:px-6">
      <div className="relative isolate mx-auto w-full max-w-7xl overflow-hidden rounded-[28px] border border-slate-900/10 bg-white px-6 py-16 dark:border-white/10 dark:bg-[#0f2440] sm:px-12 sm:py-20">
        <ContourField className="-z-10 opacity-70 [mask-image:linear-gradient(90deg,transparent_15%,#000_70%)]" showStations />
        <RevealText
          as="h2"
          inView
          text={title}
          className="max-w-[18ch] text-[clamp(32px,4.6vw,58px)] font-semibold leading-[1.02] tracking-[-0.03em] text-slate-900 dark:text-white"
        />
        <p className="mt-5 max-w-[52ch] text-[17px] leading-relaxed text-slate-600 dark:text-slate-300">{body}</p>
        <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
          <Magnetic>
            <Link
              to={primary.to}
              className="btn-premium inline-flex h-12 w-full items-center justify-center rounded-full bg-brand-gradient px-7 font-medium text-white shadow-glow transition-transform active:scale-[0.97] sm:w-auto"
            >
              {primary.label}
            </Link>
          </Magnetic>
          {secondary && (
            <Link
              to={secondary.to}
              className="inline-flex h-12 items-center justify-center rounded-full border border-slate-900/15 px-7 font-medium text-slate-800 transition-colors duration-300 hover:border-slate-900/40 dark:border-white/20 dark:text-white dark:hover:border-white/50"
            >
              {secondary.label}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}

export default ClosingCTA;
