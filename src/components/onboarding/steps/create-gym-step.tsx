import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';

import { GymDetailsSchema } from '@/schemas';

import { Button } from '@/components/ui/button';
import { KFormField, KFormFieldType } from '@/components/form/k-formfield';

type CreateGymStepData = z.infer<typeof GymDetailsSchema>;

type CreateGymStepProps = {
  onSubmit: (data: CreateGymStepData) => void;
};

export const CreateGymStep = ({ onSubmit }: CreateGymStepProps) => {
  const form = useForm<CreateGymStepData>({
    resolver: zodResolver(GymDetailsSchema),
    defaultValues: {
      gymName: '',
      addressLine1: '',
      addressLine2: '',
      primaryPhone: '',
      secondaryPhone: '',
      email: '',
      websiteLink: '',
      facebookPageLink: '',
      instagramLink: '',
    },
  });

  const handleSubmit = (data: CreateGymStepData) => {
    console.log('Gym details submitted:', data);
    onSubmit(data);
  };

  return (
    <div>
      <div>
        <h2 className="text-xl font-semibold mb-2">Add your Gym</h2>
        <p className="text-sm text-gray-400">Fill in your gym details</p>
      </div>

      <FormProvider {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="flex flex-col"
        >
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
              name="addressLine1"
              label="Address Line 1"
            />
            <KFormField
              fieldType={KFormFieldType.TEXTAREA}
              control={form.control}
              name="addressLine2"
              label="Address Line 2"
            />
            <KFormField
              fieldType={KFormFieldType.PHONE_INPUT}
              control={form.control}
              name="primaryPhone"
              label="Primary Phone number"
              placeholder="(555) 123-4567"
            />
            <KFormField
              fieldType={KFormFieldType.PHONE_INPUT}
              control={form.control}
              name="secondaryPhone"
              label="Secondary Phone number"
              placeholder="(555) 123-4567"
            />
            <KFormField
              fieldType={KFormFieldType.INPUT}
              control={form.control}
              name="email"
              label="Email"
            />
            <KFormField
              fieldType={KFormFieldType.INPUT}
              control={form.control}
              name="websiteLink"
              label="Website URL"
            />
            <KFormField
              fieldType={KFormFieldType.INPUT}
              control={form.control}
              name="facebookPageLink"
              label="Facebook URL"
            />
            <KFormField
              fieldType={KFormFieldType.INPUT}
              control={form.control}
              name="instagramLink"
              label="Instagram URL"
            />
          </div>
          <Button type="submit" className="w-full mt-4">
            Save Gym Details
          </Button>
        </form>
      </FormProvider>
    </div>
  );
};
