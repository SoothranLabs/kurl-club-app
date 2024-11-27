'use client';

import { useTransition } from 'react';
import Link from 'next/link';
import * as z from 'zod';
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { login } from '@/services/actions/login';
import { LoginSchema } from '@/schemas';

import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { AuthWrapper } from '@/components/auth/auth-wrapper';
import { KFormField, KFormFieldType } from '@/components/form/k-formfield';

export const LoginForm = () => {
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    startTransition(() => {
      login(values).then((data) => {
        if (data.error) {
          toast.error(data.error);
        } else if (data.success) {
          toast.success(data.success);
        }
      });
    });
  };

  return (
    <AuthWrapper
      header={{
        title: 'Login',
        description: 'Welcome, let’s get you started!',
      }}
      footer={{
        linkUrl: '/auth/register',
        linkText: 'Don’t have an account',
        isLogin: true,
      }}
      socials
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col">
          <div className="flex flex-col gap-6 sm:gap-8">
            <KFormField
              fieldType={KFormFieldType.INPUT}
              control={form.control}
              disabled={isPending}
              name="email"
              label="Email address"
            />
            <KFormField
              fieldType={KFormFieldType.PASSWORD}
              control={form.control}
              disabled={isPending}
              name="password"
              label="Enter password"
            />
          </div>
          <Button
            size="sm"
            variant="link"
            asChild
            className="px-1 font-normal flex justify-start my-3"
          >
            <Link href="/auth/reset">Forgot password?</Link>
          </Button>
          <Button
            type="submit"
            disabled={isPending}
            className="px-3 py-4 h-[46px]"
          >
            Login
          </Button>
        </form>
      </Form>
    </AuthWrapper>
  );
};
