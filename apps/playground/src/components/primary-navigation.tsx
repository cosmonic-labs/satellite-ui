import {Link, type LinkProps} from '@tanstack/react-router';
import * as React from 'react';
import {type PropsWithSlots} from '@/types/props-with-slots';

function PrimaryNavigation() {
  return (
    <nav>
      <ul className="m-2 mr-0 flex flex-col gap-1">
        {/* <PrimaryLink to="/">Dashboard</PrimaryLink> */}
        <SubNavigation slots={{title: () => <>Lattice</>}}>
          <PrimaryLink to="/applications">Applications</PrimaryLink>
          <PrimaryLink to="/infrastructure">Infrastructure</PrimaryLink>
        </SubNavigation>
        <SubNavigation slots={{title: () => <>Tools</>}}>
          <PrimaryLink to="/tools/lattice-tester">Lattice Tester</PrimaryLink>
        </SubNavigation>
      </ul>
    </nav>
  );
}

type SubNavigationProps = React.PropsWithChildren<
  PropsWithSlots<
    {
      title: React.ElementType;
    },
    Record<string, unknown>
  >
>;

function SubNavigation({slots, children}: SubNavigationProps) {
  const Title = slots?.title ?? React.Fragment;

  return (
    <div className="mb-4 flex flex-col">
      {slots?.title && (
        <h2 className="mb-4 ps-3 text-xs font-medium uppercase text-primary">
          <Title />
        </h2>
      )}
      <ul className="-my-2 flex flex-col gap-1">{children}</ul>
    </div>
  );
}

function PrimaryLink({children, ...props}: LinkProps) {
  return (
    <li className="relative block w-full">
      <Link
        {...props}
        className="block rounded-xl p-1 px-3 text-xs font-medium uppercase hover:bg-muted data-[status=active]:bg-muted"
      >
        {children}
      </Link>
    </li>
  );
}

export {PrimaryNavigation};
