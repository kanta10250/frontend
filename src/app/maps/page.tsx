'use client';

import dynamic from 'next/dynamic';

const Map = dynamic(() => import('@/app/components/Map'), { ssr: false });

export default function Maps() {
  return <Map />;
}
