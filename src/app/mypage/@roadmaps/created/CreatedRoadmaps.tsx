'use client';

import { Box } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { IconCheck } from '@tabler/icons-react';
import { useQuery } from '@tanstack/react-query';
import { JWT } from 'next-auth/jwt';
import { signIn, useSession } from 'next-auth/react';
import { useMemo, useState } from 'react';

import { ArticlesCardsGrid } from '@/components/shared/grid/ArticlesCardsGrid';
import { SkeletonCardsGrid } from '@/components/shared/grid/SkeletonGrid';

import { API_ROUTES, FAIL } from '@/constants';
import { ErrorResponse, getApiResponse } from '@/utils/get-api-response';

import { RoadMapInfo } from '@/types/post';

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

  if (status === 'unauthenticated') {
    signIn();
  }
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
      icon: <IconCheck style={{ width: '20rem', height: '20rem' }} />,
    });
  }
  if (isSuccess) {
    if (!data?.roadMapInfo || data?.roadMapInfo.length === 0)
      return <Box h='64vh'></Box>;
    return (
      <Box style={{ minHeight: '64vh' }}>
        <ArticlesCardsGrid postData={data.roadMapInfo || []} />
      </Box>
    );
  }
  return <>created roadmap list</>;
};

export default CreatedRoadmapList;
