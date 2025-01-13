// @ts-check

import cosmonicConfig, {withTailwindConfig, withTypescriptProjects} from '@cosmonic/eslint-config';
import tanstackEslint from '@tanstack/eslint-plugin-query';
import tailwindConfig from './tailwind.config.js';

const configs = [
  ...tanstackEslint.configs['flat/recommended'],
  ...cosmonicConfig.base,
  ...cosmonicConfig.react,
  ...withTailwindConfig(tailwindConfig),
  withTypescriptProjects(['./tsconfig.eslint.json', './tsconfig.json']),
  {
    ignores: [
      'dist',
      'node_modules',
      '**/*.json',
      // disable tests for now
      '**/*.test.ts',
      '**/*.test.tsx',
      'src/vitest.setup.ts',
      'src/test/**/*',
    ],
  },
  {
    files: ['$*'],
    rules: {
      'unicorn/filename-case': 'off',
    },
  },
  {
    files: ['**/*.gen.ts'],
    rules: {
      '@eslint-community/eslint-comments/require-description': 'off',
      '@eslint-community/eslint-comments/no-unlimited-disable': 'off',
      '@eslint-community/eslint-comments/disable-enable-pair': 'off',
      'unicorn/no-abusive-eslint-disable': 'off',
    },
  },
  {
    files: ['**/*.tsx'],
    rules: {
      '@typescript-eslint/only-throw-error': 'off',
      '@typescript-eslint/no-throw-literal': 'off',
    },
  },
];

export default configs;
