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

import { RoadMapInfo } from '@/app/roadmap/post/[...id]/@roadmapInfo/page';
import { apiRoutes, fail } from '@/constants';
import { getApiResponse } from '@/utils/shared/get-api-response';

const InProgressRoadmapList = () => {
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
      roadMapInfo = await Promise.resolve(
        getApiResponse<RoadMapInfo>({
          apiEndpoint: `${apiRoutes.userInfoSlash}${nickname}/in-progress-roadmaps`,
          revalidate: 60 * 2, // 5 mins cache
          headers: {
            Authorization: `Bearer ${tokenState}`,
            'Content-Type': 'application/json',
          },
        }),
      );
    }

    return {
      roadMapInfo,
    };
  };

  if (status === 'unauthenticated') {
    signIn();
  }

  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: [`post-inprogress-${nickname}`],
    queryFn: loadDataFromApi,
  });
  if (isLoading) {
    return <SkeletonCardsGrid />;
  }
  if (isError) {
    notifications.show({
      id: fail['409'].id,
      withCloseButton: true,
      autoClose: 6000,
      title: fail['409'].title,
      message: 'oops...something went wrong',
      color: fail['409'].color,
      icon: <IconCheck style={{ width: '20rem', height: '20rem' }} />,
    });
  }
  if (isSuccess) {
    if (
      !data?.roadMapInfo ||
      data?.roadMapInfo.length === 0 ||
      data?.roadMapInfo[0].id === null
    )
      return <Box h='64vh'></Box>;
    return (
      <Box style={{ minHeight: '64vh' }}>
        <ArticlesCardsGrid postData={data.roadMapInfo || []} />
      </Box>
    );
  }
  return <>in progress roadmap list</>;
};

export default InProgressRoadmapList;
