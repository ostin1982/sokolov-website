'use client';

import clsx from 'clsx';

import { info as infoData } from 'app/data/info';
import Heading from '@/components/common/Heading';

export default function Footer() {
  return (
    <footer
      id={infoData.id}
      className={clsx(
        'w-full relative wrapper-main pb-20 md:pb-30',
        'flex flex-col gap-7.5 md:gap-10 xl:gap-15'
      )}
    >
      <Heading heading={infoData.heading} />
      <div className="text-p flex flex-col gap-7.5">
        <div className="text-green flex flex-row gap-7 md:gap-9 xl:gap-12">
          {infoData.information.map(({ title }, index) => (
            <p
              key={title ?? `information-${index}`}
              className={clsx(
                'relative',
                "before:absolute before:top-[calc(50%_+_0.125rem)] before:-right-[0.9375rem] before:size-1 before:-translate-y-1/2 before:rounded-full before:bg-current before:content-['']",
                'md:before:-right-[1.25rem] xl:before:-right-[1.5rem] xl:before:size-[0.25rem] last:before:hidden'
              )}
            >
              {title}
            </p>
          ))}
        </div>
        <div className="flex flex-col gap-3 md:gap-3.5 xl:gap-4">
          {infoData.contacts.map(({ title, href, text }, index) => (
            <div
              className="flex flex-row gap-3 md:gap-4 xl:gap-6"
              key={href ?? `contact-${index}`}
            >
              {text && title && <p>{title}</p>}
              {href ? (
                <a href={href}>{text ?? title}</a>
              ) : (
                text && <p>{text}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
}
