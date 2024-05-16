import {ApplicationIcon, HostIcon, LinkIcon} from '@cosmonic/orbit-icons';
import {Link, type LinkProps} from '@tanstack/react-router';
import {BookKeyIcon} from 'lucide-react';
import * as React from 'react';
import {type PropsWithSlots} from '@/types/props-with-slots';

function PrimaryNavigation() {
  return (
    <nav>
      <ul className="m-2 mr-0 flex flex-col gap-1">
        {/* <PrimaryLink to="/">Dashboard</PrimaryLink> */}
        <SubNavigation slots={{title: () => <>Lattice</>}}>
          <PrimaryLink to="/applications">
            <ApplicationIcon className="me-1.5 size-3.5 opacity-50 group-hover:opacity-100" />
            Applications
          </PrimaryLink>
          <PrimaryLink to="/infrastructure">
            <HostIcon className="me-1.5 size-3.5 opacity-50 group-hover:opacity-100" />
            Infrastructure
          </PrimaryLink>
          <PrimaryLink to="/configs">
            <BookKeyIcon className="me-1.5 size-3.5 opacity-50 group-hover:opacity-100" />
            Configs
          </PrimaryLink>
          <PrimaryLink to="/links">
            <LinkIcon className="me-1.5 size-3.5 opacity-50 group-hover:opacity-100" />
            Links
          </PrimaryLink>
        </SubNavigation>
        <SubNavigation slots={{title: () => <>Tools</>}}>
          <PrimaryLink to="/tools/lattice-tester">Lattice Tester</PrimaryLink>
        </SubNavigation>
        <SubNavigation slots={{title: () => <>Settings</>}}>
          <PrimaryLink to="/settings/lattice">Lattice</PrimaryLink>
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
        <h2 className="mb-4 text-xs font-medium uppercase text-primary">
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
        className="group flex items-center rounded-xl p-1 pe-3 ps-2 text-xs font-medium uppercase hover:bg-muted data-[status=active]:bg-muted"
      >
        {children}
      </Link>
    </li>
  );
}

export {PrimaryNavigation};
