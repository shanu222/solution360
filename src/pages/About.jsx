import AboutSection from "../components/AboutSection";
import { useDocumentMeta } from "../hooks/useDocumentMeta";

function About() {
  useDocumentMeta(
    "About | RESILIENCE TECHNOLOGIES LABS",
    "Learn about RESILIENCE TECHNOLOGIES LABS, an officially incorporated in Pakistan and SECP registered technology company, building AI infrastructure and climate technology platforms."
  );

  return <AboutSection />;
}

export default About;
