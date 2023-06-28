import { ReactNode } from 'react';
import { useLocale } from 'next-intl';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Toaster } from 'react-hot-toast';
import { ClerkProvider } from '@clerk/nextjs/app-beta';
import { Icons } from '@ui';
import { UserProfile } from './UserProfile';
import './globals.css';

export const metadata = {
  title: 'ShopTom',
  description: 'Find the best products for your home',
};

type Props = {
  children: ReactNode;
  modal: ReactNode;
  params: { locale: string };
};

export default function RootLayout({ children, modal, params }: Props) {
  const locale = useLocale();

  // Show a 404 error if the user requests an unknown locale
  if (params.locale !== locale) {
    notFound();
  }

  return (
    <ClerkProvider>
      <html lang={locale}>
        <body>
          <Toaster position='top-center' reverseOrder={false} />
          <header className='mb-8 flex justify-between p-6'>
            <Link href='/'>
              <h1 className='text-4xl'>ShopTom</h1>
            </Link>
            <div className='flex items-center'>
              <Icons.search className='mr-4 h-6 w-6' />
              <Link href='/cart'>
                <Icons.cart className='mr-4 h-6 w-6' />
              </Link>
              <UserProfile />
            </div>
          </header>
          {children}
          {modal}
        </body>
      </html>
    </ClerkProvider>
  );
}
