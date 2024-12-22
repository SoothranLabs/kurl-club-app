import { Suspense } from 'react';
import { UpdatePasswordForm } from '@/components/auth/update-pw-form';

const UpdatePasswordPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <UpdatePasswordForm />;
    </Suspense>
  );
};

export default UpdatePasswordPage;
