import intlMiddleware from 'next-intl/middleware';
import { NextRequest } from 'next/server';
import { authMiddleware } from '@clerk/nextjs';

export default authMiddleware({
  beforeAuth: (req: NextRequest) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return intlMiddleware({ locales: ['en', 'pl'], defaultLocale: 'en' })(req);
  },

  publicRoutes: [
    '/',
    '/:locale',
    '/api(.*)',
    '/:locale/sign-in',
    '/:locale/sign-up',
    '/:locale/product(.*)',
    '/:locale/gallery(.*)',
    '/:locale/cart',
  ],
});

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};
