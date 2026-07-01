import { CheckCircle2, MapPin, ShieldCheck } from "lucide-react";
import SocialIcons from "./SocialIcons";

function Footer({ onNavigate }) {
  return (
    <footer className="relative border-t border-slate-200 bg-white/95 transition-colors duration-300 dark:border-white/10 dark:bg-slate-950/95">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent dark:via-cyan-300/70" />
      <div className="mx-auto grid w-full max-w-7xl gap-8 px-6 py-10 text-sm sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="Resilience Technologies Labs Logo" className="h-[36px] w-auto object-contain" loading="lazy" decoding="async" />
            <p className="text-base font-semibold text-slate-900 transition-colors duration-300 dark:text-white">RESILIENCE TECHNOLOGIES LABS</p>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-slate-600 transition-colors duration-300 dark:text-slate-400">
            RESILIENCE TECHNOLOGIES LABS (SMC-PRIVATE) LIMITED develops AI-powered platforms for climate resilience, infrastructure intelligence, disaster risk reduction,
            sustainability, geospatial analytics, digital transformation, and enterprise decision support.
          </p>

          <div className="mt-5 border-t border-slate-200/80 pt-4 transition-colors duration-300 dark:border-white/10">
            <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-slate-800 transition-colors duration-300 dark:text-slate-200">
              <MapPin size={13} className="text-cyan-600 dark:text-cyan-300" />
              Head Office
            </p>
            <p className="mt-2 text-sm leading-relaxed text-slate-600 transition-colors duration-300 dark:text-slate-400">
              NSTP (National Science &amp; Technology Park)
              <br />
              First Floor, Office No. 1405
              <br />
              Islamabad, Pakistan
            </p>
          </div>

          <div className="mt-5 border-t border-slate-200/80 pt-4 transition-colors duration-300 dark:border-white/10">
            <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-slate-800 transition-colors duration-300 dark:text-slate-200">
              <ShieldCheck size={13} className="text-cyan-600 dark:text-cyan-300" />
              Corporate Information
            </p>
            <div className="mt-2 space-y-2 text-sm text-slate-600 transition-colors duration-300 dark:text-slate-400">
              <p>Officially Incorporated under the Companies Act, 2017</p>
              <p>Registered with the Securities and Exchange Commission of Pakistan (SECP)</p>
              <p className="pt-1">
                <span className="block text-xs font-semibold uppercase tracking-[0.1em] text-slate-800 transition-colors duration-300 dark:text-slate-200">Company Type</span>
                <span>SMC-Private Limited</span>
              </p>
              <p>
                <span className="block text-xs font-semibold uppercase tracking-[0.1em] text-slate-800 transition-colors duration-300 dark:text-slate-200">Corporate ID</span>
                <span>0343147</span>
              </p>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1 rounded-full border border-cyan-200 bg-cyan-50 px-2.5 py-1 text-[11px] text-cyan-800 transition-colors duration-300 dark:border-cyan-400/35 dark:bg-cyan-400/10 dark:text-cyan-200">
                <CheckCircle2 size={12} />
                SECP Registered
              </span>
              <span className="inline-flex items-center gap-1 rounded-full border border-cyan-200 bg-cyan-50 px-2.5 py-1 text-[11px] text-cyan-800 transition-colors duration-300 dark:border-cyan-400/35 dark:bg-cyan-400/10 dark:text-cyan-200">
                <CheckCircle2 size={12} />
                Incorporated in Pakistan
              </span>
              <span className="inline-flex items-center gap-1 rounded-full border border-cyan-200 bg-cyan-50 px-2.5 py-1 text-[11px] text-cyan-800 transition-colors duration-300 dark:border-cyan-400/35 dark:bg-cyan-400/10 dark:text-cyan-200">
                <CheckCircle2 size={12} />
                Limited by Shares
              </span>
            </div>
          </div>
        </div>
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.08em] text-slate-800 transition-colors duration-300 dark:text-slate-200">Platforms</p>
          <ul className="mt-3 space-y-2 text-slate-600 transition-colors duration-300 dark:text-slate-400">
            <li><button onClick={() => onNavigate("/products")} className="link-slide transition hover:text-cyan-600 dark:hover:text-cyan-200">Platform Suite</button></li>
            <li><button onClick={() => onNavigate("/products")} className="link-slide transition hover:text-cyan-600 dark:hover:text-cyan-200">Products</button></li>
            <li><button onClick={() => onNavigate("/how-it-works")} className="link-slide transition hover:text-cyan-600 dark:hover:text-cyan-200">How It Works</button></li>
          </ul>
        </div>
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.08em] text-slate-800 transition-colors duration-300 dark:text-slate-200">Company</p>
          <ul className="mt-3 space-y-2 text-slate-600 transition-colors duration-300 dark:text-slate-400">
            <li><button onClick={() => onNavigate("/who-we-are")} className="link-slide transition hover:text-cyan-600 dark:hover:text-cyan-200">About Us</button></li>
            <li><button onClick={() => onNavigate("/who-we-are")} className="link-slide transition hover:text-cyan-600 dark:hover:text-cyan-200">Corporate Information</button></li>
            <li><button onClick={() => onNavigate("/contact")} className="link-slide transition hover:text-cyan-600 dark:hover:text-cyan-200">Contact</button></li>
            <li><button onClick={() => onNavigate("/privacy-policy")} className="link-slide transition hover:text-cyan-600 dark:hover:text-cyan-200">Privacy Policy</button></li>
            <li><button onClick={() => onNavigate("/refund-policy")} className="link-slide transition hover:text-cyan-600 dark:hover:text-cyan-200">Refund Policy</button></li>
            <li><button onClick={() => onNavigate("/terms-and-conditions")} className="link-slide transition hover:text-cyan-600 dark:hover:text-cyan-200">Terms &amp; Conditions</button></li>
          </ul>
        </div>
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.08em] text-slate-800 transition-colors duration-300 dark:text-slate-200">Connect</p>
          <ul className="mt-3 space-y-2 text-slate-600 transition-colors duration-300 dark:text-slate-400">
            <li><a href="mailto:shanu1998end@gmail.com" className="link-slide transition hover:text-cyan-600 dark:hover:text-cyan-200">Email</a></li>
            <li><a href="https://github.com/shanu222" target="_blank" rel="noreferrer" className="link-slide transition hover:text-cyan-600 dark:hover:text-cyan-200">GitHub</a></li>
            <li><a href="https://www.linkedin.com/in/solutions-three-sixty-degree-a32913405/" target="_blank" rel="noreferrer" className="link-slide transition hover:text-cyan-600 dark:hover:text-cyan-200">LinkedIn</a></li>
            <li><a href="https://www.instagram.com/sustainablesolution360/" target="_blank" rel="noreferrer" className="link-slide transition hover:text-cyan-600 dark:hover:text-cyan-200">Instagram</a></li>
          </ul>
          <SocialIcons className="mt-4" iconSize="sm" />
        </div>
      </div>
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-2 px-6 pb-8 text-xs text-slate-500 transition-colors duration-300 dark:text-slate-500 md:flex-row md:items-center md:justify-between">
        <p>© 2026 RESILIENCE TECHNOLOGIES LABS (SMC-PRIVATE) LIMITED. All Rights Reserved. Officially Incorporated and Registered in Pakistan.</p>
        <p>Building Intelligent Systems for Climate, Infrastructure &amp; Sustainability</p>
      </div>
    </footer>
  );
}

export default Footer;
