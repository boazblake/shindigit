import { useEffect } from "react";

export const useCacheBuster = () => {
  useEffect(() => {
    const CACHE_VERSION = import.meta.env.VITE_CACHE_VERSION;
    const current = localStorage.getItem("CACHE_VERSION");
    if (current !== CACHE_VERSION) {
      console.log("CLEARING CACHE");
      localStorage.clear();
      indexedDB.deleteDatabase("gun");
      localStorage.setItem("CACHE_VERSION", CACHE_VERSION);
      window.location.reload();
    }
  }, []);
};
