import { useEffect } from "react";

const DEFAULT_TITLE = "RESILIENCE TECHNOLOGIES LABS | AI for Climate & Infrastructure";
const DEFAULT_DESCRIPTION =
  "RESILIENCE TECHNOLOGIES LABS is an AI and technology company specializing in disaster resilience, infrastructure intelligence, geospatial analytics, sustainability platforms, digital transformation, enterprise software, and advanced decision-support systems.";

export function useDocumentMeta(title, description) {
  useEffect(() => {
    const previousTitle = document.title;
    const meta = document.querySelector('meta[name="description"]');
    const previousDescription = meta?.getAttribute("content") ?? "";

    document.title = title;
    if (meta) {
      meta.setAttribute("content", description);
    }

    return () => {
      document.title = previousTitle;
      if (meta) {
        meta.setAttribute("content", previousDescription || DEFAULT_DESCRIPTION);
      }
    };
  }, [title, description]);
}

export { DEFAULT_TITLE, DEFAULT_DESCRIPTION };
