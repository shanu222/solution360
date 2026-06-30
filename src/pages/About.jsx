import AboutSection from "../components/AboutSection";
import { useDocumentMeta } from "../hooks/useDocumentMeta";

function About() {
  useDocumentMeta(
    "About | RESILIENCE TECHNOLOGIES LABS",
    "Learn about RESILIENCE TECHNOLOGIES LABS, a Pakistan-based company building AI-powered resilience and infrastructure intelligence platforms."
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
