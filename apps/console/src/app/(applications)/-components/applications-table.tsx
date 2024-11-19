import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  DataTableColumnHeader,
} from '@cosmonic/orbit-ui';
import {Link, useNavigate} from '@tanstack/react-router';
import {
  type CellContext,
  type ColumnHelper,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
  type SortingState,
} from '@tanstack/react-table';
import {type ApplicationSummary} from '@wasmcloud/lattice-client-core';
import {MenuIcon} from 'lucide-react';
import * as React from 'react';
import {ApplicationsEmptyState} from '@/app/(applications)/-components/applications-empty-state';
import {StatusBadge} from '@/app/(applications)/-components/status-badge';
import {useDeployApplicationMutation} from '@/services/lattice-queries/applications/deploy-application';
import {useUndeployApplicationMutation} from '@/services/lattice-queries/applications/undeploy-application';

const columnHelper: ColumnHelper<ApplicationSummary> = createColumnHelper<ApplicationSummary>();

const columns = [
  columnHelper.accessor('name', {
    header: ({column}) => <DataTableColumnHeader column={column} title="Application" />,
    cell: (info) => (
      <Link
        className="text-primary underline"
        to="/applications/detail/$appName"
        params={{appName: info.getValue()}}
      >
        {info.getValue()}
      </Link>
    ),
  }),
  columnHelper.accessor('status', {
    header: ({column}) => <DataTableColumnHeader column={column} title="Status" />,
    cell(info) {
      const status = info.getValue() ?? 'unknown';
      return (
        <div className="inline-block">
          <StatusBadge status={status} />
        </div>
      );
    },
  }),
  columnHelper.accessor('deployed_version', {
    id: 'deployedVersion',
    header: ({column}) => <DataTableColumnHeader column={column} title="Deployed Version" />,
  }),
  // TODO: get data for these columns somehow
  //   columnHelper.accessor('actors', {
  //     header: ({column}) => <DataTableColumnHeader column={column} title="Actors" />,
  //     cell: (info) => info.getValue()?.length ?? 0,
  //   }),
  //   columnHelper.accessor('providers', {
  //     header: ({column}) => <DataTableColumnHeader column={column} title="Providers" />,
  //     cell: (info) => info.getValue()?.length ?? 0,
  //   }),
  //   columnHelper.accessor('actors', {
  //     id: 'links',
  //     header: ({column}) => <DataTableColumnHeader column={column} title="Links" />,
  //     cell: (info) => info.getValue()?.reduce((count, actor) => actor?.links?.length ?? 0 + count, 0),
  //   }),
  columnHelper.display({
    header: ({column}) => <DataTableColumnHeader column={column} title="Actions" />,
    id: 'actions',
    cell: (context) => <ApplicationTableRowActions context={context} />,
  }),
];

type ApplicationsTableProps = {
  readonly applications: ApplicationSummary[];
  readonly isLoading: boolean;
};

function ApplicationsTable({applications, isLoading}: ApplicationsTableProps): React.ReactElement {
  const [sorting, setSorting] = React.useState<SortingState>([]);

  const table = useReactTable({
    data: applications,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <div>
      <Table className="-mt-px">
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.map((row) => (
            <TableRow key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}

          {table.getRowModel().rows.length === 0 && !isLoading && (
            <TableRow>
              <TableCell colSpan={table.getAllColumns().length} className="text-center">
                No applications found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      {applications.length === 0 && !isLoading && (
        <div className="md:mt-10">
          <ApplicationsEmptyState />
        </div>
      )}
    </div>
  );
}

function ApplicationTableRowActions({
  context,
}: {
  readonly context: CellContext<ApplicationSummary, unknown>;
}): React.ReactElement {
  const {name, version, status} = context.row.original;
  const isDeployed = status === 'deployed';
  const navigate = useNavigate();
  const goToSummary = React.useCallback(
    async () =>
      navigate({
        to: `/applications/detail/$appName`,
        params: {appName: name},
        search: {view: 'manifest'},
      }),
    [name, navigate],
  );
  const goToVersions = React.useCallback(
    async () =>
      navigate({
        to: `/applications/detail/$appName`,
        params: {appName: name},
        search: {view: 'versions'},
      }),
    [name, navigate],
  );
  const deploy = useDeployApplicationMutation();
  const handleDeploy = React.useCallback(() => {
    deploy.mutate({name, version});
  }, [name, deploy, version]);

  const undeploy = useUndeployApplicationMutation();
  const handleUndeploy = React.useCallback(() => {
    undeploy.mutate({name});
  }, [name, undeploy]);

  return (
    <div className="flex gap-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="xs"
            aria-label={`Actions for detail/${name}`}
            data-test-id="actions-button"
          >
            <MenuIcon className="size-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent side="bottom" align="end">
          <DropdownMenuItem onClick={isDeployed ? handleUndeploy : handleDeploy}>
            {isDeployed ? 'Undeploy' : 'Deploy'}
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={goToSummary}>View Manifest Summary</DropdownMenuItem>
          <DropdownMenuItem onClick={goToVersions}>View Version History</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export {ApplicationsTable};
