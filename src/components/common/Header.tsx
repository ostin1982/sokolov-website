'use client';

import Link from 'next/link';
import clsx from 'clsx';

import { header as headerData } from 'app/data/header';

export default function Header() {
  return (
    <header
      className={clsx(
        'w-full relative',
        'flex flex-col gap-7.5 md:gap-10 xl:gap-15'
      )}
    >
      <div className="no-scrollbar z-10 flex w-full flex-nowrap overflow-x-auto bg-black">
        {headerData.map(({ title, href }, index) => (
          <Link
            key={title ?? `header-${index}`}
            href={href}
            className={clsx(
              'min-w-28 flex-1 shrink-0 border-y border-l xl:first:border-l-0 xl:first:border-r-0 last:border-r border-white py-2 xl:py-4',
              'flex justify-center items-center',
              'group xl:hover:bg-green-hover transition-colors duration-600'
            )}
          >
            <span className="text-p group-hover:text-black transition-colors duration-600">
              {title}
            </span>
          </Link>
        ))}
      </div>
    </header>
  );
}
