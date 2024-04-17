'use client';
import { Text, UnstyledButton } from '@mantine/core';
import { IconWriting } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';
import { signIn, useSession } from 'next-auth/react';

const RoadmapCreateButton = ({ closeDrawer }: { closeDrawer: () => void }) => {
  const { status } = useSession();
  const router = useRouter();
  if (status === 'authenticated') {
    return (
      <UnstyledButton
        type='button'
        className='hvr-text align-ctr'
        display='inline-flex'
        onClick={() => {
          closeDrawer();
          router.push('/roadmap/create');
        }}
      >
        <IconWriting />
        <Text pl='xs'>로드맵 생성</Text>
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
