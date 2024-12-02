import { UseFormReturn } from 'react-hook-form';
import { MultiStepFormData } from '@/types';
import { KFormField, KFormFieldType } from '../form/k-formfield';

// import * as z from 'zod';
// import { useForm } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { phoneVerify } from '@/schemas';

interface PhoneVerifyProps {
  form: UseFormReturn<MultiStepFormData>;
}

// const form = useForm<z.infer<typeof phoneVerify>>({
//   resolver: zodResolver(phoneVerify),
//   defaultValues: {
//     phone: '',
//   },
// });

export function VerifyPhone({ form }: PhoneVerifyProps) {
  return (
    <div className="">
      <div>
        <h2>Verify Phone</h2>
        <span>A verification code will send your Phone</span>
      </div>
      <KFormField
        fieldType={KFormFieldType.PHONE_INPUT}
        control={form.control}
        name="phone"
        label="Phone number"
        placeholder="(555) 123-4567"
      />
    </div>
  );
}
