import comments from '@eslint-community/eslint-plugin-eslint-comments/configs';
import prettier from 'eslint-config-prettier';
import turbo from 'eslint-config-turbo/flat';
import xo from 'eslint-config-xo/space/browser';
import xoReact from 'eslint-config-xo-react';
import xoTypescript from 'eslint-config-xo-typescript/space';
import ava from 'eslint-plugin-ava';
import importPluginX from 'eslint-plugin-import-x';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tailwind from 'eslint-plugin-tailwindcss';
import unicorn from 'eslint-plugin-unicorn';
import globals from 'globals';
import tsEslint from 'typescript-eslint';
// Remove once `eslint-config-prettier` is updated to include the new rules.
// https://github.com/prettier/eslint-config-prettier/pull/272
import prettierStylistic from './rules/prettier-stylistic.js';

/*
 * This is a custom ESLint configuration for use react projects.
 *
 * It is based heavily on xo with some additional rules and plugins suited to the cosmonic style guide.
 */

const CONFIG_FILES = [
  '*.config.js',
  '*.config.cjs',
  '*.config.ts',
  '.eslintrc.cjs',
  'vite.config.ts',
  'turbo/**/*',
];

const tailwindConfig = [
  ...tailwind.configs['flat/recommended'],
  {
    settings: {
      tailwindcss: {
        callees: ['classnames', 'clsx', 'ctl', 'cn', 'cva'],
      },
    },
  },
];

const eslintConfig = [
  {
    rules: {
      'camelcase': 'off',
      'capitalized-comments': 'off',
      'default-case': 'off',
      'no-param-reassign': 'warn',
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['../../', './../../'],
              message: 'Relative imports are not allowed. Please use the @/ alias.',
            },
          ],
        },
      ],
      'new-cap': 'off',
      'no-restricted-syntax': [
        'error',
        {
          selector: ':matches(PropertyDefinition, MethodDefinition)[accessibility="private"]',
          message: 'Use #private instead',
        },
      ],
    },
  },
];

const tsConfig = [
  ...tsEslint.configs.strictTypeChecked,
  ...tsEslint.configs.stylisticTypeChecked,
  {
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.eslint.json', './tsconfig.json'],
      },
    },
  },
  {
    rules: {
      '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
      '@typescript-eslint/explicit-member-accessibility': ['warn', {accessibility: 'no-public'}],
      '@typescript-eslint/member-ordering': [
        'warn',
        {
          default: 'never',
          classes: ['field', 'constructor', 'method'],
        },
      ],
      '@typescript-eslint/no-loss-of-precision': 'warn',
      '@typescript-eslint/no-unused-vars': ['warn', {ignoreRestSiblings: true}],
      '@typescript-eslint/no-unnecessary-condition': 'off',
      '@typescript-eslint/no-floating-promises': 'off',
      '@typescript-eslint/array-type': ['warn', {default: 'array-simple'}],
      '@typescript-eslint/restrict-template-expressions': [
        'error',
        {allowNumber: true, allowBoolean: false, allowAny: false, allowNullish: false},
      ],
      '@typescript-eslint/no-misused-promises': 'off',
    },
  },
  {
    files: ['*.d.ts'],
    rules: {
      '@typescript-eslint/triple-slash-reference': 'off',
    },
  },
  {
    files: CONFIG_FILES,
    rules: {
      '@typescript-eslint/no-require-imports': 'off',
      '@typescript-eslint/no-var-requires': 'off',
    },
  },
];

const commentsConfig = [
  comments.recommended,
  {
    rules: {
      '@eslint-community/eslint-comments/require-description': 'warn',
      '@eslint-community/eslint-comments/no-unlimited-disable': 'error',
    },
  },
];

const importConfig = [
  importPluginX.flatConfigs.recommended,
  importPluginX.flatConfigs.typescript,
  {
    rules: {
      'import-x/default': 'error',
      'import-x/export': 'error',
      'import-x/first': 'error',
      'import-x/order': [
        'warn',
        {
          alphabetize: {
            order: 'asc',
          },
          groups: [
            'unknown',
            'type',
            'builtin',
            'external',
            'internal',
            'object',
            'parent',
            'sibling',
            'index',
          ],
          pathGroups: [
            {
              group: 'unknown',
              pattern: '**/*.+(css|sass|scss|less|styl)',
              patternOptions: {dot: true, nocomment: true},
              position: 'before',
            },
            {
              group: 'unknown',
              pattern: '{.,..}/**/*.+(css|sass|scss|less|styl)',
              patternOptions: {dot: true, nocomment: true},
              position: 'before',
            },
          ],
          warnOnUnassignedImports: true,
        },
      ],
      'import-x/no-unassigned-import': [
        'error',
        {
          allow: [
            '@babel/polyfill',
            '**/register',
            '**/register.*',
            '**/register/**',
            '**/register/**.*',
            '**/*.css',
            '**/*.scss',
            '**/*.sass',
            '**/*.less',
          ],
        },
      ],
      'import-x/no-cycle': ['error', {ignoreExternal: false}],
      'import-x/no-default-export': 'error',
      'import-x/no-self-import': 'error',
      'import-x/no-useless-path-segments': 'error',
      'import-x/no-amd': 'error',
      'import-x/no-empty-named-blocks': 'error',
      'import-x/no-extraneous-dependencies': [
        'error',
        {
          includeTypes: true,
        },
      ],
    },
  },
  {
    files: CONFIG_FILES,
    rules: {
      'import-x/no-default-export': 'off',
    },
  },
];

