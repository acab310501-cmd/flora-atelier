import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  // Важно! Указываем название репозитория, чтобы GitHub Pages знал, где искать файлы.
  base: '/flora-atelier/', 
});