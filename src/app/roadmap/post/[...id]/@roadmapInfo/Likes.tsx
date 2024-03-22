'use client';
import { Box, Title } from '@mantine/core';
import { IconHeart } from '@tabler/icons-react';
import { useQueryClient } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { PropsWithChildren, useMemo, useState } from 'react';

import { apiRoutes } from '@/constants';
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
  const [liked, setLiked] = useState(likesInfo.isLiked);
  const [heartColor, setHeartColor] = useState(likesInfo.isLiked);
  const [likedCount, setLikedCount] = useState(likesInfo.likeCount);
  const params = useParams<{ tag: string; item: string; id: string[] }>();

  const queryClient = useQueryClient();

  const postResponseFromApi = async () => {
    const [likes] = await Promise.all([
      getApiResponse<LikeProps['likesInfo']>({
        // apiEndpoint: `${process.env.NEXT_PUBLIC_API}/like-roadmap/${params.id}`,
        apiEndpoint: `${apiRoutes.likes}${params.id}`,
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_USER_ACCESS_TOKEN}`,
          'Content-Type': 'application/json',
        },
      }),
    ]);
    if (likes) {
      setLiked(likes.isLiked);
      setLikedCount(likes.likeCount);
      setHeartColor(likes.isLiked);
    }

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

  useMemo(() => {
    setHeartColor(liked);
  }, [liked]);

  return (
    <Box style={{ display: 'inline-flex', alignItems: 'center', gap: '1rem' }}>
      <IconHeart
        fill={heartColor ? 'red' : '#ffffff'}
        style={{ color: 'red' }}
        onClick={postResponseFromApi}
      />
      <Title order={6}>{toTSXString(likedCount)}</Title>
    </Box>
  );
};
export default Likes;
