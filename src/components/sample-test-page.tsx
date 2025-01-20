'use client';

import React from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl } from '@/components/ui/form';
import { SelectGroup, SelectItem, SelectLabel } from '@/components/ui/select';
import { KFormField, KFormFieldType } from '@/components/form/k-formfield';
import { Button } from '@/components/ui/button';
import { ThemeModeToggle } from '@/components/theme-toggler';
import { SamplePageSchema } from '@/schemas';
import FileUploader from '@/components/file-uploader';
import { useSheet } from '@/hooks/use-sheet';
import { useForm } from 'react-hook-form';
import { OnboardingStepForm } from '@/components/onboarding/onboarding-step-form';
import AddFrom from './members/add-member';
import InfoCard from './cards/info-card';
import KDialog from './form/k-dialog';
import ProfilePictureUploader from './uploaders/profile-uploader';
import { Sidebar } from './members/sidebar';
import PaymentCard from './members/details/payment-card';
import { CalendarDays, IndianRupee, Map, Settings, Users } from 'lucide-react';
import { KTabs, TabItem } from './form/k-tabs';
import { UserForm } from './settings/user-management/add-user-form';

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
  const [selectedTab, setSelectedTab] = React.useState<string>('users');

  const items: TabItem[] = [
    { id: 'users', label: 'Users', icon: Users },
    { id: 'packages', label: 'Packages', icon: IndianRupee },
    { id: 'workouts', label: 'Workouts', icon: Map },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const handleTabChange = (tabId: string) => {
    setSelectedTab(tabId);
    console.log(`Active tab: ${tabId}`);
  };

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

  const addUserSubmit = (data: {
    memberName: string;
    email: string;
    primaryPhone: string;
    designation: string;
    dob: string;
    gender: string;
    doj: string;
    feeStatus: string;
    amountPaid: string;
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
  const {
    isOpen: isAddUserOpen,
    openSheet: openAddUserSheet,
    closeSheet: closeAddUserSheet,
  } = useSheet();

  return (
    <div className="flex flex-col items-center gap-10">
      <PaymentCard
        info={{
          status: 'unpaid',
          delay: 1,
          outstanding: 10000,
          paid_amount: 0,
          package: 'Quarterly',
          due_data: '12/12/2024',
        }}
      />
      <div className="p-6 space-y-8 w-full">
        {/* Underline Variant */}
        <div>
          <h2 className="mb-4 text-lg font-semibold text-white">
            Underline Variant
          </h2>
          <KTabs
            items={items}
            variant="underline"
            value={selectedTab}
            onTabChange={handleTabChange}
            className="bg-secondary-blue-700 p-4 rounded-lg"
          />
        </div>

        {/* Vertical Variant */}
        <div>
          <h2 className="mb-4 text-lg font-semibold text-white">
            Vertical Variant
          </h2>
          <div className="flex">
            <KTabs
              items={items}
              variant="vertical"
              value={selectedTab}
              onTabChange={handleTabChange}
              className="bg-secondary-blue-700 rounded-lg"
            />
          </div>
        </div>
      </div>
      <InfoCard
        item={{
          id: 1,
          icon: <CalendarDays />,
          color: 'secondary-pink-500',
          title: 'Total Members',
          count: 100,
        }}
        className="!w-[332px]"
      />
      <div className="flex items-center gap-6">
        <ThemeModeToggle />
        <div className="p-4">
          <Button onClick={openAddUserSheet}>Add User</Button>
          <UserForm
            isOpen={isAddUserOpen}
            closeSheet={closeAddUserSheet}
            onSubmit={addUserSubmit}
          />
        </div>
        <div className="p-4">
          {/* KSheet Button */}
          <Button onClick={openSheet}>Open Sheet</Button>
          <AddFrom
            isOpen={isOpen}
            closeSheet={closeSheet}
            onSubmit={handleSubmit}
          />
        </div>

        {/* Dialog Button */}
        <KDialog
          closable={false}
          className="p-[48px] w-[638px]"
          trigger={<Button>Finish setting up</Button>}
        >
          <OnboardingStepForm />
        </KDialog>
      </div>

      <div className="flex gap-10">
        <div className="flex flex-col gap-5">
          <Button>KurlClub Button</Button>
          <Button variant="secondary">KurlClub Secondary</Button>
          <Button>
            <CalendarDays className="text-black" /> KurlClub with icon
          </Button>
          <Button variant="outline" size="icon">
            <CalendarDays />
          </Button>
          <Button className="rounded-2xl">With style</Button>
          <Button className="w-fit">With w-fit</Button>
        </div>
        <Sidebar />
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
                iconSrc={<CalendarDays />}
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
