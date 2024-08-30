'use client';

import { createClient } from '@/utils/supabase/client';
import { redirect } from 'next/navigation';
import { useEffect, useState } from 'react';

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
      <div className="flex h-full flex-col px-10 py-20">
        <h1 className="mb-4 text-2xl font-semibold">いいねした投稿</h1>
        <div className="flex flex-col space-y-4">
          {favorites?.map((favorites: any) => (
            <div
              key={favorites.id}
              className="flex flex-col rounded-lg border border-zinc-300 bg-white p-6"
            >
              <h1 className="mb-2 text-xl font-semibold">
                {favorites.posts.name}
              </h1>
              <p className="mb-4 text-lg text-zinc-600">
                {favorites.posts.animals}
              </p>
              <p className="mb-4 text-lg text-zinc-600">
                {favorites.posts.created_at}
              </p>
              <p className="mb-4 text-lg text-zinc-600">
                {favorites.posts.updated_at}
              </p>
              <button
                className="rounded-lg border p-2"
                onClick={() => removeFavoritePost(favorites.posts.id)}
              >
                いいねを解除する
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
