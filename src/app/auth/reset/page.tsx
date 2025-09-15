import type { Metadata } from 'next';

import { ResetForm } from '@/components/auth/reset-form';

export const metadata: Metadata = {
  title: 'Reset Password',
  description: 'Reset your Kurl Club Admin account password',
};

const ResetPage = () => {
  return <ResetForm />;
};

export default ResetPage;
