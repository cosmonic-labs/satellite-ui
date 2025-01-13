import eslintConfig, {withTypescriptProjects} from '@cosmonic/eslint-config';
import config from './tailwind.config.js';

export default [
  ...eslintConfig.base,
  ...eslintConfig.react,
  withTypescriptProjects(['./tsconfig.eslint.json', './tsconfig.json']),
  {
    settings: {
      tailwindcss: {
        config,
      },
    },
  },
  {
    files: ['turbo/**/*'],
    ...eslintConfig.node[0],
  },
];
