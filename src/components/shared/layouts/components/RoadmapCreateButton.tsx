'use client';
import { useRouter } from 'next/navigation';
import { signIn, useSession } from 'next-auth/react';

const RoadmapCreateButton = () => {
  const { status } = useSession();
  const router = useRouter();
  if (status === 'authenticated') {
    return (
      <button type='button' onClick={() => router.push('/roadmap/create')}>
        create roadmap
      </button>
    );
  }

  return (
    <>
      <button type='button' onClick={() => signIn()}>
        sign in to create roadmap
      </button>
    </>
  );
};
export default RoadmapCreateButton;
