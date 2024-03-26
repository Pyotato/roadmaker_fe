'use client';
import { Box, Title } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { IconExclamationMark, IconHeart } from '@tabler/icons-react';
import { useQueryClient } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { JWT } from 'next-auth/jwt';
import { useSession } from 'next-auth/react';
import { PropsWithChildren, useState } from 'react';

import { apiRoutes, missing } from '@/constants';
import { omit, toTSXString } from '@/utils/shared';
import { getApiResponse } from '@/utils/shared/get-api-response';

import { AboutInfo, RoadMapInfo } from './page';

interface LikeProps extends PropsWithChildren {
  likesInfo: {
    isLiked: AboutInfo['isLiked'];
    likeCount: AboutInfo['likeCount'];
  };
}

interface RoadMapInfoQuery {
  roadMapInfo: RoadMapInfo;
}

const Likes = ({ likesInfo }: LikeProps) => {
  const [likedCount, setLikedCount] = useState(likesInfo.likeCount);
  const [liked, setLiked] = useState(likesInfo.isLiked);
  const params = useParams<{ tag: string; item: string; id: string[] }>();
  const { data: token, status } = useSession();

  const queryClient = useQueryClient();

  const postResponseFromApi = async () => {
    const accessToken = token as unknown as JWT;
    const likes = await Promise.resolve(
      getApiResponse<LikeProps['likesInfo']>({
        apiEndpoint: `${apiRoutes.likes}${params.id}`,
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken?.token}`,
        },
      }),
    );

    setLiked(likes.isLiked);
    setLikedCount(likes.likeCount);

    const previousData = queryClient.getQueryData([
      `post${params.id}`,
    ]) as RoadMapInfoQuery;

    const newRoadMapInfo = {
      ...omit(previousData.roadMapInfo, 'isLiked', 'likeCount'),
      isLiked: likes?.isLiked,
      likeCount: likes?.likeCount,
    };
    queryClient.setQueryData([`post${params.id}`], {
      roadMapInfo: newRoadMapInfo,
    });
    return { likes };
  };

  return (
    <Box style={{ display: 'inline-flex', alignItems: 'center', gap: '1rem' }}>
      <IconHeart
        onClick={() => {
          if (status !== 'authenticated') {
            notifications.show({
              id: 'no-auth-alert',
              withCloseButton: true,
              autoClose: 1000,
              title: missing.auth.title,
              message: missing.auth.message,
              color: missing.auth.color,
              icon: (
                <IconExclamationMark
                  style={{ width: '20rem', height: '20rem' }}
                />
              ),
              className: 'my-notification-class',
              loading: false,
            });
            return;
          }
          postResponseFromApi();
        }}
        fill={liked ? 'red' : '#ffffff'}
        style={{ color: 'red' }}
        className='heart'
      />
      <Title order={6}>{toTSXString(likedCount)}</Title>
    </Box>
  );
};
export default Likes;
