'use client';

import Map from './icons/map';
import Pen from './icons/pen';
import Home from './icons/home';
import Favorite from './icons/favorite';
import User from './icons/user';
import Link from 'next/link';

import { tv } from 'tailwind-variants';

const icon = tv({
  base: 'cursor-pointer bg-white p-2 px-4 rounded-full',
  variants: {
    fill: {
      true: 'bg-blue-100',
    },
  },
});

const list = [
  {
    title: 'Map',
    href: '/maps',
    icon: <Map />,
  },
  {
    title: 'Post',
    href: '/posts',
    icon: <Pen />,
  },
  {
    title: 'Home',
    href: '/',
    icon: <Home />,
  },
  {
    title: 'Favorite',
    href: '/favorites',
    icon: <Favorite />,
  },
  {
    title: 'User',
    href: '/users/me',
    icon: <User />,
  },
];

// TODO: 背景色を変更する方向でもいいかも、アイコンの色を変更すると若干見にくい
export default function Footer() {
  return (
    <footer className="flex max-h-fit justify-center bg-white px-5 text-center text-zinc-900 md:hidden">
      <div className="flex w-full max-w-md justify-between p-3">
        {list.map((item, index) => (
          <Link
            key={index}
            href={item.href}
            className={icon({ fill: window.location.pathname === item.href })}
          >
            {item.icon}
          </Link>
        ))}
      </div>
    </footer>
  );
}
