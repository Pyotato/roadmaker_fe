'use client';

import { Button, Textarea } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { IconCheck, IconFilePencil, IconX } from '@tabler/icons-react';
import { useQueryClient } from '@tanstack/react-query';
import { JWT } from 'next-auth/jwt';
import { useSession } from 'next-auth/react';
import { useCallback, useMemo, useState } from 'react';

import { API_ROUTES, FAIL, SUCCESS } from '@/constants';
import { getApiResponse } from '@/utils/get-api-response';

import { ErrorResponse } from '@/types/response';

const ProfileForm = ({
  close,
  userNickName,
  userBio,
  userId,
}: {
  close: () => void;
  userNickName: string;
  userBio: string | null;
  userId: number;
}) => {
  const [accessToken, setAccessToken] = useState<JWT['token']>(null);
  const queryClient = useQueryClient();
  const [nickname] = useState(userNickName);
  const [bio, setBio] = useState(userBio);

  const { data: token } = useSession();
  useMemo(() => {
    const aToken = token as unknown as JWT;
    setAccessToken(aToken?.token);
  }, [token]);

  const onSubmitProfileChange = useCallback(async () => {
    if (!userNickName) {
      return;
    }
    const [response] = await Promise.all([
      getApiResponse<ErrorResponse | null>({
        requestData: JSON.stringify({
          memberId: userId,
          nickname,
          bio,
        }),
        apiEndpoint: `${API_ROUTES.memberInfoUpdate}`,
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      }),
    ]);

    if (response?.errorCode !== undefined) {
      const { httpStatus, message } = response as ErrorResponse;
      notifications.show({
        id: 'update-my-info-fail',
        withCloseButton: true,
        autoClose: 5000,
        title: '내 프로필 정보 변경 실패',
        message: `🥲 내 프로필 정보 변경에 실패했습니다\n${message}`,
        color: FAIL[httpStatus].color,
        icon: <IconX className='icon' />,
        className: 'my-notification-class',
        loading: false,
      });

      return;
    }

    notifications.show({
      id: SUCCESS.user.id,
      withCloseButton: false,
      autoClose: 800,
      title: SUCCESS.user.title,
      message: `내 프로필 변경에 성공했습니다 🎉`,
      color: SUCCESS.roadmaps.color,
      icon: <IconCheck className='icon' />,
      className: 'my-notification-class notification',
      loading: true,
    });
    setTimeout(() => {
      queryClient.invalidateQueries({ queryKey: [`mypage-info-${userId}`] });
    }, 700);

    close();
  }, [accessToken, bio, close, nickname, queryClient, userId, userNickName]);

  return (
    <>
      <Textarea
        value={bio || ''}
        label='자기 소개'
        variant='filled'
        autoFocus={!bio}
        withAsterisk={!bio}
        placeholder='저는 로드맵 열공생입니다.'
        onChange={(event) => setBio(event.currentTarget.value)}
        leftSection={<IconFilePencil size={16} />}
        pb='md'
        autosize
        minRows={2}
        maxRows={4}
      />
      <Button
        disabled={!nickname || !userId}
        onClick={() => onSubmitProfileChange()}
      >
        프로필 정보 변경하기
      </Button>
    </>
  );
};
export default ProfileForm;
