import { useState } from 'react';

import { KSheet } from '@/components/shared/form/k-sheet';
import { Button } from '@/components/ui/button';

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
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleActiveIdChange = (activeId: string) => {
    setActiveId(activeId);
  };

  const handleSubmittingChange = (isSubmitting: boolean) => {
    setIsSubmitting(isSubmitting);
  };

  const footer = (
    <div className="flex justify-between gap-3">
      <div className="flex gap-3">
        <Button
          onClick={closeSheet}
          type="button"
          variant="secondary"
          className="h-[46px] min-w-[90px]"
          disabled={isSubmitting}
        >
          Cancel
        </Button>
        <Button
          form={activeId ?? undefined}
          type="submit"
          className="h-[46px] min-w-[73px]"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Adding...' : 'Add'}
        </Button>
      </div>
    </div>
  );

  return (
    <KSheet
      className="w-[450px]"
      isOpen={isOpen}
      onClose={closeSheet}
      title="Add New Staff"
      footer={footer}
    >
      <StaffForm
        onSuccess={closeSheet}
        onActiveIdChange={handleActiveIdChange}
        onSubmittingChange={handleSubmittingChange}
      />
    </KSheet>
  );
};

export default AddStaff;
