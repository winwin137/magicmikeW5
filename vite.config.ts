import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  assetsInclude: ['**/*.MOV', '**/*.mov', '**/*.mp4', '**/*.jpg', '**/*.png', 'trumpStealing.jpg'], // Support multiple asset types
  build: {
    rollupOptions: {
      output: {
        assetFileNames: (assetInfo) => {
          if (/\.(mov|MOV|mp4)$/.test(assetInfo.name)) {
            return 'videos/[name][extname]';
          }
          if (/\.(jpg|jpeg|png|gif)$/.test(assetInfo.name)) {
            return 'images/[name][extname]';
          }
          return 'assets/[name]-[hash][extname]';
        }
      }
    }
  },
  server: {
    hmr: {
      overlay: true
    }
  },
  optimizeDeps: {
    include: ['**/*.MOV', '**/*.mov', '**/*.mp4', '**/*.jpg', '**/*.png', 'trumpStealing.jpg']
  }
});
