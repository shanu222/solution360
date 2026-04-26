import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { Navigate, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import BackgroundVideo from "./components/BackgroundVideo";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import SocialIcons from "./components/SocialIcons";
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
    <div className="min-h-screen overflow-x-hidden bg-transparent text-gray-900 transition-colors duration-300 dark:text-gray-100">
      <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-white focus:px-3 focus:py-2 focus:text-slate-900 focus:shadow dark:focus:bg-slate-800 dark:focus:text-slate-100">
        Skip to content
      </a>
      <BackgroundVideo />
      <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} onNavigate={routeTo} theme={theme} onToggleTheme={toggleTheme} />

      <main id="main-content" className="relative z-10 min-h-screen w-full pb-16 pt-20">
        <AnimatePresence mode="wait">
          <motion.div key={location.pathname} initial={pageTransition.initial} animate={pageTransition.animate} exit={pageTransition.exit} transition={pageTransition.transition}>
            <Routes location={location}>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<Products />} />
              <Route path="/who-we-are" element={<About />} />
              <Route path="/about" element={<Navigate to="/who-we-are" replace />} />
              <Route path="/how-it-works" element={<HowItWorksPage />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </motion.div>
        </AnimatePresence>
      </main>
      <motion.aside
        initial={{ opacity: 0, x: 16 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.35, delay: 0.25 }}
        className="fixed bottom-5 right-4 z-40 hidden rounded-2xl border border-slate-200/80 bg-white/60 p-2 shadow-lg backdrop-blur-md dark:border-white/10 dark:bg-slate-900/50 sm:block"
      >
        <SocialIcons orientation="column" />
      </motion.aside>
      <Footer year={year} onNavigate={routeTo} />
    </div>
  );
}

export default App;
