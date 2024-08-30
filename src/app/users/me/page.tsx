'use client';

import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function MePage() {
  const supabase = createClient();
  const router = useRouter();
  const [data, setData] = useState<any>(null);
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const user = await supabase.auth.getUser();
      setData(user);

      if (!user) {
        router.push('/login');
      }

      const id = user.data.user?.id;

      const userData = await supabase
        .from('users')
        .select('description, name')
        .eq('id', id);

      setUserData(userData);
    };

    fetchUser();
  }, [router, supabase, supabase.auth]);

  const avatarUrl = `https://ui-avatars.com/api/?name=${userData?.data?.[0]?.name}&size=512`;
  const userName = data?.data?.user?.user_metadata?.full_name;

  return (
    <div className="flex flex-1 flex-col items-center justify-center px-20">
      <div className="flex w-full flex-col items-start rounded-lg border border-zinc-300 bg-white p-6">
        <Image
          src={avatarUrl}
          alt={userName}
          width={100}
          height={100}
          className="mb-4 h-20 w-20 rounded-full"
        />
        <h1 className="mb-2 text-2xl font-semibold">{userName}</h1>
        <p className="mb-4 text-lg text-zinc-600">
          {userData?.data?.[0]?.description || 'No description'}
        </p>
      </div>
    </div>
  );
}
