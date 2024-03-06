const fs = require('node:fs');

/** @type {import('@commitlint/types').UserConfig} */
module.exports = {
  extends: ['@commitlint/config-conventional'],
  prompt: {
    questions: {
      scope: {
        enum: [
          // Add all folders in the 'apps' and 'packages' directories as scopes
          ...getFoldersInDirectory('apps'),
          ...getFoldersInDirectory('packages'),
        ],
        description: 'What is the scope of this change (e.g. component or file name)?',
      },
    },
  },
  rules: {
    'scope-enum': [
      2,
      'always',
      [
        // Add all folders in the 'apps' and 'packages' directories as scopes
        ...getFoldersInDirectory('apps'),
        ...getFoldersInDirectory('packages'),
      ],
    ],
  },
};

/**
 * Get all folders in a directory
 * @param {string} directory Path to load
 * @returns {string[]} List of folders
 */
function getFoldersInDirectory(directory) {
  return fs
    .readdirSync(directory, {withFileTypes: true})
    .filter((entry) => entry.isDirectory() && entry.name.startsWith('.'))
    .map((entry) => entry.name);
}
