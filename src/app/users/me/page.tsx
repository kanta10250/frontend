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
  const [description, setDescription] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchUser = async () => {
      const user = await supabase.auth.getUser();
      setData(user);

      if (!user) {
        router.push('/login');
      }

      const id = user.data.user?.id;

      const { data: userData } = await supabase
        .from('users')
        .select('description, name')
        .eq('id', id)
        .single();

      setUserData(userData);
      setDescription(userData?.description || '');
      setName(user.data.user?.user_metadata.full_name ?? '');
    };

    fetchUser();
  }, [router, supabase]);

  const avatarUrl = `https://ui-avatars.com/api/?name=${name}&size=512`;
  const userName = data?.data?.user?.user_metadata?.full_name;

  const handleUpdate = async () => {
    setLoading(true);
    const id = data.data.user?.id;

    const { error } = await supabase
      .from('users')
      .update({ description, name })
      .eq('id', id);

    if (error) {
      console.error('Error updating user:', error);
    } else {
      // 成功時の処理
      setUserData((prev: any) => ({ ...prev, description, name }));
    }
    setLoading(false);
  };

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
          {userData?.description || 'No description'}
        </p>

        {/* ユーザー情報更新フォーム */}
        <div className="mt-4 w-full">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            className="mb-2 w-full rounded border border-zinc-300 p-2"
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
            className="mb-4 w-full rounded border border-zinc-300 p-2"
          />
          <button
            onClick={handleUpdate}
            disabled={loading}
            className={`w-full rounded bg-blue-500 p-2 text-white ${loading ? 'opacity-50' : ''}`}
          >
            {loading ? 'Updating...' : 'Update'}
          </button>
        </div>
      </div>
    </div>
  );
}
