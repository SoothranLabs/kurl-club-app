import { UseFormReturn } from 'react-hook-form';
import { MultiStepFormData } from '@/types';
import { KFormField, KFormFieldType } from '../form/k-formfield';
import { Button } from '@/components/ui/button';

interface AddTrainerProps {
  form: UseFormReturn<MultiStepFormData>;
}
export function AddTrainer({ form }: AddTrainerProps) {
  return (
    <div>
      <div>
        <h2 className="text-xl font-semibold mb-2">Add your Trainers</h2>
        <p className="text-sm text-gray-400">
          Add your buddies that make your gym awesome!
        </p>
      </div>

      <div className="space-y-1">
        <KFormField
          fieldType={KFormFieldType.INPUT}
          control={form.control}
          name="gymName"
          label="Gym name"
        />
        <Button>Invite</Button>
        <KFormField
          fieldType={KFormFieldType.INPUT}
          control={form.control}
          name="gymName"
          label="Gym name"
        />
        <Button>Invite</Button>

        <KFormField
          fieldType={KFormFieldType.INPUT}
          control={form.control}
          name="gymName"
          label="Gym name"
        />
        <Button>Invite</Button>
      </div>
    </div>
  );
}
