import ProductsSection from "../components/ProductsSection";
import { useDocumentMeta } from "../hooks/useDocumentMeta";

function Products() {
  useDocumentMeta(
    "Products | RESILIENCE TECHNOLOGIES LABS",
    "Explore AI-powered products by RESILIENCE TECHNOLOGIES LABS across resilience, sustainability, education, and infrastructure intelligence."
  );

  return (
    <section className="w-full px-6 py-[60px]">
      <div className="mx-auto w-full max-w-7xl">
        <ProductsSection />
      </div>
    </section>
  );
}

export default Products;
