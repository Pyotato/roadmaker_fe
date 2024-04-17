'use client';

import { Box, Button, Image, Text, Tooltip } from '@mantine/core';
import { Dropzone, FileWithPath, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import { notifications } from '@mantine/notifications';
import { IconCheck, IconPhotoPlus, IconX } from '@tabler/icons-react';
import { useQueryClient } from '@tanstack/react-query';
import { JWT } from 'next-auth/jwt';
import { signIn, useSession } from 'next-auth/react';
import { useCallback, useMemo, useState } from 'react';
import styled from 'styled-components';

import { API_ROUTES, FAIL, SUCCESS } from '@/constants';
import { getApiResponse } from '@/utils/get-api-response';
import { getItem, removeItem, setItem } from '@/utils/localStorage';

import { ErrorResponse } from '@/types/response';

const ProfileImageForm = ({
  close,
  userId,
}: {
  close: () => void;
  userId: number;
}) => {
  const [files, setFiles] = useState<FileWithPath[]>([]);
  const [formData, setFormData] = useState<FormData | null>();
  const [accessToken, setAccessToken] = useState<JWT['token']>(null);
  const queryClient = useQueryClient();
  const [thumbnail, setThumbnail] = useState(
    getItem('my-update-profile') || null,
  );

  const { data: token } = useSession();

  useMemo(() => {
    const aToken = token as unknown as JWT;
    setAccessToken(aToken?.token);
  }, [token]);

  useMemo(() => {
    const tempFormData = new FormData();
    tempFormData.append('file', files[0]);
    setFormData(tempFormData);
  }, [files]);

  const previews = useCallback(() => {
    const url = thumbnail;
    return files.map((file) => {
      const imageUrl = URL.createObjectURL(file);

      return (
        <Image
          key={`${file.name}`}
          src={url}
          alt={`${url}`}
          onLoad={() => URL.revokeObjectURL(imageUrl)}
        />
      );
    });
  }, [files, thumbnail]);

  const onSubmitAvatar = useCallback(async () => {
    if (!formData || !files || !thumbnail) {
      return;
    }
    const [response] = await Promise.all([
      getApiResponse<ErrorResponse | null>({
        requestData: formData,
        apiEndpoint: `${API_ROUTES.memberAvatarUpdate}`,
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }),
    ]);

    if (response?.errorCode) {
      const { httpStatus, message, errorCode } = response as ErrorResponse;
      notifications.show({
        id: 'update-profile-image-fail',
        withCloseButton: true,
        autoClose: 5000,
        title: '내 프로필 이미지 변경 실패',
        message: `🥲 내 프로필 이미지 변경에 실패했습니다\n${message}`,
        color: FAIL[httpStatus].color,
        icon: <IconX className='icon' />,
        className: 'my-notification-class',
        loading: false,
      });
      removeItem('my-update-profile');
      setThumbnail('');
      setFiles([]);
      if (errorCode === 'UnAuthenticated') signIn();
      return;
    }

    if (response?.avatarUrl) {
      notifications.show({
        id: SUCCESS.roadmaps.id,
        withCloseButton: false,
        autoClose: 800,
        title: SUCCESS.roadmaps.title,
        message: `내 프로필 이미지 변경에 성공했습니다 🎉`,
        color: SUCCESS.roadmaps.color,
        icon: <IconCheck className='icon' />,
        className: 'my-notification-class notification',
        loading: true,
      });
      removeItem('my-update-profile');
      setTimeout(() => {
        queryClient.invalidateQueries({ queryKey: [`mypage-info-${userId}`] });
      }, 700);
    }
    close();
  }, [accessToken, close, files, formData, thumbnail, queryClient, userId]);

  return (
    <DropZoneWrap>
      <Dropzone
        accept={IMAGE_MIME_TYPE}
        onDrop={(e) => {
          setFiles(e);
          const fr = new FileReader();
          fr.readAsDataURL(e[0]);
          fr.onloadend = () => {
            const url = fr.result as string;
            setItem('my-update-profile', url);
            setThumbnail(url);
          };
        }}
      >
        {files.length > 0 ? (
          <Tooltip.Floating label='이미지 변경하기'>
            <Box pb='md'>{previews()}</Box>
          </Tooltip.Floating>
        ) : (
          <Box py='sm' className='input-text dropzone-area'>
            <Text ta='center'>
              <IconPhotoPlus data-disabled size='3rem' />
            </Text>
            <Text ta='center'>Drop images here</Text>
          </Box>
        )}
      </Dropzone>
      <Box w='100%' className='submit-image-btn'>
        <Button
          disabled={!files || !thumbnail || !formData}
          onClick={() => onSubmitAvatar()}
          className='submit-image-btn'
        >
          이미지 변경하기
        </Button>
      </Box>
    </DropZoneWrap>
  );
};
export default ProfileImageForm;

const DropZoneWrap = styled.div`
  .dropzone-area {
    height: 100%;
    width: 100%;
    display: inline-flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    border-radius: 0.2rem;
  }
  .submit-image-btn {
    display: inline-flex;
    justify-content: flex-end;
  }
`;
