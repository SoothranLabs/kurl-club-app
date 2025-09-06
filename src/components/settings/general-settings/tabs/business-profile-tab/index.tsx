'use client';

import { useEffect, useState } from 'react';
import { z } from 'zod/v4';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Controller,
  FormProvider,
  useFieldArray,
  useForm,
} from 'react-hook-form';
import { toast } from 'sonner';
import { Trash2 } from 'lucide-react';

import { useAuth } from '@/providers/auth-provider';
import { updateGym, fetchGymProfilePicture } from '@/services/gym';

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

import { GymDataDetailsSchema } from '@/schemas';

type BusinessProfile = z.infer<typeof GymDataDetailsSchema>;

const defaultProfile: BusinessProfile = {
  ProfilePicture: null,
  GymName: '',
  Phone: '',
  Email: '',
  Address: '',
  socialLinks: [{ url: '' }],
};

export function BusinessProfileTab() {
  const { gymDetails } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [profilePictureUrl, setProfilePictureUrl] = useState<string | null>(
    null
  );
  const [initialDataLoaded, setInitialDataLoaded] = useState(false);

  const form = useForm<BusinessProfile>({
    resolver: zodResolver(GymDataDetailsSchema),
    defaultValues: defaultProfile,
    mode: 'onSubmit',
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'socialLinks',
  });

  useEffect(() => {
    if (fields.length === 0) {
      append({ url: '' });
    }
  }, [fields.length, append]);

  useEffect(() => {
    if (gymDetails && !initialDataLoaded) {
      const loadData = async () => {
        // Fetch profile picture
        try {
          const response = await fetchGymProfilePicture(gymDetails.id);
          if (response && typeof response === 'object' && 'data' in response) {
            setProfilePictureUrl((response as { data: string }).data);
          } else {
            setProfilePictureUrl(null);
          }
        } catch {
          setProfilePictureUrl(null);
        }

        const formData = {
          ProfilePicture: null,
          GymName: gymDetails.gymName,
          Phone: gymDetails.contactNumber1,
          Email: gymDetails.email,
          Address: gymDetails.location,
          socialLinks:
            [
              { url: gymDetails.socialLink1 || '' },
              { url: gymDetails.socialLink2 || '' },
              { url: gymDetails.socialLink3 || '' },
            ].filter((link) => link.url.trim()).length > 0
              ? [
                  { url: gymDetails.socialLink1 || '' },
                  { url: gymDetails.socialLink2 || '' },
                  { url: gymDetails.socialLink3 || '' },
                ].filter((link) => link.url.trim())
              : [{ url: '' }],
        };

        // Reset form and clear dirty state
        form.reset(formData, { keepDefaultValues: false });

        // Small delay to ensure form state is properly reset
        setTimeout(() => {
          setInitialDataLoaded(true);
        }, 100);
      };

      loadData();
    }
  }, [gymDetails, form, initialDataLoaded]);

  const isDirty = form.formState.isDirty;

  const handleSubmit = async (data: BusinessProfile) => {
    if (!gymDetails?.id) {
      toast.error('No gym selected');
      return;
    }

    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append('GymName', data.GymName);
      formData.append('ContactNumber1', data.Phone);
      formData.append('Email', data.Email);
      formData.append('Location', data.Address);

      // Add social links
      if (data.socialLinks) {
        const validSocialLinks = data.socialLinks
          .filter((link) => link.url.trim())
          .map((link) => link.url);
        formData.append('SocialLinks', JSON.stringify(validSocialLinks));
      }

      if (data.ProfilePicture instanceof File) {
        formData.append('ProfilePicture', data.ProfilePicture);
      }

      if (gymDetails?.gymAdminId) {
        formData.append('GymAdminId', gymDetails.gymAdminId.toString());
      }

      const result = await updateGym(gymDetails.id, formData);

      if (result.error) {
        toast.error(result.error);
      } else {
        form.reset(data);
        toast.success('Profile updated successfully!');
      }
    } catch {
      toast.error('Unable to save, Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDiscard = () => {
    if (gymDetails) {
      const formData = {
        ProfilePicture: null,
        GymName: gymDetails.gymName,
        Phone: gymDetails.contactNumber1,
        Email: gymDetails.email,
        Address: gymDetails.location,
        socialLinks:
          [
            { url: gymDetails.socialLink1 || '' },
            { url: gymDetails.socialLink2 || '' },
            { url: gymDetails.socialLink3 || '' },
          ].filter((link) => link.url.trim()).length > 0
            ? [
                { url: gymDetails.socialLink1 || '' },
                { url: gymDetails.socialLink2 || '' },
                { url: gymDetails.socialLink3 || '' },
              ].filter((link) => link.url.trim())
            : [{ url: '' }],
      };
      form.reset(formData);
    }
  };

  return (
    <FormProvider {...form}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const formData = form.getValues();
          handleSubmit(formData);
        }}
        className="space-y-6"
      >
        {/* Basic Details */}
        <Card className="bg-secondary-blue-500 border-primary-blue-400 py-2">
          <CardHeader className="pb-4">
            <div className="flex items-start justify-between gap-4">
              <div>
                <CardTitle className="text-white">Basic details</CardTitle>
                <CardDescription className="text-secondary-blue-200 text-[15px]">
                  Manage your gym&apos;s basic information and contact details
                </CardDescription>
              </div>
              {isDirty && initialDataLoaded ? (
                <div
                  className="flex items-center gap-2 animate-in fade-in zoom-in-95 duration-200"
                  aria-live="polite"
                >
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={handleDiscard}
                    disabled={isLoading}
                  >
                    Discard
                  </Button>
                  <Button type="submit" disabled={isLoading}>
                    {isLoading ? 'Saving...' : 'Save Changes'}
                  </Button>
                </div>
              ) : null}
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
                    onChange={(file) => field.onChange(file)}
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

        {/* Subscription */}
        <SubscriptionCard variant="premium" />

        {/* Social Links */}
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
                        label={`Enter Social Link ${index + 1}`}
                        placeholder="https://www.google.com"
                        className="bg-primary-blue-400"
                      />
                    )}
                  />
                </div>
                {index > 0 && (
                  <Button
                    type="button"
                    onClick={() => remove(index)}
                    className="h-[52px] w-[52px] border border-secondary-blue-400"
                    variant="secondary"
                  >
                    <Trash2 />
                  </Button>
                )}
              </div>
            ))}

            <Button
              type="button"
              variant="secondary"
              className="hover:bg-primary-blue-500"
              onClick={() => append({ url: '' })}
            >
              Add Social Link
            </Button>
          </CardContent>
        </Card>
      </form>
    </FormProvider>
  );
}
