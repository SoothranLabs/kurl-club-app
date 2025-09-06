'use client';

import { useEffect } from 'react';
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
  GymName: "Gold's gym",
  Phone: '+918789456325',
  Email: 'goldsgym@gmail,com',
  Address: "Gold's gym, Punnapra arcade, Nanminda-Balussery rd, Kakkur",
  socialLinks: [{ url: '' }],
};

export function BusinessProfileTab() {
  const form = useForm<BusinessProfile>({
    resolver: zodResolver(GymDataDetailsSchema),
    defaultValues: defaultProfile,
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

  const isDirty = form.formState.isDirty;

  const handleSubmit = (data: BusinessProfile) => {
    try {
      localStorage.setItem('businessProfile', JSON.stringify(data));
      form.reset(data);
      toast.success('Profile updated.');
    } catch {
      toast.error('Unable to save, Please try again.');
    }
  };

  const handleDiscard = () => {
    form.reset();
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        {/* Basic Details */}
        <Card className="bg-secondary-blue-600/20 backdrop-blur-md border-primary-blue-400 py-2">
          <CardHeader className="pb-4">
            <div className="flex items-start justify-between gap-4">
              <div>
                <CardTitle className="text-white">Basic details</CardTitle>
                <CardDescription className="text-slate-400">
                  Manage your gym&apos;s basic information and contact details
                </CardDescription>
              </div>
              {isDirty ? (
                <div
                  className="flex items-center gap-2 animate-in fade-in zoom-in-95 duration-200"
                  aria-live="polite"
                >
                  <Button variant="secondary" onClick={handleDiscard}>
                    Discard
                  </Button>
                  <Button type="submit">Save Changes</Button>
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
                  />
                </FormControl>
              )}
            />

            <KFormField
              fieldType={KFormFieldType.INPUT}
              control={form.control}
              name="GymName"
              label="Gym name"
              mandetory
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <KFormField
                fieldType={KFormFieldType.PHONE_INPUT}
                control={form.control}
                name="Phone"
                label="Contact number"
                placeholder="(555) 123-4567"
                mandetory
              />
              <KFormField
                fieldType={KFormFieldType.INPUT}
                control={form.control}
                name="Email"
                label="Enter email"
                mandetory
              />
            </div>

            <KFormField
              fieldType={KFormFieldType.INPUT}
              control={form.control}
              name="Address"
              label="Address"
              mandetory
            />
          </CardContent>
        </Card>

        {/* Subscription */}
        <SubscriptionCard variant="premium" />

        {/* Social Links */}
        <Card className="bg-secondary-blue-600/20 backdrop-blur-md border-primary-blue-400 py-2">
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
              className="w-fit bg-secondary-blue-900 hover:bg-secondary-blue-500 py-2.5 px-3"
              variant="secondary"
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
