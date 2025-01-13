import {defineConfig} from 'vitest/config';

export default defineConfig({
  test: {
    include: ['./src/**/*.test.ts?(x)'],
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/vitest.setup.ts'],
    coverage: {
      enabled: true,
      provider: 'v8',
      reporter: process.env.CI ? ['cobertura'] : ['text', 'lcovonly'],
      include: ['src/**'],
      all: true,
    },
    reporters: [
      // run junit in CI pipeline
      'default',
      ...(process.env.CI ? ['junit'] : []),
    ],
    outputFile: './junit.xml',
    alias: [
      {
        find: /^monaco-editor$/,
        replacement: import.meta.dirname + '/node_modules/monaco-editor/esm/vs/editor/editor.api',
      },
    ],
  },
});
