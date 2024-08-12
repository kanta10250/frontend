'use client';

import { createClient } from '@/utils/supabase/client';
import { useState, useEffect } from 'react';

export default function Home() {
  const supabase = createClient();
  const [data, setData] = useState<any | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      // get created_at, updated_at, and name, animals, and id
      const { data, error } = await supabase.from('posts').select('*');
      setData(data);
    };

    fetchPosts();
  }, [supabase]);

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
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
