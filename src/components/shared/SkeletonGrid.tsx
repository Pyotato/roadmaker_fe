'use client';
import { Card, Container, SimpleGrid, Skeleton } from '@mantine/core';
import { PropsWithChildren } from 'react';

import { POST } from '@/constants';
import { Postdata } from '@/types/post';
import { Wrap } from './ItemCard';

export interface PostProps extends PropsWithChildren {
  postData: Postdata['result'];
  innerRef?: (node?: Element | null) => void;
}

export function SkeletonCardsGrid() {
  const data = new Array(20).fill(POST);

  const cards = data.map((article, i) => (
    <Wrap key={article?.id + i}>
      <Card
        p='md'
        radius='md'
        component='a'
        href={`/roadmap/post/${article?.id}`}
        className='card'
      >
        <Skeleton radius='md' className='aspect-ratio-basic' />
        <Skeleton height={16} mt='md' width='100%' radius='xl' />
        <Skeleton height={48} mt='md' width='100%' radius='md' />
        <Skeleton height={16} mt='md' width='25%' radius='xl' />
      </Card>
    </Wrap>
  ));

  return (
    <Container py='lg'>
      <SimpleGrid
        cols={{ base: 1, sm: 2 }}
        spacing={{ base: 'md', sm: 'md', lg: 'lg' }}
        verticalSpacing={{ base: 'md', sm: 'md', lg: 'lg' }}
      >
        {cards}
      </SimpleGrid>
    </Container>
  );
}
