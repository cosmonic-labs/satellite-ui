import {cn} from '@cosmonic/orbit-ui';
import {
  Link,
  useRouterState,
  type ParsedLocation,
  type AnyRouteMatch,
} from '@tanstack/react-router';
import {cva} from 'class-variance-authority';
import {ChevronRightIcon} from 'lucide-react';
import React from 'react';

type Breadcrumb = {
  label: string;
  path: string;
  isDisabled?: boolean;
  isSkipped?: boolean;
};

const linkStyles = cva('mr-2.5 text-sm text-muted-foreground hover:text-foreground', {
  variants: {
    isDisabled: {
      true: 'hover:cursor-default hover:text-muted-foreground',
    },
    isActive: {
      true: '',
    },
    isPending: {
      true: '',
    },
  },
});

function removeTrailingSlash(path: string) {
  return path.endsWith('/') && path !== '/' ? path.slice(0, -1) : path;
}

function matchToBreadcrumb(match: AnyRouteMatch, location: ParsedLocation): Breadcrumb | undefined {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access -- context is always something
  const contextBreadcrumb = match.context?.breadcrumb as Breadcrumb | undefined;

  if (contextBreadcrumb === undefined) {
    return;
  }

  const breadcrumb: Breadcrumb = {
    ...contextBreadcrumb,
    path: match.pathname,
    isDisabled:
      removeTrailingSlash(match.pathname) === removeTrailingSlash(location.pathname)
        ? true
        : (contextBreadcrumb?.isDisabled ?? false),
  };

  return breadcrumb;
}

function Breadcrumbs(): React.ReactElement {
  const {location, matches} = useRouterState();

  const items: Breadcrumb[] = matches
    .map((match) => matchToBreadcrumb(match, location))
    .filter((x) => x !== undefined);

  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex items-center">
        {items.map((item, index) => {
          const {isDisabled} = item;
          return (
            <li key={`${index}:${item.label}`}>
              <div className="flex items-center">
                {index !== 0 && (
                  <ChevronRightIcon
                    className="mr-2 size-3.5 shrink-0 text-sm text-muted-foreground"
                    aria-hidden="true"
                  />
                )}
                {isDisabled ? (
                  <span className={cn(linkStyles({isDisabled}))}>{item.label}</span>
                ) : (
                  <Link
                    to={item.path}
                    activeProps={{
                      'className': cn(linkStyles({isActive: true, isDisabled})),
                      'aria-current': true,
                    }}
                    inactiveProps={{className: cn(linkStyles({isActive: true, isDisabled}))}}
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

export {Breadcrumbs};
