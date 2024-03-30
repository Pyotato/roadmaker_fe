'use client';
import {
  AspectRatio,
  Card,
  Container,
  Image,
  SimpleGrid,
  Text,
  Title,
} from '@mantine/core';
import { PropsWithChildren } from 'react';

import classes from './ArticlesCardsGrid.module.css';

import { Postdata } from '@/components/MainPage';

export interface PostProps extends PropsWithChildren {
  postData: Postdata['result'];
  innerRef?: (node?: Element | null) => void;
}

export function ArticlesCardsGrid({ postData, innerRef }: PostProps) {
  const data = postData;
  if (!postData) {
    return <div>No items</div>;
  }

  const cards = data.map((article, i) =>
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
            radius='md'
            src={article?.thumbnailUrl || null}
            alt={`${article?.thumbnailUrl} 이미지`}
            fallbackSrc='https://placehold.co/600x400?text=No Image'
          />
        </AspectRatio>
        <Text c='dimmed' size='xs' tt='uppercase' fw={700} mt='md'>
          {`${article?.createdAt}`}
        </Text>
        <Title
          className={classes.title}
          mt={5}
          order={3}
          style={{
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
          }}
        >
          {article?.title}
        </Title>
        <Text
          className={classes.title}
          mt={5}
          c='dimmed'
          style={{
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
          }}
        >
          {article?.description}
        </Text>
        {article?.description === '' && <div>'no description'</div>}
        <Text c='dimmed' size='xs' fw={700} mt='md'>
          {`${article?.member?.nickname}`}
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
            radius='md'
            src={article?.thumbnailUrl}
            alt={`${article?.thumbnailUrl} 이미지`}
          />
        </AspectRatio>
        <Text c='dimmed' size='xs' tt='uppercase' fw={700} mt='md'>
          {`${article?.createdAt}`}
        </Text>
        <Title
          className={classes.title}
          mt={5}
          order={3}
          style={{
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
          }}
        >
          {article?.title}
        </Title>
        <Text
          className={classes.title}
          mt={5}
          c='dimmed'
          style={{
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
          }}
        >
          {article?.description}
        </Text>
        {article?.description === '' && <div>'no description'</div>}
        <Text c='dimmed' size='xs' fw={700} mt='md'>
          {`${article?.member?.nickname}`}
        </Text>
      </Card>
    ),
  );

  return (
    <Container pt='lg'>
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
