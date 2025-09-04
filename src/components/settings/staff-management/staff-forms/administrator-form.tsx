'use client';

import { z } from 'zod/v4';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { Calendar } from 'lucide-react';

import { createStaff } from '@/services/staff';
import { bloodGroupOptions, genderOptions } from '@/lib/constants';
import { adminstratorFormSchema } from '@/schemas';

import { Form, FormControl } from '@/components/ui/form';
import { KFormField, KFormFieldType } from '@/components/form/k-formfield';
import ProfilePictureUploader from '@/components/uploaders/profile-uploader';

type AdministratorFormValues = z.infer<typeof adminstratorFormSchema>;

interface AdministratorFormProps {
  gymId?: number;
  onSuccess: () => void;
  onSubmittingChange: (isSubmitting: boolean) => void;
}

export default function AdministratorForm({
  gymId,
  onSuccess,
  onSubmittingChange,
}: AdministratorFormProps) {
  const queryClient = useQueryClient();

  const form = useForm<AdministratorFormValues>({
    resolver: zodResolver(adminstratorFormSchema),
    defaultValues: {
      ProfilePicture: null,
      Name: '',
      Email: '',
      Phone: '',
      Dob: undefined,
      bloodGroup: '',
      Gender: '',
      AddressLine: '',
      Doj: new Date().toISOString(),
    },
  });

  const isSubmitting = form.formState.isSubmitting;

  const onSubmit = async (data: AdministratorFormValues) => {
    onSubmittingChange(true);
    const formData = new FormData();

    Object.keys(data).forEach((key) => {
      const value = data[key as keyof AdministratorFormValues];

      if (key === 'ProfilePicture' && value instanceof File) {
        formData.append(key, value);
      } else {
        formData.append(key, String(value));
      }
    });

    if (gymId) {
      formData.append('Gymid', String(gymId));
    }

    const result = await createStaff(formData, 'staff');

    if (result.success) {
      toast.success(result.success);
      onSuccess();
      form.reset();

      // **Invalidate the gymStaffs query to refetch data**
      queryClient.invalidateQueries({ queryKey: ['gymStaffs', gymId] });
    } else {
      toast.error(result.error);
    }

    onSubmittingChange(true);
  };

  return (
    <Form {...form}>
      <form
        id="administrator-form"
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4"
      >
        {/* Profile picture */}
        <div className="mb-6">
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
        </div>
        <h5 className="text-white text-base font-normal leading-normal mt-0!">
          Basic Details
        </h5>
        {/* Name */}
        <KFormField
          control={form.control}
          name="Name"
          fieldType={KFormFieldType.INPUT}
          label="Full Name"
          placeholder="John Doe"
          disabled={isSubmitting}
        />
        {/* Email */}
        <KFormField
          control={form.control}
          name="Email"
          fieldType={KFormFieldType.INPUT}
          label="Email"
          placeholder="john@example.com"
          disabled={isSubmitting}
        />
        {/* Phone number */}
        <KFormField
          control={form.control}
          name="Phone"
          fieldType={KFormFieldType.PHONE_INPUT}
          label="Phone Number"
          disabled={isSubmitting}
        />
        <div className="flex justify-between gap-3">
          {/* Gender */}
          <div className="w-1/2">
            <KFormField
              fieldType={KFormFieldType.SELECT}
              control={form.control}
              name="Gender"
              label="Gender"
              options={genderOptions}
              disabled={isSubmitting}
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
              disabled={isSubmitting}
            />
          </div>
        </div>
        <div className="flex justify-between gap-3">
          {/* Dob */}
          <div className="w-1/2">
            <KFormField
              fieldType={KFormFieldType.DATE_PICKER}
              control={form.control}
              name="Dob"
              dateLabel="Date of birth"
              mode="single"
              className="bg-secondary-blue-500 h-[52px] rounded-md flex flex-row-reverse text-primary-blue-100 font-normal leading-normal text-sm w-full justify-between"
              iconSrc={<Calendar className="w-5! h-5! text-white" />}
              showYearSelector
              disabled={isSubmitting}
            />
          </div>

          {/* Package */}
          <div className="w-1/2">
            <KFormField
              fieldType={KFormFieldType.DATE_PICKER}
              control={form.control}
              name="Doj"
              label="Date of joining"
              dateLabel="Date of joining"
              mode="single"
              className="bg-secondary-blue-500 z-1000 h-[52px] rounded-md flex flex-row-reverse text-primary-blue-100 font-normal leading-normal text-sm w-full justify-between"
              iconSrc={<Calendar className="w-5! h-5! text-white" />}
              disabled={isSubmitting}
            />
          </div>
        </div>

        {/* Address Details */}
        <h5 className="text-white text-base font-normal leading-normal mt-8!">
          Address Details
        </h5>
        <KFormField
          fieldType={KFormFieldType.TEXTAREA}
          control={form.control}
          name="AddressLine"
          label="Address Line"
          disabled={isSubmitting}
        />
      </form>
    </Form>
  );
}
