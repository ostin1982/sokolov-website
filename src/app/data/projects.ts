import type { IProjects } from 'app/interfaces/projects';

export const projects: IProjects = {
  heading: 'Проекты',
  id: 'projects',
  information: [
    {
      title: 'Научные технологии и сервис',
      images: {
        src: '/images-mock/scietex.png',
        alt: 'Научные технологии и сервис'
      },
      stacks: [
        { stack: 'javascript' },
        { stack: 'php' },
        { stack: 'css' },
        { stack: 'WordPress' },
        { stack: 'Swipper' }
      ],
      link: 'https://scietex.ru'
    },
    {
      title: 'МТ Электро',
      images: {
        src: '/images-mock/mtelectro.png',
        alt: 'МТ Электро'
      },
      stacks: [
        { stack: 'React' },
        { stack: 'Next.js' },
        { stack: 'TypeScript' },
        { stack: 'Docker' },
        { stack: 'gsap' },
        { stack: 'Swiper' },
        { stack: 'storybook' },
        { stack: 'strapi' },
        { stack: 'tailwind css' },
        { stack: 'three.js' },
        { stack: 'vite' },
        { stack: 'zustand' }
      ],
      link: 'https://mtelectro.ru/'
    },
    {
      title: 'РА Восход',
      images: {
        src: '/images-mock/voskhod.png',
        alt: 'РА Восход'
      },
      stacks: [
        { stack: 'React' },
        { stack: 'Next.js' },
        { stack: 'TypeScript' },
        { stack: 'Docker' },
        { stack: 'gsap' },
        { stack: 'Swiper' },
        { stack: 'directus' },
        { stack: 'tailwind css' },
        { stack: 'webpack' },
        { stack: 'zustand' }
      ],
      link: 'https://voskhod.agency/'
    },
    {
      title: 'Whitelist',
      images: {
        src: '/images-mock/whitelist.png',
        alt: 'Whitelist'
      },
      stacks: [
        { stack: 'Vue' },
        { stack: 'Nuxt.js' },
        { stack: 'TypeScript' },
        { stack: 'Docker' },
        { stack: 'gsap' },
        { stack: 'Swiper' },
        { stack: 'directus' },
        { stack: 'tailwind css' },
        { stack: 'webpack' }
      ],
      link: 'https://scalpee.tech/'
    },
    {
      title: 'Сладонеж',
      images: {
        src: '/images-mock/sladonezh.png',
        alt: 'Сладонеж'
      },
      stacks: [
        { stack: 'React' },
        { stack: 'Next.js' },
        { stack: 'TypeScript' },
        { stack: 'php' },
        { stack: 'Docker' },
        { stack: 'gsap' },
        { stack: 'Swiper' },
        { stack: 'tailwind css' },
        { stack: 'webpack' },
        { stack: 'Битрикс 24' }
      ],
      link: 'https://sladonezh.ru/'
    },
    {
      title: 'RCC Pilates',
      images: {
        src: '/images-mock/rccpilates.png',
        alt: 'RCC Pilates'
      },
      stacks: [
        { stack: 'React' },
        { stack: 'Next.js' },
        { stack: 'TypeScript' },
        { stack: 'Docker' },
        { stack: 'gsap' },
        { stack: 'Swiper' },
        { stack: 'directus' },
        { stack: 'tailwind css' },
        { stack: 'webpack' },
        { stack: 'zustand' }
      ],
      link: 'https://rcc-pilates.ru/'
    }
  ]
};
