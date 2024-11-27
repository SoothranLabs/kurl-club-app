'use client';

import { useTransition } from 'react';
import * as z from 'zod';
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { resetPassword } from '@/services/actions/reset';
import { ResetSchema } from '@/schemas';

import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { AuthWrapper } from '@/components/auth/auth-wrapper';
import { KFormField, KFormFieldType } from '@/components/form/k-formfield';

export const ResetForm = () => {
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof ResetSchema>>({
    resolver: zodResolver(ResetSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = (values: z.infer<typeof ResetSchema>) => {
    startTransition(() => {
      resetPassword(values).then((data) => {
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
