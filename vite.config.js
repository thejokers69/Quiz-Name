import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/quiz-name/',
  plugins: [react()],
  server: {
    historyApiFallback: true
  }
});
