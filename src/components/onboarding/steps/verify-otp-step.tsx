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
      <div className="mb-8">
        <h4 className="text-[28px] leading-normal font-medium  mb-4 text-White ">
          Enter OTP
        </h4>
        <p className="text-[15px] leading-normal font-normal text-white">
          Enter the OTP sent to your phone
        </p>
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
          {/* Add button disabled true if there is no data in otp */}
          <Button
            disabled={false}
            type="submit"
            className="w-full mt-5 h-[48px]"
          >
            Verify
          </Button>
        </form>
      </FormProvider>
    </div>
  );
};
