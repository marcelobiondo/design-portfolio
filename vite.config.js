import { defineConfig } from 'vite';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const rootDir = fileURLToPath(new URL('.', import.meta.url));

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        home: resolve(rootDir, 'index.html'),
        meutudo: resolve(rootDir, 'work/meutudo.html'),
        mercadoLivre: resolve(rootDir, 'work/mercado-livre.html'),
        facily: resolve(rootDir, 'work/facily.html'),
      },
    },
  },
});