'use server';

import { Container, Title } from '@mantine/core';

import CommentBox from '@/app/roadmap/post/[...id]/@comment/CommentBox';
import Comments from '@/app/roadmap/post/[...id]/@comment/Comments';

export default async function CommentSection() {
  return (
    <>
      <Container py='l'>
        <Title order={1}>댓글 작성</Title>
      </Container>
      <CommentBox />
      <Container py='l'>
        <Title order={1}>댓글</Title>
      </Container>
      <Container py='l'>
        <Comments />
      </Container>
    </>
  );
}
