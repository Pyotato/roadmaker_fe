import Roadmap from '@/app/roadmap/post/[...id]/@roadmapInfo/page';

export default function PostPage({
  params,
}: Readonly<{ params: { id: string } }>) {
  return <Roadmap params={params} />;
}
