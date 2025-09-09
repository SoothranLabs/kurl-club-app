'use client';

import { useTransition } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { Globe } from 'lucide-react';
import { toast } from 'sonner';
import { z } from 'zod/v4';

import { KFormField, KFormFieldType } from '@/components/form/k-formfield';
import { KFacebookFillIcon, KInstagramIcon } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { FormControl } from '@/components/ui/form';
import ProfilePictureUploader from '@/components/uploaders/profile-uploader';
import { useAuth } from '@/providers/auth-provider';
import { CreateGymSchema } from '@/schemas';
import { createGym } from '@/services/gym';

type CreateGymData = z.infer<typeof CreateGymSchema>;

type SimpleGymOnboardingProps = {
  onSuccess?: () => void;
};

export const GymOnboardingForm = ({ onSuccess }: SimpleGymOnboardingProps) => {
  const [isPending, startTransition] = useTransition();
  const { appUser } = useAuth();

  const form = useForm<CreateGymData>({
    resolver: zodResolver(CreateGymSchema),
    defaultValues: {
      GymName: '',
      Location: '',
      ContactNumber1: '',
      ContactNumber2: '',
      Email: '',
      ProfilePicture: null,
      socialLinks: [{ url: '' }, { url: '' }, { url: '' }],
    },
  });

  const handleSubmit = async (data: CreateGymData) => {
    if (!appUser?.userId) {
      toast.error('User is not authenticated.');
      return;
    }

    const socialLinks =
      data.socialLinks
        ?.map((link) => link.url)
        .filter((url) => url && url.trim())
        .join(', ') || '';

    const payload = {
      GymName: data.GymName,
      Location: data.Location,
      ContactNumber1: data.ContactNumber1,
      ContactNumber2: data.ContactNumber2,
      Email: data.Email,
      SocialLinks: socialLinks,
      ProfilePicture: data.ProfilePicture,
      GymAdminId: appUser.userId.toString(),
    };

    startTransition(async () => {
      try {
        const response = await createGym(payload);

        if (response.success) {
          toast.success(response.success);
          // Trigger revalidation and close modal
          window.location.reload();
          onSuccess?.();
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
        <h4 className="text-[28px] leading-normal font-medium mb-4 text-White">
          Add your Gym
        </h4>
        <p className="text-[15px] leading-normal font-normal text-white">
          Fill in your gym details to get started
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
              mandetory
            />
            <KFormField
              fieldType={KFormFieldType.PHONE_INPUT}
              control={form.control}
              name="ContactNumber2"
              label="Secondary Phone number"
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
              name="socialLinks.0.url"
              label="Enter website link"
              placeholder="https://www.google.com"
              disabled={isPending}
              iconSrc={<Globe size={20} />}
            />
            <KFormField
              fieldType={KFormFieldType.INPUT}
              control={form.control}
              name="socialLinks.1.url"
              label="Enter Facebook page link"
              placeholder="https://www.google.com"
              disabled={isPending}
              iconSrc={<KFacebookFillIcon />}
            />
            <KFormField
              fieldType={KFormFieldType.INPUT}
              control={form.control}
              name="socialLinks.2.url"
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
            {isPending ? 'Creating...' : 'Create Gym'}
          </Button>
        </form>
      </FormProvider>
    </div>
  );
};
