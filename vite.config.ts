import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "node:path";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@content": path.resolve(__dirname, "./content"),
    },
  },
  build: {
    // Images are imported from src/assets; keep them as files rather than
    // inlining, so the browser can cache them independently of the JS bundle.
    assetsInlineLimit: 2048,
  },
  ssr: {
    // These ship ESM that the prerender step needs to process rather than
    // require() from node_modules.
    noExternal: ["lucide-react"],
  },
});
