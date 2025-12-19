// hooks/useDocumentTitle.js
import { useEffect } from "react";

/**
 * Custom hook to dynamically update the document title
 * @param {string} title - The page title to set
 * @param {string} [defaultTitle] - Optional fallback title
 */
const useDocumentTitle = (title, defaultTitle = "My App") => {
  useEffect(() => {
    if (title) {
      document.title = title;
    } else {
      document.title = defaultTitle;
    }
  }, [title, defaultTitle]);
};

export default useDocumentTitle;
