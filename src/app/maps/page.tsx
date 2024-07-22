'use client';

import dynamic from 'next/dynamic';

const Map = dynamic(() => import('@/components/maps'), { ssr: false });

export default function Maps() {
  return <Map />;
}
