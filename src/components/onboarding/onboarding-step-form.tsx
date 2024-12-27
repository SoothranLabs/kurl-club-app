'use client';

import { useMultiStepForm, Step } from '@/hooks/use-multistep-form';
import { Button } from '@/components/ui/button';
import {
  CreateGymStep,
  InviteTrainerStep,
  PhoneVerifyStep,
  VerifyOTPStep,
} from '@/components/onboarding/steps';
import { StepperIndicator } from '@/components/onboarding/stepper-indicator';

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
      {/* <span className="">arrow</span> */}
      <StepperIndicator
        steps={steps}
        currentStep={steps.findIndex((s) => s.id === step.id)}
      />
      <StepComponent onSubmit={handleStepSubmit} />
      {!isFirstStep && (
        <Button onClick={back} className="mt-4 mr-2">
          Back
        </Button>
      )}
    </div>
  );
};
