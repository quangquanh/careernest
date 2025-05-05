import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import dns from 'dns'
import dotenv from 'dotenv'

dotenv.config() // Load biến môi trường từ file .env

dns.setDefaultResultOrder('verbatim')

export default defineConfig({
  plugins: [react()],
  server: {
    port: parseInt(process.env.VITE_PORT, 10) || 3000,
  },
  optimizeDeps: {
    include: ['pdfjs-dist'],
  },
})
