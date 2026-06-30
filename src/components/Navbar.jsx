import { AnimatePresence, motion } from "framer-motion";
import { Menu, Moon, Sun, X } from "lucide-react";
import { Link, NavLink } from "react-router-dom";
import SocialIcons from "./SocialIcons";

const navItems = [
  { path: "/", label: "Home" },
  { path: "/products", label: "Products" },
  { path: "/who-we-are", label: "Who We Are" },
  { path: "/how-it-works", label: "How It Works" },
  { path: "/contact", label: "Contact" },
];

function Navbar({ menuOpen, setMenuOpen, onNavigate, theme, onToggleTheme }) {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-slate-200/80 bg-white/85 backdrop-blur-xl transition-colors duration-300 dark:border-white/10 dark:bg-slate-950/65">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-6 py-3 sm:h-[4.5rem]">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          <Link to="/" className="flex items-center gap-4 sm:gap-5">
            <motion.div
              animate={{ y: [-0.6, 0.6, -0.6] }}
              transition={{ duration: 4.2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
              whileHover={{ y: -1.5, scale: 1.03 }}
              className="relative flex items-center justify-center transition-all duration-300"
            >
              <img
                src="/logo.png"
                alt="Resilience Technologies Labs Logo"
                width="1400"
                height="933"
                className="block h-[42px] w-[42px] object-contain [image-rendering:-webkit-optimize-contrast] sm:h-[48px] sm:w-[48px] lg:h-[58px] lg:w-[58px]"
                loading="eager"
                decoding="async"
              />
            </motion.div>
            <div className="leading-[1.02] text-slate-900 transition-colors duration-300 dark:text-white">
              <div className="whitespace-nowrap text-[11px] font-bold tracking-[0.08em] sm:text-[12px] lg:text-[13px]">RESILIENCE</div>
              <div className="whitespace-nowrap text-[11px] font-bold tracking-[0.08em] sm:text-[12px] lg:text-[13px]">TECHNOLOGIES LABS</div>
            </div>
          </Link>
        </motion.div>
        <nav className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `nav-link text-sm transition-colors duration-300 ${isActive ? "text-cyan-700 dark:text-cyan-200" : "text-slate-700 dark:text-slate-300"}`
              }
            >
              {item.label}
            </NavLink>
          ))}
          <button
            onClick={onToggleTheme}
            aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-300 bg-white text-slate-700 transition-all duration-300 hover:rotate-12 hover:border-cyan-400 hover:text-cyan-600 dark:border-white/20 dark:bg-slate-900/60 dark:text-slate-100 dark:hover:border-cyan-300 dark:hover:text-cyan-200"
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button
            onClick={() => onNavigate("/contact")}
            title="Request a Demo with RESILIENCE TECHNOLOGIES LABS"
            aria-label="Request a Demo with RESILIENCE TECHNOLOGIES LABS"
            className="rounded-lg bg-brand-gradient px-4 py-2 text-sm font-medium text-white shadow-glow transition hover:scale-[1.04]"
          >
            Request a Demo
          </button>
          <SocialIcons className="ml-1" />
        </nav>
        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={onToggleTheme}
            aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-300 bg-white text-slate-700 transition-all duration-300 hover:rotate-12 dark:border-white/20 dark:bg-slate-900/60 dark:text-slate-100"
          >
            {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          <button onClick={() => setMenuOpen((v) => !v)} className="rounded-lg border border-slate-300 p-2 text-slate-700 transition-colors duration-300 dark:border-white/20 dark:text-white">
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="border-t border-slate-200 bg-white/95 p-4 transition-colors duration-300 dark:border-white/10 dark:bg-slate-950/95 md:hidden"
          >
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setMenuOpen(false)}
                className="block w-full rounded-lg px-3 py-2 text-left text-slate-700 transition hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-white/10"
              >
                {item.label}
              </NavLink>
            ))}
            <div className="mt-3 border-t border-slate-200/80 pt-3 dark:border-white/10">
              <SocialIcons iconSize="sm" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export default Navbar;
