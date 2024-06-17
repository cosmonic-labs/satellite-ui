/// <reference types="vite-plugin-svgr/client" />
/// <reference types="vite/client" />

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions -- this is a type override
interface ImportMetaEnv {
  readonly NODE_ENV: 'test' | undefined;
  readonly PACKAGE_VERSION: string;
}

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions -- this is a type override
interface ImportMeta {
  readonly env: ImportMetaEnv;
}
