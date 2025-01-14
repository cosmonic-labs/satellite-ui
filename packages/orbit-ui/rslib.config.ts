import {pluginReact} from '@rsbuild/plugin-react';
import {defineConfig} from '@rslib/core';
import {pluginDtsPaths} from 'rsbuild-plugin-dts-paths';

export default defineConfig({
  lib: [
    {
      bundle: false,
      dts: true,
      format: 'esm',
    },
  ],
  output: {
    sourceMap: {
      css: true,
      js: process.env.NODE_ENV === 'production' ? 'source-map' : 'cheap-module-source-map',
    },
    target: 'web',
  },
  plugins: [pluginReact(), pluginDtsPaths()],
});
