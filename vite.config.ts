import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/Nikhil-portfolio/',
  plugins: [react()],
  build: {
    outDir: '../', // Build to parent directory (root of repo)
    emptyOutDir: false, // Don't empty the entire parent directory
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
