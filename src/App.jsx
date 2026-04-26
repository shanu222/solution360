import { useMemo, useState } from "react";
import AboutSection from "./components/AboutSection";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import HowItWorks from "./components/HowItWorks";
import Navbar from "./components/Navbar";
import ApplicationsSection from "./components/ApplicationsSection";
import ProductsSection from "./components/ProductsSection";
import useTheme from "./hooks/useTheme";

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const year = useMemo(() => new Date().getFullYear(), []);

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    setMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 transition-colors duration-300 dark:bg-slate-900 dark:text-gray-100">
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(circle_at_15%_20%,rgba(147,197,253,0.35),transparent_42%),radial-gradient(circle_at_82%_10%,rgba(186,230,253,0.24),transparent_34%),linear-gradient(180deg,#f8fbff_0%,#eff6ff_55%,#ffffff_100%)] transition-colors duration-300 dark:bg-[radial-gradient(circle_at_15%_20%,rgba(37,99,235,0.32),transparent_36%),radial-gradient(circle_at_82%_10%,rgba(8,145,178,0.24),transparent_34%),linear-gradient(180deg,#020617_0%,#0b1120_50%,#020617_100%)]" />
      <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} onNavigate={scrollToSection} theme={theme} onToggleTheme={toggleTheme} />

      <main className="mx-auto max-w-6xl space-y-14 px-4 pb-12 pt-20 sm:px-6 lg:px-8">
        <Hero onNavigate={scrollToSection} />
        <ProductsSection onNavigate={scrollToSection} />
        <AboutSection />
        <HowItWorks />
        <ApplicationsSection />
        <ContactSection />
      </main>
      <Footer year={year} onNavigate={scrollToSection} />
    </div>
  );
}

export default App;
