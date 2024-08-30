import { createClient } from '@/utils/supabase/server';

export const runtime = 'edge';

export default async function Favorites() {
  const supabase = createClient();

  const auth = await supabase.auth.getUser();

  const { data: favorites } = await supabase
    .from('favorites')
    .select('*, posts(*)')
    .eq('user_id', auth.data.user?.id);

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
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
