import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import viteCompression from 'vite-plugin-compression';
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig({
  plugins: [
    react(),
    // visualizer({
    //   filename: './stats.html',
    //   open: true,
    // }),

    // Brotli (best)
    viteCompression({
      algorithm: 'brotliCompress',
      ext: '.br',
      deleteOriginFile: false,
      filter: (file) => /\.(js|css|html|svg)$/.test(file),
      threshold: 1024
    }),

    // Gzip (fallback)
    viteCompression({
      algorithm: 'gzip',
      ext: '.gz',
      deleteOriginFile: false,
      filter: (file) => /\.(js|css|html|svg)$/.test(file),
      threshold: 1024
    })
  ]
});
