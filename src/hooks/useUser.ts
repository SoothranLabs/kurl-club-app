'use client';

import { createClient } from '@/services/supabase/client';
import { useQuery } from '@tanstack/react-query';

const initUser = {
  created_at: '',
  id: '',
  display_name: '',
  email: '',
  image_url: '',
};

export default function useUser() {
  const supabase = createClient();

  return useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      const { data } = await supabase.auth.getSession();

      if (data.session?.user) {
        // Fetch user profile information
        const { data: user } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', data.session.user.id)
          .single();

        return user;
      }

      // Fallback to initial user data if user is not logged in
      return initUser;
    },
  });
}
