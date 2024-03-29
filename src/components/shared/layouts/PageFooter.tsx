'use client';
import { ActionIcon, Container, Group, Image, rem, Text } from '@mantine/core';
import { IconBrandGithub } from '@tabler/icons-react';
import { usePathname, useRouter } from 'next/navigation';

export function PageFooter() {
  const router = useRouter();
  const path = usePathname();
  if (path === '/roadmap/create') return <></>;
  return (
    <footer className='footer'>
      <Container className='inner' px='xl'>
        <div className='logo'>
          <Image
            src='/favicon/android-chrome-384x384.png'
            alt='/favicon/android-chrome-384x384.png'
            style={{ width: '30px' }}
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
              style={{ width: rem(18), height: rem(18) }}
              stroke={1.5}
            />
          </ActionIcon>
        </Group>
      </Container>
    </footer>
  );
}

export default PageFooter;
