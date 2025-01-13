import react from '@vitejs/plugin-react';
import {defineConfig, UserConfig} from 'vite';
import dtsPlugin from 'vite-plugin-dts';
import tsConfigPaths from 'vite-tsconfig-paths';

export default defineConfig(
  (): UserConfig => ({
    plugins: [react(), tsConfigPaths(), dtsPlugin()],
    build: {
      // `vite-plugin-dts` fails to run sometimes during dev mode and without the .d.ts file, IDEs get very angry.
      emptyOutDir: false,
      lib: {
        entry: ['src/index.ts', 'src/styles.ts'],
        formats: ['es', 'cjs'],
        fileName: 'index',
      },
      sourcemap: true,
      rollupOptions: {
        external: ['react', 'react-dom', 'react-hook-form', 'react/jsx-runtime'],
        output: {
          globals: {
            'react': 'React',
            'react-dom': 'ReactDOM',
            'react/jsx-runtime': 'react/jsx-runtime',
          },
        },
      },
    },
  }),
);
