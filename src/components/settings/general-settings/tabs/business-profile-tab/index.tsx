'use client';

import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  useTransition,
} from 'react';
import { z } from 'zod/v4';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Controller,
  FormProvider,
  useFieldArray,
  useForm,
} from 'react-hook-form';
import { toast } from 'sonner';
import { Check, Trash2 } from 'lucide-react';

import { useAuth } from '@/providers/auth-provider';
import { updateGym, fetchGymProfilePicture } from '@/services/gym';
import { useAppDialog } from '@/hooks/use-app-dialog';
import { GymDataDetailsSchema } from '@/schemas';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FormControl } from '@/components/ui/form';
import { SubscriptionCard } from '@/components/cards/subscription-card';
import { KFormField, KFormFieldType } from '@/components/form/k-formfield';
import ProfilePictureUploader from '@/components/uploaders/profile-uploader';
import SocialLinkInput from '@/components/form/social-link-input';

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
  const { gymDetails } = useAuth();
  const { showConfirm } = useAppDialog();
  const [isPending, startTransition] = useTransition();
  const [profilePictureUrl, setProfilePictureUrl] = useState<string | null>(
    null
  );
  const [initialDataLoaded, setInitialDataLoaded] = useState(false);
  const [originalSocialLinks, setOriginalSocialLinks] = useState<string[]>([]);

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

  const isSocialLinkDirty = useCallback(
    (index: number) => {
      const currentValue = form.watch(`socialLinks.${index}.url`);
      return originalSocialLinks[index] !== currentValue;
    },
    [form, originalSocialLinks]
  );

  const isNewSocialLink = useCallback(
    (index: number) => {
      return index >= originalSocialLinks.length;
    },
    [originalSocialLinks]
  );

  // Initialize form data
  useEffect(() => {
    if (!gymDetails || initialDataLoaded) return;

    const initializeForm = async () => {
      try {
        // Fetch profile picture
        const response = await fetchGymProfilePicture(gymDetails.id);
        if (response && typeof response === 'object' && 'data' in response) {
          setProfilePictureUrl((response as { data: string }).data);
        }
      } catch {
        setProfilePictureUrl(null);
      }

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

      // Use setTimeout to ensure form state is properly reset
      setTimeout(() => setInitialDataLoaded(true), 100);
    };

    initializeForm();
  }, [gymDetails, form, initialDataLoaded]);

  // Ensure at least one social link field exists
  useEffect(() => {
    if (fields.length === 0) {
      append({ url: '' });
    }
  }, [fields.length, append]);

  // Form submission handler
  const handleSubmit = useCallback(
    async (data: BusinessProfile) => {
      if (!gymDetails?.id) {
        toast.error('No gym selected');
        return;
      }

      startTransition(async () => {
        try {
          const apiData = transformToApiData(
            data,
            gymDetails.id,
            originalSocialLinks.join(',')
          );
          const formData = createFormData(apiData);
          const result = await updateGym(gymDetails.id, formData);

          if (result.error) {
            toast.error(result.error);
          } else {
            form.reset(data);
            toast.success('Profile updated successfully!');
          }
        } catch {
          toast.error('Unable to save, Please try again.');
        }
      });
    },
    [gymDetails?.id, originalSocialLinks, form]
  );

  // Social link handlers
  const handleSaveSocialLink = useCallback(async () => {
    if (!gymDetails?.id) return;

    startTransition(async () => {
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
        const result = await updateGym(gymDetails.id, formData);

        if (result.error) {
          toast.error(result.error);
        } else {
          setOriginalSocialLinks(
            currentData.socialLinks
              ?.filter((link) => link.url.trim())
              .map((link) => link.url) || []
          );
          toast.success('Social links updated successfully!');
        }
      } catch {
        toast.error('Failed to update social links');
      }
    });
  }, [gymDetails?.id, form]);

  const handleDeleteSocialLink = useCallback(
    (index: number) => {
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

          startTransition(async () => {
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
              const result = await updateGym(gymDetails.id, formData);

              if (result.error) {
                toast.error(result.error);
              } else {
                toast.success('Social link removed successfully!');
              }
            } catch {
              toast.error('Failed to remove social link');
            }
          });
        },
      });
    },
    [isNewSocialLink, remove, showConfirm, gymDetails?.id, form]
  );

  const handleDiscard = useCallback(() => {
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
  }, [gymDetails, form]);

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
                    disabled={isPending}
                  >
                    Discard
                  </Button>
                  <Button type="submit" disabled={isPending}>
                    {isPending ? 'Saving...' : 'Save Changes'}
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
                    disabled={isPending}
                  >
                    <Check className="h-5 w-5" />
                  </Button>
                )}
                <Button
                  type="button"
                  onClick={() => handleDeleteSocialLink(index)}
                  className="h-[52px] w-[52px] border border-secondary-blue-400"
                  variant="secondary"
                  disabled={isPending}
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
              disabled={isPending}
            >
              Add Social Link
            </Button>
          </CardContent>
        </Card>
      </form>
    </FormProvider>
  );
}
