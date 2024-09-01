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
  const [isEditing, setIsEditing] = useState<boolean>(false);

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
      setUserData((prev: any) => ({ ...prev, description, name }));
      setIsEditing(false); // Close the form
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-1 flex-col items-center justify-center px-4 py-10 sm:px-10">
      <div className="flex w-full max-w-lg flex-col items-center bg-white p-6">
        <Image
          src={avatarUrl}
          alt={userName}
          width={100}
          height={100}
          className="mb-4 h-24 w-24 rounded-full"
        />
        <h1 className="mb-2 text-2xl font-semibold text-gray-900">
          {userName}
        </h1>
        <p className="mb-4 text-center text-lg text-gray-600">
          {userData?.description || 'No description'}
        </p>

        {/* Update button */}
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="mb-4 rounded-md bg-blue-500 px-4 py-2 text-white transition-colors duration-200 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
          >
            変更する
          </button>
        )}

        {/* User data update form */}
        {isEditing && (
          <div className="mt-4 w-full">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
              className="mb-3 w-full rounded-md border border-zinc-300 p-3 text-gray-800 focus:border-blue-500 focus:outline-none"
            />
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description"
              className="mb-4 w-full rounded-md border border-zinc-300 p-3 text-gray-800 focus:border-blue-500 focus:outline-none"
              rows={4}
            />
            <button
              onClick={handleUpdate}
              disabled={loading}
              className={`w-full rounded-md bg-blue-500 py-2 text-white transition-colors duration-200 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 ${loading ? 'cursor-not-allowed opacity-50' : ''}`}
            >
              {loading ? 'Updating...' : 'Update'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
