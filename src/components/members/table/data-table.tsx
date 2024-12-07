'use client';

import * as React from 'react';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { TableFooter } from '@/components/tabel-footer';

interface DataTableProps<TData extends object, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData extends object, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable<TData>({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="rounded-md border bg-card">
      <div className="relative">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                {/* Fixed Columns */}
                <TableHead className="sticky left-0 z-20 bg-card border-r">
                  {flexRender(
                    columns[0].header,
                    table.getHeaderGroups()[0].headers[0].getContext()
                  )}
                </TableHead>
                <TableHead className="sticky left-[100px] z-20 bg-card border-r">
                  {flexRender(
                    columns[1].header,
                    table.getHeaderGroups()[0].headers[1].getContext()
                  )}
                </TableHead>
                {/* Scrollable Columns */}
                {table
                  .getHeaderGroups()[0]
                  .headers.slice(2, -1)
                  .map((header) => (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  ))}
                {/* Action Column */}
                <TableHead className="sticky right-0 z-20 bg-card border-l">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow key={row.id} className="relative">
                    {/* Fixed Columns */}
                    <TableCell className="sticky left-0 z-10 bg-card border-r">
                      {flexRender(
                        row.getVisibleCells()[0].column.columnDef.cell,
                        row.getVisibleCells()[0].getContext()
                      )}
                    </TableCell>
                    <TableCell className="sticky left-[100px] z-10 bg-card border-r">
                      {flexRender(
                        row.getVisibleCells()[1].column.columnDef.cell,
                        row.getVisibleCells()[1].getContext()
                      )}
                    </TableCell>
                    {/* Scrollable Columns */}
                    {row
                      .getVisibleCells()
                      .slice(2, -1)
                      .map((cell) => (
                        <TableCell key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      ))}
                    {/* Action Column */}
                    <TableCell className="sticky right-0 z-10 bg-card border-l p-0">
                      <div className="flex h-full items-center justify-center">
                        {flexRender(
                          row.getVisibleCells().slice(-1)[0].column.columnDef
                            .cell,
                          row.getVisibleCells().slice(-1)[0].getContext()
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Table Footers */}
      <TableFooter table={table} totalItems={data.length} />
    </div>
  );
}
