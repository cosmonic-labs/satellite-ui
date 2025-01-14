import eslintConfig, {withTypescriptProjects} from '@cosmonic/eslint-config';

export default [
  ...eslintConfig.base,
  ...eslintConfig.node,
  withTypescriptProjects(['./tsconfig.eslint.json', './tsconfig.json', './tests/tsconfig.json']),
];
