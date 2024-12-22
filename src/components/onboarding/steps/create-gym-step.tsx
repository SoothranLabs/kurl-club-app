import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';

import { GymDetailsSchema } from '@/schemas';

import { Button } from '@/components/ui/button';
import { KFormField, KFormFieldType } from '@/components/form/k-formfield';
import { KGlobe } from '@/components/icons';
import { KInstagramIcon } from '@/components/icons';
import { KFacebookIcon } from '@/components/icons';

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
      <div className="mb-6">
        <h2 className="text-[28px] font-medium  font-figtree mb-2 text-Primary-White">
          Add your Gym
        </h2>
        <p className="text-[14px] text-[#F8F8F8]">Fill in your gym details</p>
      </div>

      <FormProvider {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="flex flex-col"
        >
          <div className="space-y-6">
            <KFormField
              fieldType={KFormFieldType.INPUT}
              control={form.control}
              name="gymName"
              label="Enter gym Name"
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
              label=" Enter Email"
            />
            <KFormField
              fieldType={KFormFieldType.INPUT}
              control={form.control}
              name="websiteLink"
              label=" Enter Website URL"
              placeholder="https://www.google.com"
              iconSrc={<KGlobe />}
            />
            <KFormField
              fieldType={KFormFieldType.INPUT}
              control={form.control}
              name="facebookPageLink"
              label="Enter Facebook URL"
              placeholder="https://www.google.com"
              iconSrc={<KFacebookIcon />}
            />
            <KFormField
              fieldType={KFormFieldType.INPUT}
              control={form.control}
              name="instagramLink"
              label="Enter  Instagram URL"
              placeholder="https://www.google.com"
              iconSrc={<KInstagramIcon />}
            />
          </div>
          <Button type="submit" className="w-full mt-4">
            Continue
          </Button>
        </form>
      </FormProvider>
    </div>
  );
};
