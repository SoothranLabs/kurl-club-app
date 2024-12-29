import { columns } from '@/components/settings/user-management/columns';
import { DataTable } from '@/components/table/data-table';
import { DataTableToolbar } from '@/components/table/data-table-toolbar';
import { UsersHeader } from '@/components/settings/user-management/user-header';
import { useFilterableList } from '@/hooks/use-filterable-list';
import { useSheet } from '@/hooks/use-sheet';
import { Trainer } from '@/types';
import { initialTrainers } from '@/lib/dummy/data';
import { trainerFilters } from '@/lib/dummy/fiters';
import { searchItems } from '@/lib/utils';

export const UserManagement = () => {
  const { isOpen, openSheet, closeSheet } = useSheet();
  const { items: trainers, search } = useFilterableList<Trainer>(
    initialTrainers,
    searchItems
  );

  return (
    <div className="h-full flex-col gap-4 px-[46px] my-8 flex w-full">
      <UsersHeader
        onAddNewClick={() => openSheet()}
        isOpen={isOpen}
        closeSheet={closeSheet}
      />
      <DataTable
        columns={columns}
        data={trainers}
        toolbar={(table) => (
          <DataTableToolbar
            table={table}
            onSearch={search}
            filters={trainerFilters}
          />
        )}
      />
    </div>
  );
};
