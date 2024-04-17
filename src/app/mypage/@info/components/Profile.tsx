'use client';

import { Avatar, Box, Modal, Text, Tooltip } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import { IconCheck } from '@tabler/icons-react';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { JWT } from 'next-auth/jwt';
import { useSession } from 'next-auth/react';
import { Suspense, useEffect, useState } from 'react';
import styled from 'styled-components';

import ProfileSkeleton from '@/components/shared/ProfileSkeleton';

import { API_ROUTES, FAIL, IS_PROD, SITE_ROUTES } from '@/constants';
import { randomAvartars } from '@/utils/avatars';
import { getApiResponse } from '@/utils/get-api-response';

import UpdateMemberProfileForm from './ProfileForm';
import UpdateAvatarForm from './ProfileImageForm';

import { UserDataResponse } from '@/types/user';

const UserData = () => {
  const { data: session, status } = useSession();
  const [user, setUser] = useState<JWT['user']>(session?.user as JWT['user']);
  const router = useRouter();
  const [opened, { open, close }] = useDisclosure(false);
  const [modalContent, setModalContent] = useState('');

  if (status === 'unauthenticated') {
    router.replace(IS_PROD ? SITE_ROUTES.signIn : SITE_ROUTES.signInDev);
  }

  useEffect(() => {
    if (status === 'authenticated') {
      setUser(session?.user as JWT['user']);
    }
  }, [status, session?.user]);

  const loadDataFromApi = async () => {
    const [userData] = await Promise.all([
      getApiResponse<UserDataResponse>({
        apiEndpoint: `${API_ROUTES.userInfoSlash}${user?.id}`,
        revalidate: 60 * 24, // 1 hr cache
      }),
    ]);

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
  });

  if (isLoading) return <ProfileSkeleton />;
  if (isError) {
    notifications.show({
      id: FAIL['500'].id,
      withCloseButton: true,
      autoClose: 2000,
      title: FAIL['500'].title,
      message: `서버에서 예기치 못한 에러가 발생했습니다🥲\n${error}`,
      color: FAIL['500'].color,
      icon: <IconCheck className='icon' />,
    });
    setTimeout(() => {
      router.replace('/');
    }, 2100);
  }
  if (isSuccess) {
    return (
      <AvatarWrap>
        <Suspense fallback={<ProfileSkeleton />}>
          <Tooltip label='이미지 변경'>
            <Avatar
              src={
                userInfo?.userData?.avatarUrl ||
                randomAvartars(userInfo?.userData?.id)
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
                className='text-area'
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
        </Suspense>
      </AvatarWrap>
    );
  }
};
export default UserData;

const AvatarWrap = styled.div`
  display: inline-flex;
  width: 100%;
  align-items: center;
  gap: 1.5rem;

  .text-area {
    white-space: pre-wrap;
  }
`;
