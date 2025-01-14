import eslintConfig, {withTypescriptProjects} from '@cosmonic/eslint-config';

export default [
  ...eslintConfig.base,
  ...eslintConfig.node,
  ...withTypescriptProjects(['./tsconfig.json', './tsconfig.eslint.json', './tests/tsconfig.json']),
];
