import clsx from 'clsx';

import { defaultProcessText } from '@/utils/helpers';

import Heading from '@/components/common/Heading';
import { about as aboutData } from 'app/data/about';

export async function SectionAbout() {
  const description = await defaultProcessText(aboutData.description);

  return (
    <section
      id={aboutData.id}
      className={clsx(
        'w-full relative wrapper-main',
        'col-span-6 xl:col-start-4 xl:col-span-9 ',
        'flex flex-col gap-7.5 md:gap-10 xl:gap-15'
      )}
    >
      <Heading heading={aboutData.heading} />
      <div
        className="text-base flex flex-col gap-12"
        dangerouslySetInnerHTML={{
          __html: description
        }}
      ></div>
    </section>
  );
}
