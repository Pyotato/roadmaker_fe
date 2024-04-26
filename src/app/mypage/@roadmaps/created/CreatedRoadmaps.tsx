'use client';

import { notifications } from '@mantine/notifications';
import { IconCheck } from '@tabler/icons-react';
import { useQuery } from '@tanstack/react-query';
import { JWT } from 'next-auth/jwt';
import { signIn, useSession } from 'next-auth/react';
import { useMemo, useState } from 'react';
import styled from 'styled-components';

import { ItemsCardsGrid } from '@/components/shared/ItemsCardsGrid';
import { SkeletonCardsGrid } from '@/components/shared/SkeletonGrid';

import { API_ROUTES, FAIL } from '@/constants';
import { getApiResponse } from '@/utils/get-api-response';

import { RoadMapInfo } from '@/types/post';
import { ErrorResponse } from '@/types/response';

const CreatedRoadmapList = () => {
  const { data: session, status } = useSession();
  const [tokenState, setTokenState] = useState<JWT['token']>(null);
  const [nickname, setNickname] = useState<JWT['user']['name']>('');

  useMemo(() => {
    const accessToken = session as unknown as JWT;
    if (status !== 'loading') {
      setTokenState(accessToken?.token);
      setNickname(accessToken?.user?.nickname);
    }
  }, [session, status]);

  const loadDataFromApi = async () => {
    let roadMapInfo;
    if (tokenState) {
      const res = await Promise.resolve(
        getApiResponse<RoadMapInfo | ErrorResponse>({
          apiEndpoint: `${API_ROUTES.userInfoSlash}${nickname}/roadmaps`,
          revalidate: 60 * 2, // 5 mins cache
          headers: {
            Authorization: `Bearer ${tokenState}`,
            'Content-Type': 'application/json',
          },
        }),
      );
      if (res?.errorCode) {
        if (res.httpStatus === 401) return signIn();
        return res;
      } else {
        roadMapInfo = res;
      }
    }

    return {
      roadMapInfo,
    };
  };

  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: [`post-created-${nickname}`],
    queryFn: loadDataFromApi,
  });

  // if (status === 'unauthenticated') {
  //   signIn();
  // }
  if (isLoading) {
    return <SkeletonCardsGrid />;
  }
  if (isError) {
    notifications.show({
      id: FAIL['409'].id,
      withCloseButton: true,
      autoClose: 6000,
      title: FAIL['409'].title,
      message: 'oops...something went wrong',
      color: FAIL['409'].color,
      icon: <IconCheck className='icon' />,
    });
  }
  if (isSuccess) {
    if (!data?.roadMapInfo || data?.roadMapInfo.length === 0)
      return <EmptyBox></EmptyBox>;
    return (
      <EmptyBox>
        <ItemsCardsGrid postData={data.roadMapInfo || []} />
      </EmptyBox>
    );
  }
  return <>created roadmap list</>;
};

export default CreatedRoadmapList;

export const EmptyBox = styled.div`
  min-height: 64vh;
`;
