'use client';

import { useTransition } from 'react';
import { z } from 'zod/v4';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { Globe } from 'lucide-react';

import { useAuth } from '@/providers/auth-provider';
import { CreateGymSchema } from '@/schemas';
import { createGym } from '@/services/gym';

import { Button } from '@/components/ui/button';
import { KFormField, KFormFieldType } from '@/components/form/k-formfield';
import { KFacebookFillIcon, KInstagramIcon } from '@/components/icons';
import ProfilePictureUploader from '@/components/uploaders/profile-uploader';
import { FormControl } from '@/components/ui/form';

type CreateGymStepData = z.infer<typeof CreateGymSchema>;

type CreateGymStepProps = {
  onSubmit: (data: CreateGymStepData) => void;
};

export const CreateGymStep = ({ onSubmit }: CreateGymStepProps) => {
  const [isPending, startTransition] = useTransition();
  const { firebaseUser } = useAuth();

  const form = useForm<CreateGymStepData>({
    resolver: zodResolver(CreateGymSchema),
    defaultValues: {
      GymName: '',
      Location: '',
      ContactNumber1: '',
      Email: '',
      ProfilePicture: null,
      SocialLink1: '',
      SocialLink2: '',
      SocialLink3: '',
    },
  });

  const handleSubmit = async (data: CreateGymStepData) => {
    if (!firebaseUser?.uid) {
      toast.error('User is not authenticated.');
      return;
    }

    const payload = {
      ...data,
      gymAdminId: firebaseUser.uid,
    };

    startTransition(async () => {
      try {
        const response = await createGym(payload);

        if (response.success) {
          toast.success(response.success);
          onSubmit(data);
        } else {
          console.error(response.error);
        }
      } catch (error) {
        toast.error(`Error creating gym, please try again!, ${error}`);
      }
    });
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
          <div className="space-y-4 overflow-y-auto max-h-[46vh] mt-4 p-1 no-scrollbar">
            <KFormField
              fieldType={KFormFieldType.SKELETON}
              control={form.control}
              name="ProfilePicture"
              disabled={isPending}
              renderSkeleton={(field) => (
                <FormControl>
                  <ProfilePictureUploader
                    files={field.value as File | null}
                    onChange={(file) => field.onChange(file)}
                  />
                </FormControl>
              )}
            />
            <KFormField
              fieldType={KFormFieldType.INPUT}
              control={form.control}
              name="GymName"
              label="Enter gym name"
              disabled={isPending}
              mandetory
            />
            <KFormField
              fieldType={KFormFieldType.INPUT}
              control={form.control}
              name="Location"
              label="Address line 01"
              disabled={isPending}
              mandetory
            />
            <KFormField
              fieldType={KFormFieldType.PHONE_INPUT}
              control={form.control}
              name="ContactNumber1"
              label="Primary Phone number"
              disabled={isPending}
              placeholder="(555) 123-4567"
            />
            <KFormField
              fieldType={KFormFieldType.INPUT}
              control={form.control}
              name="Email"
              label="Enter email"
              disabled={isPending}
              mandetory
            />
            <KFormField
              fieldType={KFormFieldType.INPUT}
              control={form.control}
              name="SocialLink1"
              label="Enter website link"
              placeholder="https://www.google.com"
              disabled={isPending}
              iconSrc={<Globe size={20} />}
            />
            <KFormField
              fieldType={KFormFieldType.INPUT}
              control={form.control}
              name="SocialLink2"
              label="Enter Facebook page link"
              placeholder="https://www.google.com"
              disabled={isPending}
              iconSrc={<KFacebookFillIcon />}
            />
            <KFormField
              fieldType={KFormFieldType.INPUT}
              control={form.control}
              name="SocialLink3"
              label="Enter instagram link"
              placeholder="https://www.google.com"
              disabled={isPending}
              iconSrc={<KInstagramIcon width={20} height={20} />}
            />
          </div>
          <Button
            type="submit"
            className="w-full mt-5 h-[48px]"
            disabled={isPending}
          >
            {isPending ? 'Creating...' : 'Create'}
          </Button>
        </form>
      </FormProvider>
    </div>
  );
};
