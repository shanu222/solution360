import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Check, Mail, Phone } from "lucide-react";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { useEffect, useRef, useState } from "react";
import { contact } from "../data/company";
import { Reveal, easeOut } from "./motion/primitives";
import PageHeader from "./PageHeader";
import SocialIcons from "./SocialIcons";

const channels = [
  { icon: Mail, label: "Email", value: contact.email, href: contact.emailHref, external: true },
  { icon: Phone, label: "Phone and WhatsApp", value: contact.phone, href: contact.phoneHref },
  { icon: FaLinkedinIn, label: "Founder on LinkedIn", value: "Shahnawaz", href: contact.founderLinkedIn, external: true },
  { icon: FaGithub, label: "GitHub", value: "github.com/shanu222", href: contact.github, external: true },
];

const fieldClass =
  "peer w-full rounded-2xl border border-slate-900/15 bg-transparent px-4 pb-2.5 pt-6 text-[15px] text-slate-900 outline-none transition-[border-color,box-shadow] duration-300 focus:border-brand-500 focus:shadow-[0_0_0_4px_rgba(47,107,255,0.14)] dark:border-white/15 dark:text-white dark:focus:border-brand-400";

const labelClass =
  "pointer-events-none absolute left-4 top-[18px] text-[15px] text-slate-500 transition-all duration-200 peer-focus:top-2.5 peer-focus:text-xs peer-focus:text-brand-600 peer-[&:not(:placeholder-shown)]:top-2.5 peer-[&:not(:placeholder-shown)]:text-xs dark:text-slate-400 dark:peer-focus:text-brand-300";

