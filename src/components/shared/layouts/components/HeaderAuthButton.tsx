'use client';
import { Group, UnstyledButton } from '@mantine/core';
import { IconLogout, IconUser, IconWriting } from '@tabler/icons-react';
import { usePathname, useRouter } from 'next/navigation';
import { Session } from 'next-auth';
import { signIn, signOut } from 'next-auth/react';
import { useEffect } from 'react';

import { SITE_ROUTES } from '@/constants';

const HeaderAuthButton = ({
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

  useEffect(() => {
    closeDrawer();
  }, [closeDrawer]);

  if (session) {
    return (
      <Group justify='center' visibleFrom='sm'>
        <UnstyledButton
          variant='default'
          className='hvr-text align-ctr'
          display='inline-flex'
          onClick={() => {
            if (pathName !== SITE_ROUTES.CREATE_ROADMAP) {
              router.push(SITE_ROUTES.CREATE_ROADMAP);
            } else {
              openModal(() => location.reload());
            }
            closeDrawer();
          }}
        >
          <IconWriting />
          로드맵 생성
        </UnstyledButton>
        <UnstyledButton
          variant='default'
          className='hvr-text align-ctr'
          display='inline-flex'
          onClick={() => {
            if (pathName !== SITE_ROUTES.CREATE_ROADMAP)
              router.replace('/mypage');
            else {
              openModal(() => router.replace('/mypage'));
            }
            closeDrawer();
          }}
        >
          <IconUser />
          마이 페이지
        </UnstyledButton>
        <UnstyledButton
          variant='default'
          className='hvr-text align-ctr'
          display='inline-flex'
          onClick={() => {
            if (pathName !== SITE_ROUTES.CREATE_ROADMAP)
              signOut({ callbackUrl: '/', redirect: true });
            else openModal(() => signOut({ callbackUrl: '/' }));
            closeDrawer();
          }}
        >
          <IconLogout />
          로그아웃
        </UnstyledButton>
      </Group>
    );
  }
  return (
    <Group justify='center' visibleFrom='sm'>
      <UnstyledButton className='hvr-text' onClick={() => signIn()}>
        Sign in
      </UnstyledButton>
      <UnstyledButton className='hvr-text' onClick={() => router.push('/auth')}>
        Sign up
      </UnstyledButton>
    </Group>
  );
};
export default HeaderAuthButton;
