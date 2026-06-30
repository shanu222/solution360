import HowItWorks from "../components/HowItWorks";
import { useDocumentMeta } from "../hooks/useDocumentMeta";

function HowItWorksPage() {
  useDocumentMeta(
    "How It Works | RESILIENCE TECHNOLOGIES LABS",
    "Understand how RESILIENCE TECHNOLOGIES LABS transforms data into decision support through AI, analytics, and operational workflows."
  );

  return (
    <section className="w-full px-6 py-[60px]">
      <div className="mx-auto w-full max-w-7xl">
        <HowItWorks />
      </div>
    </section>
  );
}

export default HowItWorksPage;
