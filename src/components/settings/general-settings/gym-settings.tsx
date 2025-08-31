'use client';

import { useTransition } from 'react';
import { z } from 'zod/v4';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useFieldArray, useForm } from 'react-hook-form';
import { GymDataDetailsSchema } from '@/schemas';
import { KFormField, KFormFieldType } from '@/components/form/k-formfield';
import ProfilePictureUploader from '@/components/uploaders/profile-uploader';
import { FormControl } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import { useEffect } from 'react';
import { SubscriptionCard } from '@/components/cards/subscription-card';

type GymDetails = z.infer<typeof GymDataDetailsSchema>;

export const GymSettings = () => {
  const [isPending] = useTransition();

  const form = useForm({
    resolver: zodResolver(GymDataDetailsSchema),
    defaultValues: {
      ProfilePicture: null,
      GymName: '',
      Phone: '',
      Email: '',
      Address: '',
      socialLinks: [{ url: '' }], // Initialize with one empty social link
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'socialLinks',
  });

  // Ensure there's always at least one social link field
  useEffect(() => {
    if (fields.length === 0) {
      append({ url: '' });
    }
  }, [fields.length, append]);

  const handleSubmit = (data: GymDetails) => {
    console.log(data);
  };

  return (
    <>
      <h2 className="text-base font-semibold leading-normal">Basic Details</h2>
      <FormProvider {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="flex flex-col"
        >
          <div className="space-y-5 w-[618px] mt-6">
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
              fieldType={KFormFieldType.PHONE_INPUT}
              control={form.control}
              name="Phone"
              label="Phone number"
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
              name="Address"
              label="Enter Address"
              disabled={isPending}
              mandetory
            />
            <h2 className="text-base leading-normal mt-8! font-semibold ">
              Subscription
            </h2>
            <SubscriptionCard variant="premium" />
            {/* Social Links */}
            <h2 className="text-base leading-normal mt-8! font-semibold ">
              Social Links
            </h2>
            {/* Social links section */}
            <div className="space-y-3">
              {fields.map((field, index) => (
                <div key={field.id} className="flex items-center gap-3">
                  <div className="w-full">
                    <KFormField
                      fieldType={KFormFieldType.INPUT}
                      control={form.control}
                      name={`socialLinks.${index}.url`}
                      label={`Enter Website Link ${index + 1}`}
                      placeholder="https://www.google.com"
                      disabled={isPending}
                    />
                  </div>
                  {/* Only show trash icon for links after the first one */}
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
                className="w-fit border border-secondary-blue-400 py-2.5 px-3"
                variant="ghost"
                onClick={() => append({ url: '' })}
              >
                Add Social Link
              </Button>
            </div>
          </div>
        </form>
      </FormProvider>
    </>
  );
};
