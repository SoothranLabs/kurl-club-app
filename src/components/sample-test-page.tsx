'use client';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { Form, FormControl } from '@/components/ui/form';
import { SelectGroup, SelectItem, SelectLabel } from '@/components/ui/select';
import { KFormField, KFormFieldType } from '@/components/form/k-formfield';
import { Button } from '@/components/ui/button';

import { KCalenderMonth } from '@/components/icons';
import { ThemeModeToggle } from '@/components/theme-toggler';

import { SamplePageSchema } from '@/schemas';

import FileUploader from '@/components/file-uploader';
import { useSheet } from '@/hooks/use-sheet';
import { KSheet } from '@/components/form/k-sheet';
import { LogoutButton } from '@/components/auth/logout-button';
import { useForm, FormProvider } from 'react-hook-form';

import { OnboardingStepForm } from '@/components/onboarding/onboarding-step-form';

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { MemberDetailsProvider } from './members/sidebar/sidebar-context';
import { Sidebar } from './members/sidebar/sidebar';
import AddFrom from './members/add-form';
import InfoCard from './cards/info-card';
import ProfilePictureUploader from './uploaders/profile-uploader';
import { MemberDetails } from './members/newsidebar/member-details';

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
      profilepicture: null,
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
      otp: '',
      websiteUrl: '',
    },
  });

  const handleSubmit = (data: {
    email: string;
    height: string;
    memberName: string;
    primaryPhone: string;
    dob: string;
    gender: string;
    package: string;
    weight: string;
    feeStatus: string;
    amountPaid: string;
    doj: string;
    workoutPlan: string;
    personalTrainer: string;
    bloodgroup: string;
    addressLine1: string;
    addressLine2?: string;
  }) => {
    console.log(data);
  };

  async function onSubmit(values: z.infer<typeof SamplePageSchema>) {
    if (!values.profilepicture) {
      console.error('No image selected');
      return;
    }

    const payload = {
      ...values,
      profilepicture: Array.from(values.profilepicture),
    };

    console.log(`Subitted data = ${JSON.stringify(payload)}`);
  }

  const { isOpen, openSheet, closeSheet } = useSheet();

  return (
    <div className="flex flex-col items-center gap-10">
      <InfoCard
        item={{
          id: 1,
          icon: <KCalenderMonth />,
          color: 'secondary-pink-500',
          title: 'Total Members',
          count: 100,
        }}
        className="w-[332px]"
      />

      <div className="flex gap-8">
        <MemberDetailsProvider>
          <Sidebar />
        </MemberDetailsProvider>

        <MemberDetails />
      </div>

      <div className="flex items-center gap-6">
        <ThemeModeToggle />
        <div className="p-4">
          {/* KSheet Button */}
          <Button onClick={openSheet}>Open Sheet</Button>
          <FormProvider {...form}>
            <KSheet
              className="w-[582px]"
              isOpen={isOpen}
              onClose={closeSheet}
              title="Add Member"
            >
              <AddFrom onSubmit={handleSubmit} />
              <div className="flex justify-end gap-4 sticky bottom-0 bg-secondary-blue-700 mt-4">
                <div className="flex justify-end gap-2">
                  <Button type="button" variant="outline">
                    Cancel
                  </Button>
                  <Button type="submit">Add</Button>
                </div>
              </div>
            </KSheet>
          </FormProvider>
        </div>

        {/* Dialog Button */}
        <Dialog>
          <DialogTrigger asChild>
            <Button>Finish setting up</Button>
          </DialogTrigger>
          <DialogContent className="bg-secondary-blue-700 border-primary-blue-400">
            <DialogTitle></DialogTitle>
            <OnboardingStepForm />
          </DialogContent>
        </Dialog>

        <LogoutButton />
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
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-12 flex-1"
          >
            <section className="space-y-6">
              {/* PROFILE UPLOADER */}
              <KFormField
                fieldType={KFormFieldType.SKELETON}
                control={form.control}
                name="profilepicture"
                renderSkeleton={(field) => (
                  <FormControl>
                    <ProfilePictureUploader
                      files={
                        field.value instanceof Uint8Array ? field.value : null
                      }
                      onChange={field.onChange}
                    />
                  </FormControl>
                )}
              />

              {/* INPUT */}
              <KFormField
                fieldType={KFormFieldType.INPUT}
                control={form.control}
                name="fullName"
                label="Full Name"
                placeholder="John Doe"
              />

              {/* INPUT WITH ICON */}
              <KFormField
                fieldType={KFormFieldType.INPUT}
                control={form.control}
                name="websiteUrl"
                label="Website Link"
                placeholder="https://www.google.com"
                iconSrc={<KCalenderMonth />}
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

              {/* OTP INPUT */}
              <KFormField
                fieldType={KFormFieldType.OTP}
                control={form.control}
                name="otp"
                label="Enter OTP"
                placeholder="Enter 6-digit OTP"
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

              <KFormField
                fieldType={KFormFieldType.DATE_PICKER}
                control={form.control}
                name="identificationType"
                label="Date of birth"
                dateLabel="Pick a date"
                mode="single"
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
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default SampleTestPage;
