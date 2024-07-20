'use strict';

export const runtime = 'edge';

import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

export default async function MePage() {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();

  if (error || !data?.user) {
    redirect('/signin');
  }

  const avatarUrl = `https://ui-avatars.com/api/?name=${data?.user?.user_metadata?.full_name}`;
  const userName = data?.user?.user_metadata?.full_name;

  return (
    <div>
      <Image
        src={avatarUrl}
        alt={userName}
        width={100}
        height={100}
        className="rounded-full p-5"
      />
      <div className="p-5">
        <h1>Welcome {userName}</h1>
        <Link href="/logout">ログアウト</Link>
      </div>
    </div>
  );
}
