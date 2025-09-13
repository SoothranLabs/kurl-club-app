'use client';

import { useEffect, useMemo, useState } from 'react';
import {
  Controller,
  FormProvider,
  useFieldArray,
  useForm,
} from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { Check, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { z } from 'zod/v4';

import { SubscriptionCard } from '@/components/shared/cards/subscription-card';
import {
  KFormField,
  KFormFieldType,
} from '@/components/shared/form/k-formfield';
import SocialLinkInput from '@/components/shared/form/social-link-input';
import ProfilePictureUploader from '@/components/shared/uploaders/profile-uploader';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { FormControl } from '@/components/ui/form';
import { useAppDialog } from '@/hooks/use-app-dialog';
import {
  useGymManagement,
  useGymProfilePicture,
} from '@/hooks/use-gym-management';
import { useAuth } from '@/providers/auth-provider';
import { GymDataDetailsSchema } from '@/schemas';

type BusinessProfile = z.infer<typeof GymDataDetailsSchema>;

const DEFAULT_PROFILE: BusinessProfile = {
  ProfilePicture: null,
  GymName: '',
  Phone: '',
  Email: '',
  Address: '',
  socialLinks: [{ url: '' }],
} as const;

// Utility functions
const parseSocialLinks = (socialLinks?: string | null) => {
  if (!socialLinks) return [{ url: '' }];
  const links = socialLinks
    .split(',')
    .filter((link) => link.trim())
    .map((url) => ({ url: url.trim() }));
  return links.length > 0 ? links : [{ url: '' }];
};

const transformToApiData = (
  data: BusinessProfile,
  gymId: number,
  socialLinks: string
) => ({
  Id: gymId,
  GymName: data.GymName,
  Location: data.Address,
  ContactNumber1: data.Phone,
  Email: data.Email,
  SocialLinks: socialLinks,
  ProfilePicture: data.ProfilePicture,
});

const createFormData = (apiData: Record<string, unknown>) => {
  const formData = new FormData();
  Object.entries(apiData).forEach(([key, value]) => {
    if (key === 'ProfilePicture' && value instanceof File) {
      formData.append(key, value);
    } else if (value !== null && value !== undefined) {
      formData.append(key, String(value));
    }
  });
  return formData;
};

export function BusinessProfileTab() {
  const { gymDetails, fetchGymDetails } = useAuth();
  const { showConfirm } = useAppDialog();
  const { updateGym, isUpdating } = useGymManagement();
  const { data: profilePictureData } = useGymProfilePicture(
    gymDetails?.id || 0
  );
  const [initialDataLoaded, setInitialDataLoaded] = useState(false);
  const [originalSocialLinks, setOriginalSocialLinks] = useState<string[]>([]);

  const profilePictureUrl =
    profilePictureData &&
    typeof profilePictureData === 'object' &&
    'data' in profilePictureData
      ? (profilePictureData as { data: string }).data
      : null;

  const form = useForm<BusinessProfile>({
    resolver: zodResolver(GymDataDetailsSchema),
    defaultValues: DEFAULT_PROFILE,
    mode: 'onSubmit',
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'socialLinks',
  });

  // Memoized computed values
  const isDirty = useMemo(() => {
    const { isDirty, dirtyFields } = form.formState;
    return (
      isDirty &&
      (dirtyFields.GymName ||
        dirtyFields.Phone ||
        dirtyFields.Email ||
        dirtyFields.Address ||
        dirtyFields.ProfilePicture)
    );
  }, [form.formState]);

  const isSocialLinkDirty = (index: number) => {
    const currentValue = form.watch(`socialLinks.${index}.url`);
    return originalSocialLinks[index] !== currentValue;
  };

  const isNewSocialLink = (index: number) => {
    return index >= originalSocialLinks.length;
  };

  // Initialize form data
  useEffect(() => {
    if (!gymDetails || initialDataLoaded) return;

    const socialLinksArray = parseSocialLinks(gymDetails.socialLinks);
    const originalLinks = gymDetails.socialLinks
      ? gymDetails.socialLinks.split(',').filter((link) => link.trim())
      : [];

    setOriginalSocialLinks(originalLinks);

    const formData = {
      ProfilePicture: null,
      GymName: gymDetails.gymName,
      Phone: gymDetails.contactNumber1,
      Email: gymDetails.email,
      Address: gymDetails.location,
      socialLinks: socialLinksArray,
    };

    form.reset(formData, { keepDefaultValues: false });
    setTimeout(() => setInitialDataLoaded(true), 100);
  }, [gymDetails, form, initialDataLoaded]);

  // Ensure at least one social link field exists
  useEffect(() => {
    if (fields.length === 0) {
      append({ url: '' });
    }
  }, [fields.length, append]);

  // Form submission handler
  const handleSubmit = async (data: BusinessProfile) => {
    if (!gymDetails?.id) {
      toast.error('No gym selected');
      return;
    }

    try {
      const apiData = transformToApiData(
        data,
        gymDetails.id,
        originalSocialLinks.join(',')
      );
      const formData = createFormData(apiData);
      await updateGym({ gymId: gymDetails.id, data: formData });
      await fetchGymDetails(gymDetails.id);
      form.reset(data);
    } catch {
      // Error handled by hook
    }
  };

  // Social link handlers
  const handleSaveSocialLink = async () => {
    if (!gymDetails?.id) return;

    try {
      const currentData = form.getValues();
      const validSocialLinks =
        currentData.socialLinks
          ?.filter((link) => link.url.trim())
          .map((link) => link.url)
          .join(',') || '';

      const apiData = transformToApiData(
        currentData,
        gymDetails.id,
        validSocialLinks
      );
      const formData = createFormData(apiData);
      await updateGym({ gymId: gymDetails.id, data: formData });
      await fetchGymDetails(gymDetails.id);
      setOriginalSocialLinks(
        currentData.socialLinks
          ?.filter((link) => link.url.trim())
          .map((link) => link.url) || []
      );
    } catch {
      toast.error('Failed to update social links');
    }
  };

  const handleDeleteSocialLink = (index: number) => {
    if (isNewSocialLink(index)) {
      remove(index);
      return;
    }

    showConfirm({
      title: 'Delete Social Link',
      description:
        'Are you sure you want to delete this social link? This action cannot be undone.',
      variant: 'destructive',
      onConfirm: async () => {
        if (!gymDetails?.id) return;

        remove(index);

        try {
          const currentData = form.getValues();
          const validSocialLinks =
            currentData.socialLinks
              ?.filter((link) => link.url.trim())
              .map((link) => link.url)
              .join(',') || '';

          const apiData = transformToApiData(
            currentData,
            gymDetails.id,
            validSocialLinks
          );
          const formData = createFormData(apiData);
          await updateGym({ gymId: gymDetails.id, data: formData });
          await fetchGymDetails(gymDetails.id);
        } catch {
          toast.error('Failed to remove social link');
        }
      },
    });
  };

  const handleDiscard = () => {
    if (!gymDetails) return;

    const socialLinksArray = parseSocialLinks(gymDetails.socialLinks);
    const formData = {
      ProfilePicture: null,
      GymName: gymDetails.gymName,
      Phone: gymDetails.contactNumber1,
      Email: gymDetails.email,
      Address: gymDetails.location,
      socialLinks: socialLinksArray,
    };
    form.reset(formData);
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        {/* Basic Details Card */}
        <Card className="bg-secondary-blue-500 border-primary-blue-400 py-2">
          <CardHeader className="pb-4">
            <div className="flex items-start justify-between gap-4">
              <div>
                <CardTitle className="text-white">Basic details</CardTitle>
                <CardDescription className="text-secondary-blue-200 text-[15px]">
                  Manage your gym&apos;s basic information and contact details
                </CardDescription>
              </div>
              {isDirty && initialDataLoaded && (
                <div
                  className="flex items-center gap-2 animate-in fade-in zoom-in-95 duration-200"
                  aria-live="polite"
                >
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={handleDiscard}
                    disabled={isUpdating}
                  >
                    Discard
                  </Button>
                  <Button type="submit" disabled={isUpdating}>
                    {isUpdating ? 'Saving...' : 'Save Changes'}
                  </Button>
                </div>
              )}
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <KFormField
              fieldType={KFormFieldType.SKELETON}
              control={form.control}
              name="ProfilePicture"
              renderSkeleton={(field) => (
                <FormControl>
                  <ProfilePictureUploader
                    files={field.value as File | null}
                    onChange={field.onChange}
                    existingImageUrl={profilePictureUrl}
                  />
                </FormControl>
              )}
            />

            <KFormField
              fieldType={KFormFieldType.INPUT}
              control={form.control}
              name="GymName"
              label="Gym name"
              className="bg-primary-blue-400"
              mandetory
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <KFormField
                fieldType={KFormFieldType.PHONE_INPUT}
                control={form.control}
                name="Phone"
                label="Contact number"
                placeholder="(555) 123-4567"
                className="input-phone-primary"
                mandetory
              />
              <KFormField
                fieldType={KFormFieldType.INPUT}
                control={form.control}
                name="Email"
                label="Enter email"
                className="bg-primary-blue-400"
                mandetory
              />
            </div>

            <KFormField
              fieldType={KFormFieldType.INPUT}
              control={form.control}
              name="Address"
              label="Address"
              className="bg-primary-blue-400"
              mandetory
            />
          </CardContent>
        </Card>

        {/* Subscription Card */}
        <SubscriptionCard variant="premium" />

        {/* Social Links Card */}
        <Card className="bg-secondary-blue-500 border-primary-blue-400 py-2">
          <CardHeader>
            <CardTitle className="text-white">Social Links</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {fields.map((field, index) => (
              <div key={field.id} className="flex items-end gap-3">
                <div className="w-full">
                  <Controller
                    control={form.control}
                    name={`socialLinks.${index}.url`}
                    render={({ field }) => (
                      <SocialLinkInput
                        value={field.value}
                        onChange={field.onChange}
                        label="Social Link"
                        placeholder="https://www.google.com"
                        className="bg-primary-blue-400"
                      />
                    )}
                  />
                </div>
                {(isSocialLinkDirty(index) || isNewSocialLink(index)) && (
                  <Button
                    type="button"
                    onClick={handleSaveSocialLink}
                    className="h-[52px] w-[52px] border border-secondary-blue-400"
                    variant="secondary"
                    disabled={isUpdating}
                  >
                    <Check className="h-5 w-5" />
                  </Button>
                )}
                <Button
                  type="button"
                  onClick={() => handleDeleteSocialLink(index)}
                  className="h-[52px] w-[52px] border border-secondary-blue-400"
                  variant="secondary"
                  disabled={isUpdating}
                >
                  <Trash2 className="h-5 w-5" />
                </Button>
              </div>
            ))}

            <Button
              type="button"
              variant="secondary"
              className="hover:bg-primary-blue-500"
              onClick={() => append({ url: '' })}
              disabled={isUpdating}
            >
              Add Social Link
            </Button>
          </CardContent>
        </Card>
      </form>
    </FormProvider>
  );
}
