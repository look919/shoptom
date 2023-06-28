import Link from 'next/link';
import { UserButton } from '@clerk/nextjs/app-beta';
import { SignedOut, SignedIn } from '@clerk/nextjs/app-beta/client';

export const UserProfile = () => {
  return (
    <>
      <SignedIn>
        <UserButton />
      </SignedIn>
      <SignedOut>
        <Link href='/sign-in'>Sign in</Link>
      </SignedOut>
    </>
  );
};
