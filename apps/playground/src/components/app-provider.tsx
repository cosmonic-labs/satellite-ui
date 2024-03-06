import type {JSXElementConstructor, ReactElement, ReactNode} from 'react';
import * as React from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any -- could be anything for props
type AppProps<T = any> = {
  readonly components: Array<JSXElementConstructor<T>>;
  readonly children: ReactNode;
};

function AppProvider(props: AppProps): ReactElement {
  return (
    <>
      {props.components.reduceRight(
        (accumulator, Component) => (
          <Component>{accumulator}</Component>
        ),
        props.children,
      )}
    </>
  );
}

export {AppProvider};
