'use client';

import { useTransition } from 'react';
import type * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useFieldArray, useForm } from 'react-hook-form';
import { GymDataDetailsSchema } from '@/schemas';
import { KFormField, KFormFieldType } from '@/components/form/k-formfield';
import ProfilePictureUploader from '@/components/uploaders/profile-uploader';
import { FormControl } from '@/components/ui/form';
import { Subscription } from './subcription';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import { useEffect } from 'react';

type GymDetails = z.infer<typeof GymDataDetailsSchema>;

interface BasicDetailsFormProps {
  onSubmit: (data: GymDetails) => void;
}

export const BasicDetailsForm = ({ onSubmit }: BasicDetailsFormProps) => {
  const [isPending] = useTransition();

  const form = useForm<GymDetails>({
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
    onSubmit(data);
  };

  return (
    <>
      <h2 className="text-base font-semibold mt-[32px]">Basic Details</h2>
      <FormProvider {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="flex flex-col"
        >
          <div className="space-y-4 max-h-[46vh] w-[618px] mt-4 p-1 no-scrollbar">
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
            <h2 className="text-base font-semibold ">Subscription</h2>

            <Subscription />

            {/* Social Links */}
            <h2 className="text-base font-semibold ">Social Links</h2>

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
                      className="h-[52px] w-[52px]"
                      variant="secondary"
                    >
                      <Trash2 />
                    </Button>
                  )}
                </div>
              ))}

              <Button
                type="button"
                onClick={() => append({ url: '' })}
                className="mt-4"
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
