'use client';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Calendar } from 'lucide-react';

import { bloodGroupOptions, genderOptions } from '@/lib/constants';
import { trainerFormSchema } from '@/schemas';

import { Form, FormControl } from '@/components/ui/form';
import { KFormField, KFormFieldType } from '@/components/form/k-formfield';
import ProfilePictureUploader from '@/components/uploaders/profile-uploader';

type TrainerFormValues = z.infer<typeof trainerFormSchema>;

interface TrainerFormProps {
  onSuccess: () => void;
}

export default function TrainerForm({ onSuccess }: TrainerFormProps) {
  const form = useForm<TrainerFormValues>({
    resolver: zodResolver(trainerFormSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      gender: undefined,
      bloodGroup: undefined,
      dob: '',
      doj: '',
      certifications: [],
    },
  });

  const FRAMEWORKS = [
    { value: 'next.js', label: 'Next.js' },
    { value: 'sveltekit', label: 'SvelteKit' },
    { value: 'nuxt.js', label: 'Nuxt.js' },
    { value: 'remix', label: 'Remix' },
    { value: 'astro', label: 'Astro' },
    { value: 'wordpress', label: 'WordPress' },
    { value: 'express.js', label: 'Express.js' },
    { value: 'nest.js', label: 'Nest.js' },
  ];

  function onSubmit(data: TrainerFormValues) {
    console.log('Trainer form submitted:', data);
    onSuccess();
  }

  return (
    <Form {...form}>
      <form
        id="trainer-form"
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4"
      >
        {/* Profile picture */}
        <div className="mb-6">
          <KFormField
            fieldType={KFormFieldType.SKELETON}
            control={form.control}
            name="profilePicture"
            renderSkeleton={(field) => (
              <FormControl>
                <ProfilePictureUploader
                  files={field.value as File | null}
                  onChange={(file) => field.onChange(file)}
                />
              </FormControl>
            )}
          />
        </div>
        <h5 className="text-white text-base font-normal leading-normal !mt-0">
          Basic Details
        </h5>
        {/* Name */}
        <KFormField
          control={form.control}
          name="name"
          fieldType={KFormFieldType.INPUT}
          label="Full Name"
          placeholder="John Doe"
        />
        {/* Email */}
        <KFormField
          control={form.control}
          name="email"
          fieldType={KFormFieldType.INPUT}
          label="Email"
          placeholder="john@example.com"
        />
        {/* Phone number */}
        <KFormField
          control={form.control}
          name="phone"
          fieldType={KFormFieldType.PHONE_INPUT}
          label="Phone Number"
        />
        <div className="flex justify-between gap-3">
          {/* Gender */}
          <div className="w-1/2">
            <KFormField
              fieldType={KFormFieldType.SELECT}
              control={form.control}
              name="gender"
              label="Gender"
              options={genderOptions}
            />
          </div>

          {/* Blood Group */}
          <div className="w-1/2">
            <KFormField
              fieldType={KFormFieldType.SELECT}
              control={form.control}
              name="bloodGroup"
              label="Blood Group"
              options={bloodGroupOptions}
            />
          </div>
        </div>
        <div className="flex justify-between gap-3">
          {/* Dob */}
          <div className="w-1/2">
            <KFormField
              fieldType={KFormFieldType.DATE_PICKER}
              control={form.control}
              name="dob"
              dateLabel="Date of birth"
              mode="single"
              className="bg-secondary-blue-500 h-[52px] rounded-md flex flex-row-reverse text-primary-blue-100 font-normal leading-normal text-sm w-full justify-between"
              iconSrc={<Calendar className="!w-5 !h-5 text-white" />}
              showYearSelector
            />
          </div>

          {/* Package */}
          <div className="w-1/2">
            <KFormField
              fieldType={KFormFieldType.DATE_PICKER}
              control={form.control}
              name="doj"
              label="Date of joining"
              dateLabel="Date of joining"
              mode="single"
              className="bg-secondary-blue-500 z-[1000] h-[52px] rounded-md flex flex-row-reverse text-primary-blue-100 font-normal leading-normal text-sm w-full justify-between"
              iconSrc={<Calendar className="!w-5 !h-5 text-white" />}
            />
          </div>
        </div>
        <KFormField
          fieldType={KFormFieldType.MULTISELECT}
          control={form.control}
          name="certifications"
          label="Certifications"
          placeholder="List relevant certifications (e.g., NASM, ACE, ISSA)"
          options={FRAMEWORKS}
        />

        {/* Address Details */}
        <h5 className="text-white text-base font-normal leading-normal !mt-8">
          Address Details
        </h5>
        <KFormField
          fieldType={KFormFieldType.TEXTAREA}
          control={form.control}
          name="address"
          label="Address Line"
        />
      </form>
    </Form>
  );
}
