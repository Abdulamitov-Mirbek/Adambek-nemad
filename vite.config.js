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
    sourcemap: false, // Обязательно отключаем карты кода
    minify: 'terser',
    rollupOptions: {
      plugins: [
        obfuscator({
          compact: true,
          controlFlowFlattening: true,
          deadCodeInjection: true,
          debugProtection: true, // Защита от открытия DevTools
          debugProtectionInterval: 2000,
          disableConsoleOutput: true, // Отключает console.log в билде
          identifierNamesGenerator: 'hexadecimal',
          stringArray: true,
          stringArrayThreshold: 0.75,
        }),
      ],
    },
  },
})