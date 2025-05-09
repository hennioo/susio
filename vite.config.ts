import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
import { cartographer } from "@replit/vite-plugin-cartographer";

const isReplit = process.env.NODE_ENV !== "production" && process.env.REPL_ID !== undefined;

// Automatisch erkennen, ob wir lokal oder auf Render sind
const isRender = process.env.RENDER === "true";
const rootDir = isRender ? "." : "client";

export default defineConfig({
  plugins: [
    react(),
    runtimeErrorOverlay(),
    ...(isReplit ? [cartographer()] : []),
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, rootDir, "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets"),
    },
  },
  root: path.resolve(import.meta.dirname, rootDir),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true,
  },
});
