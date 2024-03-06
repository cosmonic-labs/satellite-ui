import {useEffect, useRef, useState} from 'react';
import {NavLink} from 'react-router-dom';
import Icon from 'components/Shared/Icon/Icon';

type INavItem = {
  name: string;
  link: string;
  icon: string;
};

const navItems: INavItem[] = [
  {
    name: 'Applications',
    link: '/constellation/applications',
    icon: 'fa-light fa-square-code',
  },
  {
    name: 'Logic',
    link: '/constellation/logic',
    icon: 'fa-light fa-diagram-project',
  },
  {
    name: 'Infrastructure',
    link: '/constellation/infrastructure',
    icon: 'fa-light fa-server',
  },
  {
    name: 'Logs',
    link: '/constellation/logs',
    icon: 'fa-light fa-square-terminal',
  },
];

type ISubNavItemProps = {
  navItem: INavItem;
  wide?: boolean;
};

function SubNavItem({navItem, wide}: ISubNavItemProps): JSX.Element {
  return (
    <NavLink data-test-id="secondary-nav-item" className="relative" to={navItem.link}>
      {({isActive}) => (
        <div
          className={`group/nav-item flex w-52 cursor-pointer items-center px-4 py-3 transition-colors duration-100 hover:bg-slatePurple-default/10 ${
            isActive ? 'text-slatePurple-default' : 'text-spaceBlue dark:text-slate-200'
          }`}
        >
          <div
            role="presentation"
            className={`
                        absolute right-0 top-1/2 h-0 w-1 -translate-y-1/2 rounded-l-full bg-slatePurple-default
                        transition-all group-hover/nav-item:opacity-100
                        ${
                          isActive
                            ? 'h-full group-hover/nav:group-hover/nav-item:h-3/4 group-hover/nav:h-0 group-hover/nav:group-hover/nav-item:opacity-100 group-hover/nav:opacity-0'
                            : 'opacity-0 group-hover/nav-item:h-3/4'
                        }
                    `}
          />
          <Icon
            className="mx-0.5 w-5 text-lg"
            iconName={navItem.icon}
            alt={navItem.name}
            title={navItem.name}
          />
          <div className={'ml-4 shrink-0 text-xs font-semibold uppercase'}>
            <span className={`transition-opacity ${wide ? 'opacity-100' : 'opacity-0'}`}>
              {navItem.name}
            </span>
          </div>
        </div>
      )}
    </NavLink>
  );
}

function NavDecoration(): JSX.Element {
  return (
    <div
      role="presentation"
      className="peer pointer-events-none absolute right-0 top-12 translate-x-3/4 dark:opacity-50"
    >
      <div className="h-[85vh] w-12 rounded-full bg-slatePurple-default blur-3xl" />
      <div className="absolute -top-16 h-[20vh] w-12 rounded-full bg-providerBlue/70 blur-3xl" />
    </div>
  );
}

export default function SecondaryNav(): JSX.Element {
  const STORAGE_KEY = 'cosmo.secondary-nav.expanded';
  const isMobile: boolean = typeof window === 'undefined' ? false : window.innerWidth < 768;
  const previousExpandState: boolean | undefined = JSON.parse(
    window?.localStorage?.getItem(STORAGE_KEY) ?? 'null',
  );
  // If mobile, and no previous state, default to collapsed. Otherwise, previously expanded state or default to expanded
  const previouslyExpanded: boolean = isMobile
    ? previousExpandState ?? false
    : previousExpandState ?? true;
  const [expanded, setExpanded] = useState(previouslyExpanded);
  const [hovered, setHovered] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  const toggleExpanded = (): void => {
    setExpanded(!expanded);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(!expanded));
  };

  useEffect(() => {
    if (!navRef.current) {
      return;
    }

    const navElement = navRef.current;

    const handleIn = (): void => {
      setHovered(true);
    };

    const handleOut = (): void => {
      setHovered(false);
    };

    navElement.addEventListener('mouseover', handleIn);
    navElement.addEventListener('touchstart', handleIn, {passive: true});
    navElement.addEventListener('mouseout', handleOut);
    navElement.addEventListener('touchend', handleOut, {passive: true});

    return () => {
      navElement.removeEventListener('mouseover', handleIn);
      navElement.removeEventListener('touchstart', handleIn);
      navElement.removeEventListener('mouseout', handleOut);
      navElement.removeEventListener('touchend', handleOut);
    };
  });

  return (
    <nav
      ref={navRef}
      // eslint-disable-next-line tailwindcss/migration-from-tailwind-2 -- needs overflow-clip
      className={`
            ${expanded || hovered ? 'w-52' : 'w-14'}
            ${!expanded && hovered ? '-mr-38 shadow-[0px_0px_15px] shadow-black/40' : ''}
            relative z-10 h-full shrink-0 overflow-clip
            bg-white transition-all dark:border-slate-700 dark:bg-slate-900`}
      data-test-id="secondary-nav"
    >
      <NavDecoration />
      <div className="group/nav my-3 flex flex-col">
        {navItems.map((navItem: INavItem, index: number) => (
          <SubNavItem
            key={`nav-link-${navItem.name.toLowerCase()}-${index}`}
            navItem={navItem}
            wide={expanded || hovered}
          />
        ))}
      </div>
      <Icon
        onClick={() => {
          toggleExpanded();
        }}
        iconName={`fa-regular fa-circle-chevron-up ${expanded ? 'fa-rotate-270' : 'fa-rotate-90'}`}
        className="absolute bottom-4 right-4 cursor-pointer text-spaceBlue/70 dark:text-white/70"
      />
    </nav>
  );
}
