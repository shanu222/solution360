import HowItWorks from "../components/HowItWorks";
import { useDocumentMeta } from "../hooks/useDocumentMeta";

function HowItWorksPage() {
  useDocumentMeta(
    "How It Works | RESILIENCE TECHNOLOGIES LABS",
    "Understand how RESILIENCE TECHNOLOGIES LABS transforms data into decision support through AI, analytics, and operational workflows."
  );

  return <HowItWorks />;
}

export default HowItWorksPage;
