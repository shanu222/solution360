import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { Navigate, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import useTheme from "./hooks/useTheme";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Home from "./pages/Home";
import HowItWorksPage from "./pages/HowItWorks";
import Products from "./pages/Products";

const pageTransition = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
  transition: { duration: 0.25, ease: "easeOut" },
};

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const year = useMemo(() => new Date().getFullYear(), []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setMenuOpen(false);
  }, [location.pathname]);

  const routeTo = (path) => {
    navigate(path);
    setMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 transition-colors duration-300 dark:bg-slate-900 dark:text-gray-100">
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(circle_at_15%_20%,rgba(147,197,253,0.35),transparent_42%),radial-gradient(circle_at_82%_10%,rgba(186,230,253,0.24),transparent_34%),linear-gradient(180deg,#f8fbff_0%,#eff6ff_55%,#ffffff_100%)] transition-colors duration-300 dark:bg-[radial-gradient(circle_at_15%_20%,rgba(37,99,235,0.32),transparent_36%),radial-gradient(circle_at_82%_10%,rgba(8,145,178,0.24),transparent_34%),linear-gradient(180deg,#020617_0%,#0b1120_50%,#020617_100%)]" />
      <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} onNavigate={routeTo} theme={theme} onToggleTheme={toggleTheme} />

      <main className="mx-auto max-w-6xl px-4 pb-12 pt-20 sm:px-6 lg:px-8">
        <AnimatePresence mode="wait">
          <motion.div key={location.pathname} initial={pageTransition.initial} animate={pageTransition.animate} exit={pageTransition.exit} transition={pageTransition.transition}>
            <Routes location={location}>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<Products />} />
              <Route path="/about" element={<About />} />
              <Route path="/how-it-works" element={<HowItWorksPage />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer year={year} onNavigate={routeTo} />
    </div>
  );
}

export default App;
