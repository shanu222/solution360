import { motion } from "framer-motion";
import { Building2, CheckCircle2, MapPin, ShieldCheck } from "lucide-react";
import SocialIcons from "./SocialIcons";

const sectionTitle =
  "text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-800 dark:text-slate-200";

const footerLink =
  "link-slide text-sm text-slate-600 transition-all duration-300 hover:translate-x-0.5 hover:text-cyan-600 dark:text-slate-400 dark:hover:text-cyan-200";

const certBadges = [
  { label: "SECP Registered" },
  { label: "Incorporated in Pakistan" },
  { label: "Limited by Shares" },
];

function Footer({ onNavigate }) {
  return (
    <footer className="relative overflow-hidden border-t border-slate-200 bg-white/95 transition-colors duration-300 dark:border-white/10 dark:bg-slate-950/95">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(34,211,238,0.06),transparent_55%)] dark:bg-[radial-gradient(ellipse_at_top,rgba(34,211,238,0.08),transparent_50%)]" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent dark:via-cyan-300/70" />

      <div className="relative mx-auto w-full max-w-7xl px-6 pt-12 pb-0">
        {/* Row 1 — Brand + navigation */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8"
        >
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-4">
            <div className="flex items-center gap-3">
              <img
                src="/logo.png"
                alt="Resilience Technologies Labs Logo"
                className="h-9 w-auto object-contain"
                loading="lazy"
                decoding="async"
              />
              <p className="text-[15px] font-semibold leading-snug tracking-tight text-slate-900 dark:text-white">
                RESILIENCE TECHNOLOGIES LABS
              </p>
            </div>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-slate-600 dark:text-slate-400">
              RESILIENCE TECHNOLOGIES LABS (SMC-PRIVATE) LIMITED develops AI-powered platforms for climate
              resilience, infrastructure intelligence, disaster risk reduction, sustainability, geospatial
              analytics, digital transformation, and enterprise decision support.
            </p>
          </div>

          {/* Platforms */}
          <nav className="lg:col-span-2" aria-label="Platforms">
            <p className={sectionTitle}>Platforms</p>
            <ul className="mt-4 space-y-3">
              <li>
                <button type="button" onClick={() => onNavigate("/products")} className={footerLink}>
                  Platform Suite
                </button>
              </li>
              <li>
                <button type="button" onClick={() => onNavigate("/products")} className={footerLink}>
                  Products
                </button>
              </li>
              <li>
                <button type="button" onClick={() => onNavigate("/how-it-works")} className={footerLink}>
                  How It Works
                </button>
              </li>
            </ul>
          </nav>

          {/* Company */}
          <nav className="lg:col-span-3" aria-label="Company">
            <p className={sectionTitle}>Company</p>
            <ul className="mt-4 space-y-3">
              <li>
                <button type="button" onClick={() => onNavigate("/who-we-are")} className={footerLink}>
                  About Us
                </button>
              </li>
              <li>
                <button type="button" onClick={() => onNavigate("/who-we-are")} className={footerLink}>
                  Corporate Information
                </button>
              </li>
              <li>
                <button type="button" onClick={() => onNavigate("/contact")} className={footerLink}>
                  Contact
                </button>
              </li>
              <li>
                <button type="button" onClick={() => onNavigate("/privacy-policy")} className={footerLink}>
                  Privacy Policy
                </button>
              </li>
              <li>
                <button type="button" onClick={() => onNavigate("/refund-policy")} className={footerLink}>
                  Refund Policy
                </button>
              </li>
              <li>
                <button type="button" onClick={() => onNavigate("/terms-and-conditions")} className={footerLink}>
                  Terms &amp; Conditions
                </button>
              </li>
            </ul>
          </nav>

          {/* Connect */}
          <div className="lg:col-span-3">
            <p className={sectionTitle}>Connect</p>
            <ul className="mt-4 space-y-3">
              <li>
                <a
                  href="https://mail.google.com/mail/?view=cm&fs=1&to=shanu1998end@gmail.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={footerLink}
                >
                  Email
                </a>
              </li>
              <li>
                <a href="https://github.com/shanu222" target="_blank" rel="noreferrer" className={footerLink}>
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/solutions-three-sixty-degree-a32913405/"
                  target="_blank"
                  rel="noreferrer"
                  className={footerLink}
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/sustainablesolution360/"
                  target="_blank"
                  rel="noreferrer"
                  className={footerLink}
                >
                  Instagram
                </a>
              </li>
            </ul>
            <SocialIcons className="mt-5" iconSize="sm" />
          </div>
        </motion.div>

        {/* Row 2 — Corporate details */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.4, delay: 0.08, ease: "easeOut" }}
          className="mt-12 grid grid-cols-1 gap-6 border-t border-slate-200/80 pt-8 dark:border-white/10 sm:grid-cols-2 lg:grid-cols-3"
        >
          {/* Head Office */}
          <div className="rounded-2xl border border-slate-200/80 bg-slate-50/60 p-5 backdrop-blur-sm transition-all duration-300 hover:border-cyan-300/50 dark:border-white/10 dark:bg-white/[0.03] dark:hover:border-cyan-400/30">
            <p className={`inline-flex items-center gap-2 ${sectionTitle}`}>
              <MapPin size={13} className="text-cyan-600 dark:text-cyan-300" />
              Head Office
            </p>
            <address className="mt-3 not-italic text-sm leading-relaxed text-slate-600 dark:text-slate-400">
              <span className="block font-medium text-slate-800 dark:text-slate-200">
                NSTP (National Science &amp; Technology Park)
              </span>
              <span className="mt-1 block">First Floor, Office No. 1405</span>
              <span className="mt-1 block">Islamabad, Pakistan</span>
            </address>
          </div>

          {/* Corporate Information */}
          <div className="rounded-2xl border border-slate-200/80 bg-slate-50/60 p-5 backdrop-blur-sm transition-all duration-300 hover:border-cyan-300/50 dark:border-white/10 dark:bg-white/[0.03] dark:hover:border-cyan-400/30">
            <p className={`inline-flex items-center gap-2 ${sectionTitle}`}>
              <ShieldCheck size={13} className="text-cyan-600 dark:text-cyan-300" />
              Corporate Information
            </p>
            <div className="mt-3 space-y-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
              <p>Officially Incorporated under the Companies Act, 2017</p>
              <p>Registered with the Securities and Exchange Commission of Pakistan (SECP)</p>
              <div className="mt-3 grid grid-cols-2 gap-3 border-t border-slate-200/70 pt-3 dark:border-white/10">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-500 dark:text-slate-500">
                    Company Type
                  </p>
                  <p className="mt-1 font-medium text-slate-800 dark:text-slate-200">SMC-Private Limited</p>
                </div>
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-500 dark:text-slate-500">
                    Corporate ID
                  </p>
                  <p className="mt-1 font-medium text-slate-800 dark:text-slate-200">0343147</p>
                </div>
              </div>
            </div>
          </div>

          {/* Registration badges */}
          <div className="rounded-2xl border border-slate-200/80 bg-slate-50/60 p-5 backdrop-blur-sm transition-all duration-300 hover:border-cyan-300/50 dark:border-white/10 dark:bg-white/[0.03] dark:hover:border-cyan-400/30 sm:col-span-2 lg:col-span-1">
            <p className={`inline-flex items-center gap-2 ${sectionTitle}`}>
              <Building2 size={13} className="text-cyan-600 dark:text-cyan-300" />
              Registration
            </p>
            <div className="mt-4 grid grid-cols-1 gap-2.5 sm:grid-cols-3 lg:grid-cols-1">
              {certBadges.map((badge) => (
                <span
                  key={badge.label}
                  className="group inline-flex items-center gap-2 rounded-xl border border-cyan-200/80 bg-white/80 px-3 py-2.5 text-[12px] font-medium text-cyan-800 shadow-sm transition-all duration-300 hover:border-cyan-400 hover:shadow-[0_0_20px_rgba(34,211,238,0.2)] dark:border-cyan-400/30 dark:bg-cyan-400/5 dark:text-cyan-200 dark:hover:border-cyan-300/60"
                >
                  <CheckCircle2
                    size={14}
                    className="shrink-0 text-cyan-600 transition-transform duration-300 group-hover:scale-110 dark:text-cyan-300"
                  />
                  {badge.label}
                </span>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Row 3 — Bottom bar */}
        <div className="mt-10 flex flex-col gap-4 border-t border-slate-200/80 py-6 dark:border-white/10 md:flex-row md:items-center md:justify-between">
          <p className="text-xs leading-relaxed text-slate-500 dark:text-slate-500">
            © 2026 RESILIENCE TECHNOLOGIES LABS (SMC-PRIVATE) LIMITED. All Rights Reserved. Officially
            Incorporated and Registered in Pakistan.
          </p>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-slate-500 dark:text-slate-500">
            <button
              type="button"
              onClick={() => onNavigate("/privacy-policy")}
              className="transition-colors duration-300 hover:text-cyan-600 dark:hover:text-cyan-300"
            >
              Privacy
            </button>
            <span className="hidden text-slate-300 dark:text-slate-700 sm:inline" aria-hidden>
              ·
            </span>
            <button
              type="button"
              onClick={() => onNavigate("/terms-and-conditions")}
              className="transition-colors duration-300 hover:text-cyan-600 dark:hover:text-cyan-300"
            >
              Terms
            </button>
            <span className="hidden text-slate-300 dark:text-slate-700 sm:inline" aria-hidden>
              ·
            </span>
            <p className="text-slate-500 dark:text-slate-500">
              Building Intelligent Systems for Climate, Infrastructure &amp; Sustainability
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
