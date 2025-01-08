import { Suspense } from 'react';
import ActivateScreen from '@/components/auth/activate-page';

const ActivatePage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ActivateScreen />
    </Suspense>
  );
};

export default ActivatePage;
