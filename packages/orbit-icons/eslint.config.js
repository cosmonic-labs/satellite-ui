import eslintConfig, {withTypescriptProjects} from '@cosmonic/eslint-config';

export default [
  ...eslintConfig.base,
  withTypescriptProjects(['./tsconfig.eslint.json', './tsconfig.json']),
  {
    files: ['turbo/**/*'],
    ...eslintConfig.node[0],
  },
];
