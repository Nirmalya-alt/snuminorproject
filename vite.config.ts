import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  define: {
    // Replaces process.env.API_KEY in the source code with the actual value during build
    'process.env.API_KEY': JSON.stringify(process.env.API_KEY || ''),
    // Shims the process.env object to prevent 'process is not defined' errors in the browser
    'process.env': {}
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    minify: true,
  },
});