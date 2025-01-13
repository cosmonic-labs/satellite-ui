import * as React from 'react';

/**
 * Lazy load a module and return a React.lazy() call with a name
 *
 * @param factory - a function that will call import()
 * @param name - the name of the module
 * @returns an object with a default property that is a React.lazy() call
 *
 * @see {@link https://github.com/facebook/react/issues/14603#issuecomment-726551598}
 *
 * @example
 * ```ts
 * const { Home } = lazyImport(() => import("./Home"), "Home");
 * ```
 */
export function lazyImport<
  ComponentType extends React.ComponentType,
  Imports extends Record<Key, ComponentType>,
  Key extends keyof Imports,
>(factory: () => Promise<Imports>, name: Key): Imports {
  const lazy = React.lazy(async () => factory().then((module) => ({default: module[name]})));
  return Object.create({
    [name]: lazy,
  }) as Imports;
}
