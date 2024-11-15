'use client';

import { ThemeModeToggle } from '@/components/theme-toggler';
import { Button } from '@/components/ui/button';
import SignOutButton from '@/components/auth/signout-button';
import useUser from '@/hooks/useUser';
import SampleTestPage from '@/components/sample-test-page';
import { KCalenderMonth } from '@/components/icons';

export default function Home() {
  const { data: user, isFetching, error } = useUser();

  if (isFetching) return <p>Loading...</p>;
  if (error) return <p>Error loading user data.</p>;

  return (
    <main className="flex justify-center items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <div className="flex flex-col gap-5">
        <Button>Welcome {user?.display_name || 'Guest'} to KurlClub</Button>
        <Button>KurlClub Button</Button>
        <Button variant="secondary">KurlClub Secoindary</Button>
        <Button>
          <KCalenderMonth className="bg-black" /> KurlClub with icon
        </Button>
        <Button variant="outline" size="icon">
          <KCalenderMonth />
        </Button>
        <Button className="rounded-2xl">With style</Button>
        <Button className="w-fit">With w-fit</Button>
      </div>
      <SignOutButton />
      <ThemeModeToggle />
      <br />
      <SampleTestPage />
    </main>
  );
}
