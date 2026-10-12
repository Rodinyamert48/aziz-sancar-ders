import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// GitHub Pages: https://<kullanici>.github.io/aziz-sancar-ders/
export default defineConfig({
  base: '/aziz-sancar-ders/',
  plugins: [react(), tailwindcss()],
})
