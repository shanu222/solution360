import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Navigate, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import { useLenis } from "./components/motion/SmoothScroll";
import useTheme from "./hooks/useTheme";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Home from "./pages/Home";
import HowItWorksPage from "./pages/HowItWorks";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Products from "./pages/Products";
import RefundPolicy from "./pages/RefundPolicy";
import TermsAndConditions from "./pages/TermsAndConditions";

const pageTransition = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
  exit: { opacity: 0, y: -8, transition: { duration: 0.25, ease: [0.4, 0, 1, 1] } },
};

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const lenis = useLenis();

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  // Jump to the top once the outgoing page has faded, so the swap is never seen scrolling.
  const resetScroll = () => {
    if (lenis) lenis.scrollTo(0, { immediate: true });
    else window.scrollTo(0, 0);
  };

  const routeTo = (path) => {
    navigate(path);
    setMenuOpen(false);
  };

  return (
    <div className="min-h-screen overflow-x-clip text-slate-900 transition-colors duration-300 dark:text-slate-100">
      <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-white focus:px-3 focus:py-2 focus:text-slate-900 focus:shadow dark:focus:bg-slate-800 dark:focus:text-slate-100">
        Skip to content
      </a>
      <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} onNavigate={routeTo} theme={theme} onToggleTheme={toggleTheme} />

      <main id="main-content" className="relative z-10 min-h-screen w-full pb-24 pt-20 sm:pb-32">
        <AnimatePresence mode="wait" onExitComplete={resetScroll}>
          <motion.div key={location.pathname} initial={pageTransition.initial} animate={pageTransition.animate} exit={pageTransition.exit}>
            <Routes location={location}>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<Products />} />
              <Route path="/who-we-are" element={<About />} />
              <Route path="/about" element={<Navigate to="/who-we-are" replace />} />
              <Route path="/how-it-works" element={<HowItWorksPage />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/refund-policy" element={<RefundPolicy />} />
              <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer onNavigate={routeTo} />
    </div>
  );
}

export default App;
