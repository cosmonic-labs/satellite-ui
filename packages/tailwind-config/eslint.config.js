import eslintConfig, {withTypescriptProjects} from '@cosmonic/eslint-config';

export default [
  ...eslintConfig.base,
  ...eslintConfig.node,
  withTypescriptProjects(false),
  {
    files: ['*.js'],
    rules: {
      '@typescript-eslint/no-require-imports': 'off',
      '@typescript-eslint/no-var-requires': 'off',
      'import-x/no-default-export': 'off',
    },
  },
];
