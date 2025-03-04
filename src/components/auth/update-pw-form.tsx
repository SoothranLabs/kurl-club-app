'use client';

import { useTransition } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import * as z from 'zod';
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { getAuth, confirmPasswordReset } from 'firebase/auth';

import { UpdatePasswordSchema } from '@/schemas';

import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { AuthWrapper } from '@/components/auth/auth-wrapper';
import { KFormField, KFormFieldType } from '@/components/form/k-formfield';

export const UpdatePasswordForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const oobCode = searchParams.get('oobCode');
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof UpdatePasswordSchema>>({
    resolver: zodResolver(UpdatePasswordSchema),
    defaultValues: {
      newPassword: '',
      confirmPassword: '',
    },
  });

  const onSubmit = (values: z.infer<typeof UpdatePasswordSchema>) => {
    if (!oobCode) {
      toast.error('Invalid or expired reset code');
      return;
    }

    startTransition(() => {
      const auth = getAuth();

      confirmPasswordReset(auth, oobCode, values.newPassword)
        .then(() => {
          toast.success('Password updated successfully');
          router.push('/auth/login');
        })
        .catch((error) => {
          if (error.code === 'auth/invalid-action-code') {
            toast.error('Invalid or expired reset link');
          } else {
            toast.error('An error occurred while updating the password');
          }
        });
    });
  };

  return (
    <AuthWrapper
      header={{
        title: 'Change Password',
        description: 'Create a new password',
      }}
      footer={{
        linkUrl: '/auth/login',
        linkText: 'Back to login',
      }}
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-8"
        >
          <KFormField
            fieldType={KFormFieldType.PASSWORD}
            control={form.control}
            disabled={isPending}
            name="newPassword"
            label="Password"
          />
          <KFormField
            fieldType={KFormFieldType.PASSWORD}
            control={form.control}
            disabled={isPending}
            name="confirmPassword"
            label="Confirm Password"
          />

          <Button
            type="submit"
            disabled={isPending}
            className="px-3 py-4 h-[46px]"
          >
            Change password
          </Button>
        </form>
      </Form>
    </AuthWrapper>
  );
};
