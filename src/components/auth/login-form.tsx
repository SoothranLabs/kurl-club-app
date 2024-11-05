"use client";

import { Button } from "@/components/ui/button";
import { createClient } from "@/services/supabase/client";

const LoginUpForm = () => {
  const handleLoginWithOAuth = (provider: "github" | "google") => {
    // Implement OAuth login logic using the provider
    const client = createClient();
    client.auth.signInWithOAuth({
      provider,
      options: { redirectTo: location.origin + "/auth/callback" },
    });
  };

  return (
    <Button onClick={() => handleLoginWithOAuth("github")}>
      Login with Github
    </Button>
  );
};

export default LoginUpForm;
