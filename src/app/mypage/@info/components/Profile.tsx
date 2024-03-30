'use client';

import { Avatar, Box, Modal, Text, Tooltip } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import { IconCheck } from '@tabler/icons-react';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { JWT } from 'next-auth/jwt';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

import { apiRoutes, fail, siteRoutes } from '@/constants';
import { getApiResponse } from '@/utils/shared/get-api-response';

import UpdateAvatarForm from './forms/Avatar';
import UpdateMemberProfileForm from './forms/UserInfo';

interface UserData {
  avatarUrl?: null | string;
  baekjoonId?: null | string;
  bio?: null | string;
  blogUrl?: null | string;
  email: null | string;
  githubUrl?: null | string;
  id: number;
  nickname: string;
}

interface UserDataResponse {
  userData: UserData | null;
}

const UserData = () => {
  const { data: session, status } = useSession();
  const [user, setUser] = useState<JWT['user']>(session?.user as JWT['user']);
  const router = useRouter();
  const [opened, { open, close }] = useDisclosure(false);
  const [modalContent, setModalContent] = useState('');

  if (status === 'unauthenticated') {
    router.replace(siteRoutes.signIn);
  }
  if (status === 'loading') {
    <>loading...</>;
  }
  useEffect(() => {
    if (status === 'authenticated') {
      setUser(session?.user as JWT['user']);
    }
  }, [status, session?.user]);

  const loadDataFromApi = async () => {
    const [userData] = await Promise.all([
      getApiResponse<UserDataResponse>({
        apiEndpoint: `${apiRoutes.userInfoSlash}${user?.id}`,
        revalidate: 60 * 24, // 1 hr cache
      }),
    ]);
    // console.log(userData);

    return {
      userData,
    };
  };

  const {
    data: userInfo,
    error,
    isError,
    isLoading,
    isSuccess,
  } = useQuery({
    queryKey: [`mypage-info-${user?.id}`],
    queryFn: async () => await loadDataFromApi(),
    // queryFn: loadDataFromApi,
  });

  if (isLoading) return <>loading</>;
  if (isError) {
    notifications.show({
      id: fail['500'].id,
      withCloseButton: true,
      autoClose: 2000,
      title: fail['500'].title,
      message: `서버에서 예기치 못한 에러가 발생했습니다🥲\n${error}`,
      color: fail['500'].color,
      icon: <IconCheck style={{ width: '20rem', height: '20rem' }} />,
    });
    setTimeout(() => {
      router.replace('/');
    }, 2100);
  }
  if (isSuccess) {
    return (
      <Box
        style={{
          display: 'inline-flex',
          width: '100%',
          alignItems: 'center',
          gap: '1.5rem',
        }}
      >
        <Tooltip label='이미지 변경'>
          <Avatar
            src={
              userInfo?.userData?.avatarUrl ||
              'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-7.png'
            }
            className='hvr'
            radius='100%'
            size='xl'
            onClick={() => {
              open();
              setModalContent('avatar');
            }}
          />
        </Tooltip>
        <Tooltip.Floating label='내 정보 수정'>
          <Box
            className='hvr'
            onClick={() => {
              open();
              setModalContent('myInfo');
            }}
          >
            <Text
              fz='xl'
              gradient={{ from: 'violet', to: 'cyan', deg: 62 }}
              size='xl'
              fw={900}
              variant='gradient'
            >
              {userInfo?.userData?.nickname}
            </Text>
            <Text
              size='md'
              mt='sm'
              truncate='end'
              lineClamp={4}
              style={{ whiteSpace: 'pre-wrap' }}
            >
              {userInfo?.userData?.bio || '나에 대한 소개를 해볼까요?'}
            </Text>
          </Box>
        </Tooltip.Floating>
        <Modal opened={opened} onClose={close} centered>
          {modalContent === 'avatar' ? (
            <UpdateAvatarForm close={close} userId={userInfo?.userData?.id} />
          ) : (
            <UpdateMemberProfileForm
              close={close}
              userId={userInfo?.userData?.id}
              userNickName={userInfo?.userData?.nickname}
              userBio={userInfo?.userData?.bio}
            />
          )}
        </Modal>
      </Box>
    );
  }
};
export default UserData;
