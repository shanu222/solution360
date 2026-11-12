import ContactSection from "../components/ContactSection";
import { useDocumentMeta } from "../hooks/useDocumentMeta";

function Contact() {
  useDocumentMeta(
    "Contact | RESILIENCE TECHNOLOGIES LABS",
    "Contact RESILIENCE TECHNOLOGIES LABS (SMC-PRIVATE) LIMITED for demos, partnerships, and enterprise inquiries."
  );

  return <ContactSection />;
}

export default Contact;
