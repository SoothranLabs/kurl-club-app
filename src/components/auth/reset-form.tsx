'use client';

import { useState, useTransition } from 'react';
import * as z from 'zod';
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import { ResetSchema } from '@/schemas';

import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { AuthWrapper } from '@/components/auth/auth-wrapper';
import { KFormField, KFormFieldType } from '@/components/form/k-formfield';

const ResetSuccess = () => (
  <AuthWrapper>
    <div className="flex flex-col gap-7 text-center">
      <h4 className="text-white font-semibold text-[32px] leading-normal">
        Update your password 🔐
      </h4>
      <p className="text-xl font-medium leading-normal text-white">
        A password reset link has been sent to your email. Please check your
        inbox to reset your password.
      </p>
    </div>
  </AuthWrapper>
);

export const ResetForm = () => {
  const [isPending, startTransition] = useTransition();
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm<z.infer<typeof ResetSchema>>({
    resolver: zodResolver(ResetSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = (values: z.infer<typeof ResetSchema>) => {
    startTransition(() => {
      const auth = getAuth();

      sendPasswordResetEmail(auth, values.email)
        .then(() => {
          toast.success('A password reset link has been sent to your email.');
          setIsSuccess(true);
        })
        .catch((error) => {
          if (error.code === 'auth/user-not-found') {
            toast.error('No user found with this email address.');
          } else {
            toast.error(
              'An error occurred while sending the reset email. Please try again.'
            );
          }
        });
    });
  };

  if (isSuccess) return <ResetSuccess />;

  return (
    <AuthWrapper
      header={{
        title: 'Forgot your password?',
        description: 'We’ll help you to reset it!',
      }}
      footer={{
        linkUrl: '/auth/login',
        linkText: 'Back to login',
      }}
      socials
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-8"
        >
          <KFormField
            fieldType={KFormFieldType.INPUT}
            control={form.control}
            disabled={isPending}
            name="email"
            label="Email address"
          />
          <Button
            type="submit"
            disabled={isPending}
            className="px-3 py-4 h-[46px]"
          >
            Send reset email
          </Button>
        </form>
      </Form>
    </AuthWrapper>
  );
};
