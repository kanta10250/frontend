import { createBrowserClient } from '@supabase/ssr';

export function createClient() {
  if (
    process.env.NEXT_PUBLIC_SUPABASE_URL === undefined &&
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY === undefined
  ) {
    throw new Error(
      'NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY must be defined',
    );
  }

  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || '',
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '',
  );
}
