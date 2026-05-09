import { useDocumentMeta } from "../hooks/useDocumentMeta";

function LegalDocumentLayout({ documentTitle, metaDescription, heading, lastUpdated, children }) {
  useDocumentMeta(documentTitle, metaDescription);

  return (
    <section className="w-full px-6 py-[60px]">
      <div className="mx-auto w-full max-w-7xl">
        <article className="mx-auto max-w-3xl rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-colors duration-300 dark:border-slate-700 dark:bg-slate-800 dark:shadow-[0_16px_42px_rgba(2,6,23,0.36)] sm:p-8 md:p-10">
          <p className="text-xs uppercase tracking-[0.2em] text-cyan-700 transition-colors duration-300 dark:text-cyan-200">Legal</p>
          <h1 className="mt-2 text-[clamp(26px,4vw,40px)] font-semibold tracking-tight text-slate-900 transition-colors duration-300 dark:text-white">
            {heading}
          </h1>
          <p className="mt-2 text-sm text-slate-500 transition-colors duration-300 dark:text-slate-400">Last updated: {lastUpdated}</p>
          <div className="mt-8 space-y-6 text-sm leading-relaxed text-slate-600 transition-colors duration-300 dark:text-slate-300">{children}</div>
        </article>
      </div>
    </section>
  );
}

export default LegalDocumentLayout;
