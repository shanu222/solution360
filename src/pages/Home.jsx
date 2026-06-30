import { Link, useNavigate } from "react-router-dom";
import Hero from "../components/Hero";
import { useDocumentMeta } from "../hooks/useDocumentMeta";

function Home() {
  const navigate = useNavigate();
  useDocumentMeta(
    "RESILIENCE TECHNOLOGIES LABS | AI for Climate & Infrastructure",
    "RESILIENCE TECHNOLOGIES LABS develops AI-powered platforms for climate resilience, infrastructure intelligence, sustainability, education, and digital transformation."
  );

  return (
    <div className="space-y-4">
      <section className="w-full px-6 py-[60px]">
        <div className="mx-auto w-full max-w-7xl">
          <Hero onNavigate={(path) => navigate(path)} />
        </div>
      </section>

      <section className="w-full px-6 py-[60px]">
        <div className="mx-auto w-full max-w-7xl rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition-colors duration-300 dark:border-slate-700 dark:bg-slate-800 md:p-12">
          <p className="text-xs uppercase tracking-[0.2em] text-cyan-700 transition-colors duration-300 dark:text-cyan-200">Overview</p>
          <h2 className="mt-3 text-[clamp(28px,5vw,48px)] font-semibold leading-tight text-slate-900 transition-colors duration-300 dark:text-white">
            Enterprise sustainability software for measurable decisions.
          </h2>
          <p className="mt-4 max-w-4xl text-[clamp(14px,2vw,18px)] text-slate-600 transition-colors duration-300 dark:text-slate-300">
            RESILIENCE TECHNOLOGIES LABS is an AI and technology company specializing in disaster resilience, infrastructure intelligence, geospatial analytics, sustainability platforms, digital transformation, enterprise software, and advanced decision-support systems.
          </p>
          <div className="mt-6 grid gap-3 sm:flex sm:flex-wrap">
            <Link to="/products" className="btn-premium w-full rounded-xl bg-brand-gradient px-6 py-3 text-center font-medium text-white shadow-glow transition hover:scale-[1.03] sm:w-auto">
              Explore Products
            </Link>
            <Link to="/contact" className="w-full rounded-xl border border-slate-300 bg-white px-6 py-3 text-center font-medium text-slate-700 transition hover:border-cyan-400 hover:bg-cyan-50 dark:border-white/20 dark:bg-slate-900/50 dark:text-slate-100 dark:hover:border-cyan-300/60 dark:hover:bg-cyan-300/10 sm:w-auto">
              Talk to the Team
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
