import SocialIcons from "./SocialIcons";

function Footer({ year, onNavigate }) {
  return (
    <footer className="relative border-t border-slate-200 bg-white/95 transition-colors duration-300 dark:border-white/10 dark:bg-slate-950/95">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent dark:via-cyan-300/70" />
      <div className="mx-auto grid w-full max-w-7xl gap-8 px-6 py-10 text-sm sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="text-base font-semibold text-slate-900 transition-colors duration-300 dark:text-white">SustainableSolution360</p>
          <p className="mt-2 text-slate-600 transition-colors duration-300 dark:text-slate-400">Premium climate-tech products designed for growth.</p>
        </div>
        <div>
          <p className="font-medium text-slate-800 transition-colors duration-300 dark:text-slate-200">Product</p>
          <ul className="mt-3 space-y-2 text-slate-600 transition-colors duration-300 dark:text-slate-400">
            <li><button onClick={() => onNavigate("/products")} className="link-slide transition hover:text-cyan-600 dark:hover:text-cyan-200">Product Suite</button></li>
            <li><button onClick={() => onNavigate("/how-it-works")} className="link-slide transition hover:text-cyan-600 dark:hover:text-cyan-200">How It Works</button></li>
          </ul>
        </div>
        <div>
          <p className="font-medium text-slate-800 transition-colors duration-300 dark:text-slate-200">Company</p>
          <ul className="mt-3 space-y-2 text-slate-600 transition-colors duration-300 dark:text-slate-400">
            <li><button onClick={() => onNavigate("/who-we-are")} className="link-slide transition hover:text-cyan-600 dark:hover:text-cyan-200">Who We Are</button></li>
            <li><button onClick={() => onNavigate("/contact")} className="link-slide transition hover:text-cyan-600 dark:hover:text-cyan-200">Contact</button></li>
          </ul>
        </div>
        <div>
          <p className="font-medium text-slate-800 transition-colors duration-300 dark:text-slate-200">Social</p>
          <ul className="mt-3 space-y-2 text-slate-600 transition-colors duration-300 dark:text-slate-400">
            <li><a href="mailto:shanu1998end@gmail.com" className="link-slide transition hover:text-cyan-600 dark:hover:text-cyan-200">Email</a></li>
            <li><a href="https://github.com/shanu222" target="_blank" rel="noreferrer" className="link-slide transition hover:text-cyan-600 dark:hover:text-cyan-200">GitHub</a></li>
            <li><a href="https://www.linkedin.com/in/solutions-three-sixty-degree-a32913405/" target="_blank" rel="noreferrer" className="link-slide transition hover:text-cyan-600 dark:hover:text-cyan-200">LinkedIn</a></li>
          </ul>
          <SocialIcons className="mt-4" iconSize="sm" />
        </div>
      </div>
      <div className="mx-auto w-full max-w-7xl px-6 pb-8 text-xs text-slate-500 transition-colors duration-300 dark:text-slate-500">
        © {year} SustainableSolution360. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
