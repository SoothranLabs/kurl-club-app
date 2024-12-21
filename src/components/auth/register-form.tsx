'use client';

import { useTransition } from 'react';
import * as z from 'zod';
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { register } from '@/services/actions/register';
import { RegisterSchema } from '@/schemas';

import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { AuthWrapper } from '@/components/auth/auth-wrapper';
import { KFormField, KFormFieldType } from '@/components/form/k-formfield';

export const RegisterForm = () => {
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
      privacyConsent: false,
    },
  });

  const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
    startTransition(() => {
      register(values).then((data) => {
        if (data.error) {
          toast.error(data.error);
        } else if (data.success) {
          toast.success(data.success);
        }
      });
    });
  };

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
          onSubmit={form.handleSubmit(onSubmit)}
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
            Sign Up
          </Button>
        </form>
      </Form>
    </AuthWrapper>
  );
};
