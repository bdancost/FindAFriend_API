/// <reference types="vitest" />
import { defineConfig } from 'vitest/config'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    globals: true, // permite usar describe, it, expect sem importar
    environment: 'node', // ambiente Node.js
    include: ['src/**/*.spec.ts', 'tests/**/*.spec.ts'], // arquivos de teste
    exclude: [
      '**/node_modules/**',
      '**/dist/**',
      '**/.{idea,git,cache,temp}/**',
      '**/{karma,rollup,webpack,vite,vitest,jest,ava,babel,nyc,cypress,tsup,build,eslint,prettier}.config.*',
    ],
    coverage: {
      provider: 'istanbul', // gera relatório de coverage
      reporter: ['text', 'lcov'],
    },
  },
})
