import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';

import { PhoneVerifySchema } from '@/schemas';

import { Button } from '@/components/ui/button';
import { KFormField, KFormFieldType } from '@/components/form/k-formfield';

type PhoneVerifyStepData = z.infer<typeof PhoneVerifySchema>;

type PhoneVerifyStepProps = {
  onSubmit: (data: PhoneVerifyStepData) => void;
};

export const PhoneVerifyStep = ({ onSubmit }: PhoneVerifyStepProps) => {
  const form = useForm<PhoneVerifyStepData>({
    resolver: zodResolver(PhoneVerifySchema),
    defaultValues: { phone: '' },
  });

  const handleFormSubmit = (data: PhoneVerifyStepData) => {
    console.log(`Sending OTP to: ${data.phone}`);
    onSubmit(data);
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-[28px] font-medium  font-figtree mb-2 text-Primary-White">Verify Phone</h1>
        <span className="text-[14px] text-[#F8F8F8]">
          A verification code will be sent to your phone
        </span>
      </div>
      <FormProvider {...form}>
        <form
          onSubmit={form.handleSubmit(handleFormSubmit)}
          className="flex flex-col"
        >
          <KFormField
            fieldType={KFormFieldType.PHONE_INPUT}
            control={form.control}
            name="phone"
            label="Phone number"
            placeholder="(555) 123-4567"
          />
          <Button type="submit" className="w-full mt-4">
            Send Verification
          </Button>
        </form>
      </FormProvider>
    </div>
  );
};
