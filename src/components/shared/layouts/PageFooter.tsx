'use client';
import { ActionIcon, Container, Group, Image, Text } from '@mantine/core';
import { IconBrandGithub } from '@tabler/icons-react';
import { usePathname, useRouter } from 'next/navigation';

import { SITE_ROUTES } from '@/constants';

export function PageFooter() {
  const router = useRouter();
  const path = usePathname();
  if (path === SITE_ROUTES.CREATE_ROADMAP) return <></>;
  return (
    <footer className='footer'>
      <Container className='inner' px='xl'>
        <div className='logo'>
          <Image
            src='/favicon/android-chrome-384x384.png'
            alt='/favicon/android-chrome-384x384.png'
            className='logo-img'
          />
          <Text size='xs' c='dimmed' className='description'>
            Create, set and share tangible steps to achieve your ultimate goals,
            <br />
            with slightly a help with AI
          </Text>
        </div>
      </Container>
      <Container className='afterFooter' px='xl'>
        <Text c='dimmed' size='sm'>
          © 2024 roadmaker.site. All rights reserved.
        </Text>

        <Group gap={0} className='social' justify='flex-end' wrap='nowrap'>
          <ActionIcon size='lg' color='gray' variant='subtle'>
            <IconBrandGithub
              onClick={() =>
                router.replace('https://github.com/Pyotato/roadmaker_fe')
              }
              className='icon-brand'
              stroke={1.5}
            />
          </ActionIcon>
        </Group>
      </Container>
    </footer>
  );
}

export default PageFooter;
