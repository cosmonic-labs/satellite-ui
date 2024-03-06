import {TanStackRouterVite} from '@tanstack/router-vite-plugin';
import react from '@vitejs/plugin-react';
import {defineConfig} from 'vite';
import svgrPlugin from 'vite-plugin-svgr';
import viteTsconfigPaths from 'vite-tsconfig-paths';
import packageJson from './package.json';

export default defineConfig({
  define: {
    // eslint-disable-next-line @typescript-eslint/naming-convention -- must match import.meta.env
    'import.meta.env.PACKAGE_VERSION': JSON.stringify(packageJson.version),
  },
  plugins: [
    react(),
    TanStackRouterVite({
      generatedRouteTree: './src/route-tree.gen.ts',
      routesDirectory: './src/app',
      routeFileIgnorePrefix: '-',
      quoteStyle: 'single',
    }),
    svgrPlugin(),
    viteTsconfigPaths(),
  ],
});
