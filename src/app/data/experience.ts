import type { IExperience } from 'app/interfaces/experience';

export const experience: IExperience = {
  heading: 'Опыт',
  id: 'experience',
  information: [
    {
      time: '2023 - 2026',
      company: 'Восход',
      position: 'Frontend / Fullstack',
      stacks: [
        { stack: 'React' },
        { stack: 'Next.js' },
        { stack: 'TypeScript' },
        { stack: 'Node.js' },
        { stack: 'Express' },
        { stack: 'PostgreSQL' },
        { stack: 'Docker' }
      ]
    },
    {
      time: '2022 - 2023',
      company: 'Вебтехнологии',
      position: 'Web-разработчик',
      stacks: [{ stack: 'JavaScript' }, { stack: 'WordPress' }]
    },
    {
      time: '2021 - 2023',
      company: 'MumiMaps',
      position: 'Web-разработчик',
      stacks: [{ stack: 'Next.js' }]
    }
  ]
};
