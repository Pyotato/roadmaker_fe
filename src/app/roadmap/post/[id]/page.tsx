import Roadmap from '@/app/roadmap/post/components/roadmapInfo';

import CommentSection from '../components/comment';

export default function Post({ params }: { params: { id: string } }) {
  return (
    <>
      <div>
        <Roadmap params={params} />
      </div>
      <div>
        <CommentSection />
      </div>
    </>
  );
}
