'use client';

import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';

export default function Logout() {
  const supabase = createClient();
  const router = useRouter();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/');
  };

  return (
    <div className="flex h-screen flex-col items-center justify-center space-y-5 text-center">
      <h1>ログアウトする場合は以下のボタンをクリックしてください</h1>
      <button
        type="button"
        onClick={handleLogout}
        className="inline-flex w-full max-w-sm items-center justify-center gap-x-2 rounded-lg border-2 border-black bg-white px-20 py-3 text-sm font-semibold text-gray-800 shadow-sm hover:bg-gray-50 focus:bg-gray-50 focus:outline-none disabled:pointer-events-none disabled:opacity-50"
      >
        ログアウトする
      </button>
    </div>
  );
}
