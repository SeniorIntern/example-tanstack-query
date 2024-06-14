'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export const Header = () => {
  const pathname = usePathname();

  const navOptions = [
    { href: '/', option: 'Home' },
    { href: '/todos', option: 'Todos' },
    { href: '/infiniteTodos', option: 'Infinite' }
  ];

  return (
    <nav className="flex items-center gap-8 bg-primary py-2 px-4 text-white">
      {navOptions.map((opt, i) => (
        <Link
          key={i}
          href={opt.href}
          className={clsx(pathname === opt.href && 'font-semibold text-xl')}
        >
          {opt.option}
        </Link>
      ))}
    </nav>
  );
};
