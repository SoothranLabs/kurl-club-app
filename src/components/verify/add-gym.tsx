import { UseFormReturn } from 'react-hook-form';
import { MultiStepFormData } from '@/types';
import { KFormField, KFormFieldType } from '../form/k-formfield';

interface AddGymProps {
  form: UseFormReturn<MultiStepFormData>;
}
export function AddGym({ form }: AddGymProps) {
  return (
    <div>
      <div>
        <h2 className="text-xl font-semibold mb-2">Add your Gym</h2>
        <p className="text-sm text-gray-400">Fill in your gym details</p>
      </div>

      <div className="space-y-1">
        <KFormField
          fieldType={KFormFieldType.INPUT}
          control={form.control}
          name="gymName"
          label="Gym Name"
        />
        <KFormField
          fieldType={KFormFieldType.TEXTAREA}
          control={form.control}
          name="gymName"
          label="Address"
        />
        <KFormField
          fieldType={KFormFieldType.PHONE_INPUT}
          control={form.control}
          name="phone"
          label="Phone number"
          placeholder="(555) 123-4567"
        />
        <KFormField
          fieldType={KFormFieldType.PHONE_INPUT}
          control={form.control}
          name="phone"
          label="Phone number"
          placeholder="(555) 123-4567"
        />
        <KFormField
          fieldType={KFormFieldType.INPUT}
          control={form.control}
          name="gymName"
          label="email"
        />
      </div>
    </div>
  );
}
