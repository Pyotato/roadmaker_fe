'use client';

import {
  Box,
  Burger,
  Divider,
  Drawer,
  Group,
  Image,
  ScrollArea,
  UnstyledButton,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { usePathname, useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

import AuthButton from './AuthButton';
import HeaderAuthButton from './HeaderAuthButton';
import RoadmapCreateButton from './RoadmapCreateButton';

const Header = () => {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
    useDisclosure(false);
  const currPath = usePathname();
  const router = useRouter();
  const { status } = useSession();
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
          <HeaderAuthButton />
        </Group>
      </header>
      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size='100%'
        padding='md'
        title='Navigation'
        hiddenFrom='sm'
        zIndex={1000000}
      >
        <ScrollArea mx='-md'>
          <Divider my='sm' />
          <Box m='md'>
            <UnstyledButton
              onClick={() => {
                if (currPath === '/') location.reload();
                closeDrawer();
                router.push('/');
              }}
              className='hvr-text'
            >
              홈
            </UnstyledButton>
          </Box>
          {status === 'authenticated' && (
            <Box m='md'>
              <UnstyledButton
                className='hvr-text'
                onClick={() => router.replace('/mypage')}
              >
                마이 페이지
              </UnstyledButton>
            </Box>
          )}

          <Box m='md'>
            <RoadmapCreateButton closeDrawer={closeDrawer} />
          </Box>
          <Divider my='sm' />

          <AuthButton />
        </ScrollArea>
      </Drawer>
    </Box>
  );
};
export default Header;
