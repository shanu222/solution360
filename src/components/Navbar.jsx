import { AnimatePresence, motion, useMotionValueEvent, useScroll, useSpring } from "framer-motion";
import { Menu, Moon, Sun, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useLenis } from "./motion/SmoothScroll";
import { Magnetic, easeOut } from "./motion/primitives";
import SocialIcons from "./SocialIcons";

const navItems = [
  { path: "/", label: "Home" },
  { path: "/products", label: "Products" },
  { path: "/who-we-are", label: "Who we are" },
  { path: "/how-it-works", label: "How it works" },
  { path: "/contact", label: "Contact" },
];

function ThemeButton({ theme, onToggleTheme, size = 18 }) {
  return (
    <button
      type="button"
      onClick={onToggleTheme}
      aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
      className="relative inline-flex h-9 w-9 items-center justify-center overflow-hidden rounded-full text-slate-600 transition-colors hover:bg-slate-900/5 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-white/10 dark:hover:text-white"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={theme}
          initial={{ y: 14, opacity: 0, rotate: -40 }}
          animate={{ y: 0, opacity: 1, rotate: 0 }}
          exit={{ y: -14, opacity: 0, rotate: 40 }}
          transition={{ duration: 0.3, ease: easeOut }}
          className="inline-flex"
        >
          {theme === "dark" ? <Sun size={size} /> : <Moon size={size} />}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}

function Navbar({ menuOpen, setMenuOpen, onNavigate, theme, onToggleTheme }) {
  const { scrollY, scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 });
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hovered, setHovered] = useState(null);
  const lenis = useLenis();
  const location = useLocation();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    setScrolled(latest > 12);
    setHidden(latest > 160 && latest > previous && !menuOpen);
  });

  // Freeze the page behind the open mobile menu.
  useEffect(() => {
    if (menuOpen) {
      lenis?.stop();
      document.body.style.overflow = "hidden";
    } else {
      lenis?.start();
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen, lenis]);

  const isActive = (path) => (path === "/" ? location.pathname === "/" : location.pathname.startsWith(path));
  const marker = hovered ?? navItems.find((item) => isActive(item.path))?.path;

  return (
    <motion.header
      animate={{ y: hidden ? "-100%" : "0%" }}
      transition={{ duration: 0.45, ease: easeOut }}
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-500 ${
        scrolled || menuOpen
          ? "border-b border-slate-900/[0.07] bg-[#f4f7fa]/80 backdrop-blur-xl dark:border-white/[0.07] dark:bg-[#0c1e36]/75"
          : "border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 w-full max-w-[83rem] items-center justify-between px-5 sm:h-[4.5rem] sm:px-6">
        <Link to="/" className="group flex items-center gap-3" aria-label="Resilience Technologies Labs, home">
          <img
            src="/logo.png"
            alt=""
            width="1230"
            height="1246"
            className="h-10 w-10 object-contain transition-transform duration-500 ease-out group-hover:rotate-[-6deg] sm:h-11 sm:w-11"
            loading="eager"
            decoding="async"
          />
          <span className="text-[15px] font-semibold leading-[1.1] tracking-[-0.01em] text-slate-900 dark:text-white">
            Resilience
            <span className="block font-normal text-slate-500 dark:text-slate-400">Technologies Labs</span>
          </span>
        </Link>

        <nav className="hidden items-center md:flex" aria-label="Main" onMouseLeave={() => setHovered(null)}>
          <ul className="flex items-center">
            {navItems.map((item) => (
              <li key={item.path} onMouseEnter={() => setHovered(item.path)}>
                <NavLink
                  to={item.path}
                  end={item.path === "/"}
                  className={`relative isolate block px-3.5 py-2 text-[14.5px] transition-colors duration-300 lg:px-4 ${
                    isActive(item.path) ? "text-slate-900 dark:text-white" : "text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                  }`}
                >
                  {marker === item.path && (
                    <motion.span
                      layoutId="nav-marker"
                      className="absolute inset-0 -z-10 rounded-full bg-slate-900/[0.06] dark:bg-white/[0.08]"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <ThemeButton theme={theme} onToggleTheme={onToggleTheme} />
          <Magnetic>
            <button
              type="button"
              onClick={() => onNavigate("/contact")}
              className="btn-premium rounded-full bg-brand-gradient px-5 py-2.5 text-sm font-medium text-white shadow-glow transition-transform duration-300 active:scale-[0.97]"
            >
              Request a demo
            </button>
          </Magnetic>
        </div>

        <div className="flex items-center gap-1 md:hidden">
          <ThemeButton theme={theme} onToggleTheme={onToggleTheme} size={17} />
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full text-slate-800 dark:text-white"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Reading progress */}
      <motion.div
        aria-hidden="true"
        style={{ scaleX: progress }}
        className="absolute inset-x-0 bottom-[-1px] h-[2px] origin-left bg-brand-500/80 dark:bg-brand-400/80"
      />

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.55, ease: easeOut }}
            className="fixed inset-x-0 top-16 h-[calc(100dvh-4rem)] bg-[#f4f7fa] px-5 pb-10 pt-6 dark:bg-[#0c1e36] md:hidden"
          >
            <ul className="space-y-1">
              {navItems.map((item, index) => (
                <motion.li
                  key={item.path}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: easeOut, delay: 0.12 + index * 0.05 }}
                >
                  <NavLink
                    to={item.path}
                    end={item.path === "/"}
                    onClick={() => setMenuOpen(false)}
                    className={({ isActive: active }) =>
                      `block border-b border-slate-900/[0.07] py-4 text-[28px] font-medium tracking-[-0.02em] dark:border-white/[0.07] ${
                        active ? "text-slate-900 dark:text-white" : "text-slate-500 dark:text-slate-400"
                      }`
                    }
                  >
                    {item.label}
                  </NavLink>
                </motion.li>
              ))}
            </ul>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.45 }}
              className="mt-8 flex items-center justify-between"
            >
              <button
                type="button"
                onClick={() => onNavigate("/contact")}
                className="rounded-full bg-brand-gradient px-6 py-3 text-sm font-medium text-white shadow-glow"
              >
                Request a demo
              </button>
              <SocialIcons iconSize="sm" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

export default Navbar;
