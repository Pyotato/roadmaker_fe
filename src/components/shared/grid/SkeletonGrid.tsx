'use client';
import { Card, Container, SimpleGrid, Skeleton } from '@mantine/core';
import { PropsWithChildren } from 'react';

import classes from './ArticlesCardsGrid.module.css';

import { Postdata } from '@/types/post';

const POST = {
  id: 225,
  title: 'test',
  description: 'test',
  thumbnailUrl:
    'https://roadmaker-images.s3.amazonaws.com/90cb93d7-bc2a-4ba9-8469-4b24fb87ebba.jpeg',
  likeCount: 0,
  joinCount: 1,
  member: {
    id: 77,
    email: 'totoro@naver.com',
    nickname: 'totoro',
    bio: null,
    avatarUrl: null,
    githubUrl: null,
    blogUrl: null,
  },
  createdAt: '2024. 4. 16',
  updatedAt: '2024. 4. 16',
};

export interface PostProps extends PropsWithChildren {
  postData: Postdata['result'];
  innerRef?: (node?: Element | null) => void;
}

export function SkeletonCardsGrid() {
  const data = new Array(20).fill(POST);

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
