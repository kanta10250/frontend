'use client';

import { createClient } from '@/utils/supabase/client';

export default function SigninPage() {
  const supabase = createClient();

  return (
    <div>
      <h1>Sign in</h1>
      <button
        onClick={() =>
          supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
              redirectTo: `https://nnumokzmtyweliunffwv.supabase.co/auth/v1/callback`,
            },
          })
        }
      >
        Continue with Google
      </button>
    </div>
  );
}
