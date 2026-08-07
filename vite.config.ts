import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import path from 'path'; // Импортируйте path, если используете алиасы

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    // Если вы хотите использовать алиас @/ для src, то правильно писать так:
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});