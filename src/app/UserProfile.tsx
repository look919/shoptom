import Link from 'next/link';
import { UserButton, SignedIn } from '@clerk/nextjs/app-beta';
import { SignedOut } from '@clerk/nextjs/app-beta/client';

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
