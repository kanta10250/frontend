'use client';

import dynamic from 'next/dynamic';
import Posts from '@/components/posts';
import { useActionContext } from '@/context/actionContext';

const Map = dynamic(() => import('@/components/maps'), { ssr: false });

export default function Maps() {
  const { buttonState } = useActionContext();
  console.log(buttonState);

  return (
    <div className="relative flex h-full flex-col bg-stone-200">
      <Map />
      {buttonState ? <Posts /> : null}
    </div>
  );
}
