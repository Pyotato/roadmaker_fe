'use client';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

import AuthButton from './components/LoginButton';
import RoadmapCreateButton from './components/RoadmapCreateButton';

const PageHeader = () => {
  const router = useRouter();
  const { status } = useSession();
  if (status === 'loading') {
    return <>loading...</>;
  }
  return (
    <section>
      <button type='button' onClick={() => router.push('/')}>
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
