import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { KSheet } from '@/components/form/k-sheet';
import StaffForm from './staff-forms';

type CreateStaffDetailsProps = {
  closeSheet: () => void;
  isOpen: boolean;
};

export const AddStaff: React.FC<CreateStaffDetailsProps> = ({
  isOpen,
  closeSheet,
}) => {
  const [activeId, setActiveId] = useState<string | null>(null);

  const handleActiveIdChange = (activeId: string) => {
    setActiveId(activeId);
  };

  const footer = (
    <div className="flex justify-between gap-3">
      <div className="flex gap-3">
        <Button
          onClick={closeSheet}
          type="button"
          variant="secondary"
          className="h-[46px] min-w-[90px]"
        >
          Cancel
        </Button>
        <Button
          form={activeId ?? undefined}
          type="submit"
          className="h-[46px] min-w-[73px]"
        >
          Add
        </Button>
      </div>
    </div>
  );

  return (
    <KSheet
      className="w-[582px]"
      isOpen={isOpen}
      onClose={closeSheet}
      title="Add New Staff"
      footer={footer}
    >
      <StaffForm
        onSuccess={closeSheet}
        onActiveIdChange={handleActiveIdChange}
      />
    </KSheet>
  );
};

export default AddStaff;
