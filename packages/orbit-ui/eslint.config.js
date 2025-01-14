import eslintConfig, {
  withNodePaths,
  withStorybookPaths,
  withTailwindConfig,
  withTypescriptProjects,
} from '@cosmonic/eslint-config';
import config from './tailwind.config.js';

export default [
  ...eslintConfig.base,
  ...eslintConfig.react,
  ...withTypescriptProjects(['./tsconfig.eslint.json', './tsconfig.json', './tests/tsconfig.json']),
  ...withNodePaths(['turbo/**/*']),
  ...withTailwindConfig(config),
  ...withStorybookPaths(['stories/**/*', '.storybook/**/*']),
];
