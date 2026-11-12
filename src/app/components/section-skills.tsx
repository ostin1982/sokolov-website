'use client';

import clsx from 'clsx';

import Heading from '@/components/common/Heading';
import Stack from '@/components/common/Stack';
import { skills as skillsData } from 'app/data/skills';

export function SectionSkills() {
  return (
    <section
      id={skillsData.id}
      className={clsx(
        'w-full relative wrapper-main',
        'col-span-6 xl:col-start-4 xl:col-span-9 ',
        'flex flex-col gap-7.5 md:gap-10 xl:gap-15'
      )}
    >
      <Heading heading={skillsData.heading} />
      <ol className="flex flex-col gap-2.5 pl-12">
        {skillsData.information.map(({ title, description, stacks }, index) => (
          <li
            key={title ?? `skill-${index}`}
            className={clsx('relative flex flex-col gap-2.5 pb-10 pr-12')}
          >
            <span
              className="absolute -left-12 top-0 text-h3 text-green"
              aria-hidden="true"
            >
              {String(index + 1).padStart(2, '0')}
            </span>
            <h3 className="text-h3">{title}</h3>
            <p className="text-base">{description}</p>
            <div className="flex flex-wrap gap-2">
              {stacks.map(({ stack }, stackIndex) => (
                <Stack key={stack ?? `stack-${stackIndex}`} stack={stack} />
              ))}
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
