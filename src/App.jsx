import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import {
  ArrowRight,
  Bot,
  BriefcaseBusiness,
  ChartNoAxesCombined,
  CheckCircle2,
  Globe,
  Layers3,
  Mail,
  Menu,
  Phone,
  ShieldCheck,
  Sparkles,
  Workflow,
  X,
} from "lucide-react";
import heroImage from "../images/hero-illustration.svg";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.45, ease: "easeOut" },
};

const staggerContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const staggerItem = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0 },
};

const navItems = [
  { id: "products", label: "Products" },
  { id: "about", label: "Who We Are" },
  { id: "how-it-works", label: "How It Works" },
  { id: "contact", label: "Contact" },
];

const trustStats = [
  { title: "10+ Projects", subtitle: "Climate & sustainability initiatives" },
  { title: "AI Powered", subtitle: "Smart decision workflows" },
  { title: "Enterprise Ready", subtitle: "Secure and scalable architecture" },
];

const productCards = [
  {
    title: "Energy Intelligence Platform",
    description: "Optimize renewable performance, demand planning, and reporting in one control layer.",
    icon: ChartNoAxesCombined,
  },
  {
    title: "Sustainability Reporting Suite",
    description: "Automate ESG data collection, validation, and compliance-ready outputs for leadership.",
    icon: Layers3,
  },
  {
    title: "Resilience Response Console",
    description: "Monitor high-risk operations with unified response workflows and alert intelligence.",
    icon: ShieldCheck,
  },
];

