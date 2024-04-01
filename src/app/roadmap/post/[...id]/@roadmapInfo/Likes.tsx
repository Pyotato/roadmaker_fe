'use client';
import { Box, Title } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { IconCheck, IconExclamationMark, IconHeart } from '@tabler/icons-react';
import { useQueryClient } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { JWT } from 'next-auth/jwt';
import { signOut, useSession } from 'next-auth/react';
import { PropsWithChildren, useState } from 'react';

import { apiRoutes, fail, IS_PROD, siteRoutes, warning } from '@/constants';
import { omit, toTSXString } from '@/utils/shared';
import { getApiResponse } from '@/utils/shared/get-api-response';

import { AboutInfo, RoadMapInfo } from './page';

interface LikeProps extends PropsWithChildren {
  likesInfo: {
    isLiked: AboutInfo['isLiked'];
    likeCount: AboutInfo['likeCount'];
  };
}

export interface RoadMapInfoQuery {
  roadMapInfo: RoadMapInfo;
}

export interface httpResponse {
  httpStatus: number;
  message: string;
  errorCode: string;
}

type likePostResponse = httpResponse | LikeProps['likesInfo'];

const Likes = ({ likesInfo }: LikeProps) => {
  const [likedCount, setLikedCount] = useState(likesInfo.likeCount);
  const [liked, setLiked] = useState(likesInfo.isLiked);
  const params = useParams<{ tag: string; item: string; id: string[] }>();
  const { data: session, status } = useSession();

  const queryClient = useQueryClient();

  const postResponseFromApi = async () => {
    const accessToken = session as unknown as JWT;
    const likes = await Promise.resolve(
      getApiResponse<likePostResponse>({
        apiEndpoint: `${apiRoutes.likes}${params.id}`,
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken?.token}`,
        },
      }),
    );

    if (likes?.httpStatus === 401) {
      notifications.show({
        id: fail['401'].id,
        withCloseButton: true,
        autoClose: 1000,
        title: fail['401'].title,
        message: likes.message,
        color: fail['401'].color,
        icon: <IconCheck style={{ width: '20rem', height: '20rem' }} />,
      });
      setTimeout(() => {
        signOut({
          callbackUrl: IS_PROD ? siteRoutes.signIn : siteRoutes.signInDev,
        });
      }, 1100);

      return;
    }

    if (likes) setLiked(likes?.isLiked);
    setLikedCount(likes?.likeCount);

    const previousData = queryClient.getQueryData([
      `post${params.id}-${accessToken?.user?.nickname}`,
    ]) as RoadMapInfoQuery;

    const newRoadMapInfo = {
      ...omit(previousData.roadMapInfo, 'isLiked', 'likeCount'),
      isLiked: likes?.isLiked,
      likeCount: likes?.likeCount,
    };
    queryClient.setQueryData(
      [`post${params.id}-${accessToken?.user?.nickname}`],
      {
        roadMapInfo: newRoadMapInfo,
      },
    );
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
              title: warning.auth.title,
              message: warning.auth.message,
              color: warning.auth.color,
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
