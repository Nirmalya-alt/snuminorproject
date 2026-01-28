import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  // Load environment variables from the root directory
  const env = loadEnv(mode, '.', '');
  
  return {
    plugins: [react()],
    define: {
      // This shim ensures that `process.env` exists in the browser to prevent "process is not defined" errors
      'process.env': {
        API_KEY: JSON.stringify(env.API_KEY || process.env.API_KEY || '')
      },
      // Explicitly define the API_KEY for direct usage
      'process.env.API_KEY': JSON.stringify(env.API_KEY || process.env.API_KEY || '')
    },
    build: {
      outDir: 'dist',
      sourcemap: false,
      minify: true,
    },
  };
});