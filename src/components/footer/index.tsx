'use client';

import Map from './icons/map';
import Pen from './icons/pen';
import Home from './icons/home';
import Favorite from './icons/favorite';
import User from './icons/user';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useActionContext } from '@/context/actionContext';
import { useRouter } from 'next/navigation';

const list = [
  {
    title: 'Map',
    href: '/maps',
    icon: (pathname: string) => <Map fill={pathname === '/maps'} />,
  },
  {
    title: 'Post',
    href: '/posts',
    icon: (isPost: string) => <Pen fill={isPost === 'true'} />,
  },
  {
    title: 'Home',
    href: '/',
    icon: (pathname: string) => <Home fill={pathname === '/'} />,
  },
  {
    title: 'Favorite',
    href: '/favorites',
    icon: (pathname: string) => <Favorite fill={pathname === '/favorites'} />,
  },
  {
    title: 'User',
    href: '/users/me',
    icon: (pathname: string) => <User fill={pathname === '/users/me'} />,
  },
];

export default function Footer() {
  const pathname = usePathname();
  const router = useRouter();
  const { toggleButtonState, disabledButtonState } = useActionContext();

  function toggle() {
    router.push('/maps');
    toggleButtonState();
  }

  return (
    <footer className="flex max-h-fit justify-center bg-white px-5 text-center text-zinc-900 md:hidden">
      <div className="flex w-full max-w-md justify-between p-3">
        {list.map((item, index) =>
          item.title === 'Post' ? (
            <button
              key={index}
              onClick={toggle}
              className="cursor-pointer rounded-full bg-white p-2 px-4"
            >
              {item.icon('true')}
            </button>
          ) : (
            <Link
              key={index}
              href={item.href}
              onClick={disabledButtonState}
              className="cursor-pointer rounded-full bg-white p-2 px-4"
            >
              {item.icon(pathname)}
            </Link>
          ),
        )}
      </div>
    </footer>
  );
}
