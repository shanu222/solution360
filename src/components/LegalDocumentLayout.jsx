import { useDocumentMeta } from "../hooks/useDocumentMeta";
import PageHeader from "./PageHeader";

function LegalDocumentLayout({ documentTitle, metaDescription, heading, lastUpdated, children }) {
  useDocumentMeta(documentTitle, metaDescription);

  return (
    <article>
      <PageHeader kicker="Legal" title={heading} intro={`Last updated: ${lastUpdated}`} />
      <div className="px-5 sm:px-6">
        <div className="mx-auto w-full max-w-7xl border-t border-slate-900/10 pt-12 dark:border-white/10">
          <div className="legal-prose max-w-[68ch] space-y-6 text-[16px] leading-[1.75] text-slate-600 dark:text-slate-300">{children}</div>
        </div>
      </div>
    </article>
  );
}

export default LegalDocumentLayout;
