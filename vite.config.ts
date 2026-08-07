import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  // Важно! Если ваш репозиторий называется не acab310501-cmd.github.io, а просто flora-atelier,
  // то раскомментируйте строку ниже и укажите название репозитория:
  // base: '/flora-atelier/', 
});