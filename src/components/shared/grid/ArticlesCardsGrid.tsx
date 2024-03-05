'use client';
import {
  AspectRatio,
  Card,
  Container,
  Image,
  SimpleGrid,
  Text,
} from '@mantine/core';
import { PropsWithChildren } from 'react';

import classes from './ArticlesCardsGrid.module.css';

import { Post } from '@/components/MainPage';

export interface PostProps extends PropsWithChildren {
  postData: Post[];
  innerRef?: (node?: Element | null) => void;
}

export function ArticlesCardsGrid({ postData, innerRef }: PostProps) {
  const data = postData as Post[];
  if (!data) {
    return <div>No items</div>;
  }

  const cards = data.map(
    (article, i) =>
      i === data.length - 1 ? (
        <Card
          key={article?.id}
          p='md'
          ref={innerRef}
          radius='md'
          component='a'
          href={`/roadmap/post/${article?.id}`}
          className={classes.card}
        >
          <AspectRatio ratio={1920 / 1080}>
            <Image
              src={article?.thumbnailUrl}
              alt={`${article?.thumbnailUrl} 이미지`}
            />
          </AspectRatio>
          <Text c='dimmed' size='xs' tt='uppercase' fw={700} mt='md'>
            {`${article?.createdAt}`}
          </Text>
          <Text className={classes.title} mt={5}>
            {article?.title}
          </Text>
        </Card>
      ) : (
        <Card
          key={article?.id}
          p='md'
          radius='md'
          component='a'
          href={`/roadmap/post/${article?.id}`}
          className={classes.card}
        >
          <AspectRatio ratio={1920 / 1080}>
            <Image
              src={article?.thumbnailUrl}
              alt={`${article?.thumbnailUrl} 이미지`}
            />
          </AspectRatio>
          <Text c='dimmed' size='xs' tt='uppercase' fw={700} mt='md'>
            {`${article?.createdAt}`}
          </Text>
          <Text className={classes.title} mt={5}>
            {article?.title}
          </Text>
        </Card>
      ),
    // <Card
    //   key={article?.id}
    //   p='md'
    //   radius='md'
    //   component='a'
    //   href={`/roadmap/post/${article?.id}`}
    //   className={classes.card}
    // >
    //   <AspectRatio ratio={1920 / 1080}>
    //     <Image
    //       src={article?.thumbnailUrl}
    //       alt={`${article?.thumbnailUrl} 이미지`}
    //     />
    //   </AspectRatio>
    //   <Text c='dimmed' size='xs' tt='uppercase' fw={700} mt='md'>
    //     {`${article?.createdAt}`}
    //   </Text>
    //   <Text className={classes.title} mt={5}>
    //     {article?.title}
    //   </Text>
    // </Card>
  );

  return (
    <Container py='xl'>
      <SimpleGrid cols={{ base: 1, sm: 2 }}>{cards}</SimpleGrid>
    </Container>
  );
}