const unicornConfig = [
  unicorn.configs['flat/recommended'],
  {
    rules: {
      'unicorn/no-array-reduce': 'off',
      'unicorn/no-null': 'off',
      'unicorn/expiring-todo-comments': 'off',
      'unicorn/prevent-abbreviations': [
        'error',
        {
          checkFilenames: false,
          checkDefaultAndNamespaceImports: false,
          checkShorthandImports: false,
          extendDefaultReplacements: true,
          replacements: {
            // React specific.
            prop: false,
            props: false,
            ref: false,
            refs: false,

            // https://thenextweb.com/dd/2020/07/13/linux-kernel-will-no-longer-use-terms-blacklist-and-slave/
            whitelist: {
              include: true,
            },
            blacklist: {
              exclude: true,
            },
            master: {
              main: true,
            },
            slave: {
              secondary: true,
            },

            // Disable some that may be too annoying.
            app: false,
            apps: false,
            env: false,

            i: {
              index: true,
            },
            bin: {
              binary: true,
            },
            eof: {
              endOfFile: true,
            },
            impl: {
              implement: true,
              implementation: true,
            },
            anim: {
              animation: true,
            },
            calc: {
              calculate: true,
            },
            dict: {
              dictionary: true,
            },
            dup: {
              duplicate: true,
            },
            enc: {
              encode: true,
              encryption: true,
            },
            gen: {
              generate: true,
              general: true,
            },
            gfx: {
              graphics: true,
            },
            inc: {
              increment: true,
            },
            iter: {
              iterate: true,
              iterator: true,
            },
            nav: {
              navigate: true,
              navigation: true,
            },
            norm: {
              normalize: true,
            },
            notif: {
              notification: true,
            },
            perf: {
              performance: true,
            },
            proc: {
              process: true,
            },
            rand: {
              random: true,
            },
            sys: {
              system: true,
            },
            temp: {
              temporary: true,
            },
          },
        },
      ],
      'unicorn/filename-case': 'off',
    },
  },
];

/** @type {Record<string, import("eslint").Linter.Config[]>} */
export default {
  base: [
    {
      ignores: [
        // Ignore dotfiles
        '.*.js',
        'node_modules/',
        'dist/',
        'build/',
        'coverage/',
      ],
    },
    ava.configs['flat/recommended'],
    ...turbo,
    ...xo,
    ...xoTypescript,
    ...eslintConfig,
    ...tsConfig,
    ...commentsConfig,
    ...importConfig,
    ...unicornConfig,
    prettier,
    prettierStylistic,
  ],
  react: [
    ...tailwindConfig,
    react.configs.flat?.recommended,
    react.configs.flat?.['jsx-runtime'],
    {
      plugins: {
        'react-hooks': {
          meta: {name: 'eslint-plugin-react-hooks', version: '4.3.0'},
          rules: reactHooks.rules,
        },
      },
      rules: {
        // React
        ...xoReact.rules,
        'react/prop-types': 'off',
        'react/require-default-props': 'off',
        'react/no-array-index-key': 'off',
        'react/jsx-pascal-case': ['warn', {allowNamespace: true}],
        'react/jsx-no-target-blank': ['error', {allowReferrer: true}],
      },

      languageOptions: {
        globals: {React: true, JSX: true, ...globals.browser},
      },
      settings: {
        react: {
          version: 'detect',
        },
      },
    },
    {
      files: ['*.jsx', '*.tsx'],
      plugins: {'react-refresh': reactRefresh},
      rules: {
        'react-refresh/only-export-components': 'warn',
      },
    },
    prettier,
    prettierStylistic,
  ],
  node: [
    {
      languageOptions: {
        globals: globals.node,
      },
    },
  ],
};
