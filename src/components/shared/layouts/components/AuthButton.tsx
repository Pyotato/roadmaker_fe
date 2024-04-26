'use client';
import { Button, Group } from '@mantine/core';
import { usePathname, useRouter } from 'next/navigation';
import { Session } from 'next-auth';
import { signIn, signOut } from 'next-auth/react';

import { SITE_ROUTES } from '@/constants';

const AuthButton = ({
  openModal,
  closeDrawer,
  session,
}: {
  openModal: (fn: () => void) => void;
  closeDrawer: () => void;
  session: Session | null;
}) => {
  const router = useRouter();
  const pathName = usePathname();

  if (session) {
    return (
      <Group justify='center' grow pb='xl' px='md'>
        <Button
          variant='default'
          onClick={() => {
            if (pathName !== SITE_ROUTES.CREATE_ROADMAP) {
              signOut({ callbackUrl: '/' });
            } else {
              openModal(() => {
                closeDrawer();
                signOut({ callbackUrl: '/' });
              });
              closeDrawer();
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
