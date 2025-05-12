import { createRoot } from "react-dom/client";
import App from "./App";
import "./src/index.css";
import { ThemeProvider } from "@/components/ui/theme-provider";

createRoot(document.getElementById("root")!).render(
  <ThemeProvider defaultTheme="light" storageKey="travel-map-theme">
    <App />
  </ThemeProvider>
);
