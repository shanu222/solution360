import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import MobileAppsGallery from "../components/apps/MobileAppsGallery";
import ClosingCTA from "../components/ClosingCTA";
import { useLenis } from "../components/motion/SmoothScroll";
import ProductsSection from "../components/ProductsSection";
import { useDocumentMeta } from "../hooks/useDocumentMeta";

function Products() {
  const location = useLocation();
  const lenis = useLenis();

  useDocumentMeta(
    "Products | RESILIENCE TECHNOLOGIES LABS",
    "Explore the RTL enterprise product portfolio across AI, resilience, disaster management, education, social impact, mobility, and health."
  );

  // Honour links such as /products#mobile-apps once the page transition has settled.
  useEffect(() => {
    if (!location.hash) return undefined;
    const timer = window.setTimeout(() => {
      const target = document.querySelector(location.hash);
      if (!target) return;
      if (lenis) lenis.scrollTo(target, { offset: -96, duration: 1.4 });
      else target.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 700);
    return () => window.clearTimeout(timer);
  }, [location.hash, lenis]);

  return (
    <div className="space-y-24 sm:space-y-32">
      <section className="w-full px-5 pt-12 sm:px-6 sm:pt-20">
        <div className="mx-auto w-full max-w-7xl">
          <ProductsSection />
        </div>
      </section>
      <section className="w-full px-5 sm:px-6">
        <div className="mx-auto w-full max-w-7xl">
          <MobileAppsGallery />
        </div>
      </section>
      <ClosingCTA
        title="Need a platform built for your institution?"
        body="Every product here started as a specific problem. Tell us yours and we will show you what a pilot looks like."
        secondary={{ to: "/how-it-works", label: "See how it works" }}
      />
    </div>
  );
}

export default Products;
