import eslintConfig from '@cosmonic/eslint-config';
import config from './tailwind.config.js';

export default [
  ...eslintConfig.base,
  ...eslintConfig.react,
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
