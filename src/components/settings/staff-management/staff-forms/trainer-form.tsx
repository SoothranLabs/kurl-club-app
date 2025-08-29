'use client';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { Calendar } from 'lucide-react';

import { bloodGroupOptions, genderOptions } from '@/lib/constants';
import { useGymFormOptions } from '@/hooks/use-gymform-options';
import { trainerFormSchema } from '@/schemas';
import { createStaff } from '@/services/staff';

import { Form, FormControl } from '@/components/ui/form';
import { KFormField, KFormFieldType } from '@/components/form/k-formfield';
import ProfilePictureUploader from '@/components/uploaders/profile-uploader';

type TrainerFormValues = z.infer<typeof trainerFormSchema>;

interface TrainerFormProps {
  gymId?: number;
  onSuccess: () => void;
  onSubmittingChange: (isSubmitting: boolean) => void;
}

export default function TrainerForm({
  gymId,
  onSuccess,
  onSubmittingChange,
}: TrainerFormProps) {
  const { formOptions } = useGymFormOptions(gymId);
  const queryClient = useQueryClient();

  const form = useForm<TrainerFormValues>({
    resolver: zodResolver(trainerFormSchema),
    defaultValues: {
      ProfilePicture: null,
      TrainerName: '',
      Email: '',
      Phone: '',
      Dob: '',
      BloodGroup: undefined,
      Gender: undefined,
      AddressLine: '',
      Doj: '',
      Certification: [],
    },
  });

  const onSubmit = async (data: TrainerFormValues) => {
    onSubmittingChange(true);
    const formData = new FormData();

    Object.keys(data).forEach((key) => {
      const value = data[key as keyof TrainerFormValues];

      if (key === 'ProfilePicture' && value instanceof File) {
        formData.append(key, value);
      } else if (key === 'Certification' && Array.isArray(value)) {
        const labels = value.map((cert) => cert.label);
        formData.append(key, JSON.stringify(labels));
      } else {
        formData.append(key, String(value));
      }
    });

    if (gymId) {
      formData.append('Gymid', String(gymId));
    }

    const result = await createStaff(formData, 'trainer');

    if (result.success) {
      toast.success(result.success);
      onSuccess();
      form.reset();

      // **Invalidate the gymStaffs query to refetch data**
      queryClient.invalidateQueries({ queryKey: ['gymStaffs', gymId] });
    } else {
      toast.error(result.error);
    }

    onSubmittingChange(false);
  };

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
          name="TrainerName"
          fieldType={KFormFieldType.INPUT}
          label="Full Name"
          placeholder="John Doe"
        />
        {/* Email */}
        <KFormField
          control={form.control}
          name="Email"
          fieldType={KFormFieldType.INPUT}
          label="Email"
          placeholder="john@example.com"
        />
        {/* Phone number */}
        <KFormField
          control={form.control}
          name="Phone"
          fieldType={KFormFieldType.PHONE_INPUT}
          label="Phone Number"
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
            />
          </div>

          {/* Blood Group */}
          <div className="w-1/2">
            <KFormField
              fieldType={KFormFieldType.SELECT}
              control={form.control}
              name="BloodGroup"
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
              name="Dob"
              dateLabel="Date of birth"
              mode="single"
              className="bg-secondary-blue-500 h-[52px] rounded-md flex flex-row-reverse text-primary-blue-100 font-normal leading-normal text-sm w-full justify-between"
              iconSrc={<Calendar className="w-5! h-5! text-white" />}
              showYearSelector
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
            />
          </div>
        </div>
        <KFormField
          fieldType={KFormFieldType.MULTISELECT}
          control={form.control}
          name="Certification"
          label="Certifications"
          placeholder="List relevant certifications (e.g., NASM, ACE, ISSA)"
          options={
            formOptions?.certificatesOptions
              ? formOptions.certificatesOptions.map((certificate) => ({
                  label: certificate.name,
                  value: String(certificate.id),
                }))
              : []
          }
        />

        {/* Address Details */}
        <h5 className="text-white text-base font-normal leading-normal mt-8!">
          Address Details
        </h5>
        <KFormField
          fieldType={KFormFieldType.TEXTAREA}
          control={form.control}
          name="AddressLine"
          label="Address Line"
        />
      </form>
    </Form>
  );
}
