'use client';

import { FormProvider, useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { Globe } from 'lucide-react';
import { toast } from 'sonner';
import { z } from 'zod/v4';

import {
  KFormField,
  KFormFieldType,
} from '@/components/shared/form/k-formfield';
import { KFacebookFillIcon, KInstagramIcon } from '@/components/shared/icons';
import ProfilePictureUploader from '@/components/shared/uploaders/profile-uploader';
import { Button } from '@/components/ui/button';
import { FormControl } from '@/components/ui/form';
import { useGymManagement } from '@/hooks/use-gym-management';
import { useAuth } from '@/providers/auth-provider';
import { CreateGymSchema } from '@/schemas';

type CreateGymData = z.infer<typeof CreateGymSchema>;

type SimpleGymOnboardingProps = {
  onSuccess?: () => void;
};

export const GymOnboardingForm = ({ onSuccess }: SimpleGymOnboardingProps) => {
  const { appUser, refreshAppUser } = useAuth();
  const { createGym, isCreating } = useGymManagement();

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

    const result = await createGym(payload);

    if (result.success) {
      form.reset();
      onSuccess?.();
      // Refresh user data with loading state
      requestAnimationFrame(() => refreshAppUser());
    }
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
              disabled={isCreating}
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
              disabled={isCreating}
              mandetory
            />
            <KFormField
              fieldType={KFormFieldType.INPUT}
              control={form.control}
              name="Location"
              label="Address line 01"
              disabled={isCreating}
              mandetory
            />
            <KFormField
              fieldType={KFormFieldType.PHONE_INPUT}
              control={form.control}
              name="ContactNumber1"
              label="Primary Phone number"
              disabled={isCreating}
              placeholder="(555) 123-4567"
              mandetory
            />
            <KFormField
              fieldType={KFormFieldType.PHONE_INPUT}
              control={form.control}
              name="ContactNumber2"
              label="Secondary Phone number"
              disabled={isCreating}
              placeholder="(555) 123-4567"
            />
            <KFormField
              fieldType={KFormFieldType.INPUT}
              control={form.control}
              name="Email"
              label="Enter email"
              disabled={isCreating}
              mandetory
            />
            <KFormField
              fieldType={KFormFieldType.INPUT}
              control={form.control}
              name="socialLinks.0.url"
              label="Enter website link"
              placeholder="https://www.google.com"
              disabled={isCreating}
              iconSrc={<Globe size={20} />}
            />
            <KFormField
              fieldType={KFormFieldType.INPUT}
              control={form.control}
              name="socialLinks.1.url"
              label="Enter Facebook page link"
              placeholder="https://www.google.com"
              disabled={isCreating}
              iconSrc={<KFacebookFillIcon />}
            />
            <KFormField
              fieldType={KFormFieldType.INPUT}
              control={form.control}
              name="socialLinks.2.url"
              label="Enter instagram link"
              placeholder="https://www.google.com"
              disabled={isCreating}
              iconSrc={<KInstagramIcon width={20} height={20} />}
            />
          </div>
          <Button
            type="submit"
            className="w-full mt-5 h-[48px]"
            disabled={isCreating}
          >
            {isCreating ? 'Creating...' : 'Create Gym'}
          </Button>
        </form>
      </FormProvider>
    </div>
  );
};
