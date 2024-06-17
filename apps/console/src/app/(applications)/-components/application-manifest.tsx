import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Badge,
  HostLabel,
  LongTextCopy,
} from '@cosmonic/orbit-ui';
import {Link} from '@tanstack/react-router';
import {type ColumnHelper, createColumnHelper} from '@tanstack/react-table';
import {
  DeploymentStatus,
  type WasmCloudComponent,
  type WasmCloudLink,
  type WasmCloudProvider,
  type WasmCloudHost,
  type ApplicationDetail,
} from '@wasmcloud/lattice-client-core';
import * as React from 'react';
import {getApplicationInventory} from '../-helpers/get-application-inventory';
import {isManagedLink} from '../-helpers/is-managed';
import {ApplicationDataTable} from './application-data-table';
import {SummaryTile} from './summary-tile';

const componentColumnHelper: ColumnHelper<WasmCloudComponent> =
  createColumnHelper<WasmCloudComponent>();
const componentColumns = [
  componentColumnHelper.accessor('name', {header: 'Name'}),
  componentColumnHelper.accessor('id', {header: 'ID'}),
  componentColumnHelper.accessor('max_instances', {header: 'Max Instances'}),
  componentColumnHelper.accessor('image_ref', {header: 'Image'}),
];

const providerColumnHelper: ColumnHelper<WasmCloudProvider> =
  createColumnHelper<WasmCloudProvider>();
const providerColumns = [
  providerColumnHelper.accessor('name', {header: 'Name'}),
  providerColumnHelper.accessor('id', {header: 'ID'}),
  providerColumnHelper.accessor('image_ref', {header: 'Image'}),
];

const linkColumnHelper: ColumnHelper<WasmCloudLink> = createColumnHelper<WasmCloudLink>();
const linkColumns = [
  linkColumnHelper.display({
    id: 'wit',
    header: 'WIT',
    cell: (info) =>
      `${info.row.original.wit_namespace}:${info.row.original.wit_package}/${info.row.original.interfaces.join(',')}`,
  }),
  linkColumnHelper.accessor('source_id', {
    header: 'Source',
    // cell: (info) => <ShortCopy text={info.getValue()} />,
  }),
  linkColumnHelper.accessor('source_config', {
    header: 'Source Config',
  }),
  linkColumnHelper.accessor('target', {
    header: 'Target',
    // cell: (info) => <ShortCopy text={info.getValue()} />,
  }),
  linkColumnHelper.accessor('target_config', {
    header: 'Target Config',
  }),
  linkColumnHelper.accessor('name', {
    header: 'Name',
  }),
];

const hostColumnHelper: ColumnHelper<WasmCloudHost> = createColumnHelper<WasmCloudHost>();
const hostColumns = [
  hostColumnHelper.accessor('friendly_name', {
    header: 'Name',
    cell: (info) => (
      <Link
        className="text-primary underline hover:no-underline"
        to="/infrastructure/hosts/$hostId"
        params={{hostId: info.row.original.host_id}}
      >
        {info.getValue()}
      </Link>
    ),
  }),
  hostColumnHelper.accessor('labels', {
    header: 'Labels',
    cell: (info) => (
      <span className="flex flex-wrap">
        {Object.entries(info.getValue())?.map(([key, value], index) => (
          <HostLabel key={index} pKey={key} pVal={value} />
        ))}
      </span>
    ),
  }),
  hostColumnHelper.accessor('host_id', {
    header: 'Public Key',
    cell: (info) => <LongTextCopy>{info.getValue()}</LongTextCopy>,
  }),
];

type ApplicationManifestProps = {
  readonly application: ApplicationDetail;
  readonly hosts: WasmCloudHost[];
  readonly configNames: string[];
  readonly links: WasmCloudLink[];
};

