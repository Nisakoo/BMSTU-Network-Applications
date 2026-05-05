import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    proxy: {
      '/services': {
        target: 'http://localhost:3000',
        changeOrigin: true
      }
    }
  }
});
