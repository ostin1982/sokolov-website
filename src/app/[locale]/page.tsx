import clsx from 'clsx';

import {
  SectionMain,
  SectionInfo,
  SectionProjects,
  SectionAbout,
  SectionSkills,
  SectionExperience
} from './components';
import Footer from '@/components/common/Footer';

export default function HomePage() {
  return (
    <main className="grid-default">
      <div className="hidden xl:block xl:sticky xl:top-0 xl:col-start-1 xl:col-span-3 xl:self-start">
        <SectionInfo />
      </div>
      <div
        className={clsx(
          'col-span-6 xl:col-start-4 xl:col-span-9',
          'flex flex-col gap-20 xl:gap-30 xl:border-l xl:border-l-white'
        )}
      >
        <SectionMain />
        <SectionProjects />
        <SectionAbout />
        <SectionSkills />
        <SectionExperience />
        <Footer />
      </div>
    </main>
  );
}
