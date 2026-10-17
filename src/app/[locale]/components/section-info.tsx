'use client';

import Image from 'next/image';
import Link from 'next/link';
import clsx from 'clsx';

import { info as infoData } from 'app/data/info';

export function SectionInfo() {
  return (
    <section
      className={clsx(
        'w-full relative p-6 bg-black',
        'flex flex-col gap-7.5 md:gap-10 xl:gap-15 xl:h-svh'
      )}
    >
      <div
        className={clsx(
          'text-p flex flex-col md:flex-row xl:flex-col gap-6 md:justify-between',
          'xl:h-full'
        )}
      >
        <div className="flex flex-row xl:flex-col gap-6 justify-start items-center xl:items-start">
          <div
            className="portrait-glitch relative w-22 xl:w-32 h-22 xl:h-32"
            style={{ backgroundImage: `url("${infoData.image.src}")` }}
          >
            <Image
              src={infoData.image.src}
              alt={infoData.image.alt}
              className="absolute top-0 left-0 z-0 w-full h-full object-contain"
              fill
              sizes="(max-width: 767px) calc(100vw - 2.5rem), (max-width: 1279px) calc(50vw - 3.75rem), 30vw"
            />
          </div>
          <div className="flex flex-col gap-2 xl:gap-2.5">
            <p className="text-2xl xl:text-[1.75rem] font-bold">
              {infoData.name}
            </p>
            <p className="text-sm xl:text-base">{infoData.position}</p>
            <p className="relative text-sm xl:text-base text-green pl-4">
              <span
                aria-hidden="true"
                className="absolute left-0 top-1/2 block size-2 -translate-y-1/2 rounded-full bg-green animate-pulse-dot duration-600"
              />
              {infoData.offers}
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-1">
          {infoData.contacts.map(({ title, href, text }, index) => (
            <div
              className="flex flex-row gap-2 md:gap-4 xl:gap-6 text-sm"
              key={href ?? `contact-${index}`}
            >
              {text && title && <span>{title}</span>}
              {href ? (
                <Link href={href}>{text ?? title}</Link>
              ) : (
                text && <p>{text}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
