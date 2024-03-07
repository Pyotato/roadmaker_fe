import { Container, Title } from '@mantine/core';

import CommentBox from '@/app/roadmap/post/components/comment/CommentBox';
import Comment from '@/app/roadmap/post/components/comment/Comments';

export default function CommentSection() {
  return (
    <>
      <Container py='l'>
        <Title order={1}>댓글 작성</Title>
      </Container>
      <CommentBox />
      <Container py='l'>
        <Title order={1}>댓글</Title>
      </Container>
      <Comment />
    </>
  );
}
