const fs = require('node:fs');
const path = require('node:path');
const process = require('node:process');

/*
 * This is a custom ESLint configuration for use react projects.
 *
 * It is based heavily on xo with some additional rules and plugins suited to the cosmonic style guide.
 */

// TODO: extract base config into a separate file and leave this as react-specific config

const project = getProject();

/** @type {import("eslint").Linter.Config} */
const config = {
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:ava/recommended',
    'plugin:eslint-comments/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'plugin:tailwindcss/recommended',
    'plugin:no-use-extend-native/recommended',
    'plugin:unicorn/recommended',
    'turbo',
    'xo/browser',
    'xo-react',
    'xo-typescript',
    'prettier', // Must be last
  ],
  parserOptions: {
    warnOnUnsupportedTypeScriptVersion: false,
    ecmaVersion: 'latest',
    sourceType: 'module',
    tsconfigRootDir: __dirname,
    project,
    ecmaFeatures: {
      jsx: true,
    },
  },
  globals: {
    React: true,
    JSX: true,
  },
  env: {
    browser: true,
  },
  settings: {
    'import/extensions': ['.js', '.jsx', '.ts', '.tsx'],
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
      typescript: {
        project,
        extensionAliases: {
          '.js': [
            '.ts',
            // `.tsx` can also be compiled as `.js`
            '.tsx',
            '.d.ts',
            '.js',
          ],
          '.cjs': ['.cts', '.d.cts', '.cjs'],
          '.mjs': ['.mts', '.d.mts', '.mjs'],
        },
      },
    },
    'react': {
      version: 'detect',
    },
    'tailwindcss': {
      config: getTailwindConfig(),
      callees: ['classnames', 'clsx', 'ctl', 'cn', 'cva'],
    },
  },
  ignorePatterns: [
    // Ignore dotfiles
    '.*.js',
    'node_modules/',
    'dist/',
    'build/',
    'coverage/',
  ],
  rules: {
    // eslint
    'capitalized-comments': 'off',
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

    // @typescript-eslint
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
    ...getNamingConventionRule({isTsx: false}),

    // eslint-comments
    'eslint-comments/require-description': 'warn',
    'eslint-comments/no-unlimited-disable': 'error', // Covered by the `unicorn/no-abusive-eslint-disable` rule.

    // import
    'import/default': 'error',
    'import/export': 'error',
    'import/first': 'error',
    'import/order': [
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
    'import/no-unassigned-import': [
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
    'import/no-cycle': ['error', {ignoreExternal: false}],
    'import/no-default-export': 'error',
    'import/no-self-import': 'error',
    'import/no-useless-path-segments': 'error',
    'import/no-amd': 'error',
    'import/no-empty-named-blocks': 'error',
    'import/no-extraneous-dependencies': [
      'error',
      {
        includeTypes: true,
      },
    ],

    // No-use-extend-native
    'no-use-extend-native/no-use-extend-native': 'error',

    // React
    'react/prop-types': 'off',
    'react/require-default-props': 'off',
    'react/no-array-index-key': 'off',
    'react/jsx-pascal-case': ['warn', {allowNamespace: true}],
    'react/jsx-no-target-blank': ['error', {allowReferrer: true}],

    // Unicorn
    'unicorn/no-array-reduce': 'off',
    'unicorn/no-null': 'off',
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
          i: false, // Do it at some point, but not ready for it yet. Maybe 2025.

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
  },
  overrides: [
    {
      files: ['*.jsx', '*.tsx'],
      plugins: ['react-refresh'],
      rules: {
        'react-refresh/only-export-components': 'warn',
        ...getNamingConventionRule({isTsx: true}),
      },
    },
    {
      files: ['*.d.ts'],
      rules: {
        '@typescript-eslint/triple-slash-reference': 'off',
      },
    },
    {
      files: [
        '*.config.js',
        '*.config.cjs',
        '*.config.ts',
        '.eslintrc.cjs',
        'vite.config.ts',
        'turbo/**/*',
      ],
      env: {
        node: true,
      },
      rules: {
        '@typescript-eslint/no-require-imports': 'off',
        '@typescript-eslint/no-var-requires': 'off',
        'import/no-default-export': 'off',
      },
    },
  ],
};

function getProject() {
  const tsConfig = path.resolve(process.cwd(), 'tsconfig.json');
  const tsConfigRoot = path.resolve(__dirname, '../..', 'tsconfig.json');
  const tsConfigExistsInCwd = fs.existsSync(tsConfig);
  const tsConfigExistsInRoot = fs.existsSync(tsConfigRoot);

  const eslint = path.resolve(process.cwd(), 'tsconfig.eslint.json');
  const eslintRoot = path.resolve(__dirname, '../..', 'tsconfig.eslint.json');
  const eslintExistsInCwd = fs.existsSync(eslint);
  const eslintExistsInRoot = fs.existsSync(eslintRoot);

  const project = [
    tsConfigExistsInCwd ? tsConfig : tsConfigExistsInRoot ? tsConfigRoot : undefined,
    eslintExistsInCwd ? eslint : eslintExistsInRoot ? eslintRoot : undefined,
  ].filter(Boolean);

  return project.length === 0 ? undefined : project;
}

function getTailwindConfig() {
  const config = path.resolve(process.cwd(), 'tailwind.config.js');
  const configCJS = path.resolve(process.cwd(), 'tailwind.config.cjs');
  const configTS = path.resolve(process.cwd(), 'tailwind.config.ts');
  const configRoot = path.resolve(__dirname, '../..', 'tailwind.config.js');
  return fs.existsSync(config)
    ? config
    : fs.existsSync(configCJS)
      ? configCJS
      : fs.existsSync(configTS)
        ? configTS
        : fs.existsSync(configRoot)
          ? configRoot
          : undefined;
}

// Originally from `xo` with some modifications
// https://github.com/xojs/eslint-config-xo-typescript/blob/cdf74157ba6831b6c42fc17db443ecd22e85f750/index.js
function getNamingConventionRule({isTsx}) {
  return {
    '@typescript-eslint/naming-convention': [
      'error',
      {
        /// selector: ['variableLike', 'memberLike', 'property', 'method'],
        // Note: Leaving out `parameter` and `typeProperty` because of the mentioned known issues.
        // Note: We are intentionally leaving out `enumMember` as it's usually pascal-case or upper-snake-case.
        selector: [
          'function',
          'classProperty',
          'objectLiteralProperty',
          'parameterProperty',
          'classMethod',
          'objectLiteralMethod',
          'typeMethod',
          'accessor',
        ],
        format: ['strictCamelCase', isTsx && 'StrictPascalCase'].filter(Boolean),
        // We allow double underscore because of GraphQL type names and some React names.
        leadingUnderscore: 'allowSingleOrDouble',
        trailingUnderscore: 'allow',
        // Ignore `{'Retry-After': retryAfter}` type properties.
        filter: {
          regex: '[- ]',
          match: false,
        },
      },
      {
        selector: 'typeLike',
        format: ['StrictPascalCase'],
      },
      {
        selector: ['variable'],
        trailingUnderscore: 'allow',
        format: ['strictCamelCase', isTsx && 'StrictPascalCase'].filter(Boolean),
      },
      {
        // consts can be in UPPER_CASE if desired.
        selector: ['variable'],
        modifiers: ['const'],
        format: ['strictCamelCase', 'UPPER_CASE', isTsx && 'StrictPascalCase'].filter(Boolean),
      },
      {
        selector: 'variable',
        types: ['boolean'],
        format: ['StrictPascalCase'],
        prefix: ['is', 'has', 'can', 'should', 'will', 'did'],
      },
      {
        // Interface name should not be prefixed with `I`.
        selector: 'interface',
        filter: /^(?!I)[A-Z]/.source,
        format: ['StrictPascalCase'],
      },
      {
        // Type parameter name should either be `T` or a descriptive name.
        selector: 'typeParameter',
        filter: /^T$|^[A-Z][A-Za-z]+$/.source,
        format: ['StrictPascalCase'],
      },
      // Allow these in non-camel-case when quoted.
      {
        selector: ['classProperty', 'objectLiteralProperty'],
        format: null,
        modifiers: ['requiresQuotes'],
      },
    ],
  };
}

module.exports = config;
