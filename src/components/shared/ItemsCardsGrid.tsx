'use client';
import { Container, SimpleGrid } from '@mantine/core';
import { PropsWithChildren } from 'react';

import ItemCard from './ItemCard';

import { Postdata } from '@/types/post';

export interface PostProps extends PropsWithChildren {
  postData: Postdata['result'];
  innerRef?: (node?: Element | null) => void;
}

export function ItemsCardsGrid({ postData, innerRef }: PostProps) {
  const data = postData;
  if (!postData) {
    return <div>No items</div>;
  }

  const cards = data.map((article, i) =>
    i === data.length - 1 ? (
      <ItemCard article={article} innerRef={innerRef} key={article?.id} />
    ) : (
      <ItemCard article={article} key={article?.id} />
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
