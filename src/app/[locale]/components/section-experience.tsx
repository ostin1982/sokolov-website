'use client';

import clsx from 'clsx';

import { IconRound } from '@/components/icon/icon-round';
import Heading from '@/components/common/Heading';
import Stack from '@/components/common/Stack';

import { experience as experienceData } from 'app/data/experience';

export function SectionExperience() {
  return (
    <section
      id={experienceData.id}
      className={clsx(
        'w-full relative wrapper-main',
        'col-span-6 xl:col-start-4 xl:col-span-9 ',
        'flex flex-col gap-7.5 md:gap-10 xl:gap-15'
      )}
    >
      <Heading heading={experienceData.heading} />
      <ul className="flex flex-col gap-2.5 pl-12">
        {experienceData.information.map(
          ({ time, company, position, stacks }, index) => (
            <li
              key={company ?? `experience-${index}`}
              className={clsx(
                'relative flex flex-col gap-2.5 pb-10',
                'before:absolute before:-left-[2.25rem] before:top-[1.875rem] before:h-[calc(100%_-_1.875rem)] before:w-0.5 before:bg-green-40 last:before:hidden'
              )}
            >
              <div className="absolute -left-[3rem] -top-0.5 pb-2.5">
                <IconRound className="w-[1.5625rem] h-[1.5625rem]" />
              </div>
              <h3 className="text-h3 text-green">{time}</h3>
              <div className="text-p">
                <span className="font-bold">{company}</span>{' '}
                <span>({position})</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {stacks.map(({ stack }, stackIndex) => (
                  <Stack key={stack ?? `stack-${stackIndex}`} stack={stack} />
                ))}
              </div>
            </li>
          )
        )}
      </ul>
    </section>
  );
}
