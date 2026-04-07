import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import obfuscator from "rollup-plugin-javascript-obfuscator";

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
      plugins: [
        obfuscator({
          compact: true,
          controlFlowFlattening: false,
          deadCodeInjection: false,
          debugProtection: false, // CHANGE: was true
          debugProtectionInterval: 0,
          disableConsoleOutput: false, // CHANGE: was true
          identifierNamesGenerator: "mangled",
          stringArray: true,
          stringArrayThreshold: 0.5, // REDUCED from 0.75
          unicodeEscapeSequence: false,
          rotateStringArray: true,
          selfDefending: false,
        }),
      ],
    },
  },
});
