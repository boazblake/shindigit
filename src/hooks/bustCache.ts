import { useEffect } from "react";

export const useCacheBuster = () => {
  useEffect(() => {
    const CACHE_VERSION = import.meta.env.VITE_CACHE_VERSION;
    const current = localStorage.getItem("CACHE_VERSION");
    
    // Only clear cache and reload if the version has changed
    if (current !== CACHE_VERSION) {
      // Check if we've already tried to clear the cache in this session
      const hasClearedCache = sessionStorage.getItem("hasClearedCache");
      if (!hasClearedCache) {
        console.log("CLEARING CACHE");
        localStorage.clear();
        indexedDB.deleteDatabase("gun");
        localStorage.setItem("CACHE_VERSION", CACHE_VERSION);
        sessionStorage.setItem("hasClearedCache", "true");
        window.location.reload();
      }
    }
  }, []);
};
