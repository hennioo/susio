// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  root: path.resolve(__dirname, "client"),
  plugins: [react()],
  build: {
    outDir: path.resolve(__dirname, "dist/public"), // wichtig: outDir liegt im dist/
    emptyOutDir: true,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "client", "src"),
    },
  },
});
