import { Container } from '@mantine/core';

interface PostProps {
  comment: React.ReactNode;
  roadmapInfo: React.ReactNode;
}

const PostLayout = (props: PostProps) => {
  return (
    <>
      {props.roadmapInfo}
      <Container py='xl'>{props.comment}</Container>
    </>
  );
};

export default PostLayout;
