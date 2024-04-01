'use client';
import { Button, Group } from '@mantine/core';
import { useRouter } from 'next/navigation';
import { signIn, signOut, useSession } from 'next-auth/react';
const AuthButton = () => {
  const { data: session } = useSession();
  const router = useRouter();

  if (session) {
    return (
      <Group justify='center' grow pb='xl' px='md'>
        <Button variant='default' onClick={() => signOut()}>
          Sign out
        </Button>
      </Group>
    );
  }
  return (
    <>
      <Group justify='center' grow pb='xl' px='md'>
        <Button variant='default' onClick={() => signIn()}>
          Sign in
        </Button>
        <Button onClick={() => router.push('/auth')}>Sign up</Button>
      </Group>
    </>
  );
};
export default AuthButton;
