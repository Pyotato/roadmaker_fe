'use client';
import { Box, Button, Title } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { IconCheck, IconExclamationMark, IconUser } from '@tabler/icons-react';
import { useQueryClient } from '@tanstack/react-query';
import { JWT } from 'next-auth/jwt';
import { useSession } from 'next-auth/react';
import { useParams } from 'next/navigation';
import { useState } from 'react';

import { API_ROUTES, SUCCESS, WARNING } from '@/constants';
import { getApiResponse } from '@/utils/get-api-response';
import { omit } from '@/utils/shared';

import { JoinProps, RoadMapInfoQuery } from '@/types/post';
import styled from 'styled-components';

const Join = ({ joinInfo }: JoinProps) => {
  const [isJoined, setIsJoined] = useState(joinInfo.isJoined);
  const [joinCount, setJoinCount] = useState(joinInfo.joinCount);
  const params = useParams<{ tag: string; item: string; id: string[] }>();
  const { data: session, status } = useSession();
  const queryClient = useQueryClient();

  const postResponseFromApi = async () => {
    const accessToken = session as unknown as JWT;
    const res = await Promise.resolve(
      getApiResponse<number>({
        apiEndpoint: `${API_ROUTES.roadmapsSlash}${params.id}/join`,
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken?.token}`,
        },
      }),
    );
    setIsJoined(!isJoined);
    setJoinCount(res);
    const previousData = queryClient.getQueryData([
      `post${params.id}-${accessToken?.user?.nickname}`,
    ]) as RoadMapInfoQuery;

    const newRoadMapInfo = {
      ...omit(previousData.roadMapInfo, 'isJoined', 'joinCount'),
      isJoined: !isJoined,
      joinCount: joinCount,
    };
    queryClient.setQueryData(
      [`post${params.id}-${accessToken?.user?.nickname}`],
      {
        roadMapInfo: newRoadMapInfo,
      },
    );
    notifications.show({
      id: 'no-auth-alert',
      withCloseButton: true,
      autoClose: 1000,
      title: SUCCESS.join.title,
      message: `${previousData.roadMapInfo.title} 로드맵에 참여했습니다.\n 🍀 로드맵 활동을 응원합니다.`,
      color: SUCCESS.join.color,
      icon: <IconCheck className='icon' />,
      className: 'my-notification-class',
      loading: false,
    });
    return res;
  };

  return (
    <JoinInfoWrap>
      <Box className='gap1 flex'>
        <Box>
          <IconUser />
        </Box>
        <Box>
          <Title order={6}>참여인원: {joinCount}명</Title>
        </Box>
      </Box>
      <Button
        type='button'
        disabled={isJoined}
        onClick={() => {
          if (status !== 'authenticated') {
            notifications.show({
              id: 'no-auth-alert',
              withCloseButton: true,
              autoClose: 1000,
              title: WARNING.auth.title,
              message: WARNING.auth.message,
              color: WARNING.auth.color,
              icon: <IconExclamationMark className='icon' />,
              className: 'my-notification-class',
              loading: false,
            });
            return;
          }
          postResponseFromApi();
        }}
      >
        {isJoined ? '참여중' : '참여하기'}
      </Button>
    </JoinInfoWrap>
  );
};
export default Join;

const JoinInfoWrap = styled.div`
  margin: var(--mantine-spacing-xs) 0;
  display: inline-flex;
  align-items: center;
  width: 100%;
  justify-content: space-between;

  .flex {
    display: inline-flex;
    align-items: center;
    justify-content: space-between;
  }
`;
