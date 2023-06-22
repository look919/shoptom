import { ReactNode } from 'react';
import Link from 'next/link';
import { Toaster } from 'react-hot-toast';
import { ClerkProvider } from '@clerk/nextjs/app-beta';
import { UserProfile } from '@server-ui/UserProfile';
import { Icons } from '@ui';
import './globals.css';

export const metadata = {
  title: 'ShopTom',
  description: 'Find the best products for your home',
};
export default function RootLayout({ children }: { children: ReactNode }) {
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
        </body>
      </html>
    </ClerkProvider>
  );
}
