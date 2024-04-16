'use client';

import { LoadingOverlay } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { useQuery } from '@tanstack/react-query';
import { JWT } from 'next-auth/jwt';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';

import { API_ROUTES, SUCCESS } from '@/constants';
import { getApiResponse } from '@/utils/get-api-response';
import { omit, pick } from '@/utils/shared';

import About from './About';
import ReactFlow from './reactFlow/ReactFlow';

import { RoadMapInfo } from '@/types/post';
import { ReactFlowInfo } from '@/types/reactFlow';
import { AboutInfo } from '@/types/user';
import styled from 'styled-components';

const Roadmap = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const router = useRouter();
  const { data: session, status } = useSession();

  const [tokenState, setTokenState] = useState<JWT['token']>(null);

  const [nickname, setNickname] = useState<JWT['user']['nickname']>(null);

  useEffect(() => {
    notifications.hide(SUCCESS.roadmaps.id);
  }, []);

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
          apiEndpoint: `${API_ROUTES.roadmaps}/${pageParam}`,
          revalidate: 60 * 2, // 5 mins cache
          headers: {
            Authorization: `Bearer ${tokenState}`,
          },
        }),
      );
    } else {
      roadMapInfo = await Promise.resolve(
        getApiResponse<RoadMapInfo>({
          apiEndpoint: `${API_ROUTES.roadmaps}/${pageParam}`,
          revalidate: 60 * 2, // 5 mins cache
        }),
      );
    }

    return {
      roadMapInfo,
    };
  };

  const { data, isLoading, isSuccess, isError } = useQuery({
    queryKey: [`post${id}-${nickname}`],
    queryFn: async () => await loadDataFromApi(id),
  });
  if (isLoading || status === 'loading') return <LoadingOverlay />;

  if (
    data === null ||
    !data?.roadMapInfo ||
    isError ||
    (isSuccess && data?.roadMapInfo?.errorCode)
  ) {
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
        <FlowWrap>
          <ReactFlow reactFlowInfo={reactFlowInfo} />
        </FlowWrap>
      </>
    );
  }
};

export default Roadmap;

const FlowWrap = styled.div`
  display: inline-flex;
  min-width: 100%;
  width: fit-content;
  justify-content: center;
  background-color: #efefef;
`;
