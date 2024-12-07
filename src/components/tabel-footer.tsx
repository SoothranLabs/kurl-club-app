import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Table } from '@tanstack/react-table';

import { generatePaginationPages } from '@/lib/utils';
import { Button } from '@/components/ui/button';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface TableFooterProps<TData> {
  table: Table<TData>;
  totalItems: number;
  pageSizes?: number[];
}

interface PaginationProps {
  pageIndex: number;
  pageCount: number;
  canPreviousPage: boolean;
  canNextPage: boolean;
  goToPage: (page: number) => void;
  previousPage: () => void;
  nextPage: () => void;
}
// Pagination Component
const Pagination = ({
  pageIndex,
  pageCount,
  canPreviousPage,
  canNextPage,
  goToPage,
  previousPage,
  nextPage,
}: PaginationProps) => {
  const pages = generatePaginationPages(pageIndex, pageCount);

  return (
    <div className="flex items-center gap-2">
      {/* Previous Button */}
      <Button
        variant="expandIcon"
        Icon={ChevronLeft}
        iconPlacement="left"
        onClick={previousPage}
        disabled={!canPreviousPage}
      >
        Previous
      </Button>

      {/* Page Numbers */}
      {pages.map((page, index) => (
        <Button
          key={index}
          variant={pageIndex + 1 === page ? 'default' : 'outline'}
          size="sm"
          className={`min-w-[2rem] rounded-[10px] ${
            page === '...' ? 'cursor-default pointer-events-none' : ''
          }`}
          onClick={() => typeof page === 'number' && goToPage(page - 1)}
        >
          {page}
        </Button>
      ))}

      {/* Next Button */}
      <Button
        variant="expandIcon"
        Icon={ChevronRight}
        iconPlacement="right"
        onClick={nextPage}
        disabled={!canNextPage}
      >
        Next
      </Button>
    </div>
  );
};

// TableFooter Component
export const TableFooter = <TData,>({
  table,
  totalItems,
  pageSizes = [10, 20, 30, 40, 50],
}: TableFooterProps<TData>) => {
  const { pageIndex } = table.getState().pagination;

  return (
    <div className="flex items-center justify-between px-4 py-4 border-t">
      {/* Number of Results Section */}
      <div className="flex items-center gap-2">
        <p className="text-sm font-medium">Showing 1 to</p>
        <Select
          value={`${table.getState().pagination.pageSize}`}
          onValueChange={(value) => {
            table.setPageSize(Number(value));
          }}
        >
          <SelectTrigger className="shad-select-trigger w-[70px]">
            <SelectValue placeholder={table.getState().pagination.pageSize} />
          </SelectTrigger>
          <SelectContent className="shad-select-content">
            {pageSizes.map((pageSize) => (
              <SelectItem
                key={pageSize}
                value={`${pageSize}`}
                className="shad-select-item"
              >
                {pageSize}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <p className="text-sm font-medium">of {totalItems} items</p>
      </div>

      {/* Pagination Section */}
      <Pagination
        pageIndex={pageIndex}
        pageCount={table.getPageCount()}
        canPreviousPage={table.getCanPreviousPage()}
        canNextPage={table.getCanNextPage()}
        goToPage={table.setPageIndex}
        previousPage={table.previousPage}
        nextPage={table.nextPage}
      />
    </div>
  );
};
