import { Download, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { KSheet } from '@/components/form/k-sheet';

interface MembersHeaderProps {
  onImportClick: () => void;
  onAddNewClick: () => void;
  isOpen: boolean;
  closeSheet: () => void;
}

export const MembersHeader = ({
  onImportClick,
  onAddNewClick,
  isOpen,
  closeSheet,
}: MembersHeaderProps) => {
  return (
    <div className="flex items-center justify-between">
      <h2 className="text-2xl font-bold tracking-tight">Members</h2>
      <div className="flex items-center space-x-2">
        <Button variant="outline" className="h-10" onClick={onImportClick}>
          <Download className="mr-2 h-4 w-4" />
          Import
        </Button>
        <Button className="h-10" onClick={onAddNewClick}>
          <Plus className="mr-2 h-4 w-4" />
          Add new
        </Button>
        <KSheet isOpen={isOpen} onClose={closeSheet} title="Add Member">
          <div>TODO: Add member form goes here.</div>
        </KSheet>
      </div>
    </div>
  );
};
