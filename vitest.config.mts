import { resolve } from 'node:path';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  resolve: {
    alias: {
      '@': resolve(process.cwd(), 'src'),
      app: resolve(process.cwd(), 'src/app')
    }
  },
  test: {
    environment: 'jsdom'
  }
});
