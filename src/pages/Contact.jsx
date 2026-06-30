import ContactSection from "../components/ContactSection";
import { useDocumentMeta } from "../hooks/useDocumentMeta";

function Contact() {
  useDocumentMeta(
    "Contact | RESILIENCE TECHNOLOGIES LABS",
    "Contact RESILIENCE TECHNOLOGIES LABS (SMC-PRIVATE) LIMITED for demos, partnerships, and enterprise inquiries."
  );

  return (
    <section className="w-full px-6 py-[60px]">
      <div className="mx-auto w-full max-w-7xl">
        <ContactSection />
      </div>
    </section>
  );
}

export default Contact;
