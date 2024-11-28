import eslintConfig from '@cosmonic/eslint-config';

export default [
  ...eslintConfig.base,
  {
    files: ['turbo/**/*'],
    ...eslintConfig.node[0],
  },
];
