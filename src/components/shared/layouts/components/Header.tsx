'use client';

import {
  Box,
  Burger,
  Divider,
  Drawer,
  Group,
  Image,
  ScrollArea,
  Text,
  UnstyledButton,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconHome, IconUser } from '@tabler/icons-react';
import { usePathname, useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useMemo } from 'react';

import AuthButton from './AuthButton';
import HeaderAuthButton from './HeaderAuthButton';
import RoadmapCreateButton from './RoadmapCreateButton';

const Header = ({ openModal }: { openModal: (fn: () => void) => void }) => {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
    useDisclosure(false);
  const currPath = usePathname();
  const router = useRouter();
  const { status } = useSession();

  useMemo(() => {
    if (typeof window !== 'undefined' && currPath === '/roadmap/create') {
      window.onbeforeunload = function (e) {
        e.preventDefault();
      };
    }
  }, [currPath]);

  return (
    <Box>
      <header>
        <Group justify='space-between' h='100%' p='sm'>
          <UnstyledButton>
            <Image
              src='/favicon/android-chrome-384x384.png'
              alt='/favicon/android-chrome-384x384.png'
              style={{ width: '30px' }}
              onClick={() => {
                if (currPath === '/roadmap/create') {
                  openModal(() => router.push('/'));
                  closeDrawer();
                  return;
                }
                if (currPath === '/') location.reload();
                router.push('/');
              }}
              className='hvr'
            />
          </UnstyledButton>
          <Burger
            opened={drawerOpened}
            onClick={toggleDrawer}
            hiddenFrom='sm'
          />
          <HeaderAuthButton openModal={openModal} closeDrawer={closeDrawer} />
        </Group>
      </header>
      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size='100%'
        padding='md'
        title='Navigation'
        hiddenFrom='sm'
        zIndex={100000}
      >
        <ScrollArea mx='-md'>
          <Divider my='sm' />
          <Box m='md'>
            <UnstyledButton
              display='inline-flex'
              style={{ alignItems: 'center' }}
              onClick={() => {
                if (currPath === '/roadmap/create') {
                  openModal(() => router.push('/'));
                  closeDrawer();
                  return;
                }
                if (currPath === '/') {
                  location.reload();
                  closeDrawer();
                  return;
                }
                router.push('/');
                closeDrawer();
              }}
              className='hvr-text'
            >
              <IconHome />
              <Text pl='xs'>홈</Text>
            </UnstyledButton>
          </Box>
          {status === 'authenticated' && (
            <Box m='md'>
              <UnstyledButton
                className='hvr-text'
                display='inline-flex'
                style={{ alignItems: 'center' }}
                onClick={() => {
                  if (currPath === '/roadmap/create') {
                    openModal(() => router.replace('/mypage'));
                    closeDrawer();
                    return;
                  }
                  router.replace('/mypage');
                  closeDrawer();
                }}
              >
                <IconUser />
                <Text pl='xs'> 마이 페이지</Text>
              </UnstyledButton>
            </Box>
          )}

          <Box m='md'>
            <RoadmapCreateButton closeDrawer={closeDrawer} />
          </Box>
          <Divider my='sm' />

          <AuthButton openModal={openModal} closeDrawer={closeDrawer} />
        </ScrollArea>
      </Drawer>
    </Box>
  );
};
export default Header;
