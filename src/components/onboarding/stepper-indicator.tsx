interface StepperProps {
  steps: { id: string }[];
  currentStep: number;
}

export function StepperIndicator({ steps, currentStep }: StepperProps) {
  return (
    <div className="mb-8">
      <div className="flex w-full gap-[5px]">
        {steps.map((step, index) => (
          <div key={step.id} className="w-full flex flex-col items-center">
            <div
              className={`w-full h-1 rounded-[19px]
                ${index <= currentStep ? 'bg-primary-green-100' : 'bg-secondary-blue-500'}`}
            ></div>
          </div>
        ))}
      </div>
    </div>
  );
}
