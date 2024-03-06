import {type WasmCloudHost} from '@cosmonic/lattice-client-core';
import {ApplicationIcon, ComponentIcon, HostIcon, ProviderIcon} from '@cosmonic/orbit-icons';
import {
  Button,
  CopyButtonPrimitive,
  HostLabel,
  Pill,
  SheetDivider,
  SheetHeader,
  SheetTitle,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@cosmonic/orbit-ui';
import {Link} from '@tanstack/react-router';
import {StarIcon} from 'lucide-react';
import * as React from 'react';
import {type PropsWithChildren} from 'react';

type HostDetailSheetContentProps = {
  readonly host: WasmCloudHost;
};

const SheetSection = React.forwardRef<
  HTMLDivElement,
  PropsWithChildren<{readonly title?: string | React.ReactElement}>
>(({children, title}, ref) => (
  <div ref={ref}>
    <SheetDivider />
    {title && (
      <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-foreground/60">
        {title}
      </h3>
    )}
    {children}
  </div>
));

type EntityRowProps = {
  readonly id: string;
  readonly entity: WasmCloudHost['components'][number] | WasmCloudHost['providers'][number];
};

function entityIsComponent(
  entity: WasmCloudHost['components'][number] | WasmCloudHost['providers'][number],
): entity is WasmCloudHost['components'][number] {
  return 'max_instances' in entity;
}

function isManagedEntity(
  entity: WasmCloudHost['components'][number] | WasmCloudHost['providers'][number],
) {
  return (
    entity.annotations &&
    'wasmcloud.dev/managed-by' in entity.annotations &&
    entity.annotations['wasmcloud.dev/managed-by'] === 'wadm'
  );
}

function EntityRow({id, entity}: EntityRowProps) {
  const isComponent = entityIsComponent(entity);
  const Icon = isComponent ? ComponentIcon : ProviderIcon;
  const isWadmManaged = isManagedEntity(entity);
  const appName = entity.annotations?.['wasmcloud.dev/appspec'] ?? '';
  return (
    <div
      key={id}
      className="group/entity relative border border-b-0 p-2 pb-1.5 pt-1 first:rounded-t-md last:rounded-b-md last:border-b"
    >
      {isWadmManaged && (
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              asChild
              variant="ghost"
              size="xs"
              className="absolute right-0 top-0 overflow-hidden group-first/entity:rounded-tr-sm"
            >
              <Link to="/applications/detail/$appName" params={{appName}}>
                <ApplicationIcon className="size-4 text-primary" />
              </Link>
            </Button>
          </TooltipTrigger>
          <TooltipContent side="left" align="end" className="max-w-xs text-xs">
            This {isComponent ? 'component' : 'provider'} is being managed as part of the{' '}
            <code>{appName}</code> application.
          </TooltipContent>
        </Tooltip>
      )}
      <div className="flex flex-wrap items-start gap-1.5">
        <Icon className="mt-1 size-4" strokeWidth={2.5} />
        <div className="grow">
          <span className="text-sm font-medium">{entity.name ?? id}</span>
          <div className="text-xs">{entity.image_ref}</div>
        </div>
      </div>
    </div>
  );
}

function HostDetailSheetContent({host}: HostDetailSheetContentProps) {
  return (
    <div>
      <SheetHeader>
        <SheetTitle>
          <span className="flex flex-row items-center gap-2 text-primary">
            <HostIcon strokeWidth="2.5" />
            <code>{host.friendly_name}</code>
            <Pill variant="secondary">{host.version}</Pill>
          </span>
        </SheetTitle>
      </SheetHeader>

      <SheetSection title="Labels">
        <div className="inline-flex flex-wrap gap-1">
          {Object.entries(host.labels).map(([k, v]) => (
            <HostLabel key={`${k}=${v}`} pKey={k} pVal={v} />
          ))}
        </div>
      </SheetSection>

      <SheetSection title="Entities">
        <div className="my-3">
          <h4 className="mb-1 text-foreground/50">Components</h4>
          <div>
            {Object.entries(host.components).length > 0 ? (
              Object.entries(host.components).map(([id, component]) => (
                <EntityRow key={id} id={id} entity={component} />
              ))
            ) : (
              <div className="rounded-md border p-2 text-sm">
                There are no components running on this host
              </div>
            )}
          </div>
        </div>
        <div className="my-3">
          <h4 className="mb-1 text-foreground/50">Providers</h4>
          <div>
            {Object.entries(host.providers).length > 0 ? (
              Object.entries(host.providers).map(([id, provider]) => (
                <EntityRow key={id} id={id} entity={provider} />
              ))
            ) : (
              <div className="rounded-md border p-2 text-sm">
                There are no providers running on this host
              </div>
            )}
          </div>
        </div>
      </SheetSection>

      <SheetSection title="Summary">
        <div className="flex pb-1 text-xs text-secondary-foreground">
          <div className="w-1/4">Key</div>
          <div className="flex w-3/4">
            <div className="truncate">{host.host_id}</div>
            <CopyButtonPrimitive textToCopy={host.host_id} />
          </div>
        </div>
        <div className="flex pb-1 text-xs text-secondary-foreground">
          <div className="w-1/4">Started</div>
          <div className="w-3/4">
            {new Date(Date.now() - host.uptime_seconds * 1000).toLocaleString()}
          </div>
        </div>
      </SheetSection>
    </div>
  );
}

export {HostDetailSheetContent};
