import { defineConfig } from 'vite';
import 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    passWithNoTests: true,
  },
});
