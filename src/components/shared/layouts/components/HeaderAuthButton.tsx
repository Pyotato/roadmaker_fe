'use client';
import { Group, UnstyledButton } from '@mantine/core';
import { IconLogout, IconUser, IconWriting } from '@tabler/icons-react';
import { usePathname, useRouter } from 'next/navigation';
import { signIn, signOut, useSession } from 'next-auth/react';
import { useEffect } from 'react';

const HeaderAuthButton = ({
  openModal,
  closeDrawer,
}: {
  openModal: (fn: () => void) => void;
  closeDrawer: () => void;
}) => {
  const { data: session } = useSession();
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
          className='hvr-text'
          display='inline-flex'
          style={{ alignItems: 'center' }}
          onClick={() => {
            if (pathName !== '/roadmap/create') {
              router.push('/roadmap/create');
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
          className='hvr-text'
          display='inline-flex'
          style={{ alignItems: 'center' }}
          onClick={() => {
            if (pathName !== '/roadmap/create') router.replace('/mypage');
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
          className='hvr-text'
          display='inline-flex'
          style={{ alignItems: 'center' }}
          onClick={() => {
            if (pathName !== '/roadmap/create') signOut();
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
