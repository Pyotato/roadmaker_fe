'use client';
import { Card, Container, SimpleGrid, Skeleton } from '@mantine/core';
import { PropsWithChildren } from 'react';

import classes from './ArticlesCardsGrid.module.css';

import { Postdata } from '@/components/MainPage';

import { post } from '@/constants';

export interface PostProps extends PropsWithChildren {
  postData: Postdata['result'];
  innerRef?: (node?: Element | null) => void;
}

export function SkeletonCardsGrid() {
  const data = new Array(20).fill(post);

  const cards = data.map((article, i) => (
    <Card
      key={article?.id + i}
      p='md'
      radius='md'
      component='a'
      href={`/roadmap/post/${article?.id}`}
      className={classes.card}
    >
      <Skeleton radius='md' style={{ aspectRatio: '1920 / 1080' }} />
      <Skeleton height={16} mt='md' width='100%' radius='xl' />
      <Skeleton height={48} mt='md' width='100%' radius='md' />

      <Skeleton height={16} mt='md' width='25%' radius='xl' />
    </Card>
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
