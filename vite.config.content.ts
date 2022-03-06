import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    emptyOutDir: false,
    lib: {
      entry: './src/content/scrape-transactions.ts',
      name: 'scrape-transactions',
      formats: ['es'],
    },
    rollupOptions: {
      treeshake: false,
      output: {
        entryFileNames: '[name].js',
        extend: true,
      },
    },
  },
});
