import type { IInfo } from 'app/interfaces/info';

export const info: IInfo = {
  heading: 'Контакты',
  id: 'contacts',
  image: {
    src: '/images-mock/photo.png',
    alt: 'Денис Соколов'
  },
  name: 'Денис Соколов',
  position: 'Fullstack разработчик',
  offers: 'Готов к предложениям',
  information: [
    {
      title: 'Москва'
    },
    {
      title: 'удалённо / гибрид'
    }
  ],
  contacts: [
    {
      title: 'E-mail:',
      href: 'mailto:ostin1982@yandex.ru',
      text: 'ostin1982@yandex.ru'
    },
    {
      title: 'Телефон:',
      href: 'tel:89268842040',
      text: '+7 (926) 884 20 40'
    },
    {
      title: 'Телеграмм:',
      href: 'https://t.me/@ostin1982',
      text: '@ostin1982'
    },
    {
      title: 'GitHub',
      href: 'https://github.com/ostin1982'
    }
  ]
};
