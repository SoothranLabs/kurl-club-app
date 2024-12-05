'use client';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { Form, FormControl } from '@/components/ui/form';
import { SelectGroup, SelectItem, SelectLabel } from '@/components/ui/select';
import { KFormField, KFormFieldType } from '@/components/form/k-formfield';
import { Button } from '@/components/ui/button';

import { KCalenderMonth } from '@/components/icons';
import { ThemeModeToggle } from '@/components/theme-toggler';

import { SamplePageSchema } from '@/schemas';

import FileUploader from '@/components/file-uploader';

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
  const form = useForm<z.infer<typeof SamplePageSchema>>({
    resolver: zodResolver(SamplePageSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
      privacyConsent: false,
      fullName: '',
      familyHistory: '',
      phoneNumber: '',
      identificationType: '',
      dateOfBirth: undefined,
      identificationDocument: '',
    },
  });

  return (
    <div className="flex flex-col items-center gap-10">
      <div className="flex items-center gap-6">
        <ThemeModeToggle />
      </div>
      <div className="flex gap-10">
        <div className="flex flex-col gap-5">
          <Button>KurlClub Button</Button>
          <Button variant="secondary">KurlClub Secondary</Button>
          <Button>
            <KCalenderMonth className="text-black" /> KurlClub with icon
          </Button>
          <Button variant="outline" size="icon">
            <KCalenderMonth />
          </Button>
          <Button className="rounded-2xl">With style</Button>
          <Button className="w-fit">With w-fit</Button>
        </div>
        <Form {...form}>
          <form className="space-y-12 flex-1">
            <section className="space-y-6">
              {/* INPUT */}
              <KFormField
                fieldType={KFormFieldType.INPUT}
                control={form.control}
                name="fullName"
                label="Full Name"
                placeholder="John Doe"
              />

              {/* PASSWORD */}
              <KFormField
                fieldType={KFormFieldType.PASSWORD}
                control={form.control}
                name="password"
                label="Password"
                placeholder="Enter your password"
              />

              {/* TEXT AREA */}
              <KFormField
                fieldType={KFormFieldType.TEXTAREA}
                control={form.control}
                name="familyHistory"
                label=" Family medical history (if relevant)"
                placeholder="Mother had brain cancer, Father has hypertension"
              />

              {/* PHONE INPUT */}
              <KFormField
                fieldType={KFormFieldType.PHONE_INPUT}
                control={form.control}
                name="phoneNumber"
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
                <SelectGroup>
                  <SelectLabel className="mb-3">
                    Select Identification Type
                  </SelectLabel>
                  {IdentificationTypes.map((type, i) => (
                    <SelectItem
                      key={type + i}
                      value={type}
                      className="shad-select-item"
                    >
                      {type}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </KFormField>

              {/* DATE_PICKER */}
              <KFormField
                fieldType={KFormFieldType.DATE_PICKER}
                control={form.control}
                name="dateOfBirth"
                label="Date of birth"
                numberOfMonths={2}
                dateLabel="Pick a date range"
                showPresets
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
      </div>
    </div>
  );
};

export default SampleTestPage;
