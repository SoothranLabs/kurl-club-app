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
      <h4 className="text-[20px] leading-normal tracking-tight font-medium text-white">
        User Management
      </h4>
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
