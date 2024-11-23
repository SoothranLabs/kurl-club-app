import AuthVerify from '@/components/auth/auth-verify';
import React from 'react';
import LoginLayout from '@/components/auth/auth-layout';

function VerifyPage() {
  return (
    <LoginLayout>
      <AuthVerify />
    </LoginLayout>
  );
}

export default VerifyPage;
