import { Container } from '@mantine/core';
import { ReactNode } from 'react';

interface MyPageProps {
  info: ReactNode;
  roadmaps: ReactNode;
}

const PostLayout = (props: MyPageProps) => {
  return (
    <Container py='xl'>
      <Container py='xl'>{props.info}</Container>
      <Container py='xl'>{props.roadmaps}</Container>
    </Container>
  );
};

export default PostLayout;
