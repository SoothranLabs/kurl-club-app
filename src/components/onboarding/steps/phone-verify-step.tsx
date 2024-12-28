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
      <div className="mb-8">
        <h4 className="text-[28px] leading-normal font-medium  mb-4 text-White ">
          Verify phone
        </h4>
        <p className="text-[15px] leading-normal font-normal text-white">
          A verification code shall be sent to your phone
        </p>
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
          {/* Add button disabled true if there is no data in input phone number */}
          <Button
            disabled={false}
            type="submit"
            className="w-full mt-5 h-[48px]"
          >
            Send verification code
          </Button>
        </form>
      </FormProvider>
    </div>
  );
};
