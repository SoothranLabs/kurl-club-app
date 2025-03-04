'use client';

import { useState, useTransition, useCallback } from 'react';
import * as z from 'zod';
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { registerUser } from '@/services/auth';
import { RegisterSchema } from '@/schemas';

import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { AuthWrapper } from '@/components/auth/auth-wrapper';
import { KFormField, KFormFieldType } from '@/components/form/k-formfield';
import { EmailSendSuccess } from '@/components/auth/email-send-success';

export const RegisterForm = () => {
  const [isPending, startTransition] = useTransition();
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
      privacyConsent: false,
    },
  });

  const handleFormSubmit = useCallback(
    async (values: z.infer<typeof RegisterSchema>) => {
      if (isPending) return;

      startTransition(async () => {
        try {
          const result = await registerUser(values);

          if (result.error) {
            toast.error(result.error);
          } else {
            toast.success(result.success || 'Registration successful!');
            setIsSuccess(true);
          }
        } catch (error) {
          toast.error('An unexpected error occurred.');
          console.error('Registration error:', error);
        }
      });
    },
    [isPending]
  );

  if (isSuccess) return <EmailSendSuccess />;

  return (
    <AuthWrapper
      header={{
        title: 'Create an Account',
        description: 'Sign up to get started with our platform.',
      }}
      footer={{
        linkUrl: '/auth/login',
        linkText: 'Already have an account?',
        isLogin: false,
      }}
      socials
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleFormSubmit)}
          className="flex flex-col gap-8"
        >
          <KFormField
            fieldType={KFormFieldType.INPUT}
            control={form.control}
            disabled={isPending}
            name="email"
            label="Email Address"
          />
          <KFormField
            fieldType={KFormFieldType.PASSWORD}
            control={form.control}
            disabled={isPending}
            name="password"
            label="Password"
          />
          <KFormField
            fieldType={KFormFieldType.PASSWORD}
            control={form.control}
            disabled={isPending}
            name="confirmPassword"
            label="Confirm Password"
          />
          <KFormField
            fieldType={KFormFieldType.CHECKBOX}
            control={form.control}
            disabled={isPending}
            name="privacyConsent"
            label="I agree to the terms and conditions"
          />

          <Button
            type="submit"
            disabled={isPending}
            className="px-3 py-4 h-[46px]"
          >
            {isPending ? 'Submitting...' : 'Sign Up'}
          </Button>
        </form>
      </Form>
    </AuthWrapper>
  );
};
