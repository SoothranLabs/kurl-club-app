'use client';

import { Table } from '@tanstack/react-table';
import { X } from 'lucide-react';

import { Button } from '@/components/ui/button';

import { DataTableFacetedFilter } from '@/components/table/data-table-faceted-filter';
import { DataTableViewOptions } from '@/components/table/data-table-view-options';
import { Search } from '@/components/search';

interface FilterOption {
  label: string;
  value: string;
}

interface FilterConfig {
  columnId: string;
  title: string;
  options: FilterOption[];
}

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  onSearch: (term: string) => void;
  filters: FilterConfig[];
}

export function DataTableToolbar<TData>({
  table,
  onSearch,
  filters,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="flex items-center justify-between w-full">
      <div className="flex items-center space-x-2">
        {/* Search Bar */}
        <Search onSearch={onSearch} />

        {/* Dynamic Filters */}
        {filters.map((filter) => {
          const column = table.getColumn(filter.columnId);
          return (
            column && (
              <DataTableFacetedFilter
                key={filter.columnId}
                column={column}
                title={filter.title}
                options={filter.options}
              />
            )
          );
        })}

        {/* Reset Button */}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <X />
          </Button>
        )}
      </div>

      <div className="flex items-center">
        <DataTableViewOptions table={table} />
      </div>
    </div>
  );
}
