import {type Column} from '@tanstack/react-table';
import {ChevronDownIcon, ChevronUpIcon, ChevronsUpDownIcon} from 'lucide-react';
import * as React from 'react';
import {Button} from '@/components/button/index.js';
import {cn} from '@/util/cn.js';

type DataTableColumnHeaderProperties<DataType, ValueType> = {
  readonly column: Column<DataType, ValueType>;
  readonly title: string;
} & React.HTMLAttributes<HTMLDivElement>;

export function DataTableColumnHeader<DataType, ValueType>({
  column,
  title,
  className,
}: DataTableColumnHeaderProperties<DataType, ValueType>): React.ReactElement {
  if (!column.getCanSort()) {
    return <div className={cn(className)}>{title}</div>;
  }

  const handleClick = (): void => {
    if (column.getIsSorted() === 'desc') {
      column.toggleSorting(false);
    } else if (column.getIsSorted() === 'asc') {
      column.toggleSorting(true);
    } else {
      column.toggleSorting(true);
    }
  };

  return (
    <div className={cn('flex items-center space-x-2', className)}>
      <Button
        variant="ghost"
        size="sm"
        className="group/button -ml-3 h-8 data-[state=open]:bg-accent"
        onClick={handleClick}
      >
        <span>{title}</span>
        {column.getIsSorted() === 'desc' ? (
          <ChevronDownIcon className="ml-2 size-4" />
        ) : column.getIsSorted() === 'asc' ? (
          <ChevronUpIcon className="ml-2 size-4" />
        ) : (
          <ChevronsUpDownIcon className="ml-2 size-4 opacity-0 transition-opacity group-hover/button:opacity-100" />
        )}
      </Button>
    </div>
  );
}
