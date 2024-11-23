'use client';

import React from 'react';
import { KFormField, KFormFieldType } from '@/components/form/k-formfield';
import { Form } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { PatientFormValidation } from '@/lib/validation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import AuthWrapper from './auth-wrapper';
import { Button } from '../ui/button';
import { useRouter } from 'next/navigation';

function LoginForm() {
  const router = useRouter();
  const form = useForm<z.infer<typeof PatientFormValidation>>({
    resolver: zodResolver(PatientFormValidation),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
    },
  });

  return (
    <AuthWrapper
      isLogin
      footerDesc="Don’t have an account"
      title="Login"
      desc="Welcome, let’s get you started !"
      footerLink="/auth/register"
    >
      <Form {...form}>
        <form className="flex flex-col gap-6 sm:gap-8">
          <KFormField
            fieldType={KFormFieldType.INPUT}
            control={form.control}
            name="email"
            label="Email address"
          />
          <KFormField
            fieldType={KFormFieldType.PASSWORD}
            control={form.control}
            name="name"
            label="Enter password"
          />
          <Button
            onClick={() => {
              router.push('/');
            }}
            className="px-3 py-4 h-[46px]"
          >
            Login
          </Button>
        </form>
      </Form>
    </AuthWrapper>
  );
}

export default LoginForm;
