import type { Metadata } from 'next';
import { ReactNode } from 'react';
import 'styles/global.css';
import Preloader from '@/components/ui/preloader';

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';
const faviconUrl = (file: string) => `${basePath}/favicon/${file}`;

export const metadata: Metadata = {
  icons: {
    icon: [
      { url: faviconUrl('favicon.ico'), type: 'image/x-icon' },
      { url: faviconUrl('favicon.svg'), type: 'image/svg+xml' },
      {
        url: faviconUrl('favicon-16x16.png'),
        sizes: '16x16',
        type: 'image/png'
      },
      {
        url: faviconUrl('favicon-32x32.png'),
        sizes: '32x32',
        type: 'image/png'
      },
      {
        url: faviconUrl('favicon-48x48.png'),
        sizes: '48x48',
        type: 'image/png'
      },
      {
        url: faviconUrl('favicon-64x64.png'),
        sizes: '64x64',
        type: 'image/png'
      },
      {
        url: faviconUrl('favicon-128x128.png'),
        sizes: '128x128',
        type: 'image/png'
      },
      {
        url: faviconUrl('favicon-256x256.png'),
        sizes: '256x256',
        type: 'image/png'
      },
      {
        url: faviconUrl('android-chrome-192x192.png'),
        sizes: '192x192',
        type: 'image/png'
      },
      {
        url: faviconUrl('android-chrome-512x512.png'),
        sizes: '512x512',
        type: 'image/png'
      }
    ],
    apple: [
      {
        url: faviconUrl('android-chrome-192x192.png'),
        sizes: '192x192',
        type: 'image/png'
      }
    ]
  },
  manifest: faviconUrl('site.webmanifest')
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ru">
      <body>
        <Preloader />
        {children}
      </body>
    </html>
  );
}
