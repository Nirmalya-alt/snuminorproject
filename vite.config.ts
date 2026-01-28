
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  // Load env variables from the project root.
  // The empty string as the 3rd arg allows loading all variables (not just VITE_ prefixed).
  // Fix: Use '.' instead of process.cwd() to resolve TypeScript error on line 7 regarding property 'cwd' on type 'Process'.
  const env = loadEnv(mode, '.', '');
  
  const apiKey = env.API_KEY || process.env.API_KEY || '';

  return {
    plugins: [react()],
    define: {
      // Direct replacement for the specific string
      'process.env.API_KEY': JSON.stringify(apiKey),
      // Fallback for the process object to prevent "process is not defined"
      'process.env': JSON.stringify({ API_KEY: apiKey }),
    },
    build: {
      outDir: 'dist',
      sourcemap: false,
      minify: true,
    },
  };
});
