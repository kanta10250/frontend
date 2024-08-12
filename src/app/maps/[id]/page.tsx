import PostDetails from '@/components/post/details';
import { createClient } from '@/utils/supabase/server';

export default async function GetPost({ params }: { params: { id: string } }) {
  const supabase = createClient();

  const { data } = await supabase
    .from('posts')
    .select('*')
    .eq('id', params.id)
    .single();

  return (
    <div className="relative flex h-full flex-col bg-stone-200">
      <PostDetails post={data} />
    </div>
  );
}
