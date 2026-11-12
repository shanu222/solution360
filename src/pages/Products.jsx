import ClosingCTA from "../components/ClosingCTA";
import ProductsSection from "../components/ProductsSection";
import { useDocumentMeta } from "../hooks/useDocumentMeta";

function Products() {
  useDocumentMeta(
    "Products | RESILIENCE TECHNOLOGIES LABS",
    "Explore the RTL enterprise product portfolio across AI, resilience, disaster management, education, social impact, mobility, and health."
  );

  return (
    <div className="space-y-24 sm:space-y-32">
      <section className="w-full px-5 pt-12 sm:px-6 sm:pt-20">
        <div className="mx-auto w-full max-w-7xl">
          <ProductsSection />
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
