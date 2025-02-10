import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"), // Set @ alias to src directory
    },
  },
  optimizeDeps: {
    include: ["webtorrent/dist/webtorrent.min.js"],
  },
});
