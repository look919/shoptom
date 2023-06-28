import { SignIn } from '@clerk/nextjs/app-beta';

export default function Page() {
  return (
    <div className='flex h-screen w-screen items-center justify-center'>
      <div>
        <SignIn signUpUrl='/sign-up' afterSignInUrl='/' />
      </div>
    </div>
  );
}
