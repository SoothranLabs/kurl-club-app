import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';

import { AddForm } from '@/schemas/index';
import { KFormField, KFormFieldType } from '@/components/form/k-formfield';
import { Badge } from '@/components/ui/badge';
import { KSelect } from '@/components/form/k-select';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { KSheet } from '@/components/form/k-sheet';
import { FormControl } from '@/components/ui/form';
import ProfilePictureUploader from '@/components/uploaders/profile-uploader';
import { Calendar } from 'lucide-react';

type CreateUserDetailsData = z.infer<typeof AddForm>;

type CreateUserDetailsProps = {
  onSubmit?: (data: CreateUserDetailsData) => void;
  closeSheet: () => void;
  isOpen: boolean;
};

interface Selections {
  gender: string;
  package: string;
  feeStatus: string;
  workoutPlan: string;
  personalTrainer: string;
  bloodGroup: string;
}

interface UserDetails {
  name: string;
  gymNo: string;
}

export const AddUser: React.FC<CreateUserDetailsProps> = ({
  isOpen,
  closeSheet,
}) => {
  const form = useForm<CreateUserDetailsData>({
    resolver: zodResolver(AddForm),
    defaultValues: {
      memberName: '',
      profilePicture: null,
      email: '',
      primaryPhone: '',
      dob: '',
      gender: '',
      package: '',
      height: '',
      weight: '',
      feeStatus: '',
      amountPaid: '',
      doj: '',
      workoutPlan: '',
      personalTrainer: '',
      bloodgroup: '',
      addressLine1: '',
      addressLine2: '',
    },
  });

  const [selections, setSelections] = useState<Selections>({
    gender: '',
    package: '',
    feeStatus: '',
    workoutPlan: '',
    personalTrainer: '',
    bloodGroup: '',
  });

  const handleSelectionChange = (name: string, value: string) => {
    setSelections((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

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

  const userDetails: UserDetails = { name: 'John Doe', gymNo: '38545' };

  const footer = (
    <div className="flex justify-end gap-3">
      <Button
        onClick={closeSheet}
        type="button"
        variant="secondary"
        className="h-[46px] min-w-[90px]"
      >
        Cancel
      </Button>
      <Button type="submit" className="h-[46px] min-w-[73px]">
        Add
      </Button>
    </div>
  );

  return (
    <KSheet
      className="w-[582px]"
      isOpen={isOpen}
      onClose={closeSheet}
      title="Add User"
      footer={footer}
    >
      <FormProvider {...form}>
        <form className="space-y-4" onSubmit={form.handleSubmit(handleSubmit)}>
          <div className="items-start gap-2 mb-6 flex justify-between ">
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
            <Badge className="bg-secondary-blue-400 flex items-center w-fit justify-center text-sm text-white rounded-full h-[30px] py-2 px-2 border border-secondary-blue-300 bg-opacity-100 ">
              Gym no: #{userDetails.gymNo}
            </Badge>
          </div>
          <h5 className="text-white text-base font-normal leading-normal !mt-0">
            Basic Details
          </h5>
          <KFormField
            fieldType={KFormFieldType.INPUT}
            control={form.control}
            name="memberName"
            label="Member Name"
          />
          <KFormField
            fieldType={KFormFieldType.INPUT}
            control={form.control}
            name="email"
            label="Email"
          />
          <KFormField
            fieldType={KFormFieldType.PHONE_INPUT}
            control={form.control}
            name="primaryPhone"
            label="Phone"
            placeholder="(555) 123-4567"
          />

          <div className="flex justify-between gap-3">
            <div className="w-1/2">
              <KSelect
                label="Gender"
                value={selections.gender}
                onValueChange={(value) =>
                  handleSelectionChange('gender', value)
                }
                options={[
                  { label: 'Male', value: 'male' },
                  { label: 'Female', value: 'female' },
                  { label: 'Others', value: 'others' },
                ]}
                className="!border-white !rounded-lg"
              />
            </div>
            <div className="w-1/2">
              <KSelect
                label="Package"
                value={selections.package}
                onValueChange={(value) =>
                  handleSelectionChange('package', value)
                }
                options={[
                  { label: 'Monthly', value: 'monthly' },
                  { label: 'Qauterly', value: 'quaterly' },
                  { label: 'Yearly', value: 'yearly' },
                ]}
              />
            </div>
          </div>
          <div className="flex justify-between gap-3">
            <div className="w-1/2">
              <KFormField
                fieldType={KFormFieldType.INPUT}
                control={form.control}
                name="height"
                label="Height (In Centimeters)"
              />
            </div>
            <div className="w-1/2">
              <KFormField
                fieldType={KFormFieldType.INPUT}
                control={form.control}
                name="weight"
                label="Weight (In Kilograms)"
              />
            </div>
          </div>
          <div className="flex justify-between gap-3">
            <div className="w-1/2">
              <KSelect
                label="Fee Status"
                value={selections.feeStatus}
                onValueChange={(value) =>
                  handleSelectionChange('feeStatus', value)
                }
                options={[
                  { label: 'Paid', value: 'paid' },
                  { label: 'Partialy Paid', value: 'partialypaid' },
                  { label: 'Unpaid', value: 'unpaid' },
                ]}
              />
            </div>
            <div className="w-1/2">
              <KFormField
                suffix={'/10,000'}
                fieldType={KFormFieldType.INPUT}
                control={form.control}
                name="amountPaid"
                label="Amount Paid"
                maxLength={10}
              />
            </div>
          </div>
          <div className="flex justify-between gap-3">
            <div className="w-1/2">
              <KFormField
                fieldType={KFormFieldType.DATE_PICKER}
                control={form.control}
                name="doj"
                dateLabel="Date of joining"
                mode="single"
                className="bg-secondary-blue-500 h-[52px] rounded-md flex flex-row-reverse text-primary-blue-100 font-normal leading-normal text-sm w-full justify-between"
                iconSrc={<Calendar className="!w-5 !h-5 text-white" />}
              />
            </div>
            <div className="w-1/2">
              <KFormField
                fieldType={KFormFieldType.DATE_PICKER}
                control={form.control}
                name="dob"
                dateLabel="Date of birth"
                mode="single"
                className="bg-secondary-blue-500 h-[52px] rounded-md flex flex-row-reverse text-primary-blue-100 font-normal leading-normal text-sm w-full justify-between"
                iconSrc={<Calendar className="!w-5 !h-5 text-white" />}
              />
            </div>
          </div>
          <div className="flex justify-between gap-3">
            <div className="w-1/2">
              <KSelect
                label="Personal Trainer"
                value={selections.personalTrainer}
                onValueChange={(value) =>
                  handleSelectionChange('personalTrainer', value)
                }
                options={[
                  { label: 'Rahul', value: 'rahul' },
                  { label: 'Jithu', value: 'jithu' },
                  { label: 'Hari', value: 'hari' },
                ]}
              />
            </div>
            <div className="w-1/2">
              <KSelect
                label="Blood Group"
                value={selections.bloodGroup}
                onValueChange={(value) =>
                  handleSelectionChange('bloodGroup', value)
                }
                options={[
                  { label: 'A+', value: 'A+' },
                  { label: 'A-', value: 'A-' },
                  { label: 'B+', value: 'B+' },
                  { label: 'B-', value: 'B-' },
                  { label: 'AB+-', value: 'AB+' },
                  { label: 'AB-', value: 'AB-' },
                  { label: 'O+', value: 'O+' },
                  { label: 'O-', value: 'O-' },
                ]}
              />
            </div>
          </div>
          <KSelect
            label=" Workout Plan"
            value={selections.workoutPlan}
            onValueChange={(value) =>
              handleSelectionChange('workoutPlan', value)
            }
            options={[
              { label: 'Bench Press', value: 'bench press' },
              { label: 'Cardio', value: 'cardio' },
              { label: 'Inclined Press', value: 'inclined press' },
            ]}
          />
          <h5 className="text-white text-base font-normal leading-normal !mt-8">
            Address Details
          </h5>
          <KFormField
            fieldType={KFormFieldType.INPUT}
            control={form.control}
            name="addressLine1"
            label="Address Line "
          />
          <KFormField
            fieldType={KFormFieldType.INPUT}
            control={form.control}
            name="addressLine2"
            label="Address Line 2"
          />
        </form>
      </FormProvider>
    </KSheet>
  );
};

export default AddUser;
