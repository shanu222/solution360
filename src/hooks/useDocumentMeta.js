import { useEffect } from "react";

const DEFAULT_TITLE = "SustainableSolution360 | Climate & Infrastructure Intelligence";
const DEFAULT_DESCRIPTION =
  "AI-powered platform for climate, energy, and infrastructure analytics.";

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
