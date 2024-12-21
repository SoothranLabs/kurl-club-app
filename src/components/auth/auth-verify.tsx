'use client';

import { useCallback, useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { verifyEmail } from '@/services/auth/actions';

export const AuthVerify = () => {
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>(
    'loading'
  );
  const [message, setMessage] = useState<string>('');
  const searchParams = useSearchParams();
  const router = useRouter();

  // Memoized email verification handler
  const handleVerification = useCallback(async () => {
    const token = searchParams.get('token');

    if (!token) {
      const errorMessage = 'Missing token!';
      setStatus('error');
      setMessage(errorMessage);
      toast.error(errorMessage);
      return;
    }

    try {
      const result = await verifyEmail(token);

      if (result.error) {
        setStatus('error');
        setMessage(result.error);
        toast.error(result.error);
      } else if (result.success) {
        setStatus('success');
        setMessage(result.success);
        toast.success(result.success);

        setTimeout(() => router.push('/auth/login'), 3000);
      }
    } catch {
      const errorMessage = 'Something went wrong!';
      setStatus('error');
      setMessage(errorMessage);
      toast.error(errorMessage);
    }
  }, [searchParams, router]);

  // Trigger email verification on component mount
  useEffect(() => {
    handleVerification();
  }, [handleVerification]);

  // Render based on verification status
  return (
    <div className="flex flex-col gap-7 text-center">
      <h4 className="text-white font-semibold text-[32px] leading-normal">
        {status === 'success' ? 'Email Verified ✅' : 'Verify Email...'}
      </h4>
      <p className="text-xl font-medium leading-normal text-white">
        {status === 'success'
          ? 'Your email has been successfully verified. Redirecting to login...'
          : status === 'error'
            ? message
            : 'KurlClub is verifying your email. Please wait...'}
      </p>
    </div>
  );
};