const statusSummary: Record<DeploymentStatus, string> = {
  [DeploymentStatus.Deployed]: 'Your application is ready!',
  [DeploymentStatus.Failed]: 'Something went wrong while distributing your application.',
  [DeploymentStatus.Reconciling]:
    'Your application is reconciling across hosts connected to the lattice.',
  [DeploymentStatus.Undeployed]: "This app currently isn't deployed.",
  [DeploymentStatus.Unknown]: "Hmm... we're not sure what's going on with your application.",
};

function ApplicationManifest({
  application,
  hosts,
  configNames,
  links,
}: ApplicationManifestProps): React.ReactElement {
  const inventory = getApplicationInventory(hosts, application);

  const runningComponents = [...inventory.components.values()];
  const runningProviders = [...inventory.providers.values()];
  const utilizedHosts = [...inventory.utilizedHosts.values()];
  const appLinks = links.filter((link) => isManagedLink(link, application.manifest));

  const manifestComponents = application.manifest.spec.components.filter(
    (c) => c.type === 'component',
  ).length;
  const manifestProviders = application.manifest.spec.components.filter(
    (c) => c.type === 'capability',
  ).length;
  const totalHosts = hosts.length;

  const status = application.status.status.type ?? DeploymentStatus.Unknown;
  const message = application.status.status.message ?? '';

  return (
    <div>
      <div className="my-12">
        <div className="text-muted-foreground">
          <p className="text-center text-lg">{statusSummary[status]}</p>
          {message && (
            <div className="mt-4 rounded border bg-muted px-3 py-2 text-muted-foreground">
              <div className="mb-1 text-xs font-semibold uppercase">Status</div>
              <p className="text-sm">{message}</p>
            </div>
          )}
        </div>
      </div>
      <div className="mb-2 mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <SummaryTile
          title="Components"
          count={`${runningComponents.length} / ${manifestComponents}`}
        />
        <SummaryTile
          title="Providers"
          count={`${runningProviders.length} / ${manifestProviders}`}
        />
        <SummaryTile title="Links" count={Object.keys(links).length} />
        <SummaryTile title="Hosts" count={`${utilizedHosts.length} / ${totalHosts}`} />
      </div>
      <Accordion
        type="multiple"
        defaultValue={['wormholes', 'actors', 'providers', 'links', 'hosts']}
      >
        <AccordionItem value="actors">
          <AccordionTrigger iconBefore className="border-b-0">
            Components
            <Badge isMini variant="outline" className="ms-2">
              {runningComponents.length}
            </Badge>
          </AccordionTrigger>
          <AccordionContent className="overflow-hidden rounded-lg shadow">
            <ApplicationDataTable
              data={runningComponents}
              columns={componentColumns}
              placeholder="No Components found in deployed version"
            />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="providers">
          <AccordionTrigger iconBefore className="border-b-0">
            Providers
            <Badge isMini variant="outline" className="ms-2">
              {runningProviders.length}
            </Badge>
          </AccordionTrigger>
          <AccordionContent className="overflow-hidden rounded-lg shadow">
            <ApplicationDataTable
              data={runningProviders}
              columns={providerColumns}
              placeholder="No Providers found in deployed version"
            />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="links">
          <AccordionTrigger iconBefore className="border-b-0">
            Links
            <Badge isMini variant="outline" className="ms-2">
              {appLinks.length}
            </Badge>
          </AccordionTrigger>
          <AccordionContent className="overflow-hidden rounded-lg shadow">
            <ApplicationDataTable
              data={appLinks}
              columns={linkColumns}
              placeholder="No Links found in deployed version"
            />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="hosts">
          <AccordionTrigger iconBefore className="border-b-0">
            Hosts Utilized
            <Badge isMini variant="outline" className="ms-2">
              {utilizedHosts.length}
            </Badge>
          </AccordionTrigger>
          <AccordionContent className="overflow-hidden rounded-lg shadow">
            <ApplicationDataTable
              data={utilizedHosts}
              columns={hostColumns}
              placeholder="No Hosts are utilized by this application"
            />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}

export {ApplicationManifest};
