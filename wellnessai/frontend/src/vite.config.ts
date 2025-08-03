import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': '/src', // 👈 this lets "@/lib/utils" work
      '@components': '/src/components'
    },
  },
});
