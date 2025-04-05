'use client';

import { useTransition } from 'react';
import type * as z from 'zod';
import type { GymDataDetailsSchema } from '@/schemas';
import { Header } from './header';
import { BasicDetailsForm } from './basic-details-form';

type GymDetails = z.infer<typeof GymDataDetailsSchema>;

export const GymDetailsForm = () => {
  const [, startTransition] = useTransition();

  const handleSubmit = (data: GymDetails) => {
    startTransition(() => {
      console.log(data);
    });
  };

  const handleCancel = () => {
    console.log('Cancelled');
  };

  const handleSave = () => {
    document
      .querySelector('form')
      ?.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
  };

  return (
    <div className="p-4 space-y-4">
      <Header onCancel={handleCancel} onSave={handleSave} />
      <BasicDetailsForm onSubmit={handleSubmit} />
    </div>
  );
};
