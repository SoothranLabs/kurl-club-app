'use client';

import { ArrowLeft, ArrowRight } from 'lucide-react';

import { StepperIndicator } from '@/components/onboarding/stepper-indicator';
import {
  CreateGymStep,
  InviteTrainerStep,
  PhoneVerifyStep,
  VerifyOTPStep,
} from '@/components/onboarding/steps';
import { Step, useMultiStepForm } from '@/hooks/use-multistep-form';

const steps: Step[] = [
  { id: 'mobileNumber', component: PhoneVerifyStep },
  { id: 'otpVerification', component: VerifyOTPStep },
  { id: 'userDetails', component: CreateGymStep },
  { id: 'trainerEmail', component: InviteTrainerStep },
];

export const OnboardingStepForm = () => {
  const { step, isFirstStep, isLastStep, next, back } = useMultiStepForm(steps);

  const handleStepSubmit = () => {
    if (isLastStep) {
      console.log('Final step reached.');
    } else {
      next();
    }
  };

  const StepComponent = step.component;

  return (
    <div>
      <div className="flex items-center gap-3 mb-5">
        <ArrowButton direction="left" onClick={back} />
        <ArrowButton direction="right" onClick={next} disabled={isFirstStep} />
      </div>
      <StepperIndicator
        steps={steps}
        currentStep={steps.findIndex((s) => s.id === step.id)}
      />
      <StepComponent onSubmit={handleStepSubmit} />
    </div>
  );
};

const ArrowButton = ({
  direction,
  onClick,
  disabled,
}: {
  direction: 'left' | 'right';
  onClick: () => void;
  disabled?: boolean;
}) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className="flex justify-center items-center h-9 w-9 p-1 rounded-[30px] border border-primary-blue-300 hover:bg-primary-blue-300 k-transition disabled:opacity-20 disabled:bg-transparent"
  >
    {direction === 'left' ? <ArrowLeft /> : <ArrowRight />}
  </button>
);
