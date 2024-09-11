'use client';

import { createClient } from '@/utils/supabase/client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const supabase = createClient();
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchUser = async () => {
      const user = await supabase.auth.getUser();

      if (user) {
        router.push('/users/me');
      }

      setLoading(false);
    };

    fetchUser();
  }, [router, supabase]);

  return (
    <div className="mx-auto flex h-screen w-screen flex-col items-center justify-center p-4">
      {!loading && (
        <button
          type="button"
          className="inline-flex w-full max-w-sm items-center justify-center gap-x-2 rounded-lg border-2 border-black bg-white px-20 py-3 text-sm font-semibold text-gray-800 shadow-sm hover:bg-gray-50 focus:bg-gray-50 focus:outline-none disabled:pointer-events-none disabled:opacity-50"
          onClick={() =>
            supabase.auth.signInWithOAuth({
              provider: 'google',
              options: {
                redirectTo: `https://nnumokzmtyweliunffwv.supabase.co/auth/v1/callback`,
              },
            })
          }
        >
          ログインする
        </button>
      )}
    </div>
  );
}
