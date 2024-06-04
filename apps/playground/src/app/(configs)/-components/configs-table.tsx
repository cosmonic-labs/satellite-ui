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
import {MenuIcon} from 'lucide-react';
import * as React from 'react';
import {useDeleteConfigMutation} from '@/services/lattice-queries/configs/delete-config';

const columnHelper: ColumnHelper<ConfigTableDataRow> = createColumnHelper<ConfigTableDataRow>();

const columns = [
  columnHelper.accessor('name', {
    header: ({column}) => <DataTableColumnHeader column={column} title="Config Name" />,
    cell: (info) => (
      <Link
        className="text-primary underline"
        to="/configs/detail/$configName"
        params={{configName: info.getValue()}}
      >
        {info.getValue()}
      </Link>
    ),
  }),
  columnHelper.accessor('applicationName', {
    header: ({column}) => <DataTableColumnHeader column={column} title="Application" />,
    cell(info) {
      const appName = info.getValue();
      return appName ? <code>{appName}</code> : 'Manual Entry';
    },
  }),
  columnHelper.display({
    header: ({column}) => <DataTableColumnHeader column={column} title="Actions" />,
    id: 'actions',
    cell: (context) => <ConfigsTableRowActions context={context} />,
  }),
];

type ConfigTableDataRow = {
  name: string;
  applicationName?: string;
};

type ConfigsTableProps = {
  readonly configs: ConfigTableDataRow[];
  readonly isLoading: boolean;
};

function ConfigsTable({configs, isLoading}: ConfigsTableProps): React.ReactElement {
  const [sorting, setSorting] = React.useState<SortingState>([]);

  const table = useReactTable({
    data: configs,
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
                No configs found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      {configs.length === 0 && !isLoading && (
        <div className="md:mt-10">{/* <HostsEmptyState /> */}</div>
      )}
    </div>
  );
}

function ConfigsTableRowActions({
  context,
}: {
  readonly context: CellContext<ConfigTableDataRow, unknown>;
}): React.ReactElement {
  const {name, applicationName} = context.row.original;
  const stopHost = useDeleteConfigMutation();
  const handleDeleteConfig = React.useCallback(() => {
    stopHost.mutate({name});
  }, [stopHost, name]);

  return (
    <div className="flex gap-2">
      <AlertDialog>
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
            {applicationName && (
              <DropdownMenuItem asChild>
                <Link to="/applications/detail/$appName" params={{appName: applicationName}}>
                  View Managed Application
                </Link>
              </DropdownMenuItem>
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
              This will permanently the <code className="rounded border bg-muted">{name}</code>{' '}
              config.{' '}
              {applicationName ? (
                <>This action cannot be undone.</>
              ) : (
                <>This config is managed and will be automatically recreated.</>
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

export {ConfigsTable};
