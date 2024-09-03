'use client';

import { useMarkerContext } from '@/context/markerContext';
import { createClient } from '@/utils/supabase/client';
import { useActionContext } from '@/context/actionContext';
import { useState } from 'react';
import { XIcon } from 'lucide-react';
import { fetchLocation } from '../../utils/react-leaflet/fetchLocation';
import { redirect } from 'next/navigation';

export default function Posts() {
  const supabase = createClient();
  const { toggleButtonState } = useActionContext();

  const { markerState } = useMarkerContext();
  const [complete, SetCompleteSubmit] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const name = formData.get('name') as string;
    const category = formData.getAll('category') as string[];
    const description = formData.get('description') as string;
    const url = formData.get('url') as string;

    const markerLocation = markerState?.getLatLng();

    if (!markerLocation) {
      alert('Please select a location on the map');
      return;
    }

    const lat = markerLocation.lat;
    const lng = markerLocation.lng;

    const nowLocation = await fetchLocation(lat, lng);
    const locationText = `${markerLocation.lat},${markerLocation.lng}`;

    if (nowLocation === '') {
      alert('Please select a location on the map');
      return;
    }

    const user = await supabase.auth.getUser();

    if (!user) {
      redirect('/login');
    }

    const { data, error } = await supabase.from('posts').insert([
      {
        name,
        animals: category,
        description,
        location: locationText,
        keywords: nowLocation,
        google_map_url: url,
        created_at: new Date(),
        updated_at: new Date(),
        user_id: user.data.user?.id,
      },
    ]);

    if (error) {
      console.error('error', error);
    } else {
      console.log('data', data);
      SetCompleteSubmit(true);
    }
  };

  const closeModal = () => {
    toggleButtonState();
  };

  return (
    <div className="absolute bottom-0 left-0 z-[999] flex w-full flex-col">
      <div className="h-1/2 overflow-scroll p-5 px-5">
        <div className="rounded-xl bg-white p-5">
          <div className="flex max-w-full">
            {complete ? (
              <button className="ml-auto" onClick={closeModal}>
                <XIcon />
              </button>
            ) : (
              ''
            )}
          </div>

          {!complete ? (
            <form onSubmit={handleSubmit}>
              <div className="mb-5">
                <label className="mb-2 block text-sm font-medium text-gray-900">
                  公園名 / 建物名
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div className="mb-5">
                <label
                  htmlFor="category"
                  className="block text-sm font-medium text-gray-900"
                >
                  一緒に散歩できるペット
                </label>

                <div className="mt-2 flex">
                  <div className="me-4 flex items-center">
                    <input
                      type="checkbox"
                      name="category"
                      value="犬"
                      className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
                    />
                    <label className="ms-2 text-sm font-medium text-gray-900">
                      犬
                    </label>
                  </div>
                  <div className="me-4 flex items-center">
                    <input
                      type="checkbox"
                      name="category"
                      value="猫"
                      className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
                    />
                    <label className="ms-2 text-sm font-medium text-gray-900">
                      猫
                    </label>
                  </div>
                  <div className="me-4 flex items-center">
                    <input
                      type="checkbox"
                      name="category"
                      value="その他"
                      className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
                    />
                    <label className="ms-2 text-sm font-medium text-gray-900">
                      その他
                    </label>
                  </div>
                </div>
              </div>
              <div className="mb-5">
                <label className="mb-2 block text-sm font-medium text-gray-900">
                  公園 / 建物の説明
                </label>
                <textarea
                  id="description"
                  name="description"
                  required
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                ></textarea>
              </div>
              <div className="mb-5">
                <label className="mb-2 block text-sm font-medium text-gray-900">
                  Google Map URL
                </label>
                <input
                  type="url"
                  placeholder="URL"
                  id="url"
                  name="url"
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <button
                  type="submit"
                  className="mb-2 me-2 w-full rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300"
                >
                  投稿する
                </button>
              </div>
            </form>
          ) : (
            ''
          )}

          {complete ? <p className="py-5">投稿しました！</p> : ''}
        </div>
      </div>
    </div>
  );
}
