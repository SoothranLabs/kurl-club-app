'use client';

import { useState, useTransition, useCallback } from 'react';
import * as z from 'zod';
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { register } from '@/services/auth/actions';
import { RegisterSchema } from '@/schemas';

import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { AuthWrapper } from '@/components/auth/auth-wrapper';
import { KFormField, KFormFieldType } from '@/components/form/k-formfield';

const RegistrationSuccess = () => (
  <AuthWrapper>
    <div className="flex flex-col gap-7 text-center">
      <h4 className="text-white font-semibold text-[32px] leading-normal">
        Verify Email ✅
      </h4>
      <p className="text-xl font-medium leading-normal text-white">
        KurlClub has sent a mail to your account. Login by following the link
        there!
      </p>
    </div>
  </AuthWrapper>
);

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
    (values: z.infer<typeof RegisterSchema>) => {
      startTransition(async () => {
        const result = await register(values);

        if (result.error) {
          toast.error(result.error);
        } else if (result.success) {
          toast.success(result.success);
          setIsSuccess(true);
        }
      });
    },
    []
  );

  if (isSuccess) return <RegistrationSuccess />;

  return (
    // TODO: Scroll is presenting when warning text appears
    <AuthWrapper
      header={{
        title: 'Create an Account',
        description: 'Sign up to get started with our platform',
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
