import * as React from 'react';
import { FieldValues, Path, UseFormReturn } from 'react-hook-form';

type Step<T> = {
  id: string;
  name: string;
  fields: Path<T>[];
};

interface UseMultiStepFormProps<T extends FieldValues> {
  steps: Step<T>[];
  form: UseFormReturn<T>;
}

export function useMultiStepForm<T extends FieldValues>({
  steps,
  form,
}: UseMultiStepFormProps<T>) {
  const [currentStep, setCurrentStep] = React.useState(0);

  const nextStep = async () => {
    const fields = steps[currentStep].fields;
    const isValid = await form.trigger(fields);

    if (!isValid) return;

    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const previousStep = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const resetForm = () => {
    setCurrentStep(0);
    form.reset();
  };

  return {
    currentStep,
    stepData: steps[currentStep],
    isFirstStep: currentStep === 0,
    isLastStep: currentStep === steps.length - 1,
    nextStep,
    previousStep,
    resetForm,
  };
}
