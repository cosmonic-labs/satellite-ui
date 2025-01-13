import cosmonicConfig, {withTypescriptProjects} from '@cosmonic/eslint-config';

/** @type {import('eslint').Linter.Config} */
export default [
  ...cosmonicConfig.base,
  ...cosmonicConfig.node,
  withTypescriptProjects(false),
  {
    files: ['*.js', '*.cjs'],
    rules: {
      'import-x/no-default-export': 'off',
      'unicorn/prefer-module': 'off',
    },
  },
];
