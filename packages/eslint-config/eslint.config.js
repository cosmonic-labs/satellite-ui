import cosmonicConfig from '@cosmonic/eslint-config';

/** @type {import('eslint').Linter.Config} */
export default [
  ...cosmonicConfig.base,
  ...cosmonicConfig.node,
  {
    files: ['*.js', '*.cjs'],
    rules: {
      '@typescript-eslint/no-require-imports': 'off',
      '@typescript-eslint/no-var-requires': 'off',
      '@typescript-eslint/naming-convention': 'off',
      'import-x/no-default-export': 'off',
      'unicorn/prefer-module': 'off',
    },
  },
];
