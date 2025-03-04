'use client';

import { KFormField, KFormFieldType } from '../form/k-formfield';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { SamplePageSchema } from '@/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '../ui/form';
import { useAuth } from '@/providers/auth-provider';
import { getGreeting } from '@/lib/utils';

function Header() {
  const { appUser } = useAuth();

  const form = useForm<z.infer<typeof SamplePageSchema>>({
    resolver: zodResolver(SamplePageSchema),
    defaultValues: {
      dateOfBirth: undefined,
    },
  });

  const userName = appUser?.userName || appUser?.userEmail || 'User';

  return (
    <div className="flex justify-between items-start gap-2">
      <div className="flex flex-col">
        <h6 className="text-2xl font-medium leading-normal text-[#747578] capitalize">
          Hello, {userName}
        </h6>
        <h4 className="text-white font-semibold text-[32px] leading-normal">
          {getGreeting()}
        </h4>
      </div>
      <Form {...form}>
        <form>
          <KFormField
            fieldType={KFormFieldType.DATE_PICKER}
            control={form.control}
            name="dateOfBirth"
            label="Date of birth"
            numberOfMonths={2}
            dateLabel="Last month"
            showPresets
          />
        </form>
      </Form>
    </div>
  );
}

export default Header;
