import {Button, cn} from '@cosmonic/orbit-ui';
import {cva} from 'class-variance-authority';
import {CircleHelp, PanelLeftClose, PanelLeftOpen} from 'lucide-react';
import * as React from 'react';
import LogoSVG from '@/assets/images/cosmonic-logo.svg?react';
import {useLatticeClient} from '@/context/lattice-client/use-lattice-client';
import {useSettings} from '@/context/settings/use-settings';
import {useElementIsHovered} from '@/hooks/use-element-hovered';
import {type PropsWithSlots} from '@/types/props-with-slots';
import {Loader} from './loader';
import {SuspenseLoader} from './suspense-loader';

type ShellPropsSlots = {
  aside: React.ElementType;
  main: React.ElementType;
  footer: React.ElementType;
};

type ShellProps = PropsWithSlots<ShellPropsSlots, Record<string, unknown>>;

const asideVariants = cva('w-36', {
  variants: {
    open: {
      true: '',
      false: [
        'absolute left-0 top-0 z-50 mx-1 h-full w-40 rounded border pr-2 shadow-lg transition-transform ',
        'border-slate-200 bg-slate-50 dark:border-slate-900 dark:bg-slate-950',
      ],
    },
    hovered: {true: ''},
  },
  compoundVariants: [
    {open: false, hovered: false, className: 'translate-x-[calc(-100%_-_1rem)] '},
    {open: false, hovered: true, className: 'translate-x-0'},
  ],
});

function Shell({slots}: ShellProps) {
  const Aside = slots?.aside ?? React.Fragment;
  const Main = slots?.main ?? React.Fragment;
  const Footer = slots?.footer ?? React.Fragment;

  const {isLoading} = useLatticeClient();

  const [settings, updateSettings] = useSettings();
  const asideRef = React.useRef<HTMLDivElement>(null);
  const headerRef = React.useRef<HTMLDivElement>(null);

  const isSidebarOpen = settings.sidebarOpen;
  const togglePanel = () => {
    updateSettings({type: 'toggleSidebar'});
  };

  const isPanelHovered = useElementIsHovered(asideRef);
  const isHeaderHovered = useElementIsHovered(headerRef, true);
  const isHovered = isPanelHovered || isHeaderHovered;
  const Icon = isSidebarOpen ? PanelLeftClose : PanelLeftOpen;

  return (
    <div
      className={cn(
        'grid size-full min-h-screen grid-cols-[auto_1fr] grid-rows-[auto_1fr_auto]',
        'bg-muted/20 text-foreground',
      )}
    >
      <div className="col-span-2 row-span-1">
        <div className="mx-2 flex items-center justify-between">
          <div
            ref={headerRef}
            className={cn('flex items-center justify-between', isSidebarOpen ? 'w-36' : 'w-auto')}
          >
            <div className="m-1 size-4">
              <LogoSVG className="h-4 text-cosmo-purple" />
            </div>
            <Button
              variant="link"
              className={cn(
                'h-7 p-1 text-xs font-semibold text-foreground transition-opacity',
                isHovered || !isSidebarOpen ? 'opacity-100' : 'opacity-0',
              )}
              onClick={togglePanel}
            >
              <Icon className="size-4" />
            </Button>
          </div>
          <div className="text-xs text-muted-foreground">
            wasmCloud Playground » Hosted by Cosmonic
          </div>
          <div>
            <a
              className="text-sm underline"
              href="https://wasmcloud.com"
              title="wasmCloud Documentation"
              target="_blank"
              rel="noreferrer"
            >
              <CircleHelp className="size-4" />
              <span className="sr-only">wasmCloud Documentation</span>
            </a>
          </div>
        </div>
      </div>
      <div ref={asideRef} className="relative col-span-1 row-span-2">
        <div className="absolute h-full w-2" />
        <div className={asideVariants({hovered: isHovered, open: isSidebarOpen})}>
          <SuspenseLoader>
            <Aside />
          </SuspenseLoader>
        </div>
      </div>
      <div className="col-span-1 col-start-2 row-span-1 m-1 mt-0 overflow-y-auto rounded-xl border bg-background md:m-2 md:mt-0">
        {isLoading ? (
          <Loader />
        ) : (
          <SuspenseLoader>
            <Main />
          </SuspenseLoader>
        )}
      </div>
      <div className="col-span-1 col-start-2 row-span-1">
        <SuspenseLoader>
          <Footer />
        </SuspenseLoader>
      </div>
    </div>
  );
}

export {Shell};
