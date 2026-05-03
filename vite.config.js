import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Split chess engine + board into its own chunk (~150KB)
          chess: ['chess.js', 'react-chessboard'],
          // Split GSAP into its own chunk (~80KB)
          gsap: ['gsap'],
        }
      }
    }
  }
})
