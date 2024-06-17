import type * as React from 'react';

export type ApplicationTemplate = Record<string, unknown> & {
  name: string;
  description: string | React.ReactElement;
  manifest: string;
  source: string;
  shortDescription?: string;
  capabilities?: string[];
  recommended?: boolean;
};
export const APP_TEMPLATES: ApplicationTemplate[] = [
  {
    name: 'XKCD Service',
    recommended: true,
    shortDescription: 'Use the XKCD API to fetch a random comic',
    description:
      'Accepts an incoming HTTP request, fetches a random XKCD comic using the HTTP client, and returns the content back through the original HTTP request.',
    capabilities: ['http server', 'http client', 'number generation'],
    manifest:
      'https://raw.githubusercontent.com/cosmonic/awesome-cosmonic/main/xkcdgenerator/xkcd-generator-cosmonic.wadm.yaml',
    source: 'https://github.com/cosmonic/awesome-cosmonic/tree/main/xkcdgenerator',
  },
  {
    name: 'Hello World',
    shortDescription: 'Basic HTTP server that returns "Hello World"',
    description: 'Accepts an incoming HTTP request and returns "Hello World" as the response.',
    capabilities: ['http server', 'blob storage'],
    manifest:
      'https://raw.githubusercontent.com/cosmonic/awesome-cosmonic/main/hello-world/hello-cosmonic.wadm.yaml',
    source: 'https://github.com/cosmonic/awesome-cosmonic/tree/main/hello-world',
  },
  {
    name: 'KVCounter',
    shortDescription: 'Increment a counter stored in a key-value store',
    description:
      'Accepts an incoming HTTP request, increments a counter stored in a key-value store, and returns the new value as a JSON response.',
    capabilities: ['http server', 'blob storage'],
    manifest:
      'https://raw.githubusercontent.com/cosmonic/awesome-cosmonic/main/kvcounter/kvcounter.wadm.yaml',
    source: 'https://github.com/cosmonic/awesome-cosmonic/tree/main/kvcounter',
  },
];
