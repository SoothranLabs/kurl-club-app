import { useRouter } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';
import { createClient } from '@/services/supabase/client';
import { Button } from '../ui/button';

const SignOutButton = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const handleSignOut = async () => {
    const supabase = createClient();
    queryClient.clear();
    await supabase.auth.signOut();
    router.refresh();
  };
  return (
    <Button variant="outline" onClick={handleSignOut}>
      Sign Out
    </Button>
  );
};

export default SignOutButton;
