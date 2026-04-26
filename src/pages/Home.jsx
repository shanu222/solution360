import { Link, useNavigate } from "react-router-dom";
import Hero from "../components/Hero";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="space-y-12">
      <Hero onNavigate={(path) => navigate(path)} />

      <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition-colors duration-300 dark:border-slate-700 dark:bg-slate-800">
        <p className="text-xs uppercase tracking-[0.2em] text-cyan-700 transition-colors duration-300 dark:text-cyan-200">Overview</p>
        <h2 className="mt-3 text-3xl font-semibold text-slate-900 transition-colors duration-300 dark:text-white">Enterprise sustainability software for measurable decisions.</h2>
        <p className="mt-4 max-w-3xl text-base text-slate-600 transition-colors duration-300 dark:text-slate-300">
          SustainableSolution360 helps public and private organizations move from fragmented operations to clear execution through AI-assisted workflows, reliable reporting, and investor-ready visibility.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link to="/products" className="btn-premium rounded-xl bg-brand-gradient px-6 py-3 font-medium text-white shadow-glow transition hover:scale-[1.03]">
            Explore Products
          </Link>
          <Link to="/contact" className="rounded-xl border border-slate-300 bg-white px-6 py-3 font-medium text-slate-700 transition hover:border-cyan-400 hover:bg-cyan-50 dark:border-white/20 dark:bg-slate-900/50 dark:text-slate-100 dark:hover:border-cyan-300/60 dark:hover:bg-cyan-300/10">
            Talk to the Team
          </Link>
        </div>
      </section>
    </div>
  );
}

export default Home;
