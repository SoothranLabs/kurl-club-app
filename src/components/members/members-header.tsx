import { Download, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import AddFrom from './add-member';

interface MembersHeaderProps {
  onImportClick: () => void;
  onAddNewClick: () => void;
  isOpen: boolean;
  closeSheet: () => void;
  gymId?: number;
}

export const MembersHeader = ({
  onImportClick,
  onAddNewClick,
  isOpen,
  closeSheet,
  gymId,
}: MembersHeaderProps) => {
  return (
    <div className="flex items-center justify-between">
      <h2 className="text-2xl font-bold tracking-tight">Members</h2>
      <div className="flex items-center space-x-2">
        <Button variant="outline" className="h-10" onClick={onImportClick}>
          <Download className=" h-4 w-4" />
          Import
        </Button>
        <Button className="h-10" onClick={onAddNewClick}>
          <Plus className="h-4 w-4" />
          Add new
        </Button>
        <AddFrom isOpen={isOpen} closeSheet={closeSheet} gymId={gymId} />
      </div>
    </div>
  );
};
