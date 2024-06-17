import path from 'node:path';
import {ModuleFederationPlugin} from '@module-federation/enhanced/rspack';
import {defineConfig} from '@rsbuild/core';
import {pluginReact} from '@rsbuild/plugin-react';
import {pluginSvgr} from '@rsbuild/plugin-svgr';
import MonacoWebpackPlugin from 'monaco-editor-webpack-plugin';
import TanStackRouterPlugin from 'unplugin-tanstack-router/dist/webpack.js';
import {dependencies} from './package.json';

const MODULE_NAME = 'satellite_core';

export default defineConfig({
  server: {
    port: 3000,
  },
  dev: {
    assetPrefix: 'http://localhost:3000',
  },
  html: {
    title: 'Satellite Console for wasmCloud | Hosted by Cosmonic',
    tags: [
      {
        tag: 'link',
        attrs: {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Work+Sans:ital,wght@0,100..900;1,100..900&display=swap',
        },
      },
    ],
  },
  plugins: [
    pluginSvgr({
      svgrOptions: {
        exportType: 'default',
      },
    }),
    pluginReact(),
  ],
  tools: {
    rspack(config, {appendPlugins, mergeConfig}) {
      config.output ??= {};
      config.output.uniqueName = MODULE_NAME;
      appendPlugins([
        TanStackRouterPlugin({
          generatedRouteTree: './src/route-tree.gen.ts',
          routesDirectory: './src/app',
          routeFileIgnorePrefix: '-',
          quoteStyle: 'single',
        }),
        new MonacoWebpackPlugin({
          languages: ['yaml'],
          customLanguages: [
            {
              label: 'yaml',
              entry: 'monaco-yaml',
              worker: {
                id: 'monaco-yaml/yamlWorker',
                entry: 'monaco-yaml/yaml.worker',
              },
            },
          ],
        }),
        new ModuleFederationPlugin({
          name: MODULE_NAME,
          shared: ['react', 'react-dom', 'react/jsx-runtime'],
        }),
      ]);
      mergeConfig(config, {
        resolve: {
          alias: {
            // eslint-disable-next-line @typescript-eslint/naming-convention -- valid alias
            '@': path.resolve(process.cwd(), 'src'),
          },
        },
        externalsType: 'global',
        externals: {
          'react-dom': 'ReactDOM',
        },
        output: {
          globalObject: 'global',
        },
      });
    },
  },
});
