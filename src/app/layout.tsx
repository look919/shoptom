import { ReactNode } from 'react';
import './globals.css';
import { Poppins } from 'next/font/google';

const font = Poppins({ subsets: ['latin-ext'], weight: ['100', '400', '700'] });

export const metadata = {
  title: 'Create Next App',
  description: 'TODO: Add description',
};
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang='en'>
      <body className={font.className}>{children}</body>
    </html>
  );
}
