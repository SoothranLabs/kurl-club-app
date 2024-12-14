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
      <div className="mb-6">
        <h1 className="text-[28px] font-medium  font-figtree mb-2 text-Primary-White">Enter OTP</h1>
        <span className="text-[14px] text-[#F8F8F8]">
          Enter the OTP sent to your phone
        </span>
      </div>
      <FormProvider {...form}>
        <form
          onSubmit={form.handleSubmit(handleFormSubmit)}
          className="flex flex-col"
        >
          <KFormField
            fieldType={KFormFieldType.OTP}
            control={form.control}
            name="otp"
            label="Enter OTP"
            placeholder="Enter 6-digit OTP"
          />
          <Button type="submit" className="w-full mt-4">
            Verify
          </Button>
        </form>
      </FormProvider>
    </div>
  );
};
