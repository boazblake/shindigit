import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src/"),
      "@services": path.resolve(__dirname, "./src/services/"),
      "@contexts": path.resolve(__dirname, "./src/contexts/"),
      "@hooks": path.resolve(__dirname, "./src/hooks/"),
      "@components": path.resolve(__dirname, "./src/components/"),
      "@assets": path.resolve(__dirname, "./src/assets/"),
      "@types": path.resolve(__dirname, "./src/types/"),
      "@routes": path.resolve(__dirname, "./src/routes/"),
    },
  },
});
