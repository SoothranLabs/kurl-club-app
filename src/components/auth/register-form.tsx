'use client';

import React, { useState } from 'react';
import { KFormField, KFormFieldType } from '@/components/form/k-formfield';
import { Form } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { PatientFormValidation } from '@/lib/validation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import AuthWrapper from './auth-wrapper';
import { Button } from '../ui/button';
import { useRouter } from 'next/navigation';

function RegisterForm() {
  const [showPasswordField, setShowPasswordField] = useState(false);
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
      checkbox={showPasswordField}
      backBtn={showPasswordField}
      footerDesc="Already have an account?"
      title={showPasswordField ? 'Setup password' : 'Create an account'}
      desc={
        showPasswordField
          ? 'Setup password'
          : 'Sign up your way into effective gym management'
      }
      footerLink="/auth/login"
      socialBtn={!showPasswordField}
      onBackClick={() => setShowPasswordField(false)}
    >
      <Form {...form}>
        <form className="flex flex-col gap-8">
          {!showPasswordField ? (
            <>
              <KFormField
                fieldType={KFormFieldType.INPUT}
                control={form.control}
                name="name"
                label="Full Name"
              />
              <KFormField
                fieldType={KFormFieldType.INPUT}
                control={form.control}
                name="email"
                label="Email address"
              />
              <KFormField
                fieldType={KFormFieldType.PHONE_INPUT}
                control={form.control}
                name="phone"
                label="Phone number"
                placeholder="(555) 123-4567"
              />
            </>
          ) : (
            <>
              <KFormField
                fieldType={KFormFieldType.PASSWORD}
                control={form.control}
                name="name"
                label="Create password"
              />
              <KFormField
                fieldType={KFormFieldType.PASSWORD}
                control={form.control}
                name="email"
                label="Confirm password"
              />
            </>
          )}
          <Button
            onClick={() => {
              if (showPasswordField) {
                router.push('/auth/verify');
              } else {
                setShowPasswordField(true);
              }
            }}
            className="px-3 py-4 h-[46px]"
          >
            {showPasswordField ? 'Signup' : 'Next'}
          </Button>
        </form>
      </Form>
    </AuthWrapper>
  );
}

export default RegisterForm;
