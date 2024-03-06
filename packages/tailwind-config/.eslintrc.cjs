const config = {
  extends: ['@cosmonic/eslint-config'],
  files: ['*.js'],
  env: {
    node: true,
  },
  rules: {
    '@typescript-eslint/no-require-imports': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    'import/no-default-export': 'off',
  },
};

module.exports = config;
