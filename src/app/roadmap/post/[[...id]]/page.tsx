import Roadmap from '@/app/roadmap/post/components/roadmapInfo';

import CommentSection from '../components/comment';

export default function PostPage({ params }: { params: { id: string } }) {
  return (
    <div>
      <Roadmap params={params} />
      <CommentSection />
    </div>
  );
}
