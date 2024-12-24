import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { AddForm } from '@/schemas/index';
import { KFormField, KFormFieldType } from '@/components/form/k-formfield';
import { Badge } from '@/components/ui/badge';
import { KSelect } from '@/components/form/k-select';
import { useState } from 'react';

type CreateMemberDetailsData = z.infer<typeof AddForm>;

type CreateMemberDetailsProps = {
  onSubmit: (data: CreateMemberDetailsData) => void;
};

interface Selections {
  gender: string;
  package: string;
  feeStatus: string;
  workoutPlan: string;
  personalTrainer: string;
  bloodGroup: string;
}

interface MemberDetails {
  name: string;
  gymNo: string;
}

export const AddFrom: React.FC<CreateMemberDetailsProps> = ({ onSubmit }) => {
  const form = useForm<CreateMemberDetailsData>({
    resolver: zodResolver(AddForm),
    defaultValues: {
      memberName: '',
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

  const memberDetails: MemberDetails = { name: 'John Doe', gymNo: '38545' };
  return (
    <div>
      <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="items-center mb-4 flex gap-28 ">
          <div className="w-16 h-16 bg-secondary-blue-300 rounded-full flex items-center justify-center text-xl font-normal text-neutral-green-300 mr-4 mb-3">
            {memberDetails.name
              .split(' ')
              .map((part) => part[0])
              .join('')}
          </div>
          <Badge className="bg-secondary-blue-300 flex items-center w-fit justify-center text-sm text-#ffffff rounded-full h-[30px] py-[8.5px] px-4 mb-12 border border-neutral-ochre-800 bg-opacity-10">
            Gym no: #{memberDetails.gymNo}
          </Badge>
        </div>
        <p>Basic Details</p>
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

        <div className="flex justify-between gap-2 ">
          <div className="w-1/2">
            <KSelect
              label="Gender"
              value={selections.gender}
              onValueChange={(value) => handleSelectionChange('gender', value)}
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
              onValueChange={(value) => handleSelectionChange('package', value)}
              options={[
                { label: 'Monthly', value: 'monthly' },
                { label: 'Qauterly', value: 'quaterly' },
                { label: 'Yearly', value: 'yearly' },
              ]}
            />
          </div>
        </div>
        <div className="flex justify-between gap-2">
          <div className="w-1/2">
            <KFormField
              fieldType={KFormFieldType.INPUT}
              control={form.control}
              name="height"
              label="Height-(CM)"
            />
          </div>
          <div className="w-1/2">
            <KFormField
              fieldType={KFormFieldType.INPUT}
              control={form.control}
              name="weight"
              label="Weight-(KG)"
            />
          </div>
        </div>
        <div className="flex justify-between gap-2">
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
              fieldType={KFormFieldType.INPUT}
              control={form.control}
              name="amountPaid"
              label="Amount Paid"
            />
          </div>
        </div>
        <div className="flex justify-between gap-2">
          <div className="w-1/2">
            <KFormField
              fieldType={KFormFieldType.DATE_PICKER}
              control={form.control}
              name="doj"
              dateLabel="DOJ"
              mode="single"
              className="bg-secondary-blue-500 h-[52px] rounded-md flex flex-row-reverse text-primary-blue-100 font-normal leading-normal text-sm w-full justify-between"
            />
          </div>
          <div className="w-1/2">
            <KFormField
              fieldType={KFormFieldType.DATE_PICKER}
              control={form.control}
              name="dob"
              dateLabel="DOB"
              mode="single"
              className="bg-secondary-blue-500 h-[52px] rounded-md flex flex-row-reverse text-primary-blue-100 font-normal leading-normal text-sm w-full justify-between"
            />
          </div>
        </div>
        <div className="flex justify-between gap-2">
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
          onValueChange={(value) => handleSelectionChange('workoutPlan', value)}
          options={[
            { label: 'Bench Press', value: 'bench press' },
            { label: 'Cardio', value: 'cardio' },
            { label: 'Inclined Press', value: 'inclined press' },
          ]}
        />
        <p>Address Details</p>
        <KFormField
          fieldType={KFormFieldType.TEXTAREA}
          control={form.control}
          name="addressLine1"
          label="Address Line "
        />
        <KFormField
          fieldType={KFormFieldType.TEXTAREA}
          control={form.control}
          name="addressLine2"
          label="Address Line 2"
        />
      </form>
    </div>
  );
};

export default AddFrom;
