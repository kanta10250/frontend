'use client';

import { createClient } from '@/utils/supabase/client';
import dynamic from 'next/dynamic';

const Map = dynamic(() => import('@/components/maps'), { ssr: false });

export default function Posts() {
  const supabase = createClient();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const name = formData.get('name') as string;
    const category = formData.getAll('category') as string[];
    const description = formData.get('description') as string;
    const url = formData.get('url') as string;
    const websiteUrl = formData.get('websiteUrl') as string;

    const { data, error } = await supabase.from('posts').insert([
      {
        name,
        animals: category,
        description,
        location: 'Tokyo',
        google_map_url: url,
        website_url: websiteUrl,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);

    if (error) {
      console.error('error', error);
    } else {
      console.log('data', data);
    }
  };

  return (
    <div className="flex h-full w-full flex-col">
      <div className="flex h-1/2 flex-col">
        <Map />
      </div>
      <div className="h-1/2">
        <h1 className="mb-4 text-2xl font-bold">Posts</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <input
              type="text"
              placeholder="Name"
              id="name"
              name="name"
              required
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
            />
          </div>
          <div>
            <label
              htmlFor="category"
              className="block text-sm font-medium text-gray-700"
            >
              Category
            </label>
            <div className="mt-1">
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  name="category"
                  value="犬"
                  className="form-checkbox h-4 w-4 text-blue-600"
                />
                <span className="ml-2">犬</span>
              </label>
              <label className="ml-4 inline-flex items-center">
                <input
                  type="checkbox"
                  name="category"
                  value="猫"
                  className="form-checkbox h-4 w-4 text-blue-600"
                />
                <span className="ml-2">猫</span>
              </label>
            </div>
          </div>
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Description
            </label>
            <textarea
              placeholder="Description"
              id="description"
              name="description"
              required
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
            />
          </div>
          <div>
            <label
              htmlFor="url"
              className="block text-sm font-medium text-gray-700"
            >
              URL
            </label>
            <input
              type="url"
              placeholder="URL"
              id="url"
              name="url"
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
            />
          </div>
          <div>
            <label
              htmlFor="websiteUrl"
              className="block text-sm font-medium text-gray-700"
            >
              Website URL
            </label>
            <input
              type="url"
              placeholder="Website URL"
              id="websiteUrl"
              name="websiteUrl"
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full rounded-md bg-blue-600 px-4 py-2 font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
