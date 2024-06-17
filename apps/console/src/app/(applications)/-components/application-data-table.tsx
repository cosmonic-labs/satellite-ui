import {Table, TableHeader, TableRow, TableHead, TableBody, TableCell} from '@cosmonic/orbit-ui';
import {type ColumnDef, flexRender, getCoreRowModel, useReactTable} from '@tanstack/react-table';
import * as React from 'react';

function ApplicationDataTable<T>({
  data,
  columns,
  placeholder,
}: {
  readonly data: T[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- no way to type all possible values
  readonly columns: Array<ColumnDef<T, any>>;
  readonly placeholder?: string;
}): React.ReactElement {
  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
  });
  const rowCount = table.getRowModel().rows.length;

  return (
    <Table>
      <TableHeader>
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id} className="hover:bg-none">
            {headerGroup.headers.map((header) => (
              <TableHead key={header.id} className="border-t-0">
                {flexRender(header.column.columnDef.header, header.getContext())}
              </TableHead>
            ))}
          </TableRow>
        ))}
      </TableHeader>
      <TableBody>
        {table.getRowModel().rows.map((row) => (
          <TableRow key={row.id} className="border-b-border/50">
            {row.getVisibleCells().map((cell) => (
              <TableCell key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </TableCell>
            ))}
          </TableRow>
        ))}
        {rowCount === 0 && (
          <TableRow>
            <TableCell className="border-b-0 text-center" colSpan={table.getAllColumns().length}>
              {placeholder ?? 'No data'}
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}

export {ApplicationDataTable};
