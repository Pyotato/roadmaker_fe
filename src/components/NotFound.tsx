'use client';
import { Button, Container, SimpleGrid, Text, Title } from '@mantine/core';
import { IconHome2 } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';
import styled from 'styled-components';

import { Illustration } from './Illustration';

export default function NotFound({
  message,
  title,
  reset,
}: {
  message: string;
  title?: string;
  reset?: () => void;
}) {
  const router = useRouter();
  return (
    <CustomContainer>
      <Container className='root'>
        <SimpleGrid spacing={{ base: 40, sm: 80 }} cols={{ base: 1, sm: 2 }}>
          <div>
            <Title className='title'>
              {title || 'Something is not right...'}
            </Title>
            <Text c='dimmed' size='lg'>
              {message}
            </Text>
            {reset && (
              <Button
                variant='default'
                size='md'
                mt='xl'
                className='control'
                onClick={reset}
                mr='lg'
              >
                새로고침
              </Button>
            )}
            <Button
              variant='default'
              size='md'
              mt='xl'
              className='control'
              onClick={() => router.replace('/')}
            >
              <IconHome2 /> 홈으로 이동
            </Button>
          </div>
          <Illustration className='image' />
        </SimpleGrid>
      </Container>
    </CustomContainer>
  );
}
const CustomContainer = styled.div`
  height: 100vh;
  width: 100%;
  display: inline-flex;
  flex-direction: column;
  justify-content: center;
  background-color: light-dark(
    var(--mantine-color-dark-6),
    var(--mantine-color-gray-0)
  ) !important;

  .root {
    background-color: light-dark(
      var(--mantine-color-dark-6),
      var(--mantine-color-gray-0)
    ) !important;
    width: 100%;
  }

  .inner {
    position: relative;
  }

  .image {
    opacity: 0.75;
    color: light-dark(var(--mantine-color-gray-0), var(--mantine-color-dark-6));
  }

  .content {
    padding-top: rem(220px);
    position: relative;
    z-index: 1;

    @media (max-width: $mantine-breakpoint-sm) {
      padding-top: rem(120px);
    }
  }

  .title {
    font-weight: 900;
    font-size: var(--mantine-h1-font-size);
    margin-bottom: var(--mantine-spacing-md);
    font-family:
      Greycliff CF,
      var(--mantine-font-family);

    @media (max-width: $mantine-breakpoint-sm) {
      font-size: rem(32px);
    }
  }

  .description {
    max-width: rem(540px);
    margin: auto;
    margin-top: var(--mantine-spacing-xl);
    margin-bottom: calc(var(--mantine-spacing-xl) * 1.5);
  }
`;
