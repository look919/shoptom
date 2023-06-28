import intlMiddleware from 'next-intl/middleware';
import { NextRequest } from 'next/server';
import { authMiddleware } from '@clerk/nextjs';

export default authMiddleware({
  beforeAuth: (req: NextRequest) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return intlMiddleware({ locales: ['en', 'pl'], defaultLocale: 'en' })(req);
  },

  publicRoutes: ['/', '/sign-in', '/sign-up', '/api(.*)', '/product(.*)', '/gallery(.*)', '/cart'],
});

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};
