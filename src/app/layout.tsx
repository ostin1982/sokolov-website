import { ReactNode } from 'react';
import 'styles/global.css';
import Preloader from '@/components/ui/preloader';

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
