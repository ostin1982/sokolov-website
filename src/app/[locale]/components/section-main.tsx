import Link from 'next/link';
import clsx from 'clsx';

import CursorGlow from '@/components/ui/cursor-glow';
import DotsPattern from '@/components/ui/dots-pattern';
import { defaultProcessText } from '@/utils/helpers';

import Header from '@/components/common/Header';
import { IconArrow, IconChevron } from '@/components/icon';

import { SectionInfo } from './index';
import { main as mainData } from 'app/data/main';

export async function SectionMain() {
  const heading = await defaultProcessText(mainData.heading);

  return (
    <section className="relative h-svh w-full overflow-hidden">
      <DotsPattern dotSize={2} dotGap={18} color="#FFFFFF40" />
      <CursorGlow dotSize={2} dotGap={18} radius={1.5} />
      <div className="flex flex-col justify-between items-center w-full h-full">
        <div className="w-full">
          <div className="xl:hidden">
            <SectionInfo />
          </div>
          <Header />
        </div>
        <div className="relative z-10 flex flex-col gap-8">
          <div
            className="text-h1 text-center"
            dangerouslySetInnerHTML={{
              __html: heading
            }}
          ></div>
          <div className="flex flex-row justify-center items-center gap-3 md:gap-6">
            {mainData.links.map(({ title, href }, index) => (
              <Link
                key={title ?? `link-${index}`}
                href={href}
                className={clsx(
                  'text-p text-center text-black bg-green w-36 md:w-48 py-2',
                  'flex flex-row justify-center items-center gap-3',
                  'hover:-translate-y-1 hover:bg-green-hover transition-[transform,background-color]'
                )}
              >
                <span className="text-[calc(var(--font-size-base)_*_1.25)] md:text-2xl">
                  {title}
                </span>
                <IconArrow className="size-[1.125rem] shrink-0" />
              </Link>
            ))}
          </div>
        </div>
        <div className="flex flex-row justify-center items-center gap-2 pb-10 xl:pb-4">
          <p className="text-p">Проекты</p>
          <IconChevron className="size-[1.5rem] shrink-0" />
        </div>
      </div>
    </section>
  );
}
