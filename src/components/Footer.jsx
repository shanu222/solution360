import { ArrowUp, BadgeCheck } from "lucide-react";
import { contact } from "../data/company";
import { useLenis } from "./motion/SmoothScroll";
import { Reveal } from "./motion/primitives";
import SocialIcons from "./SocialIcons";

const footerLink = "link-slide text-[15px] text-slate-600 transition-colors duration-300 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white";
const columnTitle = "text-sm text-slate-400 dark:text-slate-500";

const certBadges = ["SECP registered", "Incorporated in Pakistan", "Limited by shares"];

function Footer({ onNavigate }) {
  const lenis = useLenis();

  const columns = [
    {
      title: "Platforms",
      links: [
        { label: "Platform suite", to: "/products" },
        { label: "Products", to: "/products" },
        { label: "How it works", to: "/how-it-works" },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "About us", to: "/who-we-are" },
        { label: "Corporate information", to: "/who-we-are" },
        { label: "Contact", to: "/contact" },
        { label: "Privacy policy", to: "/privacy-policy" },
        { label: "Refund policy", to: "/refund-policy" },
        { label: "Terms and conditions", to: "/terms-and-conditions" },
      ],
    },
    {
      title: "Connect",
      links: [
        { label: "Email", href: contact.emailHref },
        { label: "GitHub", href: contact.github },
        { label: "LinkedIn", href: contact.companyLinkedIn },
        { label: "Instagram", href: contact.instagram },
      ],
    },
  ];

  const backToTop = () => {
    if (lenis) lenis.scrollTo(0, { duration: 1.6 });
    else window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative border-t border-slate-900/10 bg-white transition-colors duration-300 dark:border-white/10 dark:bg-[#0a1a2f]">
      <div className="mx-auto w-full max-w-[83rem] px-5 pt-16 sm:px-6 sm:pt-20">
        <Reveal className="grid grid-cols-2 gap-10 lg:grid-cols-12 lg:gap-8">
          <div className="col-span-2 lg:col-span-5">
            <div className="flex items-center gap-3">
              <img src="/logo.png" alt="Resilience Technologies Labs logo" className="h-11 w-11 object-contain" loading="lazy" decoding="async" />
              <p className="text-[15px] font-semibold leading-[1.1] text-slate-900 dark:text-white">
                Resilience
                <span className="block font-normal text-slate-500 dark:text-slate-400">Technologies Labs</span>
              </p>
            </div>
            <p className="mt-6 max-w-[44ch] text-[15px] leading-relaxed text-slate-600 dark:text-slate-400">
              RESILIENCE TECHNOLOGIES LABS (SMC-PRIVATE) LIMITED develops AI-powered platforms for climate resilience, infrastructure intelligence, disaster risk
              reduction, sustainability, geospatial analytics, digital transformation and enterprise decision support.
            </p>
            <SocialIcons className="mt-6" iconSize="sm" />
          </div>

          {columns.map((column) => (
            <nav key={column.title} aria-label={column.title} className={column.title === "Company" ? "lg:col-span-3" : "lg:col-span-2"}>
              <p className={columnTitle}>{column.title}</p>
              <ul className="mt-4 space-y-3">
                {column.links.map((link) => (
                  <li key={link.label}>
                    {link.to ? (
                      <button type="button" onClick={() => onNavigate(link.to)} className={footerLink}>
                        {link.label}
                      </button>
                    ) : (
                      <a href={link.href} target="_blank" rel="noopener noreferrer" className={footerLink}>
                        {link.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </Reveal>

        <Reveal delay={0.08} className="mt-16 grid gap-8 border-t border-slate-900/10 pt-8 text-sm dark:border-white/10 sm:grid-cols-2 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className={columnTitle}>Head office</p>
            <address className="mt-2 not-italic leading-relaxed text-slate-700 dark:text-slate-300">
              House No. 287, Street No. 6
              <br />
              Block D-Extension, Rawal Enclave Phase-1
              <br />
              Kuri, Islamabad, Pakistan
            </address>
          </div>
          <div className="lg:col-span-4">
            <p className={columnTitle}>Corporate information</p>
            <p className="mt-2 leading-relaxed text-slate-700 dark:text-slate-300">
              Officially incorporated under the Companies Act, 2017. Registered with the Securities and Exchange Commission of Pakistan (SECP).
            </p>
            <dl className="mt-3 flex gap-8">
              <div>
                <dt className="text-slate-400 dark:text-slate-500">Company type</dt>
                <dd className="font-medium text-slate-900 dark:text-white">SMC-Private Limited</dd>
              </div>
              <div>
                <dt className="text-slate-400 dark:text-slate-500">Corporate ID</dt>
                <dd className="tabular font-medium text-slate-900 dark:text-white">0343147</dd>
              </div>
            </dl>
          </div>
          <div className="lg:col-span-4">
            <p className={columnTitle}>Registration</p>
            <ul className="mt-2 space-y-1.5">
              {certBadges.map((badge) => (
                <li key={badge} className="inline-flex w-full items-center gap-2 text-slate-700 dark:text-slate-300">
                  <BadgeCheck size={15} className="shrink-0 text-signal-600 dark:text-signal-400" />
                  {badge}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <div className="mt-12 flex flex-col gap-4 border-t border-slate-900/10 py-6 text-[13px] text-slate-500 dark:border-white/10 dark:text-slate-500 md:flex-row md:items-center md:justify-between">
          <p>© 2026 RESILIENCE TECHNOLOGIES LABS (SMC-PRIVATE) LIMITED. All rights reserved. Officially incorporated and registered in Pakistan.</p>
          <div className="flex items-center gap-5">
            <button type="button" onClick={() => onNavigate("/privacy-policy")} className="transition-colors hover:text-slate-900 dark:hover:text-white">
              Privacy
            </button>
            <button type="button" onClick={() => onNavigate("/terms-and-conditions")} className="transition-colors hover:text-slate-900 dark:hover:text-white">
              Terms
            </button>
            <button
              type="button"
              onClick={backToTop}
              className="group inline-flex items-center gap-1.5 rounded-full border border-slate-900/10 px-3 py-1.5 transition-colors hover:border-slate-900/30 hover:text-slate-900 dark:border-white/10 dark:hover:border-white/30 dark:hover:text-white"
            >
              Back to top
              <ArrowUp size={14} className="transition-transform duration-300 group-hover:-translate-y-0.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
