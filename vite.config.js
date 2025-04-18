import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/Quiz-Name/',
  plugins: [react()],
  server: {
    historyApiFallback: true
  }
});
