import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import AddUser from './add-user';

interface UsersHeaderProps {
  onAddNewClick: () => void;
  isOpen: boolean;
  closeSheet: () => void;
}

export const UsersHeader = ({
  onAddNewClick,
  isOpen,
  closeSheet,
}: UsersHeaderProps) => {
  return (
    <div className="flex items-center justify-between">
      <h2 className="text-2xl font-bold tracking-tight">User Management</h2>
      <div className="flex items-center space-x-2">
        <Button className="h-10" onClick={onAddNewClick}>
          <Plus className="h-4 w-4" />
          Add new
        </Button>
        <AddUser isOpen={isOpen} closeSheet={closeSheet} />
      </div>
    </div>
  );
};
