import { defineConfig } from 'vite';
import { defineConfig as vitestDefineConfig, mergeConfig } from 'vitest/config';
import path, { resolve } from 'node:path';
import dts from 'vite-plugin-dts';
import checker from 'vite-plugin-checker';

// https://vitejs.dev/config/
export default mergeConfig(defineConfig({
  plugins: [
    checker({
      typescript: true,
      eslint: {
        lintCommand: 'eslint ./src --ext ts --max-warnings 0',
      },
    }),
    dts({
      insertTypesEntry: true,
      exclude: [`**/*.test.ts`],
      entryRoot: './src'
    }),
  ],
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'hiive-table-reducers',
      formats: ['es', 'umd'],
      fileName: (format) => `hiive-table-reducers.${format}.js`,
    },
  },
  resolve: {
    alias: {
      '@': resolve(resolve(), './src'),
    },
  },
}), vitestDefineConfig({
  test: {
    include: ['**/*.test.ts?(x)'],
  },
}));
