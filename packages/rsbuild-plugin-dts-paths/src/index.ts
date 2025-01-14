import type {RsbuildPlugin} from '@rsbuild/core';
import {replaceTscAliasPaths} from 'tsc-alias';
import * as ts from 'typescript';

export const PLUGIN_DTS_PATHS_NAME = 'plugin-dts-paths';

export const pluginDtsPaths = (): RsbuildPlugin => ({
  name: PLUGIN_DTS_PATHS_NAME,

  setup(api) {
    api.onAfterBuild({
      async handler({isWatch, isFirstCompile}) {
        if (!isFirstCompile) return;

        const config = api.getNormalizedConfig();
        const cwd = api.context.rootPath;

        const tsconfigPath = ts.findConfigFile(
          cwd,
          (path: string) => ts.sys.fileExists(path),
          config.source.tsconfigPath,
        );
        if (!tsconfigPath) return;

        await replaceTscAliasPaths({
          configFile: tsconfigPath,
          watch: isWatch,
        });

        console.log('🚀 [rsbuild-plugin-dts-paths] Paths in d.ts files have been replaced');
      },
      order: 'post',
    });
  },
});
