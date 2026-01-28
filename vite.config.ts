
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  // Load env variables from the project root. The empty string as the 3rd arg 
  // allows loading all variables (not just those starting with VITE_).
  // Fix: Property 'cwd' does not exist on type 'Process'. Using '.' instead as the environment directory path.
  const env = loadEnv(mode, '.', '');
  
  return {
    plugins: [react()],
    define: {
      // Replaces process.env.API_KEY in the source code with the actual key value 
      // picked up from the shell environment or .env file during build.
      'process.env.API_KEY': JSON.stringify(env.API_KEY || process.env.API_KEY || ''),
    },
    build: {
      outDir: 'dist',
      sourcemap: false,
      minify: true,
    },
  };
});
