import Link from 'next/link';
import clsx from 'clsx';

import CursorGlow from '@/components/ui/cursor-glow';
import DotsPattern from '@/components/ui/dots-pattern';
import { IconArrow } from '@/components/icon';

export default function NotFound() {
  return (
    <main className="wrapper-main flex min-h-svh flex-col items-center justify-center">
      <DotsPattern dotSize={2} dotGap={18} color="#FFFFFF40" />
      <CursorGlow dotSize={2} dotGap={18} radius={1.5} />
      <div className="flex flex-col items-center gap-6 w-full">
        <h1 className="glitch-404 text-error text-green" data-text="404">
          404
        </h1>
        <p className="text-[1.75rem] max-w-xl">страница не найдена</p>
        <Link
          href="/"
          className={clsx(
            'text-p text-center text-black bg-green w-58 py-2',
            'flex flex-row justify-center items-center gap-3',
            'hover:-translate-y-1 hover:bg-green-hover transition-[transform,background-color]'
          )}
        >
          <span className="text-[calc(var(--font-size-base)*1.25)] md:text-2xl">
            На главную
          </span>
          <IconArrow className="size-4.5 shrink-0" />
        </Link>
      </div>
    </main>
  );
}
