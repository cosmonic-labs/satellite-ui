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
  AlertDialogTrigger,
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  buttonVariants,
  Pill,
  DropdownMenuSubTrigger,
  DropdownMenuSub,
  DropdownMenuSubContent,
} from '@cosmonic/orbit-ui';
import {Link} from '@tanstack/react-router';
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
import {type WasmCloudLink} from '@wasmcloud/lattice-client-core';
import {MenuIcon} from 'lucide-react';
import * as React from 'react';
import {useDeleteLinkMutation} from '@/services/lattice-queries/links/delete-link';
import {getWitStringFromLink} from '../-helpers/get-wit-string-from-link';

const columnHelper: ColumnHelper<LinksTableDataRow> = createColumnHelper<LinksTableDataRow>();

const columns = [
  columnHelper.accessor('link.wit_namespace', {
    id: 'wit-interfaces',
    header: ({column}) => <DataTableColumnHeader column={column} title="WIT Interface" />,
    cell: (info) => getWitStringFromLink(info.row.original.link),
    sortingFn: (a, b) =>
      getWitStringFromLink(a.original.link).localeCompare(getWitStringFromLink(b.original.link)),
  }),
  columnHelper.accessor('link.source_id', {
    header: ({column}) => <DataTableColumnHeader column={column} title="Source" />,
    cell: (info) => <code>{info.getValue()}</code>,
  }),
  columnHelper.accessor('link.target', {
    header: ({column}) => <DataTableColumnHeader column={column} title="Target" />,
    cell: (info) => <code>{info.getValue()}</code>,
  }),
  columnHelper.accessor('link.name', {
    header: ({column}) => <DataTableColumnHeader column={column} title="Link Name" />,
    cell: (info) => <code>{info.getValue()}</code>,
  }),
  columnHelper.display({
    id: 'configs',
    header: ({column}) => <DataTableColumnHeader column={column} title="Configurations" />,
    cell: (info) => (
      <div className="inline-flex flex-wrap gap-0.5">
        {info.row.original.link.source_config.length > 0 && (
          <Pill variant="secondary" className="font-mono text-xs font-normal">
            source
          </Pill>
        )}
        {info.row.original.link.target_config.length > 0 && (
          <Pill variant="secondary" className="font-mono text-xs font-normal">
            target
          </Pill>
        )}
      </div>
    ),
  }),
  columnHelper.accessor('applicationName', {
    header: ({column}) => <DataTableColumnHeader column={column} title="Managed Application" />,
    cell(info) {
      const appName = info.getValue();
      return appName ? (
        <Link
          className="text-primary underline"
          to="/applications/detail/$appName"
          params={{appName}}
        >
          {appName}
        </Link>
      ) : (
        'Unmanaged'
      );
    },
  }),
  columnHelper.display({
    header: ({column}) => <DataTableColumnHeader column={column} title="Actions" />,
    id: 'actions',
    cell: (context) => <LinksTableRowActions context={context} />,
  }),
];

type LinksTableDataRow = {
  link: WasmCloudLink;
  applicationName?: string;
};

type LinksTableProps = {
  readonly data: LinksTableDataRow[];
  readonly isLoading: boolean;
};

function LinksTable({data, isLoading}: LinksTableProps): React.ReactElement {
  const [sorting, setSorting] = React.useState<SortingState>([]);

  const table = useReactTable({
    data,
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
                No Links found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      {data.length === 0 && !isLoading && (
        <div className="md:mt-10">{/* <HostsEmptyState /> */}</div>
      )}
    </div>
  );
}

function LinksTableRowActions({
  context,
}: {
  readonly context: CellContext<LinksTableDataRow, unknown>;
}): React.ReactElement {
  const {link, applicationName} = context.row.original;
  const deleteLinkMutation = useDeleteLinkMutation();
  const handleDeleteConfig = React.useCallback(() => {
    deleteLinkMutation.mutate({
      source_id: link.source_id,
      wit_namespace: link.wit_namespace,
      wit_package: link.wit_package,
      link_name: link.name,
    });
  }, [deleteLinkMutation, link]);

  return (
    <div className="flex gap-2">
      <AlertDialog>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="xs"
              aria-label={`Actions for host/${link.name}`}
              data-test-id="actions-button"
            >
              <MenuIcon className="size-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent side="bottom" align="end">
            {applicationName && (
              <DropdownMenuItem asChild>
                <Link to="/applications/detail/$appName" params={{appName: applicationName}}>
                  View Managed Application
                </Link>
              </DropdownMenuItem>
            )}

            {link.source_config.length > 0 && (
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>Source Configs</DropdownMenuSubTrigger>
                <DropdownMenuSubContent>
                  {link.source_config.map((configName) => (
                    <DropdownMenuItem key={configName} asChild>
                      <Link to="/configs/detail/$configName" params={{configName}}>
                        {configName}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuSubContent>
              </DropdownMenuSub>
            )}

            {link.target_config.length > 0 && (
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>Target Configs</DropdownMenuSubTrigger>
                <DropdownMenuSubContent>
                  {link.target_config.map((configName) => (
                    <DropdownMenuItem key={configName} asChild>
                      <Link to="/configs/detail/$configName" params={{configName}}>
                        {configName}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuSubContent>
              </DropdownMenuSub>
            )}

            <AlertDialogTrigger asChild>
              <DropdownMenuItem className="focus:bg-destructive/20">Delete Config</DropdownMenuItem>
            </AlertDialogTrigger>
          </DropdownMenuContent>
        </DropdownMenu>

        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure you want to delete?</AlertDialogTitle>
            <AlertDialogDescription className="space-y-4">
              This will permanently the link between{' '}
              <code className="rounded border bg-muted">{link.source_id}</code> and{' '}
              <code className="rounded border bg-muted">{link.target}</code> with the WIT interface{' '}
              <code className="rounded border bg-muted">{getWitStringFromLink(link)}</code>.{' '}
              {applicationName ? (
                <>This action cannot be undone.</>
              ) : (
                <>This link is managed and will be automatically recreated.</>
              )}
              {applicationName && (
                <p className="mt-2">
                  <Link
                    to="/applications/detail/$appName"
                    params={{appName: applicationName}}
                    className="text-primary underline"
                  >
                    View Application
                  </Link>
                </p>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className={buttonVariants({variant: 'destructive'})}
              onClick={handleDeleteConfig}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

export {LinksTable};
