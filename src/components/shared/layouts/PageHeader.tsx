'use client';
import { useRouter } from 'next/navigation';

import AuthButton from './components/LoginButton';

const PageHeader = () => {
  const router = useRouter();

  return (
    <section>
      <button type='button' onClick={() => router.push('/')}>
        home
      </button>
      {/* {!session ? (
        <button type='button' onClick={() => signIn('github')}>
          sign up
        </button>
      ) : (
        <button type='button' onClick={() => signOut()}>
          sign out
        </button>
      )} */}
      <AuthButton />
      <button type='button' onClick={() => router.push('/roadmap/create')}>
        create roadmap
      </button>
    </section>
  );
};

export default PageHeader;
