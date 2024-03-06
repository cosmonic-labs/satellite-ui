import * as React from 'react';
import {cn} from '@/util/cn';

const Table = React.forwardRef<HTMLTableElement, React.HTMLAttributes<HTMLTableElement>>(
  ({className, ...properties}, reference) => (
    <div className="w-full overflow-auto">
      <table
        ref={reference}
        className={cn('w-full caption-bottom text-sm', className)}
        {...properties}
      />
    </div>
  ),
);
Table.displayName = 'Table';

const TableHeader = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({className, ...properties}, reference) => (
  <thead ref={reference} className={cn('bg-muted/50 [&_tr]:border-b', className)} {...properties} />
));
TableHeader.displayName = 'TableHeader';

const TableBody = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({className, ...properties}, reference) => (
  <tbody
    ref={reference}
    className={cn('text-sm font-medium [&_tr:last-child]:border-0', className)}
    {...properties}
  />
));
TableBody.displayName = 'TableBody';

const TableFooter = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({className, ...properties}, reference) => (
  <tfoot
    ref={reference}
    className={cn('bg-primary font-medium text-primary-foreground', className)}
    {...properties}
  />
));
TableFooter.displayName = 'TableFooter';

const TableRow = React.forwardRef<HTMLTableRowElement, React.HTMLAttributes<HTMLTableRowElement>>(
  ({className, ...properties}, reference) => (
    <tr
      ref={reference}
      className={cn(
        'group/row border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted',
        className,
      )}
      {...properties}
    />
  ),
);
TableRow.displayName = 'TableRow';

const TableHead = React.forwardRef<
  HTMLTableCellElement,
  React.ThHTMLAttributes<HTMLTableCellElement>
>(({className, ...properties}, reference) => (
  <th
    ref={reference}
    className={cn(
      'h-8 pl-2 pr-4 text-left align-middle font-medium text-foreground first:pl-2 sm:pr-6 first:sm:pl-2 lg:pr-4 first:lg:pl-4 [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]',
      className,
    )}
    {...properties}
  />
));
TableHead.displayName = 'TableHead';

const TableCell = React.forwardRef<
  HTMLTableCellElement,
  React.TdHTMLAttributes<HTMLTableCellElement>
>(({className, ...properties}, reference) => (
  <td
    ref={reference}
    className={cn(
      'py-1.5 pl-2 pr-4 align-middle first:pl-2 sm:pr-6 first:sm:pl-2 lg:pr-4 first:lg:pl-4 [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]',
      className,
    )}
    {...properties}
  />
));
TableCell.displayName = 'TableCell';

const TableCaption = React.forwardRef<
  HTMLTableCaptionElement,
  React.HTMLAttributes<HTMLTableCaptionElement>
>(({className, ...properties}, reference) => (
  <caption
    ref={reference}
    className={cn('mt-4 text-sm text-muted-foreground', className)}
    {...properties}
  />
));
TableCaption.displayName = 'TableCaption';

export {Table, TableHeader, TableBody, TableFooter, TableHead, TableRow, TableCell, TableCaption};
