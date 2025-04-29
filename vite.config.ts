import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// Use import.meta to avoid requiring process
const cwd = process.cwd();

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(cwd, "./src"),
      "@services": path.resolve(cwd, "./src/services"),
      "@contexts": path.resolve(cwd, "./src/contexts"),
      "@hooks": path.resolve(cwd, "./src/hooks"),
      "@components": path.resolve(cwd, "./src/components"),
      "@assets": path.resolve(cwd, "./src/assets"),
      "@types": path.resolve(cwd, "./src/types"),
      "@routes": path.resolve(cwd, "./src/routes"),
    },
  },
  // Optional: Add TypeScript-specific configurations if needed
  esbuild: {
    // Ensure modern JSX handling
    jsxInject: `import React from 'react'`,
  },
});
