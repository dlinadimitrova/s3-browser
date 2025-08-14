import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    hmr: {
      overlay: false,
    },
    fs: {
      strict: true,
    },
  },
  build: {
    sourcemap: false,
  },
  optimizeDeps: {
    exclude: [],
    include: ['react', 'react-dom'],
  },
  esbuild: {
    logOverride: { 'this-is-undefined-in-esm': 'silent' },
  },
  define: {
    __DEV__: false,
  },
  css: {
    devSourcemap: false,
  },
})
