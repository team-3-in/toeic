import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import viteTsconfigPaths from 'vite-tsconfig-paths';
import svgrPlugin from 'vite-plugin-svgr';
import browserslistToEsbuild from 'browserslist-to-esbuild';
import path from 'path';

export default defineConfig({
  plugins: [react(), viteTsconfigPaths(), svgrPlugin()],
  build: {
    outDir: 'build',
    target: browserslistToEsbuild(['>0.2%', 'not dead', 'not op_mini all']),
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
