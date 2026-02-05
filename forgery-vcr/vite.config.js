import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // 开发环境用 /，生产环境用 /projects/ForgeryVCR/
  base: process.env.NODE_ENV === 'production' ? '/projects/ForgeryVCR/' : '/',
})
