interface StepperProps {
  steps: { id: string }[];
  currentStep: number;
}

export function StepperIndicator({ steps, currentStep }: StepperProps) {
  return (
    <div className="mb-8">
      <div className="flex w-full gap-1">
        {steps.map((step, index) => (
          <div key={step.id} className="w-full flex flex-col items-center">
            <div
              className={`w-full h-0.5 rounded-2xl
                ${index <= currentStep ? 'bg-primary-green-100' : 'bg-secondary-blue-500'}`}
            ></div>
          </div>
        ))}
      </div>
    </div>
  );
}
