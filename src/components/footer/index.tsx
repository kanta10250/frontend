'use client';

import Map from './icons/map';
import Pen from './icons/pen';
import Home from './icons/home';
import Favorite from './icons/favorite';
import User from './icons/user';
import Link from 'next/link';

const list = [
  {
    title: 'Map',
    href: '/maps',
    icon: <Map fill={window.location.pathname.includes('maps')} />,
  },
  {
    title: 'Post',
    href: '/posts',
    icon: <Pen fill={window.location.pathname.includes('posts')} />,
  },
  {
    title: 'Home',
    href: '/',
    icon: <Home fill={window.location.pathname === '/'} />,
  },
  {
    title: 'Favorite',
    href: '/favorites',
    icon: <Favorite fill={window.location.pathname.includes('favorites')} />,
  },
  {
    title: 'User',
    href: '/users/me',
    icon: <User fill={window.location.pathname.includes('users')} />,
  },
];

// TODO: 背景色を変更する方向でもいいかも、アイコンの色を変更すると若干見にくい
export default function Footer() {
  return (
    <footer className="flex max-h-fit justify-center bg-white px-5 text-center text-zinc-900 md:hidden">
      <div className="flex w-full max-w-md justify-between">
        {list.map((item, index) => (
          <Link key={index} href={item.href} className="cursor-pointer p-5">
            {item.icon}
          </Link>
        ))}
      </div>
    </footer>
  );
}
