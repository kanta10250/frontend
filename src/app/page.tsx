'use client';

import { createClient } from '@/utils/supabase/client';
import { redirect } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function Home() {
  const supabase = createClient();
  const [data, setData] = useState<any | null>(null);
  const [user, setUser] = useState<any | null>(null);
  const [favorites, setFavorites] = useState<any[] | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      // get created_at, updated_at, and name, animals, and id
      const { data, error } = await supabase.from('posts').select('*');
      setData(data);
    };

    const getMeAndFavorites = async () => {
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

    getMeAndFavorites();
    fetchPosts();
  }, [supabase]);

  async function favoritePost(post_id: string) {
    if (!favorites) return;
    await supabase
      .from('favorites')
      .insert({ user_id: user.id, post_id: post_id });
    setFavorites([
      ...favorites,
      {
        post_id: post_id,
        user_id: user.id,
      },
    ]);
  }

  async function removeFavoritePost(post_id: string) {
    if (!favorites) return;
    setFavorites(
      favorites.filter((favorite: any) => favorite.post_id != post_id),
    );
    await supabase
      .from('favorites')
      .delete()
      .eq('user_id', user.id)
      .eq('post_id', post_id);
  }

  function checkFavorite(post_id: string) {
    console.log(favorites);
    return favorites?.some((favorite) => favorite.post_id === post_id);
  }

  return (
    <div className="flex flex-1 flex-col items-center justify-center overflow-scroll">
      <div className="flex h-full flex-col px-10 py-20">
        <h1 className="mb-4 text-2xl font-semibold">投稿</h1>
        <div className="flex flex-col space-y-4">
          {data?.map((post: any) => (
            <div
              key={post.id}
              className="flex flex-col rounded-lg border border-zinc-300 bg-white p-6"
            >
              <h1 className="mb-2 text-xl font-semibold">{post.name}</h1>
              <p className="mb-4 text-lg text-zinc-600">{post.animals}</p>
              <p className="mb-4 text-lg text-zinc-600">{post.created_at}</p>
              <p className="mb-4 text-lg text-zinc-600">{post.updated_at}</p>
              {checkFavorite(post.id) ? (
                <button
                  className="rounded-lg border p-2"
                  onClick={() => removeFavoritePost(post.id)}
                >
                  いいねを解除する
                </button>
              ) : (
                <button
                  className="rounded-lg border p-2"
                  onClick={() => favoritePost(post.id)}
                >
                  この投稿をいいね
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
