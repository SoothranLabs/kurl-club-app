'use client';

import { FormProvider, useForm } from 'react-hook-form';
import { useMultiStepForm } from '@/hooks/use-multistep-form';
import { MultiStepFormData } from '@/types';
import { Button } from '@/components/ui/button';
import { Stepper } from '@/components/stepper';
import { AddGym } from '@/components/verify/add-gym';
import { VerifyPhone } from '@/components/verify/verify-phone-form';
import { InputOTPControlled } from '@/components/verify/OTP-form';
import { AddTrainer } from '@/components/verify/trainers-form';

export default function MultiStepFormExample() {
  const form = useForm<MultiStepFormData>({
    defaultValues: {
      gymName: '',
      trainers: [],
    },
  });

  const steps: {
    id: string;
    name: string;
    fields: (keyof MultiStepFormData)[];
  }[] = [
    {
      id: 'Step 1',
      name: 'Verify Phone',
      fields: ['phone'], // Fields for Step 1
    },
    {
      id: 'Step 2',
      name: 'Enter OTP',
      fields: ['otp'], // Fields for Step 2
    },
    {
      id: 'Step 3',
      name: 'Gym Details',
      fields: [
        'gymName',
        'gymAddress',
        'gymCity',
        'gymState',
        'gymZip',
        'facilities',
      ], // Fields for Step 3
    },
    {
      id: 'Step 4',
      name: 'Trainers',
      fields: ['trainers'],
    },
  ];

  const {
    currentStep,
    stepData,
    isFirstStep,
    isLastStep,
    nextStep,
    previousStep,
  } = useMultiStepForm({
    steps,
    form,
  });

  const onSubmit = async (data: MultiStepFormData) => {
    if (!isLastStep) {
      await nextStep();
      return;
    }
    console.log('Form submitted:', data);
  };

  return (
    <div className="bg-gray-900 text-white flex items-center justify-center p-4">
      <div className="w-full">
        <div className="flex gap-4 mb-5">
          <Button
            variant="outline"
            className="rounded-full h-10 w-10"
            onClick={previousStep}
            disabled={isFirstStep}
          >
            {'<'}
          </Button>
          <Button
            variant="outline"
            className="rounded-full h-10 w-10"
            onClick={nextStep}
            disabled={isLastStep}
          >
            {'>'}
          </Button>
        </div>
        <Stepper steps={steps} currentStep={currentStep} />

        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="bg-gray-800 p-6 rounded-lg">
              {stepData.id === 'Step 1' && <VerifyPhone form={form} />}
              {stepData.id === 'Step 2' && <InputOTPControlled />}
              {stepData.id === 'Step 3' && <AddGym form={form} />}
              {stepData.id === 'Step 4' && <AddTrainer form={form} />}
            </div>
            <Button type="submit" className="w-full">
              {isLastStep ? 'Submit' : 'Next'}
            </Button>
          </form>
        </FormProvider>
      </div>
    </div>
  );
}
