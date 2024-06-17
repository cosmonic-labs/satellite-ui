import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  DataTableColumnHeader,
  HostLabel,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TimeAgo,
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
import {type WasmCloudHostRef} from '@wasmcloud/lattice-client-core';
import {MenuIcon} from 'lucide-react';
import * as React from 'react';
import {useCopyToClipboard} from 'usehooks-ts';
import {useStopHostMutation} from '@/services/lattice-queries/hosts/stop-host';

const columnHelper: ColumnHelper<WasmCloudHostRef> = createColumnHelper<WasmCloudHostRef>();

const columns = [
  columnHelper.accessor('friendly_name', {
    header: ({column}) => <DataTableColumnHeader column={column} title="Host Name" />,
    cell: (info) => (
      <Link
        className="text-primary underline"
        to="/infrastructure/hosts/$hostId"
        params={{hostId: info.row.original.id}}
      >
        {info.getValue()}
      </Link>
    ),
  }),
  columnHelper.accessor('version', {
    header: ({column}) => <DataTableColumnHeader column={column} title="Version" />,
  }),
  columnHelper.accessor('uptime_seconds', {
    header: ({column}) => <DataTableColumnHeader column={column} title="Uptime" />,
    cell(info) {
      return <TimeAgo isShort timeAgoMs={info.getValue()} levels={3} />;
    },
  }),
  columnHelper.accessor('components', {
    header: ({column}) => <DataTableColumnHeader column={column} title="Components" />,
    sortingFn: (a, b) =>
      getInstanceCount(a.original.components) - getInstanceCount(b.original.components),

    cell(info) {
      const components = info.getValue();
      const total = Object.keys(components).length;
      const instances = Object.values(components).reduce((total, count) => total + count, 0);
      return (
        <TooltipLabel label="Components / Instances">
          {total} / {instances}
        </TooltipLabel>
      );
    },
  }),
  columnHelper.accessor('providers', {
    header: ({column}) => <DataTableColumnHeader column={column} title="Providers" />,
    sortingFn: (a, b) =>
      getInstanceCount(a.original.providers) - getInstanceCount(b.original.providers),
    cell(info) {
      const providers = info.getValue();
      const total = Object.keys(providers).length;
      const instances = Object.values(providers).reduce((total, count) => total + count, 0);
      return (
        <TooltipLabel label="Providers / Instances">
          {total} / {instances}
        </TooltipLabel>
      );
    },
  }),
  columnHelper.accessor('labels', {
    id: 'labels',
    header: ({column}) => <DataTableColumnHeader column={column} title="Labels" />,
    cell: (info) => (
      <div>
        {Object.entries(info.getValue()).map(([key, value]) => (
          <HostLabel key={key} pKey={key} pVal={value} />
        ))}
      </div>
    ),
  }),
  columnHelper.display({
    header: ({column}) => <DataTableColumnHeader column={column} title="Actions" />,
    id: 'actions',
    cell: (context) => <HostsTableRowActions context={context} />,
  }),
];

function getInstanceCount(entity: Record<string, number>) {
  return Object.values(entity).reduce((total, count) => total + count, 0);
}

function TooltipLabel({
  children,
  label,
}: {
  readonly children: React.ReactNode;
  readonly label: string;
}) {
  return (
    <Tooltip delayDuration={50}>
      <TooltipContent>{label}</TooltipContent>
      <TooltipTrigger>{children}</TooltipTrigger>
    </Tooltip>
  );
}

type HostsTableProps = {
  readonly hosts: WasmCloudHostRef[];
  readonly isLoading: boolean;
};

function HostsTable({hosts, isLoading}: HostsTableProps): React.ReactElement {
  const [sorting, setSorting] = React.useState<SortingState>([]);

  const table = useReactTable({
    data: hosts,
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
                No hosts found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      {hosts.length === 0 && !isLoading && (
        <div className="md:mt-10">{/* <HostsEmptyState /> */}</div>
      )}
    </div>
  );
}

function HostsTableRowActions({
  context,
}: {
  readonly context: CellContext<WasmCloudHostRef, unknown>;
}): React.ReactElement {
  const {id, friendly_name: name} = context.row.original;
  const [, copy] = useCopyToClipboard();
  const navigate = useNavigate();
  const stopHost = useStopHostMutation({
    onSuccess() {
      void navigate({to: '/infrastructure'});
    },
  });
  const handleStopHost = React.useCallback(() => {
    stopHost.mutate({id});
  }, [stopHost, id]);
  const handleCopyId = React.useCallback(async () => {
    await copy(id);
  }, [id, copy]);

  return (
    <div className="flex gap-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="xs"
            aria-label={`Actions for host/${name}`}
            data-test-id="actions-button"
          >
            <MenuIcon className="size-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent side="bottom" align="end">
          <DropdownMenuItem onClick={handleCopyId}>Copy Host ID</DropdownMenuItem>
          <DropdownMenuItem className="hover:bg-destructive/20" onClick={handleStopHost}>
            Stop Host
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export {HostsTable};
