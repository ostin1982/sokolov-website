'use client';

import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';

import Heading from '@/components/common/Heading';
import Stack from '@/components/common/Stack';
import { IconArrow } from '@/components/icon/icon-arrow';

import { projects as projectsData } from 'app/data/projects';

export function SectionProjects() {
  return (
    <section
      id={projectsData.id}
      className={clsx(
        'w-full relative wrapper-main',
        'col-span-6 xl:col-start-4 xl:col-span-9 ',
        'flex flex-col gap-7.5 md:gap-10 xl:gap-15'
      )}
    >
      <Heading heading={projectsData.heading} />
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-7.5 gap-y-7.5 md:gap-x-10 md:gap-y-10 xl:gap-x-20 xl:gap-y-15">
        {projectsData.information.map(
          ({ title, images, stacks, link }, index) => (
            <li
              key={title ?? `project-${index}`}
              className="relative flex flex-col gap-4 h-full"
            >
              <div className="relative w-full h-auto overflow-hidden aspect-[4/3] border border-white-40">
                <Image
                  src={images.src}
                  alt={images.alt}
                  className="absolute top-0 left-0 w-full h-full object-contain"
                  fill
                  sizes="(max-width: 767px) calc(100vw - 2.5rem), (max-width: 1279px) calc(50vw - 3.75rem), 30vw"
                />
              </div>
              <div className="flex flex-col gap-3">
                <h3 className="text-2xl">{title}</h3>
                <div className="flex flex-wrap gap-2">
                  {stacks.map(({ stack }, stackIndex) => (
                    <Stack key={stack ?? `stack-${stackIndex}`} stack={stack} />
                  ))}
                </div>
              </div>
              {link && (
                <Link
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-fit items-center gap-2 text-sm text-green xl:hover:text-green-hover transition-colors duration-300"
                >
                  <span>Смотреть проект</span>
                  <IconArrow className="size-[1.125rem] shrink-0" />
                </Link>
              )}
            </li>
          )
        )}
      </ul>
    </section>
  );
}
