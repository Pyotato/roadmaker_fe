'use client';

import { Button, Textarea, TextInput } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import {
  IconCheck,
  IconFilePencil,
  IconUser,
  IconX,
} from '@tabler/icons-react';
import { useQueryClient } from '@tanstack/react-query';
import { JWT } from 'next-auth/jwt';
import { useSession } from 'next-auth/react';
import { useCallback, useMemo, useState } from 'react';

import { apiRoutes, fail, FailKeys, success } from '@/constants';
import { getApiResponse } from '@/utils/shared/get-api-response';

export interface ErrorResponse {
  httpStatus: FailKeys;
  message: string;
  errorCode: string;
}

const UpdateMemberProfileForm = ({
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
  const [nickname, setNickname] = useState(userNickName);
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
        apiEndpoint: `${apiRoutes.memberInfoUpdate}`,
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
        color: fail[httpStatus].color,
        icon: <IconX style={{ width: '20rem', height: '20rem' }} />,
        className: 'my-notification-class',
        loading: false,
      });

      return;
    }

    notifications.show({
      id: success.user.id,
      withCloseButton: false,
      autoClose: 800,
      title: success.user.title,
      message: `내 프로필 변경에 성공했습니다 🎉`,
      color: success.roadmaps.color,
      icon: <IconCheck style={{ width: '20rem', height: '20rem' }} />,
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
      <TextInput
        value={nickname}
        label='닉네임'
        type='text'
        autoFocus={!nickname}
        withAsterisk={!nickname}
        description={
          nickname.length < 2 ? '닉네임은 2글자 이상이어야합니다.' : null
        }
        variant='filled'
        placeholder='myNickname'
        onChange={(event) => setNickname(event.currentTarget.value)}
        leftSection={<IconUser size={16} />}
        pb='md'
      />
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
export default UpdateMemberProfileForm;
