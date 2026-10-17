import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'node:path';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: { manifest: true },
  server: { port: 3001, strictPort: true },
  preview: { port: 3001, strictPort: true },
  resolve: {
    alias: { '@': path.resolve(import.meta.dirname, '.') },
  },
});
