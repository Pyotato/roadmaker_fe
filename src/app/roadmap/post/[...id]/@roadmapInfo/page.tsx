'use client';

import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import { Member, Post } from '@/components/MainPage';

import { omit, pick } from '@/utils/shared';
import { getApiResponse } from '@/utils/shared/get-api-response';

import About from './About';
import ReactFlow from './reactFlow/ReactFlow';

import { CustomEdge, CustomNode, Viewport } from '@/types/reactFlow';

export interface RoadMapInfo extends Post {
  [key: string]: unknown;
  isJoined: boolean;
  isLiked: boolean;
  joinCount: number;
  likeCount: number;
  member: Member;
  updatedAt: string;

  viewport: Viewport;
  edges: Array<CustomEdge>;
  nodes: Array<CustomNode>;
}
export type AboutKeys = 'viewport' | 'edges' | 'nodes';
export type AboutInfo = Omit<RoadMapInfo, AboutKeys>;
export type ReactFlowInfo = Pick<RoadMapInfo, AboutKeys>;

export type aboutInfoKeys = keyof AboutInfo;

const loadDataFromApi = async (pageParam: string) => {
  const [roadMapInfo] = await Promise.all([
    getApiResponse<RoadMapInfo>({
      apiEndpoint: `${process.env.NEXT_PUBLIC_API}/roadmaps/${pageParam}`,
      revalidate: 60 * 2, // 5 mins cache
    }),
  ]);

  return {
    roadMapInfo,
  };
};

const Roadmap = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const router = useRouter();
  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: [`post${id}`],
    queryFn: async () => await loadDataFromApi(id),
  });

  if (isLoading) return <div>is loading</div>;
  if (isError) return <div>oops something went wrong!🥲</div>;
  if (data === null || !data?.roadMapInfo) {
    router.replace('/error');
    return <></>;
  }

  if (isSuccess && 'roadMapInfo' in data) {
    const { roadMapInfo } = data;

    const reactFlowInfo = pick(
      roadMapInfo,
      'viewport',
      'edges',
      'nodes',
    ) as ReactFlowInfo;
    const aboutInfo = omit(
      roadMapInfo,
      'viewport',
      'edges',
      'nodes',
    ) as AboutInfo;

    return (
      <>
        <About aboutInfo={aboutInfo} />
        <div
          style={{
            display: 'inline-flex',
            minWidth: '100%',
            width: 'fit-content',
            justifyContent: 'center',
            backgroundColor: '#EFEFEF',
          }}
        >
          <ReactFlow reactFlowInfo={reactFlowInfo} />
        </div>
      </>
    );
  }
};

export default Roadmap;
