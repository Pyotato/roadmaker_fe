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
import { Session } from 'next-auth';

import { SITE_ROUTES } from '@/constants';

import AuthButton from './AuthButton';
import HeaderAuthButton from './HeaderAuthButton';
import RoadmapCreateButton from './RoadmapCreateButton';

const Header = ({
  openModal,
  session,
  status,
}: {
  openModal: (fn: () => void) => void;
  session: Session | null;
  status: 'authenticated' | 'loading' | 'unauthenticated';
}) => {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
    useDisclosure(false);
  const currPath = usePathname();
  const router = useRouter();

  return (
    <Box>
      <header>
        <Group justify='space-between' h='100%' p='sm'>
          <UnstyledButton>
            <Image
              src='/favicon/android-chrome-384x384.png'
              alt='/favicon/android-chrome-384x384.png'
              onClick={() => {
                if (currPath === SITE_ROUTES.CREATE_ROADMAP) {
                  openModal(() => router.push('/'));
                  closeDrawer();
                  return;
                }
                if (currPath === '/') location.reload();
                router.push('/');
              }}
              className='hvr logo-img'
            />
          </UnstyledButton>
          <Burger
            opened={drawerOpened}
            onClick={toggleDrawer}
            hiddenFrom='sm'
          />
          <HeaderAuthButton
            session={session}
            openModal={openModal}
            closeDrawer={closeDrawer}
          />
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
              className='hvr-text align-ctr'
              onClick={() => {
                if (currPath === SITE_ROUTES.CREATE_ROADMAP) {
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
            >
              <IconHome />
              <Text pl='xs'>홈</Text>
            </UnstyledButton>
          </Box>
          {status === 'authenticated' && (
            <Box m='md'>
              <UnstyledButton
                className='hvr-text align-ctr'
                display='inline-flex'
                onClick={() => {
                  if (currPath === SITE_ROUTES.CREATE_ROADMAP) {
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
            <RoadmapCreateButton closeDrawer={closeDrawer} status={status} />
          </Box>
          <Divider my='sm' />

          <AuthButton
            openModal={openModal}
            closeDrawer={closeDrawer}
            session={session}
          />
        </ScrollArea>
      </Drawer>
    </Box>
  );
};
export default Header;
