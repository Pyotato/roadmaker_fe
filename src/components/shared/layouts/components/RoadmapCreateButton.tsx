'use client';
import { Text, UnstyledButton } from '@mantine/core';
import { IconWriting } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';

import { SITE_ROUTES } from '@/constants';

const RoadmapCreateButton = ({
  closeDrawer,
  status,
}: {
  closeDrawer: () => void;
  status: 'authenticated' | 'loading' | 'unauthenticated';
}) => {
  const router = useRouter();
  if (status === 'authenticated') {
    return (
      <UnstyledButton
        type='button'
        className='hvr-text align-ctr'
        display='inline-flex'
        onClick={() => {
          closeDrawer();
          router.push(SITE_ROUTES.CREATE_ROADMAP);
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