const testimonials = [
  {
    quote: "Solution360 helped us turn fragmented sustainability operations into a single executive dashboard.",
    author: "Director of Operations, Regional Energy Group",
  },
  {
    quote: "The platform feels enterprise-grade while staying simple for cross-functional teams.",
    author: "Program Lead, Climate Innovation Partner",
  },
  {
    quote: "Fast rollout, measurable value, and investor-ready reporting in weeks.",
    author: "Head of Strategy, Infrastructure Startup",
  },
];

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 400], [0, -30]);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => window.clearInterval(timer);
  }, []);

  const year = useMemo(() => new Date().getFullYear(), []);

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    setMenuOpen(false);
  };

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
    if (submitMessage) {
      setSubmitMessage("");
    }
  };

  const handleContactSubmit = async (event) => {
    event.preventDefault();

    const { name, email, message } = formState;
    if (!name.trim() || !email.trim() || !message.trim()) {
      setSubmitMessage("Please complete all fields before submitting.");
      return;
    }

    setIsSubmitting(true);
    await new Promise((resolve) => window.setTimeout(resolve, 900));
    setIsSubmitting(false);
    setSubmitMessage("Thanks. Your message is ready - sending through your email app.");

    const subject = encodeURIComponent("Website Inquiry - Solution360");
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
    window.location.href = `mailto:shanu1998end@gmail.com?subject=${subject}&body=${body}`;

    setFormState({ name: "", email: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(circle_at_15%_20%,rgba(37,99,235,0.28),transparent_38%),radial-gradient(circle_at_82%_10%,rgba(8,145,178,0.2),transparent_34%),linear-gradient(180deg,#020617_0%,#0b1120_58%,#020617_100%)]" />
      <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} onNavigate={scrollToSection} />

      <main className="mx-auto max-w-6xl px-4 pt-20 sm:px-6 lg:px-8">
        <section id="top" className="grid items-center gap-10 py-14 lg:grid-cols-2">
          <motion.div {...fadeInUp}>
            <p className="inline-flex items-center gap-2 rounded-full border border-cyan-300/30 bg-cyan-300/10 px-4 py-1 text-sm text-cyan-200">
              <Sparkles size={14} />
              AI-Powered Sustainability Intelligence
            </p>
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: "easeOut" }}
              className="mt-5 text-4xl font-semibold leading-tight text-white md:text-5xl"
            >
              360 degree technology for climate, energy, and resilience outcomes.
            </motion.h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-300">
              We design premium enterprise software products that turn operations into measurable impact with
              clear reporting, modern UX, and intelligent automation.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <button
                onClick={() => scrollToSection("products")}
                className="rounded-xl bg-brand-gradient px-6 py-3 font-medium text-white shadow-glow transition duration-200 hover:scale-[1.03]"
              >
                Explore Products
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className="rounded-xl border border-white/20 bg-white/5 px-6 py-3 font-medium text-slate-100 backdrop-blur transition hover:border-cyan-300/60 hover:bg-cyan-300/10"
              >
                Contact Team
              </button>
            </div>
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="show"
              className="mt-8 grid gap-3 sm:grid-cols-3"
            >
              {trustStats.map((item) => (
                <motion.div
                  key={item.title}
                  variants={staggerItem}
                  className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur"
                >
                  <p className="text-sm font-semibold text-cyan-200">{item.title}</p>
                  <p className="mt-1 text-xs text-slate-300">{item.subtitle}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div style={{ y: heroY }} className="relative">
            <motion.div
              animate={{ y: [-8, 8, -8] }}
              transition={{ duration: 6, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
              className="rounded-3xl border border-cyan-300/20 bg-white/5 p-3 shadow-glow backdrop-blur-xl"
            >
              <img
                src={heroImage}
                alt="Dashboard preview of Solution360 platform"
                className="w-full rounded-2xl object-cover"
                loading="eager"
              />
            </motion.div>
          </motion.div>
        </section>

        <SectionHeading id="about" eyebrow="WHO WE ARE" title="Built for product clarity, outcomes, and long-term trust." />
        <motion.section {...fadeInUp} className="grid gap-8 rounded-3xl border border-white/10 bg-white/[0.03] p-6 md:grid-cols-2 md:p-10">
          <div className="space-y-4 text-slate-300">
            <p>
              Solution360 helps governments, enterprises, and NGOs modernize sustainability and resilience operations
              without introducing complexity.
            </p>
            <p>
              We combine product design, robust data pipelines, and AI-assisted decision support into a clean platform
              experience teams can trust.
            </p>
            <p>
              Every rollout is designed for real-world adoption, executive visibility, and investor-ready storytelling.
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-blue-500/20 to-cyan-400/10 p-6">
            <p className="text-sm uppercase tracking-[0.18em] text-cyan-200">Our approach</p>
            <ul className="mt-4 space-y-3 text-slate-200">
              {["Design-led delivery", "Data-first architecture", "Rapid but reliable implementation"].map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-cyan-300" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </motion.section>

        <section id="products" className="py-12">
          <SectionHeading eyebrow="OUR PRODUCTS" title="Enterprise platforms that scale with your impact." />
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="grid gap-5 md:grid-cols-3"
          >
            {productCards.map((card) => (
              <motion.article
                key={card.title}
                variants={staggerItem}
                whileHover={{ y: -8, scale: 1.03 }}
                transition={{ duration: 0.45, ease: "easeOut" }}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition hover:border-cyan-300/60 hover:shadow-glow"
              >
                <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-blue-400 via-cyan-300 to-transparent opacity-0 transition duration-300 group-hover:opacity-100" />
                <card.icon className="text-cyan-300" size={20} />
                <h3 className="mt-4 text-xl font-semibold text-white">{card.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-300">{card.description}</p>
                <button
                  onClick={() => scrollToSection("contact")}
                  className="mt-6 inline-flex items-center gap-2 text-sm text-cyan-200 transition group-hover:gap-3 group-hover:text-cyan-100"
                >
                  View Details <ArrowRight size={14} />
                </button>
              </motion.article>
            ))}
          </motion.div>
        </section>

        <section id="how-it-works" className="py-10">
          <SectionHeading eyebrow="HOW IT WORKS" title="A clean 3-step delivery flow." />
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            className="grid gap-5 md:grid-cols-3"
          >
            {[
              { title: "Discover", icon: Globe, desc: "Align strategy, KPIs, and data sources." },
              { title: "Build", icon: Workflow, desc: "Ship high-quality platform modules quickly." },
              { title: "Scale", icon: Bot, desc: "Automate insights and optimize continuously." },
            ].map((step, index) => (
              <motion.div key={step.title} variants={staggerItem} className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
                <step.icon size={20} className="text-cyan-300" />
                <p className="mt-3 text-xs uppercase tracking-[0.18em] text-cyan-100">Step {index + 1}</p>
                <h3 className="mt-2 text-xl font-semibold text-white">{step.title}</h3>
                <p className="mt-2 text-sm text-slate-300">{step.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </section>

        <section className="rounded-3xl border border-white/10 bg-slate-900/45 py-10">
          <SectionHeading eyebrow="WHY CHOOSE US" title="Product quality that meets business reality." />
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="grid gap-4 sm:grid-cols-2"
          >
            {[
              {
                icon: BriefcaseBusiness,
                title: "Senior Product Execution",
                desc: "Hands-on delivery from strategy to implementation with zero handoff friction.",
              },
              {
                icon: Sparkles,
                title: "Modern UX Standards",
                desc: "Polished interfaces inspired by best-in-class SaaS products and accessibility practices.",
              },
              {
                icon: Bot,
                title: "Practical AI Workflows",
                desc: "Automation that supports decision-making without reducing transparency.",
              },
              {
                icon: ChartNoAxesCombined,
                title: "Investor-Ready Visibility",
                desc: "Track outcomes with clean metrics and reporting your leadership can present confidently.",
              },
            ].map((item) => (
              <motion.div
                key={item.title}
                variants={staggerItem}
                whileHover={{ y: -5 }}
                transition={{ duration: 0.4 }}
                className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 text-slate-200"
              >
                <item.icon size={18} className="text-cyan-300" />
                <h3 className="mt-3 text-lg font-semibold text-white">{item.title}</h3>
                <p className="mt-2 text-sm text-slate-300">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </section>

        <section className="py-12">
          <SectionHeading eyebrow="TESTIMONIALS" title="What partners say." />
          <motion.div {...fadeInUp} className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-8">
            <AnimatePresence mode="wait">
              <motion.blockquote
                key={activeTestimonial}
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -16 }}
                transition={{ duration: 0.35 }}
              >
                <p className="text-xl leading-relaxed text-slate-100">"{testimonials[activeTestimonial].quote}"</p>
                <footer className="mt-4 text-sm text-cyan-200">{testimonials[activeTestimonial].author}</footer>
              </motion.blockquote>
            </AnimatePresence>
          </motion.div>
        </section>

        <motion.section
          {...fadeInUp}
          className="relative my-12 overflow-hidden rounded-3xl border border-blue-300/30 bg-brand-gradient p-8 text-white shadow-glow md:p-10"
        >
          <motion.div
            aria-hidden="true"
            animate={{ x: ["-10%", "8%", "-10%"], opacity: [0.35, 0.5, 0.35] }}
            transition={{ duration: 7, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            className="pointer-events-none absolute -top-10 left-0 h-40 w-40 rounded-full bg-cyan-200/40 blur-3xl"
          />
          <motion.div
            aria-hidden="true"
            animate={{ x: ["10%", "-8%", "10%"], opacity: [0.2, 0.35, 0.2] }}
            transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            className="pointer-events-none absolute bottom-0 right-0 h-44 w-44 rounded-full bg-blue-200/40 blur-3xl"
          />
          <h2 className="relative text-3xl font-semibold md:text-4xl">Built for growth and funding readiness.</h2>
          <p className="relative mt-3 max-w-2xl text-sm text-white/90 md:text-base">
            Position your platform with a premium story, clear product value, and execution quality that builds trust
            from customers to investors.
          </p>
          <div className="relative mt-6 flex flex-wrap gap-4">
            <button
              onClick={() => scrollToSection("contact")}
              className="rounded-xl bg-white px-6 py-3 font-semibold text-blue-700 transition duration-200 hover:scale-[1.03] hover:shadow-[0_16px_40px_rgba(255,255,255,0.35)]"
            >
              Schedule Intro Call
            </button>
          </div>
          <p className="relative mt-4 text-sm text-cyan-100">Built for investors, startups, and enterprises.</p>
        </motion.section>

        <motion.section id="contact" {...fadeInUp} className="grid gap-6 pb-12 md:grid-cols-2">
          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
            <p className="text-xs uppercase tracking-[0.2em] text-cyan-200">Contact</p>
            <h3 className="mt-3 text-2xl font-semibold text-white">Talk to the founder</h3>
            <p className="mt-3 text-sm leading-relaxed text-slate-300">
              Interested in partnerships, pilot programs, or investment discussions? Reach out directly and we can
              schedule a focused intro.
            </p>
            <div className="mt-6 space-y-3 text-sm text-slate-200">
              <a
                href="mailto:shanu1998end@gmail.com"
                className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 transition hover:border-cyan-300/50 hover:bg-cyan-300/10"
              >
                <Mail size={16} className="text-cyan-300" />
                shanu1998end@gmail.com
              </a>
              <a
                href="tel:+923403318127"
                className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 transition hover:border-cyan-300/50 hover:bg-cyan-300/10"
              >
                <Phone size={16} className="text-cyan-300" />
                +92 340 3318127
              </a>
              <a
                href="https://www.linkedin.com/in/shahnawaz-2b9025130"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 transition hover:border-cyan-300/50 hover:bg-cyan-300/10"
              >
                <Globe size={16} className="text-cyan-300" />
                Founder LinkedIn
              </a>
              <a
                href="https://github.com/shanu222"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 transition hover:border-cyan-300/50 hover:bg-cyan-300/10"
              >
                <Globe size={16} className="text-cyan-300" />
                github.com/shanu222
              </a>
            </div>
          </div>

          <form onSubmit={handleContactSubmit} className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
            <h3 className="text-xl font-semibold text-white">Send a message</h3>
            <p className="mt-2 text-sm text-slate-300">We usually respond within 24 hours.</p>
            <div className="mt-5 space-y-4">
              <input
                name="name"
                value={formState.name}
                onChange={handleFormChange}
                placeholder="Your name"
                className="w-full rounded-xl border border-white/15 bg-slate-900/60 px-4 py-3 text-sm text-white placeholder:text-slate-400 outline-none transition focus:border-cyan-300/70 focus:shadow-[0_0_0_4px_rgba(103,232,249,0.18)]"
              />
              <input
                type="email"
                name="email"
                value={formState.email}
                onChange={handleFormChange}
                placeholder="Work email"
                className="w-full rounded-xl border border-white/15 bg-slate-900/60 px-4 py-3 text-sm text-white placeholder:text-slate-400 outline-none transition focus:border-cyan-300/70 focus:shadow-[0_0_0_4px_rgba(103,232,249,0.18)]"
              />
              <textarea
                name="message"
                rows={5}
                value={formState.message}
                onChange={handleFormChange}
                placeholder="Tell us about your project"
                className="w-full rounded-xl border border-white/15 bg-slate-900/60 px-4 py-3 text-sm text-white placeholder:text-slate-400 outline-none transition focus:border-cyan-300/70 focus:shadow-[0_0_0_4px_rgba(103,232,249,0.18)]"
              />
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-5 inline-flex min-h-11 items-center justify-center rounded-xl bg-brand-gradient px-6 py-3 text-sm font-semibold text-white shadow-glow transition duration-200 hover:scale-[1.03] disabled:cursor-not-allowed disabled:opacity-80"
            >
              {isSubmitting ? "Sending..." : "Send Message"}
            </button>
            <p className={`mt-3 text-sm ${submitMessage.includes("Please") ? "text-rose-300" : "text-cyan-200"}`}>
              {submitMessage}
            </p>
          </form>
        </motion.section>
      </main>

      <footer className="relative border-t border-white/10 bg-slate-950/95">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/70 to-transparent" />
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-8 text-sm sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
          <div>
            <p className="text-base font-semibold text-white">Solution360</p>
            <p className="mt-2 text-slate-400">Premium climate-tech products designed for growth.</p>
          </div>
          <div>
            <p className="font-medium text-slate-200">Product</p>
            <ul className="mt-3 space-y-2 text-slate-400">
              <li><button onClick={() => scrollToSection("products")} className="transition hover:text-cyan-200">Product Suite</button></li>
              <li><button onClick={() => scrollToSection("how-it-works")} className="transition hover:text-cyan-200">How It Works</button></li>
            </ul>
          </div>
          <div>
            <p className="font-medium text-slate-200">Company</p>
            <ul className="mt-3 space-y-2 text-slate-400">
              <li><button onClick={() => scrollToSection("about")} className="transition hover:text-cyan-200">Who We Are</button></li>
              <li><button onClick={() => scrollToSection("contact")} className="transition hover:text-cyan-200">Contact</button></li>
            </ul>
          </div>
          <div>
            <p className="font-medium text-slate-200">Social</p>
            <ul className="mt-3 space-y-2 text-slate-400">
              <li><a href="mailto:shanu1998end@gmail.com" className="transition hover:text-cyan-200">Email</a></li>
              <li><a href="https://github.com/shanu222" target="_blank" rel="noreferrer" className="transition hover:text-cyan-200">GitHub</a></li>
              <li><a href="https://www.linkedin.com/in/solutions-three-sixty-degree-a32913405/" target="_blank" rel="noreferrer" className="transition hover:text-cyan-200">LinkedIn</a></li>
            </ul>
          </div>
        </div>
        <div className="mx-auto max-w-6xl px-4 pb-6 text-xs text-slate-500 sm:px-6 lg:px-8">
          © {year} Solution360. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

function Navbar({ menuOpen, setMenuOpen, onNavigate }) {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-slate-950/65 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <button onClick={() => onNavigate("top")} className="text-lg font-semibold tracking-tight text-white">
          Solution360
        </button>
        <nav className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <button key={item.id} onClick={() => onNavigate(item.id)} className="nav-link text-sm text-slate-300">
              {item.label}
            </button>
          ))}
          <button
            onClick={() => onNavigate("contact")}
            className="rounded-lg bg-brand-gradient px-4 py-2 text-sm font-medium text-white shadow-glow transition hover:scale-[1.04]"
          >
            Request Demo
          </button>
        </nav>
        <button onClick={() => setMenuOpen((v) => !v)} className="rounded-lg border border-white/20 p-2 text-white md:hidden">
          {menuOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="border-t border-white/10 bg-slate-950/95 p-4 md:hidden"
          >
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className="block w-full rounded-lg px-3 py-2 text-left text-slate-200 transition hover:bg-white/10"
              >
                {item.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function SectionHeading({ eyebrow, title, id }) {
  return (
    <motion.div id={id} {...fadeInUp} className="mb-6 pt-10">
      <p className="text-xs uppercase tracking-[0.2em] text-cyan-200">{eyebrow}</p>
      <h2 className="mt-2 text-2xl font-semibold text-white md:text-3xl">{title}</h2>
    </motion.div>
  );
}

export default App;
