import { Plus } from 'lucide-react';

import { Button } from '@/components/ui/button';

import AddStaff from './add-staff';

interface StaffsHeaderProps {
  onAddNewClick: () => void;
  isOpen: boolean;
  closeSheet: () => void;
}

export const StaffsHeader = ({
  onAddNewClick,
  isOpen,
  closeSheet,
}: StaffsHeaderProps) => {
  return (
    <div className="flex items-center justify-between">
      <h4 className="text-[20px] leading-normal tracking-tight font-medium text-white">
        Staff Management
      </h4>
      <div className="flex items-center space-x-2">
        <Button className="h-10" onClick={onAddNewClick}>
          <Plus className="h-4 w-4" />
          Add new
        </Button>
        <AddStaff isOpen={isOpen} closeSheet={closeSheet} />
      </div>
    </div>
  );
};
