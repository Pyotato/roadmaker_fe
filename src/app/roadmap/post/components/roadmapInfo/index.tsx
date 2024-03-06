'use client';

import { useQuery } from '@tanstack/react-query';
import { ReactElement } from 'react';

import { Member, Post } from '@/components/MainPage';

import { omit, pick } from '@/utils/shared';
import { getApiResponse } from '@/utils/shared/get-api-response';

import About from './About';
import ReactFlow from './reactFlow/ReactFlow';

export interface Position {
  x: number;
  y: number;
}
export interface Viewport extends Position {
  zoom: number;
}
export interface CustomEdge {
  id: string;
  source: string;
  type: string;
  animated: boolean;
}
export interface NodeStyle extends ReactElement {
  background: string;
  border: string;
  borderRadius: number;
  fontSize: number;
}
export interface CustomNode {
  id: string;
  type: string;
  width: number;
  height: number;
  sourcePosition: string;
  targetPosition: string;
  done: boolean;
  detailedContent: string;
  style: NodeStyle;
  data: {
    label: string;
  };
  position: Position;
  positionAbsolute: Position;
}

export interface RoadMapInfo extends Post {
  [key: string]: unknown;
  isJoined: boolean;
  isLiked: boolean;
  joinCount: number;
  likeCount: number;
  member: Member;
  updatedAt: string;

  viewport: Viewport;
  // edges: Array<Edge>;
  // edges: Array<CustomEdge | EdgeProps>;
  edges: Array<CustomEdge>;
  // nodes: Array<CustomNode | Node>;
  // nodes: Array<CustomNode | NodeProps>;
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
  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: [`post${id}`],
    queryFn: async () => await loadDataFromApi(id),
  });

  if (isLoading) return <div>is loading</div>;
  if (isError) return <div>oops something went wrong!🥲</div>;
  if (data === null || !data?.roadMapInfo) {
    return (
      <main>
        <section>
          <div>empty</div>
        </section>
      </main>
    );
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
        <ReactFlow reactFlowInfo={reactFlowInfo} />
      </>
    );
  }
};

export default Roadmap;
