import { Container } from '@mantine/core';

import Roadmap from '@/app/roadmap/post/[[...id]]/@roadmapInfo/page';

import CommentSection from './@comment/page';

export default function PostPage({
  params,
}: Readonly<{ params: { id: string } }>) {
  return (
    <>
      <Roadmap params={params} />
      <Container py='xl'>
        <CommentSection />
      </Container>
    </>
  );
}
