import { signInAction } from '@/app/_lib/actions';
import Image from 'next/image';

export const metadata = {
  title: 'Sign In',
}

function SignInButton() {
  return (
    <form action={signInAction} method="POST">
    <button className='flex items-center gap-6 text-lg border border-primary-300 px-10 py-4 font-medium'>
      <Image
        src='https://authjs.dev/img/providers/google.svg'
        alt='Google logo'
        height='24'
        width='24'
      />
      <span>Continue with Google</span>
    </button>
    </form>
  );
}

export default SignInButton;
