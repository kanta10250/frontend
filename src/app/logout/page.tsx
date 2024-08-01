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
        <div className="flex h-screen flex-col items-center justify-center space-y-5">
            <h1>ログアウトする場合は以下のボタンをクリックしてください</h1>
            <button
                onClick={handleLogout}
                className="rounded-md bg-blue-500 p-2 text-white"
            >
                ログアウト
            </button>
        </div>
    );
}
