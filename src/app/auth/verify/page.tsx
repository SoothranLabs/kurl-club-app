import React, { Suspense } from 'react';
import { AuthWrapper } from '@/components/auth/auth-wrapper';

function VerifyPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AuthWrapper verification />
    </Suspense>
  );
}

export default VerifyPage;
