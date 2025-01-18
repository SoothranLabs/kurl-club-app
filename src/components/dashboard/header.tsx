'use client';

import React, { useEffect, useState } from 'react';
import { KFormField, KFormFieldType } from '../form/k-formfield';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { SamplePageSchema } from '@/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '../ui/form';
import { useAuth } from '@/providers/auth-provider';

function Header() {
  const [greeting, setGreeting] = useState('Good morning');
  const { authUser } = useAuth();

  useEffect(() => {
    const currentHour = new Date().getHours();
    if (currentHour >= 5 && currentHour < 12) {
      setGreeting('Good morning 💪');
    } else if (currentHour >= 12 && currentHour < 18) {
      setGreeting('Good afternoon 🌞');
    } else {
      setGreeting('Good evening 🌙');
    }
  }, []);

  const form = useForm<z.infer<typeof SamplePageSchema>>({
    resolver: zodResolver(SamplePageSchema),
    defaultValues: {
      dateOfBirth: undefined,
    },
  });

  const userName = authUser?.displayName || authUser?.email || 'User';

  return (
    <div className="flex justify-between items-start gap-2">
      <div className="flex flex-col">
        <h6 className="text-2xl font-medium leading-normal text-[#747578] capitalize">
          Hello, {userName}
        </h6>
        <h4 className="text-white font-semibold text-[32px] leading-normal">
          {greeting}
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
