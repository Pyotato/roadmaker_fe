'use client';
import { AspectRatio, Card, Text, Title } from '@mantine/core';
import styled from 'styled-components';

import { Post } from '@/types/post';
import Image from 'next/image';
import FallbackImage from './FallbackImage';

const ItemCard = ({
  article,
  innerRef,
}: {
  article: Post | null;
  innerRef?: (node?: Element | null) => void;
}) => {
  return (
    <Wrap>
      <Card
        key={article?.id}
        p='md'
        ref={innerRef}
        radius='md'
        component='a'
        href={`/roadmap/post/${article?.id}`}
        className='card'
      >
        <AspectRatio ratio={1920 / 1080}>
          {!article?.thumbnailUrl ? (
            <FallbackImage />
          ) : (
            <Image
              src={`${article?.thumbnailUrl}`}
              alt={`${article?.thumbnailUrl} 이미지`}
              priority={true}
              width={100}
              height={100}
              className='item-card-img'
            />
          )}
        </AspectRatio>
        <Text c='dimmed' size='xs' tt='uppercase' fw={700} mt='md'>
          {`${article?.createdAt}`}
        </Text>
        <Title mt={5} order={3} className='description-text'>
          {article?.title}
        </Title>
        <Text className='title description-text' mt={5} c='dimmed'>
          {article?.description}
        </Text>
        {article?.description === '' && <div>'no description'</div>}
        <Text c='dimmed' size='xs' fw={700} mt='md'>
          {`${article?.member?.nickname}`}
        </Text>
      </Card>
    </Wrap>
  );
};
export default ItemCard;

export const Wrap = styled.div`
  .card {
    background-color: var(--mantine-color-body);
    border-radius: var(--mantine-radius-md);
    box-shadow: var(--mantine-shadows-lg);
    transition:
      transform 150ms ease,
      box-shadow 150ms ease;
    border: 1px solid
      light-dark(var(--mantine-color-gray-2), var(--mantine-color-dark-5));
  }

  & .card:hover {
    transform: scale(1.01);
    box-shadow: var(--mantine-shadow-md);
  }

  .title {
    font-family:
      Greycliff CF,
      var(--mantine-font-family);
  }

  .footer {
    padding: var(--mantine-spacing-xs) var(--mantine-spacing-lg);
    margin-top: var(--mantine-spacing-md);
    border-top: rem(1px) solid
      light-dark(var(--mantine-color-gray-2), var(--mantine-color-dark-5));
  }

  .description-text {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }

  .card-img {
    width: 6rem;
  }
  .item-card-img {
    border-radius: var(--mantine-radius-md);
  }
`;
