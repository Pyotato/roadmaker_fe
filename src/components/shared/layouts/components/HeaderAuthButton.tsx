'use client';
import { Button, Group, UnstyledButton } from '@mantine/core';
import { useRouter } from 'next/navigation';
import { signIn, signOut, useSession } from 'next-auth/react';
const HeaderAuthButton = () => {
  const { data: session } = useSession();
  const router = useRouter();

  if (session) {
    return (
      <Group justify='center' visibleFrom='sm'>
        <UnstyledButton
          variant='default'
          className='hvr-text'
          onClick={() => signOut()}
        >
          Sign out
        </UnstyledButton>
        <Button onClick={() => router.replace('/mypage')}>My page</Button>
      </Group>
    );
  }
  return (
    <>
      <Group justify='center' visibleFrom='sm'>
        <UnstyledButton className='hvr-text' onClick={() => signIn()}>
          Sign in
        </UnstyledButton>
        <UnstyledButton
          className='hvr-text'
          onClick={() => router.push('/auth')}
        >
          Sign up
        </UnstyledButton>
      </Group>
    </>
  );
};
export default HeaderAuthButton;
