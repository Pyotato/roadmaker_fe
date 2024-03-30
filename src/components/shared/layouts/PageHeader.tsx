'use client';
import { usePathname, useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

import AuthButton from './components/AuthButton';
import RoadmapCreateButton from './components/RoadmapCreateButton';

const PageHeader = () => {
  const router = useRouter();
  const currPath = usePathname();
  const { status } = useSession();
  if (status === 'loading') {
    return <>loading...</>;
  }
  return (
    <section>
      <button
        type='button'
        onClick={() => {
          if (currPath === '/') location.reload();
          router.push('/');
        }}
      >
        home
      </button>
      <AuthButton />
      {status === 'unauthenticated' && (
        <button onClick={() => router.push('/auth')}>sign up</button>
      )}
      <RoadmapCreateButton />
    </section>
  );
};

export default PageHeader;
