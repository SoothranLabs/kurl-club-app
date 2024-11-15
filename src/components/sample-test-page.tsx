'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Form, FormControl } from '@/components/ui/form';
import { SelectItem } from '@/components/ui/select';

import { PatientFormValidation } from '@/lib/validation';

import FileUploader from './file-uploader';
import { KFormField, KFormFieldType } from '@/components/form/k-formfield';

const IdentificationTypes = [
  'Birth Certificate',
  "Driver's License",
  'Medical Insurance Card/Policy',
  'Military ID Card',
  'National Identity Card',
  'Passport',
  'Resident Alien Card (Green Card)',
  'Social Security Card',
  'State ID Card',
  'Student ID Card',
  'Voter ID Card',
];

const SampleTestPage = () => {
  const form = useForm<z.infer<typeof PatientFormValidation>>({
    resolver: zodResolver(PatientFormValidation),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
    },
  });

  return (
    <Form {...form}>
      <form className="space-y-12 flex-1">
        <section className="space-y-6">
          {/* INPUT */}
          <KFormField
            fieldType={KFormFieldType.INPUT}
            control={form.control}
            name="name"
            label="Full Name"
            placeholder="John Doe"
          />

          {/* TEXT AREA */}
          <KFormField
            fieldType={KFormFieldType.TEXTAREA}
            control={form.control}
            name="familyMedicalHistory"
            label=" Family medical history (if relevant)"
            placeholder="Mother had brain cancer, Father has hypertension"
          />

          {/* PHONE INPUT */}
          <KFormField
            fieldType={KFormFieldType.PHONE_INPUT}
            control={form.control}
            name="phone"
            label="Phone number"
            placeholder="(555) 123-4567"
          />

          {/* SELECT */}
          <KFormField
            fieldType={KFormFieldType.SELECT}
            control={form.control}
            name="identificationType"
            label="Identification Type"
            placeholder="Select identification type"
          >
            {IdentificationTypes.map((type, i) => (
              <SelectItem key={type + i} value={type}>
                {type}
              </SelectItem>
            ))}
          </KFormField>

          {/* DATE_PICKER */}
          <KFormField
            fieldType={KFormFieldType.DATE_PICKER}
            control={form.control}
            name="birthDate"
            label="Date of birth"
          />
        </section>

        <section className="space-y-6">
          <KFormField
            fieldType={KFormFieldType.SKELETON}
            control={form.control}
            name="identificationDocument"
            label="Scanned Copy of Identification Document"
            renderSkeleton={() => (
              <FormControl>
                <FileUploader />
              </FormControl>
            )}
          />

          <KFormField
            fieldType={KFormFieldType.CHECKBOX}
            control={form.control}
            name="privacyConsent"
            label="I acknowledge that I have reviewed and agree to the
            privacy policy"
          />
        </section>
      </form>
    </Form>
  );
};

export default SampleTestPage;
