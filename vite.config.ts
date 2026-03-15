import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => ({
  plugins: [react()],
  // Base URL configuration for CDN deployment
  base: mode === 'production' ? '/Go-Marquee/' : '/',
}));
