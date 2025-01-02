import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';

import { AddUserForm } from '@/schemas/index';
import { KFormField, KFormFieldType } from '@/components/form/k-formfield';
import { Badge } from '@/components/ui/badge';
import { KSelect } from '@/components/form/k-select';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { KSheet } from '@/components/form/k-sheet';
import { FormControl } from '@/components/ui/form';
import ProfilePictureUploader from '@/components/uploaders/profile-uploader';
import { Calendar } from 'lucide-react';

type UserFormData = z.infer<typeof AddUserForm>;

type AddUserProps = {
  onSubmit?: (data: UserFormData) => void;
  closeSheet: () => void;
  isOpen: boolean;
};

interface Selections {
  gender: string;
  designation: string;
  feeStatus: string;
}

interface UserDetails {
  name: string;
  triId: string;
}

export const UserForm: React.FC<AddUserProps> = ({ isOpen, closeSheet }) => {
  const form = useForm<UserFormData>({
    resolver: zodResolver(AddUserForm),
    defaultValues: {
      profilepicture: undefined,
      memberName: '',
      email: '',
      primaryPhone: '',
      designation: '',
      dob: '',
      gender: '',
      doj: '',
      feeStatus: '',
      amountPaid: '',
      addressLine1: '',
      addressLine2: '',
    },
  });

  const [selections, setSelections] = useState<Selections>({
    gender: '',
    designation: '',
    feeStatus: '',
  });

  const handleSelectionChange = (name: string, value: string) => {
    setSelections((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (data: {
    memberName: string;
    email: string;
    primaryPhone: string;
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

  const userDetails: UserDetails = { name: 'John Doe', triId: '38545' };

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
            <Badge className="bg-secondary-blue-400 flex items-center w-fit justify-center text-sm text-white rounded-full h-[30px] py-2 px-2 border border-secondary-blue-300 bg-opacity-100">
              TriID: #{userDetails.triId}
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
                label="Designation"
                value={selections.designation}
                onValueChange={(value) =>
                  handleSelectionChange('designation', value)
                }
                options={[
                  { label: 'Owner', value: 'owner' },
                  { label: 'Trainer', value: 'trainer' },
                  { label: 'Member', value: 'member' },
                ]}
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

export default UserForm;
