import type { Metadata } from 'next';

import { LoginForm } from '@/components/auth/login-form';

export const metadata: Metadata = {
  title: 'Login',
  description: 'Login to your Kurl Club Admin account to manage your gym',
};

export default function LoginPage() {
  return <LoginForm />;
}
