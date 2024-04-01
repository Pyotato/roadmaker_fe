'use client';
import { UnstyledButton } from '@mantine/core';
import { useRouter } from 'next/navigation';
import { signIn, useSession } from 'next-auth/react';

const RoadmapCreateButton = ({ closeDrawer }: { closeDrawer: () => void }) => {
  const { status } = useSession();
  const router = useRouter();
  if (status === 'authenticated') {
    return (
      <UnstyledButton
        type='button'
        className='hvr-text'
        onClick={() => {
          closeDrawer();
          router.push('/roadmap/create');
        }}
      >
        로드맵 생성
      </UnstyledButton>
    );
  }

  return (
    <UnstyledButton
      type='button'
      onClick={() => {
        closeDrawer();
        signIn();
      }}
    >
      sign in to create roadmap
    </UnstyledButton>
  );
};
export default RoadmapCreateButton;