function ContactSection() {
  const [formState, setFormState] = useState({ name: "", email: "", subject: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");
  const [toast, setToast] = useState(null);
  const [sent, setSent] = useState(false);
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
      setSent(true);
      window.setTimeout(() => setSent(false), 3200);
      showToast("success", "Message sent successfully.", "We'll get back to you soon.");
    } catch {
      showToast("error", "Unable to send message.", "Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="scroll-mt-24">
      <AnimatePresence>
        {toast && (
          <motion.div
            role="status"
            initial={{ opacity: 0, y: -16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.97 }}
            transition={{ duration: 0.35, ease: easeOut }}
            className={`fixed right-4 top-20 z-[90] max-w-sm rounded-2xl border px-4 py-3 text-sm shadow-lift backdrop-blur-md ${
              toast.type === "success"
                ? "border-emerald-300 bg-emerald-50/95 text-emerald-900 dark:border-emerald-300/40 dark:bg-emerald-950/80 dark:text-emerald-100"
                : "border-rose-300 bg-rose-50/95 text-rose-900 dark:border-rose-300/40 dark:bg-rose-950/80 dark:text-rose-100"
            }`}
          >
            <p className="font-semibold">{toast.title}</p>
            <p className="mt-1">{toast.description}</p>
          </motion.div>
        )}
      </AnimatePresence>

      <PageHeader
        kicker="Contact"
        title="Talk to our team"
        intro="Interested in partnerships, pilot programmes or investment discussions? Reach out directly and we can schedule a focused introduction."
      />

      <div className="px-5 sm:px-6">
        <div className="mx-auto grid w-full max-w-7xl gap-14 lg:grid-cols-12 lg:gap-10">
          <Reveal className="lg:col-span-5">
            <h2 className="text-sm text-slate-500 dark:text-slate-400">Talk to the founder</h2>
            <ul className="mt-4 border-t border-slate-900/10 dark:border-white/10">
              {channels.map((channel) => (
                <li key={channel.label}>
                  <a
                    href={channel.href}
                    {...(channel.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="group flex items-center gap-4 border-b border-slate-900/10 py-4 dark:border-white/10"
                  >
                    <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-slate-900/10 text-slate-600 transition-colors duration-300 group-hover:border-brand-500 group-hover:bg-brand-500 group-hover:text-white dark:border-white/15 dark:text-slate-300">
                      <channel.icon size={17} strokeWidth={1.75} />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-sm text-slate-500 dark:text-slate-400">{channel.label}</span>
                      <span className="block truncate text-[15.5px] font-medium text-slate-900 dark:text-white">{channel.value}</span>
                    </span>
                    <ArrowUpRight
                      size={18}
                      className="text-slate-300 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand-500 dark:text-slate-600"
                      aria-hidden="true"
                    />
                  </a>
                </li>
              ))}
            </ul>

            <dl className="mt-10 grid gap-6 text-[15px] sm:grid-cols-2">
              <div>
                <dt className="text-sm text-slate-500 dark:text-slate-400">Business name</dt>
                <dd className="mt-1 font-medium text-slate-900 dark:text-white">RESILIENCE TECHNOLOGIES LABS (SMC-PRIVATE) LIMITED</dd>
              </div>
              <div>
                <dt className="text-sm text-slate-500 dark:text-slate-400">Business address</dt>
                <dd className="mt-1 not-italic leading-relaxed text-slate-700 dark:text-slate-200">
                  <address className="not-italic">
                    House No. 287, Street No. 6
                    <br />
                    Block D-Extension, Rawal Enclave Phase-1
                    <br />
                    Kuri, Islamabad, Pakistan
                  </address>
                </dd>
              </div>
            </dl>
            <SocialIcons className="mt-8" iconSize="sm" />
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-7">
            <form
              onSubmit={handleContactSubmit}
              noValidate
              className="rounded-[26px] border border-slate-900/10 bg-white p-6 shadow-soft dark:border-white/10 dark:bg-[#0f2440] dark:shadow-none sm:p-9"
            >
              <h2 className="text-2xl font-semibold tracking-[-0.02em] text-slate-900 dark:text-white">Send a message</h2>
              <p className="mt-1.5 text-[15px] text-slate-600 dark:text-slate-300">We usually respond within 24 hours.</p>
              <div className="mt-7 grid gap-4 sm:grid-cols-2">
                <label className="relative block">
                  <input name="name" autoComplete="name" value={formState.name} onChange={handleFormChange} placeholder=" " className={fieldClass} />
                  <span className={labelClass}>Your name</span>
                </label>
                <label className="relative block">
                  <input type="email" name="email" autoComplete="email" value={formState.email} onChange={handleFormChange} placeholder=" " className={fieldClass} />
                  <span className={labelClass}>Work email</span>
                </label>
                <label className="relative block sm:col-span-2">
                  <textarea name="message" rows={6} value={formState.message} onChange={handleFormChange} placeholder=" " className={`${fieldClass} resize-y`} />
                  <span className={labelClass}>Tell us about your project</span>
                </label>
              </div>

              <AnimatePresence>
                {submitMessage && (
                  <motion.p
                    role="alert"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-3 text-sm text-rose-600 dark:text-rose-300"
                  >
                    {submitMessage}
                  </motion.p>
                )}
              </AnimatePresence>

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-premium mt-6 inline-flex h-12 w-full items-center justify-center overflow-hidden rounded-full bg-brand-gradient px-7 font-medium text-white shadow-glow transition-transform duration-200 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-80 sm:w-auto"
              >
                <AnimatePresence mode="wait" initial={false}>
                  {isSubmitting ? (
                    <motion.span key="sending" initial={{ y: 16, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -16, opacity: 0 }} className="inline-flex items-center gap-2">
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                      Sending...
                    </motion.span>
                  ) : sent ? (
                    <motion.span key="sent" initial={{ y: 16, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -16, opacity: 0 }} className="inline-flex items-center gap-2">
                      <Check size={17} />
                      Message sent
                    </motion.span>
                  ) : (
                    <motion.span key="idle" initial={{ y: 16, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -16, opacity: 0 }}>
                      Send message
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export default ContactSection;
