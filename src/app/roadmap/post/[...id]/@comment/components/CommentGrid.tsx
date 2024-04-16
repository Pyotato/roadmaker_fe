'use client';
import { CommentProps } from '@/types/comment';
import { Box, SimpleGrid } from '@mantine/core';
import CommentCard from './CommentCard';

const CommentGrid = ({ commentData, innerRef }: CommentProps) => {
  if (commentData.length === 0) return <></>;
  const comments = commentData.map((v, i) =>
    i === commentData.length - 1 ? (
      <CommentCard key={i} innerRef={innerRef} comment={v} />
    ) : (
      <CommentCard key={i} comment={v} />
    ),
  );

  return (
    <Box pt='sm'>
      <SimpleGrid cols={{ base: 1, sm: 1 }}>{comments}</SimpleGrid>
    </Box>
  );
};
export default CommentGrid;
