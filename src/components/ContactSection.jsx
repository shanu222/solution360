import { AnimatePresence, motion } from "framer-motion";
import { Globe, Mail, Phone } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.45, ease: "easeOut" },
};

function ContactSection() {
  const [formState, setFormState] = useState({ name: "", email: "", subject: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");
  const [toast, setToast] = useState(null);
  const toastTimerRef = useRef(null);

  useEffect(
    () => () => {
      if (toastTimerRef.current) {
        window.clearTimeout(toastTimerRef.current);
      }
    },
    []
  );

  const showToast = (type, title, description) => {
    if (toastTimerRef.current) {
      window.clearTimeout(toastTimerRef.current);
    }
    setToast({ type, title, description });
    toastTimerRef.current = window.setTimeout(() => setToast(null), 4200);
  };

  const sanitizeInput = (value) =>
    value
      .replace(/[<>]/g, "")
      .replace(/\s+/g, " ")
      .trim();

  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
    if (submitMessage) {
      setSubmitMessage("");
    }
  };

  const handleContactSubmit = async (event) => {
    event.preventDefault();
    if (isSubmitting) return;

    const name = sanitizeInput(formState.name);
    const email = sanitizeInput(formState.email).toLowerCase();
    const subject = sanitizeInput(formState.subject || "General Inquiry");
    const message = formState.message.trim();

    if (!name || !email || !message) {
      setSubmitMessage("Please complete all fields before submitting.");
      return;
    }

    if (!isValidEmail(email)) {
      setSubmitMessage("Please provide a valid email address.");
      return;
    }

    setIsSubmitting(true);
    setSubmitMessage("");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, subject, message }),
      });

      if (!response.ok) {
        throw new Error("Request failed");
      }

      setFormState({ name: "", email: "", subject: "", message: "" });
      showToast("success", "Message sent successfully.", "We'll get back to you soon.");
    } catch {
      showToast("error", "Unable to send message.", "Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.section id="contact" {...fadeInUp} className="scroll-mt-24 w-full py-2">
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className={`fixed right-4 top-20 z-[90] max-w-sm rounded-2xl border px-4 py-3 text-sm shadow-xl backdrop-blur-md ${
              toast.type === "success"
                ? "border-emerald-300 bg-emerald-50/95 text-emerald-900 dark:border-emerald-300/40 dark:bg-emerald-400/10 dark:text-emerald-100"
                : "border-rose-300 bg-rose-50/95 text-rose-900 dark:border-rose-300/40 dark:bg-rose-400/10 dark:text-rose-100"
            }`}
          >
            <p className="font-semibold">{toast.title}</p>
            <p className="mt-1">{toast.description}</p>
          </motion.div>
        )}
      </AnimatePresence>
      <p className="text-xs uppercase tracking-[0.2em] text-cyan-700 transition-colors duration-300 dark:text-cyan-200">Contact</p>
      <h2 className="mt-2 text-[clamp(28px,5vw,48px)] font-semibold text-slate-900 transition-colors duration-300 dark:text-white">Talk to our team</h2>
      <div className="mt-6 grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-5">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-colors duration-300 dark:border-slate-700 dark:bg-slate-800 dark:shadow-[0_16px_42px_rgba(2,6,23,0.36)]">
          <h3 className="text-2xl font-semibold text-slate-900 transition-colors duration-300 dark:text-white">Talk to the founder</h3>
          <p className="mt-3 text-[clamp(14px,2vw,18px)] leading-relaxed text-slate-600 transition-colors duration-300 dark:text-slate-300">
            Interested in partnerships, pilot programs, or investment discussions? Reach out directly and we can schedule a focused intro.
          </p>
          <p className="mt-4 text-sm text-slate-600 transition-colors duration-300 dark:text-slate-300">
            <span className="font-medium text-slate-800 transition-colors duration-300 dark:text-slate-200">Business Name:</span>{" "}
            RESILIENCE TECHNOLOGIES LABS (SMC-PRIVATE) LIMITED
          </p>
          <p className="mt-2 text-sm text-slate-600 transition-colors duration-300 dark:text-slate-300">
            <span className="font-medium text-slate-800 transition-colors duration-300 dark:text-slate-200">Business Address:</span>
            <span className="mt-1 block">
              NSTP (National Science and Technology Park)
              <br />
              First Floor
              <br />
              Office No. 1405
              <br />
              Islamabad
              <br />
              Pakistan
            </span>
          </p>
          <div className="mt-6 space-y-3 text-sm text-slate-700 transition-colors duration-300 dark:text-slate-200">
            <a href="https://mail.google.com/mail/?view=cm&fs=1&to=shanu1998end@gmail.com" target="_blank" rel="noopener noreferrer" className="link-slide flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 transition-colors duration-300 hover:border-cyan-400 hover:bg-cyan-50 dark:border-white/10 dark:bg-white/[0.03] dark:hover:border-cyan-300/50 dark:hover:bg-cyan-300/10">
              <Mail size={16} className="text-cyan-300" />
              shanu1998end@gmail.com
            </a>
            <a href="tel:+923403318127" className="link-slide flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 transition-colors duration-300 hover:border-cyan-400 hover:bg-cyan-50 dark:border-white/10 dark:bg-white/[0.03] dark:hover:border-cyan-300/50 dark:hover:bg-cyan-300/10">
              <Phone size={16} className="text-cyan-300" />
              +92 340 3318127
            </a>
            <a href="https://www.linkedin.com/in/shahnawaz-2b9025130" target="_blank" rel="noreferrer" className="link-slide flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 transition-colors duration-300 hover:border-cyan-400 hover:bg-cyan-50 dark:border-white/10 dark:bg-white/[0.03] dark:hover:border-cyan-300/50 dark:hover:bg-cyan-300/10">
              <Globe size={16} className="text-cyan-300" />
              Founder LinkedIn
            </a>
            <a href="https://github.com/shanu222" target="_blank" rel="noreferrer" className="link-slide flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 transition-colors duration-300 hover:border-cyan-400 hover:bg-cyan-50 dark:border-white/10 dark:bg-white/[0.03] dark:hover:border-cyan-300/50 dark:hover:bg-cyan-300/10">
              <Globe size={16} className="text-cyan-300" />
              github.com/shanu222
            </a>
          </div>
        </div>

        <form onSubmit={handleContactSubmit} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-colors duration-300 dark:border-slate-700 dark:bg-slate-800 dark:shadow-[0_16px_42px_rgba(2,6,23,0.36)]">
          <h3 className="text-xl font-semibold text-slate-900 transition-colors duration-300 dark:text-white">Send a message</h3>
          <p className="mt-2 text-sm text-slate-600 transition-colors duration-300 dark:text-slate-300">We usually respond within 24 hours.</p>
          <div className="mt-5 space-y-4">
            <label className="relative block">
              <input name="name" value={formState.name} onChange={handleFormChange} placeholder=" " className="peer w-full rounded-xl border border-slate-300 bg-white px-4 pb-2 pt-5 text-sm text-slate-900 outline-none transition-colors duration-300 focus:border-cyan-500 focus:shadow-[0_0_0_4px_rgba(56,189,248,0.18)] dark:border-white/15 dark:bg-slate-900/60 dark:text-white dark:focus:border-cyan-300/70 dark:focus:shadow-[0_0_0_4px_rgba(103,232,249,0.18)]" />
              <span className="pointer-events-none absolute left-4 top-4 text-sm text-slate-500 transition-all peer-focus:top-2 peer-focus:text-xs peer-focus:text-cyan-700 peer-[&:not(:placeholder-shown)]:top-2 peer-[&:not(:placeholder-shown)]:text-xs dark:text-slate-400 dark:peer-focus:text-cyan-200">
                Your name
              </span>
            </label>
            <label className="relative block">
              <input type="email" name="email" value={formState.email} onChange={handleFormChange} placeholder=" " className="peer w-full rounded-xl border border-slate-300 bg-white px-4 pb-2 pt-5 text-sm text-slate-900 outline-none transition-colors duration-300 focus:border-cyan-500 focus:shadow-[0_0_0_4px_rgba(56,189,248,0.18)] dark:border-white/15 dark:bg-slate-900/60 dark:text-white dark:focus:border-cyan-300/70 dark:focus:shadow-[0_0_0_4px_rgba(103,232,249,0.18)]" />
              <span className="pointer-events-none absolute left-4 top-4 text-sm text-slate-500 transition-all peer-focus:top-2 peer-focus:text-xs peer-focus:text-cyan-700 peer-[&:not(:placeholder-shown)]:top-2 peer-[&:not(:placeholder-shown)]:text-xs dark:text-slate-400 dark:peer-focus:text-cyan-200">
                Work email
              </span>
            </label>
            <label className="relative block">
              <textarea name="message" rows={5} value={formState.message} onChange={handleFormChange} placeholder=" " className="peer w-full rounded-xl border border-slate-300 bg-white px-4 pb-2 pt-5 text-sm text-slate-900 outline-none transition-colors duration-300 focus:border-cyan-500 focus:shadow-[0_0_0_4px_rgba(56,189,248,0.18)] dark:border-white/15 dark:bg-slate-900/60 dark:text-white dark:focus:border-cyan-300/70 dark:focus:shadow-[0_0_0_4px_rgba(103,232,249,0.18)]" />
              <span className="pointer-events-none absolute left-4 top-4 text-sm text-slate-500 transition-all peer-focus:top-2 peer-focus:text-xs peer-focus:text-cyan-700 peer-[&:not(:placeholder-shown)]:top-2 peer-[&:not(:placeholder-shown)]:text-xs dark:text-slate-400 dark:peer-focus:text-cyan-200">
                Tell us about your project
              </span>
            </label>
          </div>
          <button type="submit" disabled={isSubmitting} className="btn-premium mt-5 inline-flex min-h-11 w-full items-center justify-center rounded-xl bg-brand-gradient px-6 py-3 text-sm font-semibold text-white shadow-glow transition duration-200 hover:scale-[1.03] disabled:cursor-not-allowed disabled:opacity-80">
            {isSubmitting ? (
              <span className="inline-flex items-center gap-2">
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                Sending...
              </span>
            ) : (
              "Send Message"
            )}
          </button>
          <p className="mt-3 text-sm text-rose-300">{submitMessage}</p>
        </form>
      </div>
    </motion.section>
  );
}

export default ContactSection;
