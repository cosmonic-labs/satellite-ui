import path from 'node:path';
import {defineConfig} from 'vite';
import dts from 'vite-plugin-dts';
import svgr from 'vite-plugin-svgr';
import tsConfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [tsConfigPaths(), svgr(), dts({rollupTypes: true})],
  build: {
    // `vite-plugin-dts` fails to run sometimes during dev mode and without the .d.ts file, IDEs get very angry.
    emptyOutDir: false,
    lib: {
      entry: path.resolve(import.meta.dirname, 'src/index.ts'),
      formats: ['es'],
      fileName: 'index',
    },
    sourcemap: true,
    rollupOptions: {
      external: ['react', 'react/jsx-runtime'],
      output: {
        globals: {
          'react': 'React',
          'react/jsx-runtime': 'react/jsx-runtime',
        },
      },
    },
  },
});
