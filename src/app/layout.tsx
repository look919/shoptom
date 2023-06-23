import { ReactNode } from 'react';
import Link from 'next/link';
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
};

export default function RootLayout({ children, modal }: Props) {
  return (
    <ClerkProvider>
      <html lang='en'>
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
