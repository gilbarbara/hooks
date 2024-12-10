import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    coverage: {
      all: true,
      include: ['src/**/*'],
      exclude: ['src/index.ts', 'src/types.ts', 'src/useIsomorphicLayoutEffect.ts'],
      reporter: ['text', 'lcov'],
      thresholds: {
        statements: 90,
        branches: 90,
        functions: 90,
        lines: 90,
      },
    },
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./test/__setup__/vitest.setup.ts'],
  },
});
