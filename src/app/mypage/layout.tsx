import { Container } from '@mantine/core';

import PageFooter from '@/components/shared/layouts/PageFooter';

import { MyPageProps } from '@/types/user';

const PostLayout = (props: MyPageProps) => {
  return (
    <>
      <Container py='xl'>
        <Container py='xl'>{props.info}</Container>
        <Container py='xl'>{props.roadmaps}</Container>
      </Container>
      <PageFooter />
    </>
  );
};

export default PostLayout;
