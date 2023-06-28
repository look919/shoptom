import { SignUp } from '@clerk/nextjs/app-beta';

export default function Page() {
  return (
    <div className='flex h-screen w-screen items-center justify-center'>
      <div>
        <SignUp afterSignInUrl='/' signInUrl='/sign-in' />
      </div>
    </div>
  );
}
