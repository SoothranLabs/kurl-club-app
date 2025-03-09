'use client';

import { useEffect, useState } from 'react';

import { StaffType } from '@/types/staff';

import { KSelect } from '@/components/form/k-select';
import TrainerForm from './trainer-form';
import AdministratorForm from './administrator-form';

interface StaffFormProps {
  onSuccess: () => void;
  onActiveIdChange: (activeId: string) => void;
}

export default function StaffForm({
  onSuccess,
  onActiveIdChange,
}: StaffFormProps) {
  const [staffType, setStaffType] = useState<StaffType>('trainer');

  const activeId =
    staffType === 'trainer' ? 'trainer-form' : 'administrator-form';

  useEffect(() => {
    onActiveIdChange(activeId);
  }, [activeId, onActiveIdChange]);

  const handleStaffTypeChange = (value: StaffType) => {
    setStaffType(value);
  };

  const handleSubmitSuccess = () => {
    onSuccess();
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <KSelect
          label="Staff Type"
          value={staffType}
          onValueChange={(value) => handleStaffTypeChange(value as StaffType)}
          options={[
            { label: 'Trainer', value: 'trainer' },
            { label: 'Administrator', value: 'administrator' },
          ]}
          className="!border-white !rounded-lg"
        />
      </div>

      {staffType === 'trainer' && (
        <TrainerForm onSuccess={handleSubmitSuccess} />
      )}

      {staffType === 'administrator' && (
        <AdministratorForm onSuccess={handleSubmitSuccess} />
      )}
    </div>
  );
}
