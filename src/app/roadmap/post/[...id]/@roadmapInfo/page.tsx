'use client';

import { Box } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { JWT } from 'next-auth/jwt';
import { useSession } from 'next-auth/react';
import { useMemo, useState } from 'react';

import { Member, Post } from '@/components/MainPage';

import { apiRoutes } from '@/constants';
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
export interface AboutInfo {
  [key: string]: unknown;
  isJoined: boolean;
  isLiked: boolean;
  joinCount: number;
  likeCount: number;
  member: Member;
  updatedAt: string;
}

export type AboutKeys = 'viewport' | 'edges' | 'nodes';
export type ReactFlowInfo = Pick<RoadMapInfo, AboutKeys>;

export type aboutInfoKeys = keyof AboutInfo;

const Roadmap = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const router = useRouter();
  const { data: session, status } = useSession();

  const [tokenState, setTokenState] = useState<JWT['token']>(null);

  const [nickname, setNickname] = useState<JWT['user']['nickname']>(null);

  useMemo(() => {
    const accessToken = session as unknown as JWT;
    if (status !== 'loading') {
      setTokenState(accessToken?.token);
      setNickname(accessToken?.user?.nickname);
    }
  }, [session, status]);

  const loadDataFromApi = async (pageParam: string) => {
    let roadMapInfo;
    if (tokenState) {
      roadMapInfo = await Promise.resolve(
        getApiResponse<RoadMapInfo>({
          apiEndpoint: `${apiRoutes.roadmaps}/${pageParam}`,
          revalidate: 60 * 2, // 5 mins cache
          headers: {
            Authorization: `Bearer ${tokenState}`,
          },
        }),
      );
    } else {
      roadMapInfo = await Promise.resolve(
        getApiResponse<RoadMapInfo>({
          apiEndpoint: `${apiRoutes.roadmaps}/${pageParam}`,
          revalidate: 60 * 2, // 5 mins cache
        }),
      );
    }

    return {
      roadMapInfo,
    };
  };

  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: [`post${id}-${nickname}`],
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
        <Box
          style={{
            display: 'inline-flex',
            minWidth: '100%',
            width: 'fit-content',
            justifyContent: 'center',
            backgroundColor: '#EFEFEF',
          }}
        >
          <ReactFlow reactFlowInfo={reactFlowInfo} />
        </Box>
      </>
    );
  }
};

export default Roadmap;
