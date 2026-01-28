import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  define: {
    // Directly inject the API_KEY from the build environment into the client-side code.
    // This handles cases where Vercel provides the key during the build process.
    'process.env.API_KEY': JSON.stringify(process.env.API_KEY),
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    minify: true,
  },
});