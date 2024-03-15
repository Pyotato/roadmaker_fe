'use client';
import { useRouter } from 'next/navigation';
import { signIn, signOut, useSession } from 'next-auth/react';

const PageHeader = () => {
  const router = useRouter();

  const { data: session } = useSession();

  return (
    <section>
      <button type='button' onClick={() => router.push('/')}>
        home
      </button>
      {!session ? (
        <button type='button' onClick={() => signIn('github')}>
          sign up
        </button>
      ) : (
        // <button type='button' onClick={() => router.push('/auth')}>
        //   sign up
        // </button>
        <button type='button' onClick={() => signOut()}>
          sign out
        </button>
      )}

      <button type='button' onClick={() => router.push('/roadmap/create')}>
        create roadmap
      </button>
    </section>
  );
};

export default PageHeader;
