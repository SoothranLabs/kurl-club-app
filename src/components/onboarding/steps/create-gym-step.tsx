import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';

import { GymDetailsSchema } from '@/schemas';

import { Button } from '@/components/ui/button';
import { KFormField, KFormFieldType } from '@/components/form/k-formfield';
import { KFacebookFillIcon, KInstagramIcon } from '@/components/icons';
import { Globe } from 'lucide-react';
import ProfilePictureUploader from '@/components/uploaders/profile-uploader';
import { FormControl } from '@/components/ui/form';

type CreateGymStepData = z.infer<typeof GymDetailsSchema>;

type CreateGymStepProps = {
  onSubmit: (data: CreateGymStepData) => void;
};

export const CreateGymStep = ({ onSubmit }: CreateGymStepProps) => {
  const form = useForm<CreateGymStepData>({
    resolver: zodResolver(GymDetailsSchema),
    defaultValues: {
      gymName: '',
      profilepicture: undefined,
      buildingName: '',
      city: '',
      primaryPhone: '',
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
      <div className="mb-3">
        <h4 className="text-[28px] leading-normal font-medium  mb-4 text-White ">
          Add your Gym
        </h4>
        <p className="text-[15px] leading-normal font-normal text-white">
          Fill in your gym details
        </p>
      </div>

      <FormProvider {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="flex flex-col"
        >
          <div className="space-y-4 overflow-y-auto max-h-[300px] mt-4 p-1">
            <KFormField
              fieldType={KFormFieldType.SKELETON}
              control={form.control}
              name="profilepicture"
              renderSkeleton={(field) => (
                <FormControl>
                  <ProfilePictureUploader
                    files={
                      field.value instanceof Uint8Array ? field.value : null
                    }
                    onChange={field.onChange}
                  />
                </FormControl>
              )}
            />
            <KFormField
              fieldType={KFormFieldType.INPUT}
              control={form.control}
              name="gymName"
              label="Enter gym name"
              mandetory
            />
            <KFormField
              fieldType={KFormFieldType.INPUT}
              control={form.control}
              name="buildingName"
              label="Building name"
              mandetory
            />
            <KFormField
              fieldType={KFormFieldType.INPUT}
              control={form.control}
              name="city"
              label="City"
              mandetory
            />
            <KFormField
              fieldType={KFormFieldType.PHONE_INPUT}
              control={form.control}
              name="primaryPhone"
              label="Primary Phone number"
              placeholder="(555) 123-4567"
              // mandetory
            />
            <KFormField
              fieldType={KFormFieldType.INPUT}
              control={form.control}
              name="email"
              label="Enter email"
              mandetory
            />
            <KFormField
              fieldType={KFormFieldType.INPUT}
              control={form.control}
              name="websiteLink"
              label="Enter website link"
              placeholder="https://www.google.com"
              iconSrc={<Globe size={20} />}
            />
            <KFormField
              fieldType={KFormFieldType.INPUT}
              control={form.control}
              name="facebookPageLink"
              label="Enter Facebook page link"
              placeholder="https://www.google.com"
              iconSrc={<KFacebookFillIcon />}
            />
            <KFormField
              fieldType={KFormFieldType.INPUT}
              control={form.control}
              name="instagramLink"
              label="Enter instagram link"
              placeholder="https://www.google.com"
              iconSrc={<KInstagramIcon width={20} height={20} />}
            />
          </div>
          {/* Add button disabled true if there is no data in input phone number */}
          <Button
            disabled={false}
            type="submit"
            className="w-full mt-5 h-[48px]"
          >
            Continue
          </Button>
        </form>
      </FormProvider>
    </div>
  );
};
