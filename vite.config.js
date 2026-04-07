import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],

  server: {
    watch: {
      usePolling: true,
    },
    host: true,
    port: 3000,
  },

  build: {
    sourcemap: false,
    minify: "esbuild",
    // Оптимизация чанков для ускорения загрузки
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom", "framer-motion"],
        },
      },
    },
  },
});
