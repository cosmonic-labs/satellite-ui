// @ts-check

import cosmonicConfig from '@cosmonic/eslint-config';
import tanstackEslint from '@tanstack/eslint-plugin-query';
import tailwindConfig from './tailwind.config.js';

const configs = [
  ...tanstackEslint.configs['flat/recommended'],
  ...cosmonicConfig.base,
  ...cosmonicConfig.react,
  {
    ignores: ['dist', 'node_modules', '*.json'],
    settings: {
      tailwindcss: {
        config: tailwindConfig,
      },
    },
  },
  {
    files: ['$*'],
    rules: {
      'unicorn/filename-case': 'off',
    },
  },
  {
    files: ['*.gen.ts'],
    rules: {
      '@eslint-community/eslint-comments/require-description': 'off',
      '@eslint-community/eslint-comments/no-unlimited-disable': 'off',
      '@eslint-community/eslint-comments/disable-enable-pair': 'off',
      'unicorn/no-abusive-eslint-disable': 'off',
    },
  },
  {
    files: ['*.tsx'],
    rules: {
      '@typescript-eslint/no-throw-literal': 'off',
    },
  },
];

export default configs;
