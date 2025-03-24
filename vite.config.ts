import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  assetsInclude: ['**/*.MOV', '**/*.mov', '**/*.mp4'], // Support multiple video formats
  server: {
    hmr: {
      overlay: true
    }
  },
  optimizeDeps: {
    include: ['**/*.MOV', '**/*.mov', '**/*.mp4']
  }
});
