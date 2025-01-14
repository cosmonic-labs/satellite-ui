import type {StorybookConfig} from 'storybook-react-rsbuild';
import {createRequire} from 'node:module';
import path from 'node:path';

const config: StorybookConfig = {
  stories: ['../stories/**/*.mdx', '../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-onboarding',
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    {
      name: getAbsolutePath('storybook-addon-rslib'),
    },
  ],
  framework: {
    name: 'storybook-react-rsbuild',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
  typescript: {
    reactDocgen: 'react-docgen-typescript',
    check: true,
  },
  core: {
    disableTelemetry: true,
  },
};

function getAbsolutePath(value: string): string {
  const require = createRequire(import.meta.url);
  return path.dirname(require.resolve(path.join(value, 'package.json')));
}

export default config;
