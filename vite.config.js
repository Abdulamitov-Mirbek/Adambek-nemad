import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import obfuscator from 'rollup-plugin-javascript-obfuscator'

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
    minify: 'esbuild',
    // Оптимизация чанков для ускорения загрузки
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'framer-motion'],
        },
      },
      plugins: [
        obfuscator({
          compact: true,
          controlFlowFlattening: false, // Выключил, т.к. сильно бьет по производительности
          deadCodeInjection: false,    // Выключил, чтобы не раздувать размер бандла
          debugProtection: false,      // На Vercel лучше держать выключенным, если нет строгой нужды
          disableConsoleOutput: true, 
          identifierNamesGenerator: 'hexadecimal',
          stringArray: true,
          stringArrayThreshold: 0.75,
          unicodeEscapeSequence: false // Важно для корректного отображения кириллицы
        }),
      ],
    },
  },
})