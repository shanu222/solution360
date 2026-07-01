import AboutSection from "../components/AboutSection";
import { useDocumentMeta } from "../hooks/useDocumentMeta";

function About() {
  useDocumentMeta(
    "About | RESILIENCE TECHNOLOGIES LABS",
    "Learn about RESILIENCE TECHNOLOGIES LABS, an officially incorporated in Pakistan and SECP registered technology company, building AI infrastructure and climate technology platforms."
  );

  return (
    <section className="w-full px-6 py-[60px]">
      <div className="mx-auto w-full max-w-7xl">
        <AboutSection />
      </div>
    </section>
  );
}

export default About;
