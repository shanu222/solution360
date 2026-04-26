import { AnimatePresence, motion } from "framer-motion";
import { Menu, Moon, Sun, X } from "lucide-react";
import { Link, NavLink } from "react-router-dom";

const navItems = [
  { path: "/", label: "Home" },
  { path: "/products", label: "Products" },
  { path: "/about", label: "Who We Are" },
  { path: "/how-it-works", label: "How It Works" },
  { path: "/contact", label: "Contact" },
];

function Navbar({ menuOpen, setMenuOpen, onNavigate, theme, onToggleTheme }) {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-slate-200/80 bg-white/85 backdrop-blur-xl transition-colors duration-300 dark:border-white/10 dark:bg-slate-950/65">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-6 py-3">
        <Link
          to="/"
          className="flex items-center gap-3 transition-all duration-300 hover:scale-105"
        >
          <div className="relative">
            <div className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-r from-emerald-400 to-blue-500 opacity-10 blur-[1px]" />
            <div className="relative overflow-hidden rounded-full bg-white p-1 shadow-lg ring-1 ring-slate-200 transition-all duration-300 hover:shadow-xl dark:bg-slate-800 dark:ring-slate-700">
              <img src="/assets/logo.png" alt="SustainableSolution360 Logo" className="h-8 w-8 object-contain sm:h-10 sm:w-10" />
            </div>
          </div>
          <span className="text-lg font-semibold tracking-tight text-slate-900 transition-colors duration-300 dark:text-white">SustainableSolution360</span>
        </Link>
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
            className="rounded-lg bg-brand-gradient px-4 py-2 text-sm font-medium text-white shadow-glow transition hover:scale-[1.04]"
          >
            Request Demo
          </button>
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
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export default Navbar;
