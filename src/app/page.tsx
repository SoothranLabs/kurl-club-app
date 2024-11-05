"use client";

import { ThemeModeToggle } from "@/components/theme-toggler";
import { Button } from "@/components/ui/button";
import SignOutButton from "@/components/auth/signout-button";
import useUser from "@/hooks/useUser";

export default function Home() {
  const { data: user, isFetching, error } = useUser();

  if (isFetching) return <p>Loading...</p>;
  if (error) return <p>Error loading user data.</p>;

  return (
    <main className="flex justify-center items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <Button>Welcome {user?.display_name || "Guest"} to KurlClub</Button>
      <SignOutButton />
      <ThemeModeToggle />
    </main>
  );
}
