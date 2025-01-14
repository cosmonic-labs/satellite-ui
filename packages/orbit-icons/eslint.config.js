import eslintConfig, {withNodePaths, withTypescriptProjects} from '@cosmonic/eslint-config';

export default [
  ...eslintConfig.base,
  ...withTypescriptProjects(['./tsconfig.eslint.json', './tsconfig.json']),
  ...withNodePaths(['turbo/**/*']),
];
