'use client';

import dynamic from 'next/dynamic';

const Map = dynamic(() => import('@/components/maps'), { ssr: false });

export default function Maps() {
  return (
    <div className="flex h-full flex-col bg-stone-200">
      <Map />
    </div>
  );
}
