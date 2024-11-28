import {pluginModuleFederation} from '@module-federation/rsbuild-plugin';
import {defineConfig} from '@rsbuild/core';
import {pluginReact} from '@rsbuild/plugin-react';
import {pluginSvgr} from '@rsbuild/plugin-svgr';
import {TanStackRouterRspack} from '@tanstack/router-plugin/rspack';
import MonacoWebpackPlugin from 'monaco-editor-webpack-plugin';
import packageJson from './package.json';

const MODULE_NAME = 'satellite_core';

export default defineConfig({
  server: {
    port: 3000,
  },
  dev: {
    assetPrefix: 'http://localhost:3000',
  },
  source: {
    define: {
      'import.meta.env.APP_VERSION': JSON.stringify(process.env.APP_VERSION ?? packageJson.version),
      'import.meta.env.APP_BRANCH': JSON.stringify(
        process.env.APP_BRANCH ?? process.env.GITHUB_REF_NAME ?? 'dev',
      ),
      'import.meta.env.APP_COMMIT': JSON.stringify(
        process.env.APP_COMMIT ?? process.env.GITHUB_SHA?.slice(0, 7) ?? 'HEAD',
      ),
    },
  },
  output: {
    sourceMap: {
      css: true,
      js: process.env.NODE_ENV === 'production' ? 'source-map' : 'cheap-module-source-map',
    },
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
    pluginModuleFederation({
      name: MODULE_NAME,
      shared: ['react', 'react-dom', 'react/jsx-runtime'],
    }),
    pluginSvgr({
      svgrOptions: {
        exportType: 'default',
      },
    }),
    pluginReact(),
  ],
  tools: {
    rspack: {
      plugins: [
        TanStackRouterRspack({
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
      ],
    },
  },
});
