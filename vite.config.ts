import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  // Load env variables from the project root.
  const env = loadEnv(mode, '.', '');
  
  const apiKey = env.API_KEY || process.env.API_KEY || '';

  return {
    plugins: [react()],
    define: {
      // Direct replacement for the specific string
      'process.env.API_KEY': JSON.stringify(apiKey),
      // Provide a shim for process.env to prevent runtime errors if code checks it
      'process.env': JSON.stringify({ API_KEY: apiKey }),
    },
    build: {
      outDir: 'dist',
      sourcemap: false,
      minify: true,
    },
  };
});