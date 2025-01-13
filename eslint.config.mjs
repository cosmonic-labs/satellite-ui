import eslintConfig from '@cosmonic/eslint-config';

export default [
  // the usual suspects
  ...eslintConfig.base,
  ...eslintConfig.react,
  ...eslintConfig.node,
  {
    files: ['eslint.config.mjs'],
    rules: {
      'import-x/no-default-export': 'off',
    },
  },
];
