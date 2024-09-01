'use client';

import { createClient } from '@/utils/supabase/client';
import { redirect } from 'next/navigation';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);

export default function Favorites() {
  const supabase = createClient();
  const [favorites, setFavorites] = useState<any | null>(null);
  const [user, setUser] = useState<any | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const { data: auth, error } = await supabase.auth.getUser();
      if (error || !auth?.user) {
        redirect('/login');
      }
      const { data: favorites } = await supabase
        .from('favorites')
        .select('*, posts(*)')
        .eq('user_id', auth.user.id);
      setUser(auth.user);
      setFavorites(favorites);
    };

    fetchData();
  }, [supabase]);

  async function removeFavoritePost(post_id: string) {
    setFavorites(
      favorites.filter((favorite: any) => favorite.posts.id != post_id),
    );
    await supabase
      .from('favorites')
      .delete()
      .eq('user_id', user.id)
      .eq('post_id', post_id);
  }

  return (
    <div className="flex flex-1 flex-col items-center justify-center overflow-scroll">
      <div className="flex h-full w-full flex-col px-10 py-20">
        <h1 className="mb-4 text-2xl font-semibold">いいねした投稿</h1>
        <div className="flex flex-col space-y-4">
          {favorites?.map((favorite: any) => (
            <div
              key={favorite.id}
              className="block max-w-sm rounded-lg border border-gray-200 bg-white p-6 shadow"
            >
              <h1 className="mb-2 text-xl font-semibold text-gray-900">
                {favorite.posts.name}
              </h1>
              <p className="mb-4 text-base text-gray-600">
                一緒に行けるペット: {favorite.posts.animals}
              </p>
              <div className="flex items-end justify-between">
                <div>
                  <p className="mb-2 text-xs text-gray-500">
                    作成日:{' '}
                    {dayjs(favorite.posts.created_at)
                      .tz('Asia/Tokyo')
                      .format('YYYY-MM-DD HH:mm')}
                  </p>
                  <p className="text-xs text-gray-500">
                    更新日:{' '}
                    {dayjs(favorite.posts.updated_at)
                      .tz('Asia/Tokyo')
                      .format('YYYY-MM-DD HH:mm')}
                  </p>
                </div>
                <button
                  className="cursor-pointer text-red-500 hover:text-red-600"
                  onClick={() => removeFavoritePost(favorite.posts.id)}
                >
                  いいねを解除する
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
