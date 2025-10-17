import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  base: "/",
  define: {
    'import.meta.env.VITE_API_URL': JSON.stringify('https://be-ujikom.amayones.my.id/api')
  },
  plugins: [
    react(),
    tailwindcss()
  ],
  build: {
    minify: 'terser',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
          utils: ['axios']
        }
      }
    }
  }
})
