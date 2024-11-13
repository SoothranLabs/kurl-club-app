'use client';

import { ThemeModeToggle } from '@/components/theme-toggler';
import { Button } from '@/components/ui/button';
import SignOutButton from '@/components/auth/signout-button';
import useUser from '@/hooks/useUser';
import SampleTestPage from '@/components/sample-test-page';
import CButton from '@/components/form/button';

export default function Home() {
  const { data: user, isFetching, error } = useUser();

  if (isFetching) return <p>Loading...</p>;
  if (error) return <p>Error loading user data.</p>;

  return (
    <main className="flex justify-center items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <div className="flex flex-col gap-5">
        <Button>Welcome {user?.display_name || 'Guest'} to KurlClub</Button>
        <CButton>KurlClub Button</CButton>
        <CButton type="secondary">KurlClub Secoindary</CButton>
        <CButton icon="/vercel.svg">KurlClub with icon</CButton>
        <CButton className="rounded-full h-12 w-12" icon="icon" />
        <CButton className="rounded-2xl">With style</CButton>
      </div>
      <SignOutButton />
      <ThemeModeToggle />
      <br />
      <SampleTestPage />
    </main>
  );
}
