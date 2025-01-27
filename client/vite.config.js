import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/',
  server: {
    port: 3000,
  },
  resolve: {
    alias: {
      '@': '/src', // Optional, for absolute imports
    },
  },
});
