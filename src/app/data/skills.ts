import type { ISkills } from 'app/interfaces/skills';

export const skills: ISkills = {
  heading: 'Навыки',
  id: 'skills',
  information: [
    {
      title: 'Разработка интерфейсов',
      description:
        'Создаю адаптивные сайты и веб-приложения, уделяя внимание архитектуре компонентов, производительности и точности реализации дизайна.',
      stacks: [
        { stack: 'React' },
        { stack: 'Next.js' },
        { stack: 'Vue' },
        { stack: 'TypeScript' }
      ]
    },
    {
      title: 'Анимация и 3D',
      description:
        'Разрабатываю интерактивные интерфейсы, сложные анимации и 3D-сцены, которые делают цифровой опыт выразительнее.',
      stacks: [
        { stack: 'GSAP' },
        { stack: 'Three.js' },
        { stack: 'CSS Animations' }
      ]
    },
    {
      title: 'Интеграции и серверная логика',
      description:
        'Подключаю API, настраиваю взаимодействие с сервером и интегрирую интерфейсы с классическими и headless CMS.',
      stacks: [
        { stack: 'Node.js' },
        { stack: 'REST API' },
        { stack: 'Directus' },
        { stack: 'Strapi' },
        { stack: 'WordPress' }
      ]
    },
    {
      title: 'Реализация проектов',
      description:
        'Работаю с проектами от макета до запуска: взаимодействую с дизайнерами и заказчиками, разбираюсь в требованиях и довожу решения до рабочего результата.',
      stacks: [
        { stack: 'Figma' },
        { stack: 'Git' },
        { stack: 'CMS' },
        { stack: 'Production' }
      ]
    }
  ]
};
