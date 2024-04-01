'use client';
import { Button, Group } from '@mantine/core';
import { signIn, signOut, useSession } from 'next-auth/react';
import { usePathname, useRouter } from 'next/navigation';

const AuthButton = ({
  openModal,
  closeDrawer,
}: {
  openModal: (fn: () => void) => void;
  closeDrawer: () => void;
}) => {
  const { data: session } = useSession();
  const router = useRouter();
  const pathName = usePathname();
  if (session) {
    return (
      <Group justify='center' grow pb='xl' px='md'>
        <Button
          variant='default'
          onClick={() => {
            if (pathName !== '/roadmap/create') {
              signOut({ callbackUrl: '/' });
            } else {
              openModal(() => {
                closeDrawer();
                signOut({ callbackUrl: '/' });
              });
            }
          }}
        >
          Sign out
        </Button>
      </Group>
    );
  }
  return (
    <Group justify='center' grow pb='xl' px='md'>
      <Button variant='default' onClick={() => signIn()}>
        Sign in
      </Button>
      <Button onClick={() => router.push('/auth')}>Sign up</Button>
    </Group>
  );
};
export default AuthButton;
