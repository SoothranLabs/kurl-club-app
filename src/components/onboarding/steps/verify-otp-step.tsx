import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';

import { OTPSchema } from '@/schemas';

import { Button } from '@/components/ui/button';
import { KFormField, KFormFieldType } from '@/components/form/k-formfield';

type VerifyOTPStepData = z.infer<typeof OTPSchema>;

type VerifyOTPStepProps = {
  onSubmit: (data: VerifyOTPStepData) => void;
};

export const VerifyOTPStep = ({ onSubmit }: VerifyOTPStepProps) => {
  const form = useForm<VerifyOTPStepData>({
    resolver: zodResolver(OTPSchema),
    defaultValues: { otp: '' },
  });

  const handleFormSubmit = (data: VerifyOTPStepData) => {
    console.log(`Submitting OTP: ${data.otp}`);
    onSubmit(data);
  };

  return (
    <div>
      <div>
        <h2>Enter OTP</h2>
        <span>Enter the OTP sent to your phone</span>
      </div>
      <FormProvider {...form}>
        <form
          onSubmit={form.handleSubmit(handleFormSubmit)}
          className="flex flex-col"
        >
          <KFormField
            fieldType={KFormFieldType.INPUT}
            control={form.control}
            name="otp"
            label="OTP"
            placeholder="XXXXXX"
          />
          <Button type="submit" className="w-full mt-4">
            Submit OTP
          </Button>
        </form>
      </FormProvider>
    </div>
  );
};
