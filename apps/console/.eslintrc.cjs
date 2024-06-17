const config = {
  extends: ['@cosmonic/eslint-config', 'plugin:@tanstack/eslint-plugin-query/recommended'],
  ignorePatterns: ['dist', 'node_modules', '*.json'],
  overrides: [
    {
      files: ['$*'],
      rules: {
        'unicorn/filename-case': 'off',
      },
    },
    {
      files: ['*.gen.ts'],
      rules: {
        'eslint-comments/require-description': 'off',
        'eslint-comments/no-unlimited-disable': 'off',
        'eslint-comments/disable-enable-pair': 'off',
        'unicorn/no-abusive-eslint-disable': 'off',
      },
    },
    {
      files: ['*.tsx'],
      rules: {
        '@typescript-eslint/no-throw-literal': 'off',
      },
    },
  ],
};

module.exports = config;
