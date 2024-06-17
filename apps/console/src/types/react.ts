import type * as React from 'react';

declare module 'react' {
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions, @typescript-eslint/consistent-indexed-object-style, @typescript-eslint/naming-convention -- overloading
  interface CSSProperties {
    [key: `--${string}`]: string | number | undefined;
  }
}
